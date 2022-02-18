import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';

import { Layout } from '../components/Layout';

const TaskPage: NextPage = () => {
  return (
    <Layout title="Task page">
      <Link href="MainPage" passHref>
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon className="w-6 h-6 mr-3" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default TaskPage;
