import { NextResponse } from 'next/server';
import Post from '@/app/models/postSchema';
import { connectDB } from '@/app/database/db';

export async function GET(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const posts = await Post.find({ userId }).sort({ createdAt: -1 }); // Сортировка постов в хронологическом порядке (последние посты первыми)
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}
