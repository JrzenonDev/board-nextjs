import { PayPalButtons } from '@paypal/react-paypal-js';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import styles from './styles.module.scss';

interface DonateProps {
  user: {
    name: string;
    id: string;
    image: string;
  }
}

export default function Donate({ user }: DonateProps) {

  const [vip, setVip] = useState(false);

  async function handleSaveDonate() {
    await firebase.firestore().collection('users')
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image
      })
      .then(() => {
        setVip(true);
      })
  }

  return (
    <>
      <Head>
        <title>Apoie a página Board a ficar online</title>
      </Head>
      <main className={styles.container}>
        <img src='/images/rocket.svg' alt='Seja apoiador' />

        {vip && (
          <div className={styles.vip}>
            <img src={user.image} alt='Foto de perfil do usuário' />
            <span>Parabéns você é um apoiador.</span>
          </div>
        )}

        <h1>Seja um apoiador desse projeto 🏆</h1>
        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
        <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '1'
                }
              }]
            })
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function(datails) {
              console.log('compra aprovada: ', datails.payer?.name.given_name);

              handleSaveDonate();
            })
          }}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    name: session?.user.name,
    id: session?.id,
    image: session?.user.image
  }

  return {
    props: {
      user
    }
  }
}