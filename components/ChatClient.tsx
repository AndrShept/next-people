import { Companion, Message } from '@prisma/client';
import React from 'react';

interface ChatClientProps {
  companion: Companion & { message: Message[] } & {
    _count: { message: number };
  };
}

export const ChatClient = ({ companion }: ChatClientProps) => {
  return <div>ChatClient</div>;
};
