'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/(autorization)/registration/registration.module.css';

const Registration: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [clue, setClue] = useState<string>('Введите логин и пароль');

  const routeToLogin = useRouter();

  const Registr = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registrationData: object = {
      name: name,
      password: password,
    };

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        body: JSON.stringify(registrationData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          setClue(errorData.error || 'Некорректные данные');
        } else {
          console.log(
            'Ошибка отправки fetch запроса: ' + errorData.error ||
              'Something went wrong'
          );
        }
        return;
      }

      const data = await response.json();
      console.log(data.message);
      setClue('Регистрация успешна');
      routeToLogin.push('/login');
    } catch (error) {
      console.log('Ошибка отправки fetch запроса: ' + error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Регистрация</h1>

      <form onSubmit={Registr} className={styles.form}>
        <div className={styles.formGroup}>
          <p className={styles.clue}>{clue}</p>
          <label className={styles.label}>Имя пользователя:</label>
          <input
            type="text"
            value={name}
            onChange={handleUsernameChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
