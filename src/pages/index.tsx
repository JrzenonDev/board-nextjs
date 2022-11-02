import Head from 'next/head';
import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="Ferramenta Board" />
        
        <section className={styles.callToAction}>
          <h1>Uma ferramenta para o seu dia a dia Escreva, paneje e organize-se...</h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>
        
        <div className={styles.donaters}>
          <h3>Apoiadores: </h3>
          <img src="https://sujeitoprogramador.com/steve.png" alt="Foto do usuário" />
        </div>
      </main>
    </>
  );
}