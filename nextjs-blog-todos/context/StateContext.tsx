import { createContext, useState } from 'react';
import { TaskType } from '../lib/tasks';

type TaskContextType = {
  selectedTask: Pick<TaskType, 'id' | 'title'> | null;
  setSelectedTask: (task: Pick<TaskType, 'id' | 'title'>) => void;
};

export const StateContext = createContext<TaskContextType>({
  selectedTask: null,
  setSelectedTask: (task) => {},
});

type Props = {
  children: React.ReactChild;
};

const StateContextProvider: React.VFC<Props> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: '' });

  return (
    <StateContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContextProvider };
