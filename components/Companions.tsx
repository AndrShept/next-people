import { Companion } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

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
            <Image 
            className='grayscale'
            fill
            alt='img'
            src={'/empty.png'}
            />

        </div>
        <p className='text-sm text-muted-foreground'>no companion found.</p>
      </div>
    );
  }
  return <div>Companions</div>;
};
