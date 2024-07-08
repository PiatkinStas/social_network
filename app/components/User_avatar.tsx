import React from 'react';
import { useState } from 'react';
import { IUser } from '../models/user_interface';

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const [avatar, setAvatar] = useState<string>(user.avatarUrl || '');

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('avatar', event.target.files[0]);

      try {
        const response = await fetch('/api/user_page/user_avatar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setAvatar(data.avatarUrl); // Обновите URL аватара
        } else {
          console.error('Failed to upload avatar');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  return (
    <div>
      <div
        className="avatar"
        style={{
          width: '150px',
          height: '150px',
          backgroundImage: `url(${avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
        }}
      ></div>
      <form>
        <label htmlFor="avatar-upload">Изменить картинку</label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </form>
    </div>
  );
};
export default UserAvatar;
