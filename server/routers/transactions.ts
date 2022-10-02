import { z } from 'zod'
import { t } from '../trpc'
import {
  TransactionsWithCategoryValidator,
  TransactionsWithCategoryType,
} from '../../types/transactions'
import prisma from '../../lib/prisma'

const mapRequestBody = (requestBody: any) => {
  const filteredRequestBody = requestBody.filter(
    (transaction: any) => !(transaction.Buchungstag === 'Kontostand')
  )

  const mappedRequestBody = filteredRequestBody.map((transaction: any) => {
    const isAmoutPositive = transaction.Soll
      ? parseInt(transaction.Soll, 10) > 0
      : parseInt(transaction.Haben, 10) > 0

    return {
      execution_date: transaction.Buchungstag,
      transaction_method: transaction.Umsatzart || 'unkown',
      sender:
        !isAmoutPositive && transaction['Begünstigter_Auftraggeber']
          ? transaction['Begünstigter_Auftraggeber']
          : 'me',
      reciever:
        isAmoutPositive && transaction['Begünstigter_Auftraggeber']
          ? transaction['Begünstigter_Auftraggeber']
          : 'me',
      IBAN: transaction.IBAN,
      reference: transaction.Verwendungszweck + '',
      amount: transaction.Soll
        ? Number(transaction.Soll.replace('.', '').replace(',', '.'))
        : Number(transaction.Haben.replace('.', '').replace(',', '.')),
    }
  })

  return mappedRequestBody
}

export const TransactionsRouter = t.router({
  get: t.procedure.query(async () => {
    const transactions: TransactionsWithCategoryType =
      await prisma.transaction.findMany({
        include: {
          category: true,
        },
      })

    try {
      TransactionsWithCategoryValidator.parse(transactions)
    } catch (error) {
      console.log(error, 'query result does not match type definition')
    }

    return transactions
  }),
  create: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const newTransaction = await prisma.transaction.create({
        data: input,
      })
      return newTransaction
    }),
  createMultiple: t.procedure
    .input(
      z.array(
        z.object({
          Soll: z.string(),
          Haben: z.string(),
          Buchungstag: z.string(),
          IBAN: z.string(),
          Verwendungszweck: z.string(),
          Umsatzart: z.string(),
          Begünstigter_Auftraggeber: z.string(),
        })
      )
    )
    .mutation(async ({ input }) => {
      console.log(input)
      const mappedRequestBody = mapRequestBody(input)
      const newTransactions = await prisma.transaction.createMany({
        data: mappedRequestBody,
      })
      return newTransactions
    }),
  deleteAll: t.procedure.mutation(async () => {
    const deletedTransactionsResponse = await prisma.transaction.deleteMany()
    console.log(deletedTransactionsResponse)
    return deletedTransactionsResponse
  }),
  linkToCategory: t.procedure
    .input(
      z.object({
        transactionIds: z.array(z.number()),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const updatedTransactions = await prisma.transaction.updateMany({
        where: {
          id: {
            in: input.transactionIds,
          },
        },
        data: {
          category: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      })
      return updatedTransactions
    }),
})
