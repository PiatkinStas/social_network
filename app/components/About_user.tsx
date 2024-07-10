import React from 'react';
import { useState } from 'react';
import { IUser } from '../models/user_interface';
import styles from '@/app/components/About_user.module.css';

interface AboutUserProps {
  user: IUser;
}

const AboutUser: React.FC<AboutUserProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user.about_user.firstName,
    lastName: user.about_user.lastName,
    birthYear: user.about_user.birthYear,
    country: user.about_user.country,
    city: user.about_user.city,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/user_page/about_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: user._id, ...editedUser }),
      });
      if (response.ok) {
        // Handle successful response
        const resp = await response.json();
        user.about_user.firstName = resp.firstName;
        user.about_user.lastName = resp.lastName;
        user.about_user.birthYear = resp.birthYear;
        user.about_user.country = resp.country;
        user.about_user.city = resp.city;

        setIsEditing(false);
      } else {
        // Handle error response
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Информация о пользователе</h2>
      <p className={styles.info}>ID: {user._id.toString()}</p>
      {isEditing ? (
        <div>
          <p className={styles.info}>
            Имя:
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </p>
          <p className={styles.info}>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </p>
          <p className={styles.info}>
            Год рождения:
            <input
              type="text"
              name="birthYear"
              value={editedUser.birthYear}
              onChange={handleChange}
              className={styles.inputField}
            />
          </p>
          <p className={styles.info}>
            Страна:
            <input
              type="text"
              name="country"
              value={editedUser.country}
              onChange={handleChange}
              className={styles.inputField}
            />
          </p>
          <p className={styles.info}>
            Город:
            <input
              type="text"
              name="city"
              value={editedUser.city}
              onChange={handleChange}
              className={styles.inputField}
            />
          </p>
          <button onClick={handleSubmit} className={styles.button}>
            Отправить
          </button>
        </div>
      ) : (
        <div>
          <p className={styles.info}>Имя: {user.about_user.firstName}</p>
          <p className={styles.info}>Фамилия: {user.about_user.lastName}</p>
          <p className={styles.info}>
            Год рождения: {user.about_user.birthYear}
          </p>
          <p className={styles.info}>Страна: {user.about_user.country}</p>
          <p className={styles.info}>Город: {user.about_user.city}</p>
          <button onClick={handleEdit} className={styles.button}>
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutUser;
