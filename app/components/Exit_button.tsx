import React from 'react';
import styles from '@/app/components/Exit_button.module.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ExitButton = () => {
  const router = useRouter();

  const handleExit = () => {
    // Удаление куки
    Cookies.remove('userId'); // замените 'userId' на имя куки, где хранится идентификатор пользователя
    Cookies.remove('jwtToken'); // замените 'jwtToken' на имя куки, где хранится JWT токен

    // Перенаправление на главную страницу
    router.push('/');
  };

  return (
    <div>
      <button className={styles.button} onClick={handleExit}>
        Вийти
      </button>
    </div>
  );
};

export default ExitButton;
