import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { SuportButton } from '../../components/SuportButton';
import styles from './style.module.scss';

export default function Board() {
  return (
    <>
      <Head>
        <title>Minhas tarefas</title>
      </Head>
      <main className={styles.container}>

        <form>
          <input
            type='text'
            placeholder='Digite sua tarefa'
          />
          <button type='submit'>
            <FiPlus size={25} color='#17181f' />
          </button>
        </form>

        <h1>Você tem 3 tarefas</h1>

        <section>
          <article className={styles.taskList}>
            <p>Aprender a criar projetos com nextjs e aplicando firebase como back.</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color='#ffb800' />
                  <time>1 de novembro de 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color='#fff' />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color='#ff3636' />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>

      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar este projeto</h3>
        <div>
          <FiClock size={28} color='#fff' />
          <time>
            Última doação foi a 3 dias.
          </time>
        </div>
      </div>

      <SuportButton />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({req});

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  console.log('user logado: ', session.user)

  return {
    props: {

    }
  }
}