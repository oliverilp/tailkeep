'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 space-y-8 sm:w-full"
      >
        <div className="w-full sm:w-fit">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    className="w-full md:w-[350px] xl:w-[420px]"
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
          <Button className="w-16" disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button className="w-16" type="submit">
            Add
          </Button>
        )}
      </form>
    </Form>
  );
}

export default AddVideo;
