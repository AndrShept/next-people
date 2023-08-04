'use client';
import React from 'react';
import { Home, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const routes = [
    {
      icon: Home,
      href: '/',
      label: 'Home',
      pro: false,
    },
    {
      icon: Plus,
      href: '/companion/new',
      label: 'Create',
      pro: false,
    },
    {
      icon: Settings,
      href: '/settings',
      label: 'Settings',
      pro: false,
    },
  ];
  return (
    <div className=' space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-2 flex-1 justify-center'>
        <div className='space-y-2'>
          {routes.map((route) => (
            <div
              key={route.href}
              className={cn(
                'text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg duration-300'
              )}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
