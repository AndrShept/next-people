import { Categories } from '@/components/Categories';
import { Companions } from '@/components/Companions';
import { SearchInput } from '@/components/SearchInput';
import { prisma } from '@/lib/prisma';

export default async function Home({
  searchParams,
}: {
  searchParams: { name: string; categoryId: string };
}) {
  const companionsData = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: { search: searchParams.name },
    },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { message: true } } },
  });
  const categories = await prisma.category.findMany();
  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories data={categories} />
      <Companions companionsData={companionsData}/>
    </div>
  );
}
