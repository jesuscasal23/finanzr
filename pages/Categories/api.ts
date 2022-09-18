import { Category } from '../../prisma/types'

export const addCategory = async (newCategoryName: string) => {
  const response = await fetch('http://localhost:3000/api/categories', {
    method: 'POST',
    body: JSON.stringify({ name: newCategoryName }),
  })
  const newCategory = await response.json()
  return newCategory
}

export const getCategories = async () => {
  const response = await fetch('http://localhost:3000/api/categories')
  const categories: Category[] = await response.json()
  return categories
}
