import { NextResponse } from 'next/server';
import { connectDB } from '@/app/database/db';
import User from '@/app/models/registrationSchema';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function GET(request: Request) {
  await connectDB();

  // Разбор заголовка cookies для получения токена и userId
  const cookies = request.headers.get('cookie');
  if (!cookies) {
    return NextResponse.json(
      { message: 'cookies показало undefined' },
      { status: 401 }
    );
  }

  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.token;
  const userId = parsedCookies.userId;

  if (!token || !userId) {
    return NextResponse.json(
      { message: 'token || userId   показало undefined' },
      { status: 401 }
    );
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: 'JWT_SECRET is not defined' },
      { status: 500 }
    );
  }

  try {
    jwt.verify(token, secret);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const user = await User.findById(userId).select('-hash_password');
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
