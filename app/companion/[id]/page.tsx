import { CompanionForm } from '@/components/CompanionForm';
import { prisma } from '@/lib/prisma';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import React from 'react';

const CompanionIdPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await prisma.companion.findUnique({
    where: { id: params.id, userId },
  });

  const categories = await prisma.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
