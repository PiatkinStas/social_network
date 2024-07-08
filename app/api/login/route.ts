import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/app/database/db';
import User from '@/app/models/registrationSchema';
import { IUser } from '@/app/models/user_interface';
import cookie from 'cookie';

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, password } = await req.json();

  // Отдельная проверка для имени пользователя
  if (!name || name.trim() === '') {
    return NextResponse.json(
      { error: 'Имя пользователя не заполнено' },
      { status: 400 }
    );
  }

  // Отдельная проверка для пароля
  if (!password || password.trim() === '') {
    return NextResponse.json(
      { error: 'Пароль пользователя не заполнен' },
      { status: 400 }
    );
  }

  try {
    // Найти пользователя по имени в базе данных
    const user = (await User.findOne({ name: name })) as IUser | null;
    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь с таким именем не найден' },
        { status: 400 }
      );
    }

    // Сравнить хешированный пароль из базы данных с введенным паролем
    const isPasswordValid = await bcrypt.compare(password, user.hash_password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Неправильный пароль' },
        { status: 401 }
      );
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { userId: user._id, username: user.name },
      process.env.JWT_SECRET || '', // Добавляем пустую строку по умолчанию, если JWT_SECRET не определен
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'Вход выполнен успешно' });
    response.headers.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Установить secure флаг в продакшене
        maxAge: 60 * 60, // 1 час
        sameSite: 'strict',
        path: '/',
      })
    );
    response.headers.append(
      'Set-Cookie',
      cookie.serialize('userId', user._id.toString(), {
        secure: process.env.NODE_ENV !== 'development', // Установить secure флаг в продакшене
        maxAge: 60 * 60, // 1 час
        sameSite: 'strict',
        path: '/',
      })
    );

    return response;
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
