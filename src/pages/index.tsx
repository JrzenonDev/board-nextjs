import { GetStaticProps } from 'next';
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
          <div className={styles.donatersImages}>
            <img src="https://sujeitoprogramador.com/steve.png" alt="Foto do usuário" />
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 60 * 60
  }
}
