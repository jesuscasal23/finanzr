import React, { useEffect, useState } from 'react'
import { Button, Card, Input, message } from 'antd'
import { Category } from '../../prisma/types'
import { addCategory, getCategories } from './api'

const Categories = () => {
  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [categoriesList, setCategoriesList] = useState<Category[]>([])

  useEffect(() => {
    getCategories().then(categories => setCategoriesList(categories))
  }, [])

  const handleAddCategory = async (newCategoryName: string) => {
    try {
      const newCategory = await addCategory(newCategoryName)
      setCategoriesList([...categoriesList, newCategory])
      message.success('Category added successfully')
    } catch (err) {
      message.error("couldn't add category")
    }
  }

  return (
    <Card>
      <Input onChange={e => setNewCategoryName(e.target.value)} />
      <Button onClick={() => handleAddCategory(newCategoryName)}>
        Add Category
      </Button>
      {categoriesList.map(category => (
        <h1>{category.name}</h1>
      ))}
    </Card>
  )
}

export default Categories
