import React from 'react'
import { products } from '@/demoDatas/products'
import ProductShowcase from './ProductShowcase'

const NewArrivals = () => {
  // Yeni məhsulları filtrləyirik
  const newProducts = products.filter(product => product.isNew)
  
  return (
    <ProductShowcase 
      title="Yeni Məhsullar" 
      subtitle="Ən son əlavə olunan məhsulları kəşf edin"
      products={newProducts}
      bgColor="bg-gray-50"
    />
  )
}

export default NewArrivals
