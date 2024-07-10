import React, { useState, ChangeEvent } from 'react';
import PostsWall from './Posts';
import { IUser } from '../models/user_interface';
import styles from '@/app/components/Wall.module.css';
interface WallProps {
  user: IUser;
}

const Wall: React.FC<WallProps> = ({ user }) => {
  const [post, setPost] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handlePostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const handlePostSubmit = async () => {
    try {
      const response = await fetch('/api/user_page/wall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post, userId: user._id }),
      });

      if (response.ok) {
        console.log('Новый пост:', post);
        setSuccess('Пост успешно размещен!');
        setPost(''); // Очистить textarea после отправки
      } else {
        const errorData = await response.json();
        setError(`Ошибка: ${errorData.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Ошибка: ${error.message}`);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.heading}>Стена</h2>
        <textarea
          value={post}
          onChange={handlePostChange}
          placeholder="Напишите что-нибудь..."
          className={styles.textarea}
        />
        <button onClick={handlePostSubmit} className={styles.button}>
          Разместить пост
        </button>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
      <PostsWall />
    </div>
  );
};

export default Wall;
