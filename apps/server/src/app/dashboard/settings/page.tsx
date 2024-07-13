'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAction } from 'next-safe-action/hooks';
import {
  ChangePassword,
  changePasswordSchema
} from '@/schemas/change-password';
import { DisplayActionResponse } from '@/components/display-action-response';
import { changePasswordAction } from '@/server/actions/change.password';

function Settings() {
  const {
    execute: changePassword,
    result,
    isExecuting
  } = useAction(changePasswordAction);

  const form = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  function onSubmit(data: ChangePassword): void {
    changePassword(data);
    form.reset();
  }

  return (
    <main className="grid items-start gap-4 p-4 sm:px-8 sm:py-0 md:gap-8">
      <div className="flex w-full flex-col">
        {/* <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10"> */}
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            {/* <nav className="text-muted-foreground grid gap-4 text-sm">
              <Link href="#" className="text-primary font-semibold">
                Security
              </Link>
              <Link href="#">Security</Link>
            </nav> */}
            <div className="grid gap-6">
              <Card x-chunk="dashboard-04-chunk-1">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Your account credentials used for signing in.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Old password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your old password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your new password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm new password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Confirm your password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="self-start">
                        <DisplayActionResponse result={result} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start border-t px-6 py-4">
                      {isExecuting ? (
                        <Button className="w-16" disabled>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </Button>
                      ) : (
                        <Button className="w-16" type="submit">
                          Save
                        </Button>
                      )}
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}

export default Settings;
