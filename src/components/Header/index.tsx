import Image from 'next/image';
import Link from 'next/link';
import SignInButton from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/'>
          <Image
            src='/images/logo.svg'
            alt='Meu Boarding'
            width={72}
            height={76}
          />
        </Link>

        <nav>
          <Link href='/'>
            Home
          </Link>
          <Link href='/board'>
            Meu board
          </Link>
        </nav>

      <SignInButton />
      </div>
    </header>
  )
}