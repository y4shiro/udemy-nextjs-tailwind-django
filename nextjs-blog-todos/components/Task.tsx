import React, { useContext } from 'react';
import Link from 'next/link';
import Cookie from 'universal-cookie';

import type { KeyedMutator } from 'swr';
import type { TaskType } from '../lib/tasks';

import { StateContext } from '../context/StateContext';

import { PencilAltIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/outline';

const cookie = new Cookie();

type Props = {
  task: TaskType;
  taskDeleted: KeyedMutator<TaskType[]>;
};

const Task: React.VFC<Props> = ({ task, taskDeleted }) => {
  const { setSelectedTask } = useContext(StateContext);

  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    taskDeleted();
  };

  return (
    <div>
      <span>{task.id}</span>
      {' : '}
      <Link href={`/tasks/${task.id}`} passHref>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {task.title}
        </span>
      </Link>

      <div className="float-right ml-20">
        <PencilAltIcon
          className="h-6 w-6 float-left cursor-pointer"
          onClick={() => setSelectedTask(task)}
        />
        <TrashIcon
          className="h-6 w-6 mr-2 cursor-pointer"
          onClick={deleteTask}
        />
      </div>
    </div>
  );
};

export { Task };
