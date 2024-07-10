import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div>
        <Link href="/registration" className={styles.link}>
          Регистрация
        </Link>
        <Link href="/login" className={styles.link}>
          Вход
        </Link>
      </div>
    </main>
  );
}
