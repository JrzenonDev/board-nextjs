import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import firebase from '../services/firebaseConnection';
import styles from '../styles/styles.module.scss';

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
}

interface HomeProps {
  data: string;
}

export default function Home({ data }: HomeProps) {

  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image
          src='/images/board-user.svg'
          alt='Ferramenta Board'
          width={553}
          height={384}
        />

        <section className={styles.callToAction}>
          <h1>Uma ferramenta para o seu dia a dia Escreva, paneje e organize-se...</h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        <div className={styles.donaters}>

          {donaters.length !== 0 && <h3>Apoiadores: </h3> }

          <div className={styles.donatersImages}>
            {donaters.map(item => (
              <Image
                src={item.image}
                alt='Foto do usuário'
                width={65}
                height={65}
                key={item.id}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const donaters = await firebase.firestore().collection('users').get();

  const data = JSON.stringify(donaters.docs.map(u => {
    return {
      id: u.id,
      ...u.data(),
    }
  }))

  return {
    props: {
      data,
    },
    revalidate: 60 * 60
  }
}
