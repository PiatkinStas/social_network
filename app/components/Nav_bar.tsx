import React from 'react';
import ExitButton from './Exit_button';
import styles from '@/app/components/Nav_bar.module.css';

const NavBar = () => {
  return (
    <div className={styles.nav}>
      <ExitButton />
    </div>
  );
};

export default NavBar;
