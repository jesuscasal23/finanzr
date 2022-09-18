export type Transactions = {
  id: number
  transaction_method: string
  execution_date: string
  sender: string
  reciever: string
  IBAN: string
  reference: string
  amount: number
}[]

export type Category = {
  id: number
  name: string
}
