import { z } from 'zod'

export const TransactionsWithCategoryValidator = z.array(
  z.object({
    id: z.number(),
    transaction_method: z.string(),
    execution_date: z.string(),
    sender: z.string(),
    reciever: z.string(),
    IBAN: z.string(),
    reference: z.string(),
    amount: z.number(),
    categoryId: z.number(),
    category: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
    }),
  })
)
export type TransactionsWithCategoryType = z.infer<
  typeof TransactionsWithCategoryValidator
>
