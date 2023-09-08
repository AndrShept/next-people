import { Companion, Message } from '@prisma/client';
import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { useCompletion } from 'ai/react';
import { useRouter } from 'next/navigation';

export interface ChatClientProps {
  companion: Companion & { message: Message[] } & {
    _count: { message: number };
  };
}

export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion.message);
  const { input, isLoading, handleSubmit, setInput } = useCompletion({
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
  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion} />
    </div>
  );
};
