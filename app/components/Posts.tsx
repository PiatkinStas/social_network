import React, { useState, useEffect } from 'react';
import WallPost from './Wall_post';

interface Post {
  _id: string;
  content: string;
  createdAt: string;
  userId: string;
}

interface PostsWallProps {
  userId: string;
}

const PostsWall: React.FC<PostsWallProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/user_page/get_posts?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        // Сортировка постов в хронологическом порядке, если это еще не сделано на сервере
        const sortedPosts = data.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <WallPost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostsWall;
