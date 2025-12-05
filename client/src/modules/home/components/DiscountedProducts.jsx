import React from 'react'
import { products } from '@/demoDatas/products'
import ProductShowcase from './ProductShowcase'

const DiscountedProducts = () => {
  // Endirimli məhsulları filtrləyirik
  const discountedProducts = products.filter(product => product.discount || (product.originalPrice && product.originalPrice > product.price))
  
  return (
    <ProductShowcase
      title="Endirimli Məhsullar"
      subtitle="Möhtəşəm endirimləri qaçırmayın"
      products={discountedProducts}
      bgColor="bg-white"
    />
  )
}

export default DiscountedProducts
