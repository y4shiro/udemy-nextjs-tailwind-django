import { createContext, useState } from 'react';
import { TaskType } from '../lib/tasks';

type TaskContextType = {
  selectedTask: Pick<TaskType, 'id' | 'title'>;
  setSelectedTask: (task: Pick<TaskType, 'id' | 'title'>) => void;
};

type Props = {
  children: React.ReactChild;
};

const contextInitValue = { id: 0, title: '' };

export const StateContext = createContext<TaskContextType>({
  selectedTask: contextInitValue,
  setSelectedTask: (task) => {},
});

const StateContextProvider: React.VFC<Props> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState(contextInitValue);

  return (
    <StateContext.Provider value={{ selectedTask, setSelectedTask }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContextProvider };
