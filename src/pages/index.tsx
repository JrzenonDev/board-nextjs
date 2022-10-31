import Head from 'next/head';
import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <h1 className={styles.title}>Primeira aula nexjs</h1>
    </>
  );
}
