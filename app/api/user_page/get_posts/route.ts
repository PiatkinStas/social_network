import { NextResponse } from 'next/server';
import Post from '@/app/models/postSchema';
import { connectDB } from '@/app/database/db';

export async function GET() {
  await connectDB();

  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Сортировка постов в хронологическом порядке (последние посты первыми)
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
