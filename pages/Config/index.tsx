import React from 'react'
import { Button, message } from 'antd'

const Config = () => {
  // a function wich deletes all transactions from the database
  const hanleDeleteAllTransactions = async () => {
    try {
      fetch('http://localhost:3000/api/deleteAllTransactions', {
        method: 'DELETE',
      })
      message.success('deleted all transactions')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Config</h1>
      <Button onClick={hanleDeleteAllTransactions}>
        delete All Transactions
      </Button>
    </div>
  )
}

export default Config
