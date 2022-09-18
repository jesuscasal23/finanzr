import React, { useState } from 'react'
import TransactionForm from '../../components/TransactionForm'
import { Form, Card } from 'antd'
import CSVReader from 'react-csv-reader'
import { Transactions } from '../../prisma/types'
import { Button } from 'antd'

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}

const NewTransaction = () => {
  const [formInstance] = Form.useForm()
  const [dataToBeImported, setDataToBeImported] = useState<Transactions[]>()

  const handleAddTransaction = async () => {
    const formValues = await formInstance.getFieldsValue()
    fetch('http://localhost:3000/api/addTransaction', {
      method: 'POST',
      body: JSON.stringify(formValues),
    })
  }

  const handleAddMultipleTransactions = async () => {
    fetch('http://localhost:3000/api/addMultipleTransactions', {
      method: 'POST',
      body: JSON.stringify(dataToBeImported),
    })
  }

  const hanleFileLoaded = (data: any[]) => setDataToBeImported(data)

  return (
    <>
      <Card style={{ width: '80%', margin: '0 auto', marginTop: '10vh' }}>
        <TransactionForm
          formInstance={formInstance}
          handleAddTransaction={handleAddTransaction}
        />
      </Card>

      <Card style={{ width: '80%', margin: '0 auto', marginTop: '10vh' }}>
        <CSVReader
          cssClass='react-csv-input'
          onFileLoaded={hanleFileLoaded}
          parserOptions={papaparseOptions}
        />
        <Button onClick={handleAddMultipleTransactions}>
          upload Transactions
        </Button>
      </Card>
    </>
  )
}

export default NewTransaction
