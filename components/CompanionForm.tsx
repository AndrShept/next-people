'use client';
import { Category, Companion } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const isLoading = form.formState.isSubmitting

  const onSubmit = async(values: z.infer<typeof formSchema>)=> {

  }
  return <div>CompanionForm</div>;
};
