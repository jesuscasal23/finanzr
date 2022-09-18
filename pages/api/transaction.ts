import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { sender, reciever, amount, IBAN } = JSON.parse(req.body)
    const newTransactions = await prisma.transaction.create({
      data: {
        transaction_method: 'test',
        execution_date: 'now',
        sender,
        reciever,
        IBAN: IBAN,
        amount: parseInt(amount, 10),
        reference: 'test',
      },
    })
    res.status(200).json(newTransactions)
    return
  }
  res.status(400).json({
    error:
      'this api route expects a post request with a transaction as the body',
  })
}
