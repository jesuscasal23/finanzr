import React from 'react'
import { Button, message } from 'antd'
import { trpc } from '../../utils/trpc'

const Config = () => {
  const deleteTransactions = trpc.deleteAllTransactions.useMutation()
  const deleteCategories = trpc.deleteAllCategories.useMutation()

  const handleDeleteAllTransactions = async () => {
    try {
      await deleteTransactions.mutateAsync()
      message.success('All transactions deleted')
    } catch (error) {
      message.error('Error deleting transactions')
    }
  }

  const handleDeleteAllCategories = async () => {
    try {
      await deleteCategories.mutateAsync()
      message.success('All categories deleted')
    } catch (error) {
      message.error('Error deleting categories', error)
    }
  }

  return (
    <div>
      <h1>Config</h1>
      <Button
        onClick={handleDeleteAllTransactions}
        style={{ marginRight: '20px' }}>
        delete All Transactions
      </Button>

      <Button onClick={handleDeleteAllCategories}>delete All Categories</Button>
    </div>
  )
}

export default Config
