import { FormEventHandler, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import Cookie from 'universal-cookie';

import type { KeyedMutator } from 'swr';
import type { TaskType } from '../lib/tasks';

const cookie = new Cookie();

type Props = {
  taskCreated: KeyedMutator<TaskType[]>;
};

const TaskForm: React.VFC<Props> = ({ taskCreated }) => {
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create: FormEventHandler = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectedTask!.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: 0, title: '' });
    taskCreated();
  };

  const update: FormEventHandler = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask!.id}/`,
      {
        method: 'PUT',
        body: JSON.stringify({ title: selectedTask!.title }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: 0, title: '' });
    taskCreated();
  };

  return (
    <div>
      <form onSubmit={selectedTask!.id !== 0 ? update : create}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedTask!.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask!, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask!.id !== 0 ? 'update' : 'create'}
        </button>
      </form>
    </div>
  );
};

export { TaskForm };
