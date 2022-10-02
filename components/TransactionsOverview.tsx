import { Table, Checkbox, ScrollArea, Box } from '@mantine/core'

export const TableCard = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={theme => ({
      backgroundColor: theme.colors.dark[6],
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      margin: theme.spacing.md,
    })}>
    {children}
  </Box>
)

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

export function TransactionsOverview({
  data,
  handleSelect,
}: {
  data: transactionsWithCheckbox
  handleSelect: (id: number) => void
}) {
  const rows = data.map(row => (
    <tr key={row.id} style={{ textAlign: 'center' }}>
      <td>
        <Checkbox
          style={{ marginLeft: '15px' }}
          checked={row.checkbox}
          onChange={() => handleSelect(row.id)}
          tabIndex={-1}
          size='md'
          mr='xl'
          styles={{ input: { cursor: 'pointer' } }}
        />
      </td>
      <td>{row.reference}</td>
      <td>{row.IBAN}</td>
      <td style={{ textAlign: 'right' }}>{row.amount}</td>
      <td>{row.category && row.category.name}</td>
    </tr>
  ))

  return (
    <ScrollArea style={{ height: 'calc(100vh - 160px)', width: '700' }}>
      <TableCard>
        <Table
          horizontalSpacing='md'
          verticalSpacing='xs'
          sx={{ tableLayout: 'fixed', maxWidth: 700 }}>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th style={{ textAlign: 'center', width: '30px' }}>Selected</th>
              <th
                style={{
                  textAlign: 'center',
                  width: '50px',
                  minWidth: '300px',
                }}>
                Reference
              </th>
              <th style={{ textAlign: 'center', width: '70px' }}>IBAN</th>
              <th style={{ textAlign: 'right', width: '30px' }}>Amount</th>
              <th style={{ width: '30px', textAlign: 'center' }}>category</th>
            </tr>
          </thead>
          <tbody>{rows.length > 0 && rows}</tbody>
        </Table>
      </TableCard>
    </ScrollArea>
  )
}
