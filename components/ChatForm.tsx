import React, { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatFormProps {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
}

export const ChatForm = ({
  handleInputChange,
  input,
  isLoading,
  onSubmit,
}: ChatFormProps) => {
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className='border-t border-primary/10 py-4 flex items-center gap-x-2'
      >
        <Input
          disabled={isLoading}
          value={input}
          onChange={handleInputChange}
          placeholder='Type a massage'
          className='rounded-lg bg-primary/10'
        />
        <Button className=' group' variant={'ghost'} disabled={isLoading}>
          <SendHorizonal className='w-6 h-6 text-primary/70  group-hover:text-primary duration-200' />
        </Button>
      </form>
    </div>
  );
};
