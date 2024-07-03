'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Login, loginSchema } from '@/schemas/login';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { CircleAlert } from 'lucide-react';

export function Login() {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  function onSubmit(data: Login): void {
    console.log('Login username:', data.username);

    form.reset();
  }

  return (
    <main className="grid h-screen w-full items-center justify-center">
      <Card className=" h-fit w-[90vw]  sm:w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          {/* <CardDescription className="text-destructive hidden">
            Invalid credentials.
          </CardDescription> */}
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full">Sign in</Button>
              <div className="text-destructive flex hidden items-center gap-1 self-start">
                <CircleAlert className="h-4 w-4" />
                <div>Invalid credentials</div>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}

export default Login;
