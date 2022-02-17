import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
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
      <LogoutIcon className="mt-10 w-6 h-6 cursor-pointer" onClick={logout} />
    </Layout>
  );
};

export default MainPage;
