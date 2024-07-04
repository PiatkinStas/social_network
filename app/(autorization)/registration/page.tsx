'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div>
      <h1>Регистрация</h1>

      <form onSubmit={Registr}>
        <div>
          <p>{clue}</p>
          <label>Имя пользователя:</label>
          <input type="text" value={name} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Registration;
