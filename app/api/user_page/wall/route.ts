import { NextRequest, NextResponse } from 'next/server';
import Post from '@/app/models/postSchema';
import { connectDB } from '@/app/database/db';

export async function POST(request: NextRequest, response: NextResponse) {
  await connectDB();

  try {
    const body = await request.json(); // Получаем тело запроса
    const { post, userId } = body;

    if (!post || !userId) {
      return NextResponse.json(
        { message: 'Content and userId are required' },
        { status: 400 }
      );
    }

    const newPost = new Post({
      userId,
      content: post,
    });

    await newPost.save();

    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}
