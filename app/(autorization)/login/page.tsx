'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/(autorization)/login/login.module.css';

const Login: React.FC = () => {
  const routeToUserPage = useRouter();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [clue, setClue] = useState<string>('Введите логин и пароль');

  const autorization = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: object = {
      name: login,
      password: password,
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
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
      setClue(document.cookie);
      routeToUserPage.push('/user_page');
    } catch (error) {
      console.error('Ошибка входа:', error);
      setClue('Ошибка входа. Попробуйте снова.');
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Вход</h1>
      <form onSubmit={autorization} className={styles.form}>
        <p className={styles.clue}>{clue}</p>
        <div className={styles.formGroup}>
          <label className={styles.label}>Введите имя</label>
          <input
            type="text"
            value={login}
            onChange={handleLogin}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Введите пароль</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
