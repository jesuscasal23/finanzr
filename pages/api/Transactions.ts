import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const mapRequestBody = requestBody => {
  const filteredRequestBody = requestBody.filter(
    transaction => !(transaction.Buchungstag === 'Kontostand')
  )

  const mappedRequestBody = filteredRequestBody.map(transaction => {
    const isAmoutPositive = transaction.Soll
      ? parseInt(transaction.Soll, 10) > 0
      : parseInt(transaction.Haben, 10) > 0

    return {
      execution_date: 'now',
      transaction_method: transaction.Umsatzart || 'unkown',
      sender:
        !isAmoutPositive && transaction['Begünstigter_Auftraggeber']
          ? transaction['Begünstigter_Auftraggeber']
          : 'me',
      reciever:
        isAmoutPositive && transaction['Begünstigter_Auftraggeber']
          ? transaction['Begünstigter_Auftraggeber']
          : 'me',
      IBAN: transaction.IBAN,
      reference: transaction.Verwendungszweck + '',
      amount: transaction.Soll
        ? parseInt(transaction.Soll, 10)
        : parseInt(transaction.Haben, 10),
    }
  })

  return mappedRequestBody
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const deletedTransactions = await prisma.transaction.deleteMany()
    res.status(200).json(deletedTransactions)
    return
  }
  if (req.method === 'POST') {
    const requestBody = JSON.parse(req.body)

    const newTransactions = await prisma.transaction.createMany({
      data: mapRequestBody(requestBody),
    })
    res.status(200).json(newTransactions)
    return
  }

  res.status(400).json({
    error: 'this api route expects a delete request',
  })
}
