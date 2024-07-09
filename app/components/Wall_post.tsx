import React from 'react';
import { useState } from 'react';

interface Post {
  _id: string;
  content: string;
  createdAt: string;
  userId: string;
}

interface WallPostProps {
  post: Post;
}

const WallPost: React.FC<WallPostProps> = ({ post }) => {
  return (
    <div>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default WallPost;
