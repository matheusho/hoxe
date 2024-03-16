import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { List, Task, useHoxe } from "@/lib/hoxe";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().max(250, {
    message: "Title must not exceed 250 characters.",
  }).optional(),
  list: z.string({
    required_error: "Please select an list.",
  }),
});

export default function Edit() {
  const router = useRouter();
  const { getTask, editTask, deleteTask } = useHoxe();
  const [task, setTask] = useState<Task>();
  const [list, setList] = useState<string>(task?.list ?? '');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      list: '',
    },
  });

  useEffect(() => {
    if (router.query.taskId) {
      const result = getTask(router.query.taskId as string);

      if (!result) {
        router.push('/');
      }

      if (result) {
        setTask(result as Task);
        form.setValue('title', result.title);
        form.setValue('description', result.description);
        form.setValue('list', result.list);
        setList(result.list);
      }
    }
  }, [router.query.taskId]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    editTask(task as Task, values);
    router.push('/');
  }

  const handleListChange = (field: any) => (value: string) => {
    form.setValue('list', value);
    setList(value);
    field.onChange(value);
  }

  const handleDelete = () => {
    deleteTask(task as Task);
    router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="p-4">
          <div className="container max-w-2xl px-1">
            <Button asChild variant={`link`} size={`icon`}>
              <Link href="/">
                <ChevronLeftIcon size={32} />
              </Link>
            </Button>
            <h1 className="flex text-2xl font-bold capitalize">
              Edit Task
            </h1>
          </div>
        </header>


        <main className="px-4 pb-24">
          <div className="container max-w-2xl px-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Groceries today"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Groceries today"
                      maxLength={250}
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="list"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>List</FormLabel>
                  <Select onValueChange={handleListChange(field)} value={list}>
                    <FormControl className="capitalize">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize">
                      <SelectItem value={List.TODAY}>{List.TODAY}</SelectItem>
                      <SelectItem value={List.BACKLOG}>{List.BACKLOG}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </main>

        <footer className="fixed w-screen bottom-0 bg-white p-4">
          <div className="container max-w-2xl px-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="w-full mb-2 text-red-500 hover:text-red-500"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              Save
            </Button>
          </div>
        </footer>
      </form>
    </Form>
  );
}
