import React, { useState } from 'react'
import TransactionForm from '../../components/TransactionForm'
import { Form, Card, message } from 'antd'
import CSVReader from 'react-csv-reader'
import { Button } from 'antd'
import { trpc } from '../../trpcUtils/trpc'

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}

const NewTransaction = () => {
  const [formInstance] = Form.useForm()
  const [dataToBeImported, setDataToBeImported] = useState<any[]>()

  const addTransaction = trpc.createTransaction.useMutation()
  const createMultipleTransactions =
    trpc.createMultipleTransactions.useMutation()

  return (
    <>
      <Card style={{ width: '80%', margin: '0 auto', marginTop: '10vh' }}>
        <TransactionForm
          formInstance={formInstance}
          handleAddTransaction={() => {
            addTransaction.mutate(formInstance.getFieldsValue())
          }}
        />
      </Card>
      <Card style={{ width: '80%', margin: '0 auto', marginTop: '10vh' }}>
        <CSVReader
          cssClass='react-csv-input'
          label='Select CSV with secret Death Star statistics'
          onFileLoaded={(data: any[]) => setDataToBeImported(data)}
          parserOptions={papaparseOptions}
        />
        <Button
          onClick={() => {
            createMultipleTransactions.mutate(dataToBeImported)
          }}>
          upload
        </Button>
      </Card>
    </>
  )
}

export default NewTransaction
