import { z } from 'zod'
import { t } from '../trpc'
import prisma from '../../lib/prisma'

export const CategoriesRouter = t.router({
  get: t.procedure.query(async () => {
    const categories = await prisma.category.findMany({
      include: {
        transactions: true,
      },
    })
    return categories
  }),
  create: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const newCategory = await prisma.category.create({
        data: input,
      })
      return newCategory
    }),
  delete: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const deletedCategory = await prisma.category.delete({
        where: {
          id: input.id,
        },
      })
      return deletedCategory
    }),
  deleteAll: t.procedure.mutation(async () => {
    const deletedTransactionsResponse = await prisma.category.deleteMany()
    return deletedTransactionsResponse
  }),
})
