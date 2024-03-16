import { useEffect, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { List, Task, useHoxe } from "@/lib/hoxe";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentList, setCurrentList] = useState(List.TODAY);
  const { getTasks, markAsDone } = useHoxe();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks(currentList));
  }, [currentList]);

  const handleDone = (task: Task) => {
    markAsDone(task);
    setTasks(getTasks(currentList));
  }

  return (
    <>
      <header className="p-4">
        <div className="container max-w-2xl px-1">
          <ul className="flex text-2xl font-bold capitalize">
            <li
              className={cn(
                "py-4 cursor-pointer text-gray-400",
                currentList === List.TODAY && "text-black"
              )}
              onClick={() => setCurrentList(List.TODAY)}
            >
              {List.TODAY}
            </li>
            <li
              className={cn(
                "py-4 mx-6 cursor-pointer text-gray-400",
                currentList === List.BACKLOG && "text-black"
              )}
              onClick={() => setCurrentList(List.BACKLOG)}
            >
              {List.BACKLOG}
            </li>
            <li
              className={cn(
                "py-4 cursor-pointer text-gray-400",
                currentList === List.DONE && "text-black"
              )}
              onClick={() => setCurrentList(List.DONE)}
            >
              {List.DONE}
            </li>
          </ul>
        </div>
      </header>

      <main className="px-4 pb-24">
        <div className="container max-w-2xl px-1">
          {!tasks.length && (
            <div className="text-center text-slate-400 p-4">
              You do not have tasks on {currentList}.
            </div>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="items-top flex space-x-2">
              {currentList === List.DONE && <Checkbox className="my-4 cursor-default" checked />}
              {currentList === List.TODAY && <Checkbox className="my-4" onCheckedChange={() => handleDone(task)} />}

              <Link href={task.list !== List.DONE ? `/${task.id}` : ``} className={cn(
                'w-full py-4',
                task.list === List.DONE && 'cursor-default'
              )}>
                <div className="grid gap-1.5 leading-none">
                  <h3
                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground overflow-hidden text-wrap">
                    {task.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed w-screen bottom-0 bg-white p-4">
        <div className="container max-w-2xl px-1">
          <Button asChild className="w-full" size={`lg`}>
            <Link href="/new">
              Add new task
            </Link>
          </Button>
        </div>
      </footer>
    </>
  );
}
