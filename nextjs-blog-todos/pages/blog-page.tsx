import React from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline';

import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { getAllPostsData } from '../lib/posts';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<Props> = ({ filteredPosts }) => {
  return (
    <Layout title="Blog page">
      <ul>
        {filteredPosts &&
          filteredPosts.map((post) => <Post key={post.id} post={post} />)}
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

export default BlogPage;

export const getStaticProps = async () => {
  const filteredPosts = await getAllPostsData();

  return {
    props: { filteredPosts },
    revalidate: 3,
  };
};
