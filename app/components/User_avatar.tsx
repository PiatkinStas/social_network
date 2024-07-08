import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IUser } from '../models/user_interface';

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/user_page/user_avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('File upload failed.');
      }
    } catch (error) {
      setMessage('An error occurred while uploading the file.' + error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload Avatar:</label>
          <input
            type="file"
            id="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserAvatar;
