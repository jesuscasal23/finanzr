import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'

const mapAndFilterTransactions = (
  transactions: any,
  referenceFilterValue: string,
  showUncategorized: boolean
) => {
  let mappedTransactions = transactions.map(transaction => {
    return {
      ...transaction,
      checkbox: false,
    }
  })

  if (!showUncategorized) {
    mappedTransactions = mappedTransactions.filter(
      transaction => !transaction.category
    )
  }

  if (referenceFilterValue) {
    mappedTransactions = mappedTransactions.filter(transaction =>
      transaction.reference.includes(referenceFilterValue)
    )
  }

  return mappedTransactions
}

const useTransactions = (
  referenceFilterValue: string,
  showUncategorized: boolean
) => {
  const transactions = trpc.transactions.get.useQuery(undefined, {
    select: transactions =>
      mapAndFilterTransactions(
        transactions,
        referenceFilterValue,
        showUncategorized
      ),
  })

  const [transactionsWithCheck, setTransactionsWithCheck] = useState([])

  const handleSelect = (id: number) => {
    const newTransactionsWithCheck = transactionsWithCheck.map(transaction => {
      if (transaction.id === id) {
        return { ...transaction.data, checkbox: !transaction.data.checkbox }
      }
      return transaction
    })
    setTransactionsWithCheck(newTransactionsWithCheck)
  }

  useEffect(() => {
    if (transactions) {
      setTransactionsWithCheck(transactions.data)
    }
  }, [transactions.data && transactions.data.length])

  return {
    loading: transactions.isLoading,
    transactionsWithCheck: transactions.data,
    handleSelect,
  }
}

export default useTransactions
