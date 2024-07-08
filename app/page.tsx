import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/registration">Регистрация</Link>
        <Link href="/login">Вход</Link>
      </div>
    </main>
  );
}
