import React from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';

import { Layout } from '../components/Layout';
import { getAllTasksData } from '../lib/tasks';
import { Task } from '../components/Task';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const TaskPage: NextPage<Props> = ({ staticFilteredTasks }) => {
  return (
    <Layout title="Task page">
      <ul>
        {staticFilteredTasks &&
          staticFilteredTasks.map((task) => <Task key={task.id} task={task} />)}
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
  };
};

export default TaskPage;
