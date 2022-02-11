import React from 'react';
import { InferGetStaticPropsType } from 'next';

import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { getAllPostData } from '../lib/posts';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blog: React.VFC<Props> = ({ posts }) => {
  return (
    <Layout title="Blog">
      <ul className="m-10">
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
    </Layout>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const posts = await getAllPostData();
  return {
    props: { posts },
  };
};
