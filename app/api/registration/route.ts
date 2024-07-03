import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/database/db';
import User from '@/app/models/registrationSchema';

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, password } = await req.json();

  if (!name || !password) {
    return NextResponse.json(
      { error: 'Name and password are required' },
      { status: 400 }
    );
  }

  try {
    const newUser = new User({ name, password });
    await newUser.save();
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Добавлено логирование
    return NextResponse.json(
      { error: 'Error registering user' },
      { status: 500 }
    );
  }
}
