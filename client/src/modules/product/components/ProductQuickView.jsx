import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Star, Minus, Plus, Check, ShoppingBag, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductQuickView = ({ 
  product, 
  quantity, 
  onUpdateQuantity, 
  isAddedToCart, 
  onAddToCart,
  onClose
}) => {
  const { t, i18n } = useTranslation()
  const supportedLangs = ['en', 'az', 'tr']
  const langCode = i18n.language?.split('-')[0]
  const currentLang = supportedLangs.includes(langCode) ? langCode : 'en'
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Use images array if available, otherwise fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  const nextImage = (e) => {
    e?.preventDefault()
    e?.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e?.preventDefault()
    e?.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full w-full">
      {/* Left: Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 h-full min-h-0">
        <div className="relative flex-1 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center group min-h-0">
            {images.length > 1 && (
                <>
                    <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
            
            <img 
                src={images[currentImageIndex]} 
                alt={product.name[currentLang]} 
                className="w-full h-full object-contain mix-blend-multiply p-8 transition-transform duration-500 hover:scale-105"
            />
        </div>
        
        {/* Thumbnails */}
        {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar flex-shrink-0">
                {images.map((img, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg border-2 flex-shrink-0 overflow-hidden bg-gray-50 ${
                            idx === currentImageIndex ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply p-2" />
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto custom-scrollbar pr-2">
        <div className="mb-6">
            <Link to={`/brands/${product.brandSlug}`} className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 inline-block">
                {product.brand}
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name[currentLang]}
            </h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 fill-current"} />
                    ))}
                </div>
                <span className="text-sm font-medium text-gray-500">({product.reviewCount} {t('product.review')})</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through mb-1">${product.originalPrice}</span>
                )}
                {product.discount && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded mb-1">
                        -{product.discount}% {t('product.discountOff')}
                    </span>
                )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
                {product.description[i18n.language]}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 h-12 border border-gray-200 w-fit">
                    <button 
                        onClick={(e) => onUpdateQuantity(e, product.id, -1)}
                        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900">
                        {quantity}
                    </span>
                    <button 
                        onClick={(e) => onUpdateQuantity(e, product.id, 1)}
                        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                
                <button 
                    onClick={(e) => {
                        onAddToCart(e, product)
                        // Optional: Close modal after adding to cart? Maybe not, user might want to continue viewing.
                    }}
                    className={`flex-1 h-12 px-6 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${
                        isAddedToCart
                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                        : 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-blue-200'
                    }`}
                >
                    {isAddedToCart ? (
                        <>
                            <Check size={20} />
                            <span>{t('product.added')}</span>
                        </>
                    ) : (
                        <>
                            <ShoppingBag size={20} />
                            <span>{t('product.addToCart')}</span>
                        </>
                    )}
                </button>
            </div>
        </div>

        <div className="pt-6 border-t border-gray-100 mt-auto">
             <Link 
                to={`/products/${product.id}`} 
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline transition-colors flex items-center gap-1"
                onClick={onClose}
             >
                {t('product.viewDetails')}
                <ChevronRight size={14} />
             </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductQuickView
