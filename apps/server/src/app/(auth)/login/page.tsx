'use client';

import React from 'react';
import { CircleAlert, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
import { loginAction } from '@/server/actions/login';
import { DisplayActionResponse } from '@/components/display-action-response';

interface LoginProps {
  isDemo: boolean;
}

export function Login({ isDemo }: LoginProps) {
  const { execute: login, result, isExecuting } = useAction(loginAction);

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  function onSubmit(data: Login): void {
    console.log('Login username:', data.username);
    login(data);

    form.reset();
  }

  return (
    <main className="grid h-screen w-full items-center justify-center">
      <Card className=" h-fit w-[90vw]  sm:w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              {isDemo && (
                <Alert>
                  <CircleAlert className="h-4 min-h-4 w-4 min-w-4" />
                  <AlertTitle className="font-medium">
                    App is running in demo environment!
                  </AlertTitle>
                  <AlertDescription>
                    <div className="mt-3 flex flex-col gap-1">
                      <span className="text-sm font-medium leading-none">
                        Username is admin
                      </span>
                      <span className="text-sm font-medium leading-none">
                        Password is Admin1Admin1
                      </span>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

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
              {isExecuting ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full">Sign in</Button>
              )}
              <div className="self-start">
                <DisplayActionResponse result={result} />
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}

export default Login;
