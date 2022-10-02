import 'antd/dist/antd.css'
import { trpc } from '../utils/trpc'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import Navbar from '../components/Navbar'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  const links = [
    { link: 'Categories', label: 'Category' },
    { link: 'Config', label: 'Config' },
    { link: 'AddTransactions', label: 'Add Transactions' },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'dark',
          }}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Navbar links={links} />
          <Component {...pageProps} />
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default trpc.withTRPC(MyApp)
