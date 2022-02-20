import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { GetStaticProps } from 'next';

import { Layout } from '../../components/Layout';
import { getAllTaskIds, getTaskData, TaskType } from '../../lib/tasks';
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';

const fetcher = (url: string): Promise<TaskType> =>
  fetch(url).then((res) => res.json());

type Props = { id: string; staticTask: TaskType };

const Task: React.VFC<Props> = ({ id, staticTask }) => {
  const router = useRouter();

  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    { fallbackData: staticTask }
  );

  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <span className="mb-4">{`ID : ${task.id}`}</span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page" passHref>
        <div className="flex cursor-pointer mt-8">
          <ChevronDoubleLeftIcon className="w-6 h-6 mr-3" />
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const staticTask = await getTaskData(params!.id as string);

  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
};

export default Task;
