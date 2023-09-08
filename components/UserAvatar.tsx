import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from '@clerk/nextjs';

export const UserAvatar = () => {
  const {user} = useUser()
  return (
    <Avatar>
      <AvatarImage className='object-cover' src={user?.imageUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
