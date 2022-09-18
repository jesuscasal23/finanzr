import React from 'react'
import { Form, Input, Button, FormInstance } from 'antd'

type TransactionFromProps = {
  formInstance: FormInstance<any>
  handleAddTransaction: () => void
}

const TransactionForm = ({
  formInstance,
  handleAddTransaction,
}: TransactionFromProps) => {
  return (
    <Form form={formInstance}>
      <Form.Item name='execution_date' label='Execution Date'>
        <Input />
      </Form.Item>

      <Form.Item name='sender' label='Sender'>
        <Input />
      </Form.Item>

      <Form.Item name='reciever' label='Execution Date'>
        <Input />
      </Form.Item>

      <Form.Item name='IBAN' label='IBAN'>
        <Input />
      </Form.Item>

      <Form.Item name='amount' label='amount'>
        <Input type='number' />
      </Form.Item>

      <Button onClick={handleAddTransaction}>upload</Button>
    </Form>
  )
}

export default TransactionForm
