import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';
import { Layout } from '../../components/Layout';
import { getAllPostIds, getPostData, PostType } from '../../lib/posts';

type Props = {
  post: PostType;
};

const Post: React.VFC<Props> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">{`ID : ${post.id}`}</p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>

      <Link href="/blog-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon className="w-6 h-6 mr-3" />
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostData(params!.id as string);

  return {
    props: {
      post,
    },
    revalidate: 3,
  };
};

export default Post;
