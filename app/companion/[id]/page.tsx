import { CompanionForm } from '@/components/CompanionForm';
import { prisma } from '@/lib/prisma';
import React from 'react';

const CompanionIdPage = async ({ params }: { params: { id: string } }) => {
  const companion = await prisma.companion.findUnique({
    where: { id: params.id },
  });

  const categories = await prisma.category.findMany();
  return <CompanionForm initialData={companion } categories={categories} />;
};

export default CompanionIdPage;
