import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, Eye, Star, Minus, Plus, Check, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '../../../components/ui/dialog'
import ProductQuickView from './ProductQuickView'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useCart } from '../../../context/CartContext'
import { useFavorites } from '../../../context/FavoritesContext'

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation()
  const { addToCart, cartItems } = useCart()
  const { favorites, toggleFavorite } = useFavorites()
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const isFavorite = favorites.some(fav => fav.id === product.id)
  const isInCart = cartItems.some(item => item.id === product.id)
  
  // Use images array if available, otherwise fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleUpdateQuantity = (e, delta) => {
    e.preventDefault()
    e.stopPropagation()
    setQuantity(prev => Math.max(1, prev + delta))
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
    setQuantity(1)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-all duration-300 flex flex-col h-full relative">
      {/* Image Area */}
      <div className="relative aspect-[4/5] p-6 bg-gray-50/50 flex items-center justify-center overflow-hidden group-hover:bg-gray-100/50 transition-colors">
        {/* Slider Controls - Only show if multiple images */}
        {images.length > 1 && (
            <>
                <button 
                    onClick={prevImage} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                >
                    <ChevronLeft size={16} />
                </button>
                <button 
                    onClick={nextImage} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                >
                    <ChevronRight size={16} />
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {images.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-gray-800 w-3' : 'bg-gray-300'}`} 
                        />
                    ))}
                </div>
            </>
        )}

        <img 
          src={images[currentImageIndex]} 
          alt={product.name[i18n.language]} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm shadow-blue-200">{t('product.new')}</span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm shadow-amber-200">{t('product.top')}</span>
          )}
          {product.discount && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm shadow-red-200">-{product.discount}%</span>
          )}
        </div>

        {/* Floating Actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button 
            onClick={handleToggleFavorite}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
          </button>
          
          <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
            <DialogTrigger asChild>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  // DialogTrigger handles the click, but we stop propagation to prevent navigation
                }}
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-400 hover:text-blue-600 hover:scale-110 transition-all duration-300 delay-75"
              >
                <Eye size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="min-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-white rounded-2xl border-none shadow-2xl">
              <VisuallyHidden>
                <DialogTitle>{product.name[i18n.language]}</DialogTitle>
              </VisuallyHidden>
              <div className="flex-1 h-full overflow-hidden p-6 md:p-10">
                <ProductQuickView 
                  product={product}
                  quantity={quantity}
                  onUpdateQuantity={(e, id, delta) => setQuantity(prev => Math.max(1, prev + delta))}
                  isAddedToCart={isInCart}
                  onAddToCart={() => {
                    addToCart(product, quantity)
                    setIsAdded(true)
                    setTimeout(() => setIsAdded(false), 2000)
                    setQuantity(1)
                  }}
                  onClose={() => setIsQuickViewOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/brands/${product.brandSlug}`} className="text-xs font-bold text-gray-400 uppercase mb-1 hover:text-blue-600 transition-colors tracking-wider">
          {product.brand}
        </Link>
        
        <Link to={`/products/${product.id}`} className="font-bold text-gray-900 text-base leading-snug mb-2 hover:text-blue-600 transition-colors line-clamp-2">
          {product.name[i18n.language]}
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-amber-400">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={12} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 fill-current"} />
             ))}
          </div>
          <span className="text-xs font-medium text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-50 rounded-lg p-1 h-9 border border-gray-100">
                  <button 
                      onClick={(e) => handleUpdateQuantity(e, -1)}
                      className="w-7 h-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                  >
                      <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-gray-900">
                      {quantity}
                  </span>
                  <button 
                      onClick={(e) => handleUpdateQuantity(e, 1)}
                      className="w-7 h-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                  >
                      <Plus size={14} />
                  </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className={`h-9 px-4 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isAdded || isInCart
                    ? 'bg-green-500 text-white hover:bg-green-600 w-auto gap-2'
                    : 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-blue-200'
                }`}
              >
                {(isAdded || isInCart) ? (
                    <>
                      <Check size={16} />
                      <span className="text-xs font-bold">{t('product.added')}</span>
                    </>
                ) : (
                   <div className='flex items-center justify-center gap-2'>
                    <ShoppingBag size={15} /> <span className='text-xs font-bold'>
                      {t('product.addToCart')}
                      </span>
                    </div>
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
