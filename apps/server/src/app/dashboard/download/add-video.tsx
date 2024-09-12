'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { addVideoAction } from '@/server/actions/add-video';

const formSchema = z.object({
  url: z.string().url({
    message: 'Must be a valid YouTube video URL.'
  })
});

type FormType = z.infer<typeof formSchema>;

function AddVideo() {
  const { execute: addVideo, isExecuting } = useAction(addVideoAction);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ''
    }
  });

  function onSubmit({ url }: FormType): void {
    console.log('Adding video', url);
    addVideo({ url });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Add Video</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Enter the YouTube link start downloading your video.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex items-start gap-3 sm:w-full">
            <div className="w-full max-w-[515px]">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="https://www.youtube.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isExecuting ? (
              <Button disabled>
                <Loader2 className="h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">
                <Plus className="h-5 w-5" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default AddVideo;
