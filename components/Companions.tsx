import CompanionIdPage from '@/app/companion/[id]/page';
import { Companion } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';

interface companionsDataProps {
  companionsData: (Companion & {
    _count: { message: number };
  })[];
}

export const Companions = ({ companionsData }: companionsDataProps) => {
  if (companionsData.length === 0) {
    return (
      <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
        <div className='relative h-60 w-60'>
          <Image className='grayscale' fill alt='img' src={'/empty.png'} />
        </div>
        <p className='text-sm text-muted-foreground'>no companion found.</p>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-10 gap-4'>
      {companionsData.map((companion) => (
        <Card
          key={companion.id}
          className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-80 transition border-0'
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
              <div className='relative w-32 h-32  '>
                <Image
                  src={companion.src}
                  alt='img'
                  fill
                  className='rounded-xl object-cover'
                />
              </div>
              <p className='font-bold'>{companion.name}</p>
              <p className='text-sm'>{companion.description}</p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
              <p className='lowercase'>{companion.userName}</p>
              <div className='flex items-center'>
                <MessagesSquare className='w-4 h-4 mr-1' />
                {companion._count.message}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
