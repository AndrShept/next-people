'use client';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import qs from 'query-string'

export const Categories = ({ data }: { data: Category[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const handleClick = (id: string | null) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, {skipNull: true})
    router.push(url)
  };
  return (
    <div className='w-full overflow-x-auto space-x-2 flex p-1'>
              <button
        onClick={()=> handleClick(null)}
         
          className={cn(
            'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 duration-150'
          , {
            'bg-primary/30' : categoryId === null
          })
           
          }
        >
          {'All'}
        </button>
      {data.map((item) => (
        <button
        onClick={()=> handleClick(item.id)}
          key={item.id}
          className={cn(
            'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 duration-150'
          , {
            'bg-primary/25' : item.id === categoryId
          })
           
          }
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
