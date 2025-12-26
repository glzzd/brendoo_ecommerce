import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../../product/components/ProductCard'

const ProductShowcase = ({ title, subtitle, products, bgColor = 'bg-white' }) => {
  const [startIndex, setStartIndex] = useState(0)
  
  // Desktopda 4, tabletdə 2, mobildə 1 məhsul
  const itemsPerPage = 4

  const next = () => {
    setStartIndex((prev) => (prev + 1) % (products.length - itemsPerPage + 1))
  }

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + (products.length - itemsPerPage + 1)) % (products.length - itemsPerPage + 1))
  }

  // Ensure we don't try to slice out of bounds if there are fewer items than itemsPerPage
  const safeStartIndex = products.length <= itemsPerPage ? 0 : startIndex;
  const visibleProducts = products.slice(safeStartIndex, safeStartIndex + itemsPerPage)

  if (!products || products.length === 0) return null;

  return (
    <section className={`py-10 ${bgColor}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
          </div>
          
          {products.length > itemsPerPage && (
            <div className="flex gap-2">
                <button 
                    onClick={prev}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors border border-gray-100"
                    aria-label="Previous"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={next}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors border border-gray-100"
                    aria-label="Next"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, idx) => (
            <ProductCard 
              key={`${product.id}-${idx}`} 
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
