import React from 'react';
import { IUser } from '../models/user_interface';

interface AboutUserProps {
  user: IUser;
}

const AboutUser: React.FC<AboutUserProps> = ({ user }) => {
  return (
    <div>
      <p>инфа о пользователе</p>
      <p>{user._id.toString()}</p>
    </div>
  );
};

export default AboutUser;
