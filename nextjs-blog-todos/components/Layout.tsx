import Head from 'next/head';

type Props = {
  children: React.ReactNode;
  title: string;
};

const Layout: React.VFC<Props> = ({ children, title = 'Default title' }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>

      <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @y4shiro 2022
      </footer>
    </div>
  );
};

export { Layout };
