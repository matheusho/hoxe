import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "lucide-react";
import { Field, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { List, User, useHoxe } from "@/lib/hoxe";

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

export default function New() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [list, setList] = useState<string>('');
  const { getUser, addTask } = useHoxe();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      list: user?.createOn,
    }
  });

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    if (user) {
      form.setValue('list', user.createOn);
      setList(user.createOn);
    }
  }, [user]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTask(values);
    router.push('/');
  }

  const handleListChange = (field: any) => (value: string) => {
    form.setValue('list', value);
    setList(value);
    field.onChange(value);
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
              New Task
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
              className="w-full" size={`lg`}
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
