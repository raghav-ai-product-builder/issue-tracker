'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteIssue(id: number) {
  await prisma.issue.delete({
    where: { id },
  })
  revalidatePath('/')
}

