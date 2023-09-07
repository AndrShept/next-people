import { Companion, Message } from '@prisma/client';
import React from 'react';
import { ChatHeader } from './ChatHeader';

export interface ChatClientProps {
  companion: Companion & { message: Message[] } & {
    _count: { message: number };
  };
}

export const ChatClient = ({ companion }: ChatClientProps) => {
  return <div className='flex flex-col h-full p-4 space-y-2'>
    <ChatHeader companion={companion}/>
  </div>;
};
