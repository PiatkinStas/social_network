import React, { useState, ChangeEvent } from 'react';
import styles from '@/app/components/Wall_post.module.css';

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [error, setError] = useState<string | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(event.target.value);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`/api/user_page/wall/update_post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: post._id, content: editedContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      setIsEditing(false);
      post.content = editedContent;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className={styles.container}>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={handleContentChange}
            className={styles.textarea}
          />
          <button onClick={handleUpdateClick} className={styles.button}>
            Редактировать
          </button>
        </div>
      ) : (
        <div>
          <p className={styles.postContent}>{post.content}</p>
          <small className={styles.timestamp}>
            {new Date(post.createdAt).toLocaleString()}
          </small>
          <button onClick={handleEditClick} className={styles.button}>
            Изменить
          </button>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default WallPost;
