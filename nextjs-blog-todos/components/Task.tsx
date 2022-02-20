import React from 'react';
import Link from 'next/link';

import { TaskType } from '../lib/tasks';

type Props = {
  task: TaskType;
};

const Task: React.VFC<Props> = ({ task }) => {
  return (
    <div>
      <span>{task.id}</span>
      {' : '}
      <Link href={`/tasks/${task.id}`} passHref>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {task.title}
        </span>
      </Link>
    </div>
  );
};

export { Task };
