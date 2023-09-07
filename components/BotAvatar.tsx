import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const BotAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <AvatarImage className='object-cover' src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
