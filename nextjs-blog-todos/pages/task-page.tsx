import React, { useEffect } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';

import { Layout } from '../components/Layout';
import { getAllTasksData, TaskType } from '../lib/tasks';
import { Task } from '../components/Task';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const fetcher = (url: string): Promise<TaskType[]> =>
  fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage: NextPage<Props> = ({ staticFilteredTasks }) => {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks,
  });

  const filteredTasks = tasks?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title="Task page">
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => <Task key={task.id} task={task} />)}
      </ul>
      <Link href="/main-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon className="w-6 h-6 mr-3" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const staticFilteredTasks = await getAllTasksData();

  return {
    props: { staticFilteredTasks },
    revalidate: 3,
  };
};

export default TaskPage;
