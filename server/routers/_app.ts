import { t } from '../trpc'
import { CategoriesRouter } from './categories'
import { TransactionsRouter } from './transactions'

export const appRouter = t.router({
  categories: CategoriesRouter,
  transactions: TransactionsRouter,
})

export type AppRouter = typeof appRouter
