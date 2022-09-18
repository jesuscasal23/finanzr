import { Menu } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'

const determineActive = (path: string) => {
  if (path === '/add transaction') {
    return 'add transaction'
  } else if (path === '/config') {
    return 'config'
  } else if (path === '/Categories') {
    return 'Categories'
  }

  return 'transactions'
}

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <Menu mode='horizontal' selectedKeys={[determineActive(pathname)]}>
      <Menu.Item key='transactions'>
        <Link href='/Overview'>Transactions</Link>
      </Menu.Item>

      <Menu.Item key='add transaction'>
        <Link href='/AddTransactions'>Add Transaction</Link>
      </Menu.Item>

      <Menu.Item key='Config'>
        <Link href='/Config'>Config</Link>
      </Menu.Item>

      <Menu.Item key='Categories'>
        <Link href='/Categories'>Categories</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
