import { format } from 'date-fns';
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import firebase from '../../services/firebaseConnection';

type Task = {
  id: string;
  created: Date | string;
  createdFormated?: string;
  task: string;
  userId: string;
  name: string;
}

interface TaskListProps {
  data: string
}

export default function Task({ data }: TaskListProps) {

  const task = JSON.parse(data) as Task;
  return (
    <>
      <h1>Task</h1>
      <span>{task.task}</span>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

  const { id } = params;

  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  const data = await firebase.firestore().collection('tasks')
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data ={
        id: snapshot.id,
        created: snapshot.data().created,
        createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
        task: snapshot.data().task,
        userId: snapshot.data().userId,
        name: snapshot.data().name
      }

      return JSON.stringify(data);
    })

  return {
    props: {
      data
    }
  }
}