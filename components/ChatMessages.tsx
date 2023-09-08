'use client';
import { Companion } from '@prisma/client';
import React from 'react';
import { ChatMessage, ChatMessageProps } from './ChatMessage';

interface ChatMessagesProps {
  isLoading: boolean;
  messages: ChatMessageProps[]
  companion: Companion;
}

export const ChatMessages = ({
  companion,
  isLoading,
  messages,
}: ChatMessagesProps) => {
  return (
    <div className='flex-1 overflow-auto pr-4'>
      <ChatMessage
        isLoading={isLoading}
        src={companion.src}
        role='system'
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />

    </div>
  );
};
