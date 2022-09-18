import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name } = JSON.parse(req.body)
    const category = await prisma.category.create({
      data: { name },
    })
    res.status(200).json(category)
    return
  } else if (req.method === 'DELETE') {
    const { id } = JSON.parse(req.body)
    const category = await prisma.category.delete({
      where: { id: Number(id) },
    })
    res.status(200).json(category)
    return
  } else if (req.method === 'GET') {
    const categories = await prisma.category.findMany()
    res.json(categories)
    return
  }
}
