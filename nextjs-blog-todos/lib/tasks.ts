import fetch from 'node-fetch';

export type TaskType = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const getAllTasksData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`).href
  );
  const tasks = (await res.json()) as TaskType[];
  const staticfilteredTasks = tasks.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return staticfilteredTasks;
};

const getAllTaskIds = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`).href
  );
  const tasks = (await res.json()) as TaskType[];

  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
};

const getTaskData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`).href
  );
  const task = (await res.json()) as TaskType;

  return task;
};

export { getAllTasksData, getAllTaskIds, getTaskData };
