'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AboutUser from '../components/About_user';
import ExitButton from '../components/Exit_button';
import FriendsButton from '../components/Friends_button';
import NavBar from '../components/Nav_bar';
import UserAvatar from '../components/User_avatar';
import Wall from '../components/Wall';

export default function UserPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user_page', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials for cookies
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log('Редирект в первом пуше');
          // Handle unauthorized access
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AboutUser user={user} />
      <ExitButton />
      <FriendsButton />
      <NavBar />
      <UserAvatar user={user} />
      <Wall />
    </div>
  );
}
