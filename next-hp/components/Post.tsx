import React from 'react';
import { PostType } from '../lib/posts';

type Props = { post: PostType };

const Post: React.VFC<Props> = ({ post }) => {
  return (
    <div>
      <span>{post.id}</span>
      {' : '}
      <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:bg-gray-200">
        {post.title}
      </span>
    </div>
  );
};

export { Post };
