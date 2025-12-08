import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Filter, ChevronDown, ChevronLeft, ChevronRight, X, SlidersHorizontal, ChevronUp } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '@/demoDatas/products'
import { brands } from '@/demoDatas/brands'
import { menuItems } from '@/demoDatas/menu'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { Check } from 'lucide-react'

// Modern Accordion Component for Filters
const FilterSection = ({ title, children, isOpenDefault = true }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault)

  return (
    <div className="border-b border-gray-100 py-5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group"
      >
        <span className="font-semibold text-gray-900 text-sm uppercase tracking-wide group-hover:text-blue-600 transition-colors">{title}</span>
        {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

const ProductList = () => {
  const { category } = useParams()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  
  // States
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [onlyNew, setOnlyNew] = useState(false)
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  
  // Pagination State
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 12
  const observerTarget = useRef(null)

  // Cart interaction states
  const [addedToCart, setAddedToCart] = useState({})
  const [quantities, setQuantities] = useState({})

  // Unique Types from products
  const availableTypes = useMemo(() => {
    const types = new Set(products.map(p => p.type).filter(Boolean))
    return Array.from(types)
  }, [])

  // Category Title Logic
  const categoryTitle = useMemo(() => {
    if (!category) return 'Bütün Məhsullar'
    if (category === 'butun-mehsullar') return 'Bütün Məhsullar'
    if (category === 'endirim') return 'Endirimli Məhsullar'
    if (category === 'new-arrivals') return 'Yeni Gələn Məhsullar'
    
    const menuItem = menuItems.find(item => item.link === `/shop/${category}`)
    return menuItem ? menuItem.name : category.replace(/-/g, ' ')
  }, [category])

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = products

    // 1. Category Filter
    if (category && category !== 'butun-mehsullar') {
      if (category === 'endirim') {
        result = result.filter(p => p.discount || (p.originalPrice && p.originalPrice > p.price))
      } else if (category === 'new-arrivals') {
        result = result.filter(p => p.isNew)
      } else {
        result = result.filter(p => p.category === category)
      }
    }

    // 2. Type Filter
    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type))
    }

    // 3. Brand Filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brandSlug))
    }

    // 4. Price Filter
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)

    // 5. Status Filters
    if (onlyNew) result = result.filter(p => p.isNew)
    if (onlyDiscount) result = result.filter(p => p.discount || (p.originalPrice && p.originalPrice > p.price))

    return result
  }, [category, selectedTypes, selectedBrands, priceRange, onlyNew, onlyDiscount])

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts]
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'popularity-asc': result.sort((a, b) => a.views - b.views); break
      case 'popularity-desc': result.sort((a, b) => b.views - a.views); break
      case 'a-z': result.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'z-a': result.sort((a, b) => b.name.localeCompare(a.name)); break
      case 'oldest': result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break
      case 'newest': default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
    }
    return result
  }, [filteredProducts, sortBy])

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1)
  }, [category, selectedTypes, selectedBrands, priceRange, onlyNew, onlyDiscount, sortBy])

  // Pagination / Infinite Scroll
  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, page * ITEMS_PER_PAGE)
  }, [sortedProducts, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedProducts.length < sortedProducts.length) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [displayedProducts, sortedProducts])

  // Handlers
  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleBrandChange = (brandSlug) => {
    setSelectedBrands(prev => 
      prev.includes(brandSlug) ? prev.filter(b => b !== brandSlug) : [...prev, brandSlug]
    )
  }

  const updateQuantity = (e, productId, delta) => {
    e.preventDefault()
    e.stopPropagation()
    setQuantities(prev => {
      const current = prev[productId] || 1
      const next = Math.max(1, current + delta)
      return { ...prev, [productId]: next }
    })
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    const qty = quantities[product.id] || 1
    addToCart(product, qty)
    
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }))
      setQuantities(prev => ({ ...prev, [product.id]: 1 }))
    }, 2000)
  }

  // Active filters helpers
  const clearAllFilters = () => {
    setPriceRange({ min: 0, max: 1000 })
    setSelectedBrands([])
    setSelectedTypes([])
    setOnlyNew(false)
    setOnlyDiscount(false)
  }

  const hasActiveFilters = selectedBrands.length > 0 || selectedTypes.length > 0 || onlyNew || onlyDiscount || priceRange.min > 0 || priceRange.max < 1000

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      {/* Mobile Filter Trigger */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md px-4 py-3 sticky top-[64px] z-20 border-b border-gray-200 flex justify-between items-center transition-all duration-300">
        <button 
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 font-semibold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg active:scale-95 transition-transform"
        >
          <SlidersHorizontal size={18} />
          Filtrlər
          {(selectedBrands.length + selectedTypes.length + (onlyNew ? 1 : 0) + (onlyDiscount ? 1 : 0)) > 0 && (
            <span className="bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {selectedBrands.length + selectedTypes.length + (onlyNew ? 1 : 0) + (onlyDiscount ? 1 : 0)}
            </span>
          )}
        </button>
        <span className="text-sm font-medium text-gray-500">{sortedProducts.length} məhsul</span>
      </div>

      <div className="container mx-auto px-4 py-8 flex items-start gap-8 relative">
        {/* Sidebar Filters - Desktop */}
        <aside className={`
          fixed inset-0 z-50 bg-white lg:bg-transparent lg:static lg:z-0 lg:w-64 lg:block lg:sticky lg:top-24
          transition-transform duration-300 ease-in-out
          ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full bg-white lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-100 overflow-hidden lg:overflow-y-auto custom-scrollbar">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-5 border-b lg:hidden">
              <h2 className="text-xl font-bold text-gray-900">Filtrlər</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto lg:overflow-visible flex-1 custom-scrollbar">
              {/* Status Filter */}
              <div className="pb-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-4">Status</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${onlyNew ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                      {onlyNew && <Check size={12} className="text-white" />}
                    </div>
                    <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} className="hidden" />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Yeni gələn</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${onlyDiscount ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                      {onlyDiscount && <Check size={12} className="text-white" />}
                    </div>
                    <input type="checkbox" checked={onlyDiscount} onChange={(e) => setOnlyDiscount(e.target.checked)} className="hidden" />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">Endirimli</span>
                  </label>
                </div>
              </div>

              {/* Price Filter */}
              <FilterSection title="Qiymət Aralığı">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input 
                      type="number" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="0"
                    />
                  </div>
                  <span className="text-gray-400 font-medium">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input 
                      type="number" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </FilterSection>

              {/* Type Filter */}
              {availableTypes.length > 0 && (
                <FilterSection title="Kateqoriya">
                  <div className="space-y-2">
                    {availableTypes.map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                          {selectedTypes.includes(type) && <Check size={12} className="text-white" />}
                        </div>
                        <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => handleTypeChange(type)} className="hidden" />
                        <span className="text-gray-700 capitalize group-hover:text-blue-600 transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              )}

              {/* Brand Filter */}
              <FilterSection title="Brendlər">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand.slug) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                        {selectedBrands.includes(brand.slug) && <Check size={12} className="text-white" />}
                      </div>
                      <input type="checkbox" checked={selectedBrands.includes(brand.slug)} onChange={() => handleBrandChange(brand.slug)} className="hidden" />
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{brand.name}</span>
                      <span className="ml-auto text-xs text-gray-400">({brand.productCount})</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>
            
            <div className="p-5 border-t border-gray-100 lg:hidden">
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-gray-200 active:scale-95 transition-all"
              >
                Nəticələri göstər ({sortedProducts.length})
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header & Sorting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
              {categoryTitle}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
              <p className="text-gray-500">
                <span className="font-bold text-gray-900">{sortedProducts.length}</span> məhsul tapıldı
              </p>
              
              <div className="flex items-center gap-3">
                <div className="relative group">
                   <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 transition-all shadow-sm"
                  >
                    <option value="newest">Ən yeni</option>
                    <option value="oldest">Ən köhnə</option>
                    <option value="price-asc">Ucuzdan bahaya</option>
                    <option value="price-desc">Bahadan ucuza</option>
                    <option value="popularity-desc">Ən populyar</option>
                    <option value="popularity-asc">Ən az populyar</option>
                    <option value="a-z">A-dan Z-ə</option>
                    <option value="z-a">Z-dən A-ya</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedBrands.map(b => (
                   <span key={b} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                     {brands.find(brand => brand.slug === b)?.name || b}
                     <button onClick={() => handleBrandChange(b)}><X size={12} /></button>
                   </span>
                ))}
                {selectedTypes.map(t => (
                   <span key={t} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100 capitalize">
                     {t}
                     <button onClick={() => handleTypeChange(t)}><X size={12} /></button>
                   </span>
                ))}
                {onlyNew && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                    Yeni gələn <button onClick={() => setOnlyNew(false)}><X size={12} /></button>
                  </span>
                )}
                {onlyDiscount && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-100">
                    Endirimli <button onClick={() => setOnlyDiscount(false)}><X size={12} /></button>
                  </span>
                )}
                <button 
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-red-500 underline ml-2 transition-colors"
                >
                  Təmizlə
                </button>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProducts.map((product, idx) => (
              <ProductCard 
                key={`${product.id}-${idx}`}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
                quantity={quantities[product.id]}
                onUpdateQuantity={updateQuantity} 
                isAddedToCart={addedToCart[product.id]}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Loading Skeleton / Infinite Scroll Sentinel */}
          {displayedProducts.length < sortedProducts.length && (
            <div ref={observerTarget} className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 h-[400px] animate-pulse">
                        <div className="w-full h-48 bg-gray-100 rounded-xl mb-4"></div>
                        <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
                        <div className="h-6 bg-gray-100 rounded w-3/4 mb-4"></div>
                        <div className="mt-auto h-10 bg-gray-100 rounded w-full"></div>
                    </div>
                ))}
            </div>
          )}
          
          {displayedProducts.length === 0 && (
             <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 mt-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Heç bir məhsul tapılmadı</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Axtarış kriteriyalarınıza uyğun gələn məhsul yoxdur. Filtrləri təmizləyərək yenidən cəhd edin.</p>
                <button 
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                >
                    Bütün məhsulları göstər
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
