'use client';
import { Category, Companion } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Separator } from './ui/separator';
import { ImageUpload } from './ImageUpload';

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().min(1, {
    message: ' Description is required.',
  }),
  instruction: z.string().min(200, {
    message: 'Instructions require at less 200 characters.',
  }),
  seed: z.string().min(200, {
    message: 'Seed require at less 200 characters.',
  }),
  src: z.string().min(1, {
    message: 'Image is required.',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required.',
  }),
});

export const CompanionForm = ({
  initialData,
  categories,
}: CompanionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      categoryId: undefined,
      instruction: '',
      seed: '',
      src: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};
  return (
    <div className='h-full p-4 space-2 max-w-3xl mx-auto '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='space-y-2 w-full  '>
            <div>
              <h3 className='text-lg font-medium'>General Infortmation</h3>
              <p className='text-sm text-muted-foreground'>
                Genral information about your Companion
              </p>
            </div>
            <Separator className='bg-primary/10'/>
          </div>
          <FormField name='src'
          render={({field})=>
             <FormItem className='flex flex-col items-center justify-center space-y-4 '>
                <FormControl>
                <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}  />

                </FormControl>
                <FormMessage/>
            </FormItem>

          }
          />
        </form>
      </Form>
    </div>
  );
};
