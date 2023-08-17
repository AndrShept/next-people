'use client';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div className='space-y-4 w-full flex flex-col justify-center items-center'>
      <CldUploadButton options={{ maxFiles: 1 }} uploadPreset='t3hvddvv'>
        <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center'>
            <div className='relative w-40 h-40 '>
                <Image className='object-cover rounded-lg' fill alt='Upload' src='/placeholder.svg'/>
            </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
