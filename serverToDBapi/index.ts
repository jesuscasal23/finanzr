import prisma from '../lib/prisma'

export const getTransactions = async () => {
  const transactions = await prisma.transaction.findMany()
  return transactions
}
