import React from 'react';

import AboutUser from '../components/About_user';
import ExitButton from '../components/Exit_button';
import FriendsButton from '../components/Friends_button';
import NavBar from '../components/Nav_bar';
import UserAvatar from '../components/User_avatar';
import Wall from '../components/Wall';

export default function UserPage() {
  return (
    <div>
      <AboutUser />
      <ExitButton />
      <FriendsButton />
      <NavBar />
      <UserAvatar />
      <Wall />
    </div>
  );
}
