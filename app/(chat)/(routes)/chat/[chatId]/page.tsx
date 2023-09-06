import { ChatClient } from '@/components/ChatClient';
import { prisma } from '@/lib/prisma';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const ChatIdPage = async ({ params }: { params: { chatId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: { id: params.chatId },
    include: {
      message: { orderBy: { createdAt: 'asc' }, where: { id: params.chatId } },
      _count: { select: { message: true } },
    },
  });

  if (!companion) {
    redirect('/');
  }
  return (
    <div>
      <ChatClient companion={companion} />
    </div>
  );
};

export default ChatIdPage;
