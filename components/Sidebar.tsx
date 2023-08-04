'use client';
import React from 'react';
import { Home, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
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

  const onNavigate = (url: string, pro: boolean) => {
    return router.push(url);
  };
  return (
    <div className=' space-y-4 flex  flex-col h-full text-primary bg-secondary'>
      <div className='p-2 flex-1 flex justify-center '>
        <div className='space-y-2 '>
          {routes.map((route) => (
            <div
              key={route.href}
              className={cn(
                'text-muted-foreground  text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                {
                  'bg-primary/10 text-primary': pathname === route.href,
                }
              )}
            >
              <div
                onClick={()=> onNavigate(route.href, route.pro)}
                className='flex flex-col gap-y-2 items-center flex-1'
              >
                <route.icon className='h-5 w-5' />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
