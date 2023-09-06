import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { name, description, categoryId, instructions, seed, src } = body;

    if (!params.id) {
      return new NextResponse(' Companion ID is required', { status: 400 });
    }

    if (
      !name ||
      !description ||
      !categoryId ||
      !instructions ||
      !seed ||
      !src
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const updatedCompanion = await prisma.companion.update({
      where: { id: params.id },
      data: {
        name,
        description,
        categoryId,
        instructions,
        seed,
        src,
        userId: user.id,
        userName: `@${user.firstName}`,
      },
    });
    return NextResponse.json(updatedCompanion, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal ERROR', { status: 500 });
  }
};
