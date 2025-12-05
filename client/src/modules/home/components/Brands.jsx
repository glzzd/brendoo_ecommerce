import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { brands } from '@/demoDatas/brands'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const Brands = () => {
  // Demo üçün brendləri artırırıq
  const allBrands = [...brands, ...brands, ...brands]
  
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 6 // Desktopda 6 brend

  const next = () => {
    setStartIndex((prev) => (prev + 1) % (allBrands.length - itemsPerPage + 1))
  }

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + (allBrands.length - itemsPerPage + 1)) % (allBrands.length - itemsPerPage + 1))
  }

  const visibleBrands = allBrands.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Partnyor brendlər</h2>
          <div className="flex items-center gap-4">
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
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {visibleBrands.map((brand, idx) => (
            <Link 
              key={`${brand.id}-${idx}`}
              to={`/brands/${brand.slug}`}
              className="group flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl hover:shadow-lg hover:border-blue-100 transition-all duration-300 bg-white h-full"
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{brand.name}</h3>
              <span className="text-xs text-gray-500 mt-1">{brand.productCount} məhsul</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
