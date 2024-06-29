'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const FormSchema = z.object({
  url: z.string().url({
    message: 'Must be a valid YouTube video URL.'
  })
});

type FormType = z.infer<typeof FormSchema>;

function AddVideo() {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: ''
    }
  });

  function onSubmit({ url }: FormType): void {
    console.log('Adding video', url);
    void addVideoAction({ url });
  }
  /* assdasd HJello world*/

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
                    className="w-full md:w-[350px]"
                    // placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}

export default AddVideo;
