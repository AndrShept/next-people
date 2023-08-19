import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { name, description, categoryId, instructions, seed, src } = body;

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
    if (!user || !user.id || !user.firstName || !user.lastName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const newCompanion = await prisma.companion.create({
      data: {
        name,
        description,
        categoryId,
        instructions,
        seed,
        src,
        userId: user.id,
        userName: `@${user.firstName}_${user.lastName}`,
      },
    });
    return NextResponse.json(newCompanion, { status: 201 });
  } catch (error) {
    return new NextResponse('Internal ERROR', { status: 500 });
  }
};
