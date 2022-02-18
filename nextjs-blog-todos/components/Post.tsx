import React from 'react';
import Link from 'next/link';

import { PostType } from '../lib/posts';

type Props = {
  post: PostType;
};

const Post: React.VFC<Props> = ({ post }) => {
  return (
    <div>
      <span>{post.id}</span>
      {' : '}
      <Link href={`/posts/${post.id}`} passHref>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {post.title}
        </span>
      </Link>
    </div>
  );
};

export { Post };
