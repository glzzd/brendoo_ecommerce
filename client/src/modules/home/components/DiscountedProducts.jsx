import React from 'react'
import { useTranslation } from 'react-i18next'
import { products } from '@/demoDatas/products'
import ProductShowcase from './ProductShowcase'

const DiscountedProducts = () => {
  const { t } = useTranslation()
  // Endirimli məhsulları filtrləyirik
  const discountedProducts = products.filter(product => product.discount || (product.originalPrice && product.originalPrice > product.price))
  
  return (
    <ProductShowcase
      title={t('home.discounted')}
      subtitle={t('home.discountedSubtitle')}
      products={discountedProducts}
      bgColor="bg-white"
    />
  )
}

export default DiscountedProducts
