import type { NextPage } from 'next';
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <p className="text-4xl">Welcome to Next.js</p>
    </Layout>
  );
};

export default Home;
