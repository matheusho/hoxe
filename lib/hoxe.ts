import { createId } from "@paralleldrive/cuid2";

export enum List {
  TODAY = "today",
  BACKLOG = "backlog",
  DONE = "done",
}

export interface Task {
  id?: string;
  title: string;
  description?: string;
  list: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface User {
  pro: boolean;
  createOn: string;
  tasks: Task[];
  updatedAt?: number;
}

const INITIAL_DATA = {
  pro: false,
  createOn: List.TODAY,
  tasks: [],
};

const STORAGE_KEY = "user";

export const useHoxe = () => {
  const updateUser = (data: any) =>
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, updatedAt: Date.now() })
    );

  const getUser = (): User => {
    const storage = localStorage.getItem(STORAGE_KEY);

    if (!storage) {
      updateUser(INITIAL_DATA);
    }

    return storage ? JSON.parse(storage) : INITIAL_DATA;
  };

  const getTasks = (filterList: string): Task[] =>
    getUser().tasks.filter(({ list }: Task) => list === filterList);

  const getTask = (id: string): Task => {
    const task = getUser().tasks.find((task: Task) => task.id === id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  };

  const addTask = (data: Task) => {
    const now = Date.now();
    const user = getUser();
    user.tasks = [
      {
        id: createId(),
        ...data,
        createdAt: now,
        updatedAt: now,
      },
      ...user.tasks,
    ];

    updateUser(user);
  };

  const editTask = (task: Task, data: Task) => {
    const tasks = getUser().tasks.map((t: Task) => {
      if (task.id === t.id) {
        return {
          ...t,
          ...data,
          updatedAt: Date.now(),
        };
      }

      return t;
    });

    updateUser({ ...getUser(), tasks });
  };

  const deleteTask = (task: Task) => {
    const tasks = getUser().tasks.filter((t: Task) => task.id !== t.id);

    updateUser({ ...getUser(), tasks });
  };

  const markAsDone = (task: Task) =>
    editTask(task, { list: List.DONE } as Task);

  return {
    getUser,
    getTasks,
    getTask,
    addTask,
    editTask,
    deleteTask,
    markAsDone,
  };
};
