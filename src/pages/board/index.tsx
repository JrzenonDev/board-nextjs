import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash, FiX } from 'react-icons/fi';
import { SuportButton } from '../../components/SuportButton';
import styles from './style.module.scss';

import Link from 'next/link';
import firebase from '../../services/firebaseConnection';

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  userId: string;
  name: string;
}

interface BoardProps {
  user: {
    id: string;
    name: string;
  }
  data: string;
}

export default function Board({ user, data }: BoardProps) {

  const [input, setInput] = useState('');
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));

  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();

    if (input === '') {
      alert('Por favor, digite uma tarefa!');
      return;
    }

    if (taskEdit) {
      await firebase.firestore().collection('tasks')
        .doc(taskEdit.id)
        .update({
          task: input
        })
        .then(() => {
          let data = taskList;
          let taskIndex = data.findIndex(item => item.id === taskEdit.id);
          data[taskIndex].task = input;

          setTaskList(data);
          setTaskEdit(null);
          setInput('');
        })
        .catch((err) => {
          alert('erro ao deletar' + err);
        })

        return;
    }

    await firebase.firestore().collection('tasks')
    .add({
      created: new Date(),
      task: input,
      userId: user.id,
      name: user.name
    })
    .then((doc) => {
      console.log('cadastro com sucesso', doc);
      alert('Cadastro realizado com sucesso!');

      let data = {
        id: doc.id,
        created: new Date(),
        createdFormated: format(new Date(), 'dd MMMM yyyy'),
        task: input,
        userId: user.id,
        name: user.name
      }

      setTaskList([...taskList, data]);
      setInput('');
    })
    .catch((err) => {
      console.log('Erro ao cadsatra', err);
      console.log('Falha ao cadastra a tarefa.');
    })
  }

  async function handleDelete(id: string) {
    await firebase.firestore().collection('tasks').doc(id)
      .delete()
      .then(() => {
        alert('deletado com sucesso!');

        let taskDeleted = taskList.filter(item => {
          return (item.id !== id);
        })

        setTaskList(taskDeleted);
      })
      .catch((err) => {
        alert('error delete: ' + err);
      })
  }

  function handleEditTask(task: TaskList) {
    setTaskEdit(task);
    setInput(task.task);
  }

  function handleCancelEdit() {
    setInput('');
    setTaskEdit(null);
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas</title>
      </Head>
      <main className={styles.container}>

        {taskEdit && (
          <span className={styles.warnText}>
            Você está editando uma tarefa!
            <button onClick={handleCancelEdit}>
              <FiX size={25} color='#ff3636' />
            </button>
          </span>
        )}

        <form onSubmit={handleAddTask}>
          <input
            type='text'
            placeholder='Digite sua tarefa'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit'>
            { taskEdit ?
              (<FiEdit2 size={25} color='#17181f' />) :
              (<FiPlus size={25} color='#17181f' />)
            }

          </button>
        </form>

        <h1>Você tem {taskList.length} {taskList.length === 1 ? 'tarefa' : 'tarefas'}!</h1>

        <section>
          {taskList.map(task => (
            <article
              className={styles.taskList}
              key={task.id}
            >
              <Link href={`/board/${task.id}`}>
                <p>{task.task}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color='#ffb800' />
                    <time>{task.createdFormated}</time>
                  </div>
                  <button onClick={() => handleEditTask(task)}>
                    <FiEdit2 size={20} color='#fff' />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color='#ff3636' />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
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

  const tasks = await firebase.firestore().collection('tasks')
    .where('userId', '==', session?.id)
    .orderBy('created', 'asc').get();

  const data = JSON.stringify(tasks.docs.map(item => {
    return {
      id: item.id,
      createdFormated: format(item.data().created.toDate(), 'dd MMMM yyyy'),
      ...item.data(),
    }
  }))

  const user = {
    name: session?.user.name,
    id: session?.id
  }

  return {
    props: {
      user,
      data
    }
  }
}