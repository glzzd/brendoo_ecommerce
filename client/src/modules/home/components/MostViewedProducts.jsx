import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '@/demoDatas/products'
import { Heart, Star, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

const MostViewedProducts = () => {
  // Ən çox baxılanlara görə sıralayırıq
  const sortedProducts = [...products].sort((a, b) => b.views - a.views)
  
  const [startIndex, setStartIndex] = useState(0)
  // Desktopda 4, tabletdə 2, mobildə 1 məhsul
  const itemsPerPage = 4

  const next = () => {
    setStartIndex((prev) => (prev + 1) % (sortedProducts.length - itemsPerPage + 1))
  }

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + (sortedProducts.length - itemsPerPage + 1)) % (sortedProducts.length - itemsPerPage + 1))
  }

  const visibleProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ən çox baxılanlar</h2>
            <p className="text-gray-500 text-sm">Brendoo-nun ən populyar məhsullarını kəşf edin</p>
          </div>
          
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`} 
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Area */}
              <div className="relative h-64 p-8 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md">YENİ</span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-md">TOP</span>
                  )}
                  {product.discount && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">-{product.discount}%</span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <Link to={`/brands/${product.brandSlug}`} className="text-xs font-semibold text-gray-400 uppercase mb-1 hover:text-blue-600">
                  {product.brand}
                </Link>
                
                <Link to={`/products/${product.id}`} className="font-bold text-gray-900 text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviewCount} rəy)</span>
                </div>

                {/* Price & Views */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    <Eye size={12} />
                    <span>{(product.views / 1000).toFixed(1)}k</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MostViewedProducts
