import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookie from 'universal-cookie';

import { LogoutIcon } from '@heroicons/react/outline';

import { Layout } from '../components/Layout';

const cookie = new Cookie();

const MainPage: NextPage = () => {
  const router = useRouter();

  const logout = () => {
    cookie.remove('access_token');
    router.push('/');
  };

  return (
    <Layout title="Main page">
      <div className="mb-10">
        <Link href="/blog-page" passHref>
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Visit Blog by SSG + ISR
          </a>
        </Link>
        <Link href="/task-page" passHref>
          <a className="bg-gray-500 ml-8 hover:bg-gray-600 text-white px-4 py-12 rounded">
            Visit Task by ISR + CSR
          </a>
        </Link>
      </div>

      <LogoutIcon className="mt-10 w-6 h-6 cursor-pointer" onClick={logout} />
    </Layout>
  );
};

export default MainPage;
