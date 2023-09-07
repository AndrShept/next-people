'use client';
import React from 'react';
import { ChatClientProps } from './ChatClient';
import { Button } from './ui/button';
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BotAvatar } from './BotAvatar';
import { useUser } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useToast } from './ui/use-toast';

export const ChatHeader = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      if (confirm('Confirm to delete ?')) {
        const res = await fetch(`/api/companion/${companion.id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          toast({
            title: 'Success',
          });
          router.refresh();
          router.push('/');
        }
      }
    } catch (error) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong!',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10  pb-4'>
      <div className='flex gap-x-2 items-center'>
        <Button size={'icon'} variant={'ghost'} onClick={() => router.back()}>
          <ChevronLeft className='h-8 w-8' />
        </Button>
        <BotAvatar src={companion.src} />
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='font-bold'>{companion.name}</p>
            <div className='flex items-center text-xs text-muted-foreground'>
              <MessageSquare className='w-3 h-3 mr-1' />
              {companion._count.message}
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'secondary'} size={'icon'}>
              <MoreVertical></MoreVertical>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className='w-4 h-4 mr-2' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className='w-4 h-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
