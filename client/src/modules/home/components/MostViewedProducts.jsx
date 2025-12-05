import React from 'react'
import { products } from '@/demoDatas/products'
import ProductShowcase from './ProductShowcase'

const MostViewedProducts = () => {
  // Ən çox baxılanlara görə sıralayırıq
  const sortedProducts = [...products].sort((a, b) => b.views - a.views)

  return (
    <ProductShowcase 
      title="Ən çox baxılanlar"
      subtitle="Brendoo-nun ən populyar məhsullarını kəşf edin"
      products={sortedProducts}
      bgColor="bg-gray-50"
    />
  )
}

export default MostViewedProducts
