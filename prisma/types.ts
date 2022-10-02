interface Transaction {
  id: number
  transaction_method: string
  execution_date: string
  sender: string
  reciever: string
  IBAN: string
  reference: string
  amount: number
}

interface transactionsWithCategory extends Transaction {
  category: Category
}

export type transactions = Transaction[]

export type transactionsWithCategories = transactionsWithCategory[]

export type Category = {
  id: number
  name: string
}

export type CategoryWithTransactions = {
  id: number
  name: string
  transactions: Transaction
}
