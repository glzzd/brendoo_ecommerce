import React from 'react'
import { useTranslation } from 'react-i18next'
import { products } from '@/demoDatas/products'
import ProductShowcase from './ProductShowcase'

const MostViewedProducts = () => {
  const { t } = useTranslation()
  // Ən çox baxılanlara görə sıralayırıq
  const sortedProducts = [...products].sort((a, b) => b.views - a.views)

  return (
    <ProductShowcase 
      title={t('home.mostViewed')}
      subtitle={t('home.mostViewedSubtitle')}
      products={sortedProducts}
      bgColor="bg-gray-50"
    />
  )
}

export default MostViewedProducts
