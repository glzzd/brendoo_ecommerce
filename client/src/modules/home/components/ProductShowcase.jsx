import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Eye, ChevronLeft, ChevronRight, ShoppingBag, Check, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

const ProductShowcase = ({ title, subtitle, products, bgColor = 'bg-white' }) => {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [addedToCart, setAddedToCart] = useState({})
  const [quantities, setQuantities] = useState({})
  const [startIndex, setStartIndex] = useState(0)
  
  // Desktopda 4, tabletdə 2, mobildə 1 məhsul
  const itemsPerPage = 4

  const next = () => {
    setStartIndex((prev) => (prev + 1) % (products.length - itemsPerPage + 1))
  }

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + (products.length - itemsPerPage + 1)) % (products.length - itemsPerPage + 1))
  }

  const updateQuantity = (e, productId, delta) => {
    e.preventDefault()
    e.stopPropagation() // Prevent navigation
    setQuantities(prev => {
      const current = prev[productId] || 1
      const next = Math.max(1, current + delta)
      return { ...prev, [productId]: next }
    })
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault() // Prevent navigation to product detail
    const qty = quantities[product.id] || 1
    addToCart(product, qty)
    
    setAddedToCart(prev => ({
      ...prev,
      [product.id]: true
    }))

    setTimeout(() => {
      setAddedToCart(prev => ({
        ...prev,
        [product.id]: false
      }))
      // Reset quantity after adding
      setQuantities(prev => ({ ...prev, [product.id]: 1 }))
    }, 2000)
  }

  // Ensure we don't try to slice out of bounds if there are fewer items than itemsPerPage
  const safeStartIndex = products.length <= itemsPerPage ? 0 : startIndex;
  const visibleProducts = products.slice(safeStartIndex, safeStartIndex + itemsPerPage)

  if (!products || products.length === 0) return null;

  return (
    <section className={`py-12 ${bgColor} perspective-1000`}>
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .card-3d {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          position: relative;
        }
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
          box-shadow: 
            20px 20px 60px rgba(0, 0, 0, 0.05),
            -20px -20px 60px rgba(255, 255, 255, 0.8);
        }
        .card-3d::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.02) 100%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 10;
          border-radius: 1rem;
        }
        .card-3d:hover::before {
          opacity: 1;
        }
        /* Ensure content stays on top of the gradient */
        .card-content {
          position: relative;
          z-index: 20;
        }
      `}</style>
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
            <div 
              key={`${product.id}-${idx}`} 
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full card-3d"
            >
              {/* Image Area */}
              <div className="relative h-64 p-8 bg-gray-50 flex items-center justify-center overflow-hidden card-content">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 translate-z-20"
                  style={{ transform: 'translateZ(20px)' }}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2" style={{ transform: 'translateZ(30px)' }}>
                  {product.isNew && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md shadow-sm">YENİ</span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-md shadow-sm">TOP</span>
                  )}
                  {product.discount && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md shadow-sm">-{product.discount}%</span>
                  )}
                </div>

                {/* Quick Actions - Only Heart and Eye */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0" style={{ transform: 'translateZ(30px)' }}>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleFavorite(product)
                    }}
                    className={`relative z-10 cursor-pointer p-2 rounded-full shadow-md transition-colors ${
                      isFavorite(product.id) 
                        ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                        : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Heart size={18} className={isFavorite(product.id) ? 'fill-current' : ''} />
                  </button>
                  <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 card-content bg-white">
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

                {/* Price & Actions */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">${(product.originalPrice * (quantities[product.id] || 1)).toFixed(2)}</span>
                      )}
                      <span className="text-xl font-bold text-blue-600">${(product.price * (quantities[product.id] || 1)).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <Eye size={12} />
                      <span>{(product.views / 1000).toFixed(1)}k</span>
                    </div>
                  </div>

                  {/* Quantity & Add Button */}
                  <div className="flex gap-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-10">
                      <button 
                        onClick={(e) => updateQuantity(e, product.id, -1)}
                        className="px-2 h-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-900">
                        {quantities[product.id] || 1}
                      </span>
                      <button 
                        onClick={(e) => updateQuantity(e, product.id, 1)}
                        className="px-2 h-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 h-10 rounded-lg transition-all duration-300 shadow-sm ${
                        addedToCart[product.id] 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-900 text-white hover:bg-blue-600'
                      }`}
                    >
                      {addedToCart[product.id] ? <Check size={18} /> : <ShoppingBag size={18} />}
                      <span className="text-sm font-medium">
                        {addedToCart[product.id] ? 'Əlavə edildi' : 'Səbətə at'}
                      </span>
                    </button>
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

export default ProductShowcase
