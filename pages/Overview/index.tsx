import styles from '../../styles/Home.module.css'
import { Card, Table } from 'antd'
import { getTransactions } from '../../serverToDBapi'
import { Transactions } from '../../prisma/types'

const columns = [
  { title: 'id', dataIndex: 'id', key: 'id', align: 'center' },
  { title: 'Sender', dataIndex: 'sender', key: 'sender', align: 'center' },
  {
    title: 'Reciever',
    dataIndex: 'reciever',
    key: 'reciever',
    align: 'center',
  },
  {
    title: 'reference',
    dataIndex: 'reference',
    key: 'reference',
    align: 'center',
  },
  { title: 'IBAN', dataIndex: 'IBAN', key: 'IBAN', align: 'center' },
  { title: 'amount', dataIndex: 'amount', key: 'amount', align: 'center' },
]

export async function getServerSideProps() {
  const fetchedTransactions: Transactions = await getTransactions()

  return {
    props: {
      transactions: fetchedTransactions,
    },
  }
}

const TransactionsOverview = ({
  transactions,
}: {
  transactions: Transactions
}) => {
  return (
    <>
      <h1
        className={styles.title}
        style={{
          marginBottom: '30px',
          marginTop: '10vh',
          textAlign: 'center',
          color: 'black',
        }}>
        Finanzr
      </h1>
      <Card style={{ width: '80%', margin: '0 auto ' }}>
        <Table dataSource={transactions} columns={columns} size={'small'} />
      </Card>
    </>
  )
}

export default TransactionsOverview
