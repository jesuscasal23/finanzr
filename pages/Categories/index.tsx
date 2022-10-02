import React, { useState } from 'react'
import { TransactionsOverview } from '../../components/TransactionsOverview'
import CategoriesList from './CategoriesList'
import useTransactions from '../../Hooks/useTransactions'
import { Box, Checkbox, Input } from '@mantine/core'

const Categories = () => {
  const [referenceFilterValue, setReferenceFilterValue] = useState('')
  const [showUncategorized, setShowUncategorized] = useState(false)
  const { transactionsWithCheck, handleSelect, loading } = useTransactions(
    referenceFilterValue,
    showUncategorized
  )

  if (loading) {
    return <h1>loading</h1>
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div>
        <Box
          sx={theme => ({
            backgroundColor: theme.colors.dark[6],
            padding: theme.spacing.xs,
            borderRadius: theme.radius.md,
            margin: theme.spacing.md,
            marginBottom: '5px',
            display: 'flex',
          })}>
          <Checkbox
            checked={showUncategorized}
            label={showUncategorized ? 'only show uncategorized' : 'show all'}
            onChange={() => setShowUncategorized(!showUncategorized)}
            style={{ margin: '0px 15px' }}
          />

          <Input
            placeholder='Reference filter'
            value={referenceFilterValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReferenceFilterValue(e.target.value)
            }
          />
        </Box>

        {transactionsWithCheck && (
          <TransactionsOverview
            data={transactionsWithCheck}
            handleSelect={handleSelect}
          />
        )}
      </div>
      <CategoriesList transactionsWithCheck={transactionsWithCheck} />
    </div>
  )
}

export default Categories
