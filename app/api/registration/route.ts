import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/database/db';
import User from '@/app/models/registrationSchema';
import bcrypt from 'bcrypt';

// Интерфейс для MongoDB ошибок
interface MongoError extends Error {
  code?: number;
}

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
    // const password = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password });
    await newUser.save();
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    // Проверка на ошибку уникальности
    if ((error as MongoError).code === 11000) {
      return NextResponse.json(
        { error: 'Пользователь с таким именем уже существует' },
        { status: 400 }
      );
    }
    console.error('Сообщение об ошибке в консоль сервера:', error); // Добавлено логирование
    return NextResponse.json(
      { error: 'Error registering user' },
      { status: 500 }
    );
  }
}
