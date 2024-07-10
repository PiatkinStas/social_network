import { NextResponse, NextRequest } from 'next/server';
import Post from '@/app/models/postSchema';
import { connectDB } from '@/app/database/db';

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { _id, content } = await request.json();

    if (!_id || !content) {
      return NextResponse.json(
        { message: 'ID and content are required' },
        { status: 400 }
      );
    }

    const post = await Post.findByIdAndUpdate(_id, { content }, { new: true });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Post updated successfully', post },
      { status: 200 }
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
