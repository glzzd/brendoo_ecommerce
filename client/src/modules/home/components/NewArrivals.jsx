import React from 'react'
import { useTranslation } from 'react-i18next'
import { products } from '@/demoDatas/products'
import ProductShowcase from './ProductShowcase'

const NewArrivals = () => {
  const { t } = useTranslation()
  // Yeni məhsulları filtrləyirik
  const newProducts = products.filter(product => product.isNew)
  
  return (
    <ProductShowcase 
      title={t('home.newArrivals')} 
      subtitle={t('home.newArrivalsSubtitle')}
      products={newProducts}
      bgColor="bg-gray-50"
    />
  )
}

export default NewArrivals
