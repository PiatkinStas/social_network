'use client';

import React from 'react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const autorization = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={autorization}>
        <div>
          <label>Введите имя</label>
          <input type="text" value={login} onChange={handleLogin} />
        </div>
        <div>
          <label>Введите пароль</label>
          <input type="password" value={password} onChange={handlePassword} />
        </div>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
