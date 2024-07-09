import React, { useState, ChangeEvent } from 'react';
import PostsWall from './Posts';
import { IUser } from '../models/user_interface';
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
    <div>
      <div>
        <h2>Стена</h2>
        <textarea
          value={post}
          onChange={handlePostChange}
          placeholder="Напишите что-нибудь..."
        />
        <button onClick={handlePostSubmit}>Разместить пост</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
      <PostsWall />
    </div>
  );
};

export default Wall;
