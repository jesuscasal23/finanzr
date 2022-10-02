import React, { useState } from 'react'
import { Button, Input, Box, ScrollArea } from '@mantine/core'
import { StyledBox } from '../styledComponents'
import { trpc } from '../../../utils/trpc'
import { message } from 'antd'

type transactionsWithCheckbox = {
  id: number
  transaction_method: string
  execution_date: string
  sender: string
  reciever: string
  IBAN: string
  reference: string
  amount: number
  checkbox: boolean
}[]

const CategoriesList = ({
  transactionsWithCheck,
}: {
  transactionsWithCheck: transactionsWithCheckbox
}) => {
  const utils = trpc.useContext()
  const categories = trpc.categories.get.useQuery()
  const createCategory = trpc.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.get.invalidate()
      setNewCategoryName('')
      message.success('Category created')
    },
    onError: err => {
      message.error('Could not create category!')
    },
  })
  const deleteCategory = trpc.categories.delete.useMutation({
    onSuccess: () => {
      utils.categories.get.invalidate()
      message.success('Category deleted')
    },
  })
  const linkTransactionToCategory =
    trpc.transactions.linkToCategory.useMutation({
      onSuccess: () => {
        utils.categories.get.invalidate()
        message.success('Link to Transaction successfull')
      },
    })
  const [newCategoryName, setNewCategoryName] = useState<string>('')

  const handleCreateCategory = async () => {
    createCategory.mutate({ name: newCategoryName })
    message.error('could not create new Category')
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory.mutateAsync({ id })
    } catch (error) {
      message.error('could not delete Category')
    }
  }

  const handleLinkTransactions = (categoryId: number) => {
    const transactionIds = transactionsWithCheck
      .filter(transaction => transaction.checkbox)
      .map(transaction => transaction.id)

    linkTransactionToCategory.mutate({ transactionIds, categoryId: categoryId })
  }

  const handleChangeNewCategoryName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategoryName(e.target.value)
  }

  return (
    <div>
      <ScrollArea
        style={{
          width: '250px',
          height: 'calc(100vh - 200px)',
        }}>
        <Box
          sx={theme => ({
            width: '250px',
            height: 'calc(100vh - 200px)',
          })}>
          {Array.isArray(categories) &&
            categories.map(category => (
              <StyledBox>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <p style={{ wordWrap: 'break-word', marginRight: '20px' }}>
                    {category.name} ({category.transactions.length})
                  </p>
                  <Button
                    onClick={() => handleLinkTransactions(category.id)}
                    size='xs'>
                    Link
                  </Button>

                  {category.transactions.length === 0 && (
                    <Button onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </StyledBox>
            ))}
        </Box>
      </ScrollArea>
      <Box
        sx={theme => ({
          width: '220px',
          backgroundColor: theme.colors.dark[6],
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          margin: theme.spacing.md,
        })}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Input
            onChange={handleChangeNewCategoryName}
            style={{ marginRight: '20px' }}
          />
          <Button size='xs' onClick={handleCreateCategory}>
            Add
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default CategoriesList
