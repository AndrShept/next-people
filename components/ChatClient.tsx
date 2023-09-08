'use client'
import { Companion, Message } from '@prisma/client';
import React, { FormEvent, useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { useCompletion } from 'ai/react';
import { useRouter } from 'next/navigation';
import { ChatForm } from './ChatForm';
import { ChatMessages } from './ChatMessages';

export interface ChatClientProps {
  companion: Companion & { message: Message[] } & {
    _count: { message: number };
  };
}

export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion.message);
  const { input, isLoading, handleSubmit, setInput, handleInputChange } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish(prompt, completion) {
      const systemMessage = {
        role: 'system',
        content: completion,
      };
      setMessages((current) => [...current, systemMessage]);
      setInput('');
      router.refresh();
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    const userMessage = {
      role: 'user',
      content: input
    }
    setMessages( current => [...current, userMessage])
    handleSubmit(e)
  };
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion} />

      <ChatMessages
      companion={companion}
      isLoading={isLoading}
      messages={messages}
      />

      <ChatForm 
      isLoading={isLoading}
      input={input}
      handleInputChange={handleInputChange}
      onSubmit={onSubmit}

      />
    </div>
  );
};
