import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Star, Eye, ShoppingBag, Check, Plus, Minus, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { products } from '../../../demoDatas/products'
import { menuItems } from '../../../demoDatas/menu'
import { useCart } from '../../../context/CartContext'
import { useFavorites } from '../../../context/FavoritesContext'

function ProductList() {
  const { category } = useParams()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  
  // States
  const [pageTitle, setPageTitle] = useState('Məhsullar')
  const [addedToCart, setAddedToCart] = useState({})
  const [quantities, setQuantities] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter States
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [onlyNew, setOnlyNew] = useState(false)
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  
  // Sort State
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, price-asc, price-desc, popularity-asc, popularity-desc, a-z, z-a

  // Derived Data for Filters
  const allBrands = useMemo(() => [...new Set(products.map(p => p.brand))], [])
  const allTypes = useMemo(() => [...new Set(products.map(p => p.type).filter(Boolean))], [])
  
  // Main Filter Logic
  const filteredProducts = useMemo(() => {
    let result = products

    // 1. URL Category Filtering
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
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    // 4. Price Filter
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)

    // 5. Status Filters
    if (onlyNew) {
      result = result.filter(p => p.isNew)
    }
    if (onlyDiscount) {
      result = result.filter(p => p.discount || (p.originalPrice && p.originalPrice > p.price))
    }

    return result
  }, [category, selectedTypes, selectedBrands, priceRange, onlyNew, onlyDiscount])

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts]

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popularity-asc':
        result.sort((a, b) => a.views - b.views)
        break
      case 'popularity-desc':
        result.sort((a, b) => b.views - a.views)
        break
      case 'a-z':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'z-a':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
    }

    return result
  }, [filteredProducts, sortBy])

  // Set Page Title
  useEffect(() => {
    const menuItem = menuItems.find(item => item.link.includes(category))
    if (menuItem) setPageTitle(menuItem.name)
    else if (category === 'butun-mehsullar') setPageTitle('Bütün Məhsullar')
    else if (category === 'endirim') setPageTitle('Endirimli Məhsullar')
    else if (!category) setPageTitle('Məhsullar')
  }, [category])

  // Handlers
  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
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
    const qty = quantities[product.id] || 1
    addToCart(product, qty)
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }))
      setQuantities(prev => ({ ...prev, [product.id]: 1 }))
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{pageTitle}</h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <span>Ana səhifə</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{pageTitle}</span>
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg w-full justify-center"
        >
          <Filter size={18} />
          Filtrlər
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
            
            {/* Categories/Types */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                Kateqoriya
                <span className="text-xs text-gray-400 font-normal">Seçim edin</span>
              </h3>
              <div className="space-y-2">
                {allTypes.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="peer h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <span className="text-gray-600 group-hover:text-blue-600 capitalize transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Qiymət Aralığı</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input 
                    type="number" 
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full pl-6 pr-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Min"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input 
                    type="number" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full pl-6 pr-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Max"
                  />
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange.max} 
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Brands */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Markalar</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {allBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-gray-600 group-hover:text-blue-600">Yeni Məhsullar</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={onlyNew} onChange={() => setOnlyNew(!onlyNew)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-gray-600 group-hover:text-blue-600">Endirimli</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={onlyDiscount} onChange={() => setOnlyDiscount(!onlyDiscount)} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Top Bar: Sort & Count */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              <span className="font-bold text-gray-900">{sortedProducts.length}</span> məhsul tapıldı
            </p>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-gray-500 whitespace-nowrap">Sırala:</span>
              <div className="relative w-full sm:w-48">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="newest">Yenilər (Əvvəlcə)</option>
                  <option value="oldest">Yenilər (Sonda)</option>
                  <option value="price-asc">Ucuzdan Bahaya</option>
                  <option value="price-desc">Bahadan Ucuza</option>
                  <option value="popularity-desc">Populyarlıq (Çox)</option>
                  <option value="popularity-asc">Populyarlıq (Az)</option>
                  <option value="a-z">Ad (A-Z)</option>
                  <option value="z-a">Ad (Z-A)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="mb-4 text-gray-300">
                <Filter size={64} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg font-medium">Axtarışınıza uyğun məhsul tapılmadı.</p>
              <button 
                onClick={() => {
                  setSelectedTypes([])
                  setSelectedBrands([])
                  setPriceRange({ min: 0, max: 1000 })
                  setOnlyNew(false)
                  setOnlyDiscount(false)
                }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
              >
                Filtrləri Təmizlə
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                 <div 
                  key={product.id} 
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative transform hover:-translate-y-1"
                >
                  {/* Image Area */}
                  <div className="relative h-64 p-6 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-wider">Yeni</span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-wider">Top</span>
                      )}
                      {product.discount && (
                        <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-wider">-{product.discount}%</span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleFavorite(product)
                        }}
                        className={`relative cursor-pointer p-2 rounded-full shadow-md transition-colors ${
                          isFavorite(product.id) 
                            ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                            : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        title={isFavorite(product.id) ? "Favorilərdən çıxar" : "Favorilərə əlavə et"}
                      >
                        <Heart size={18} className={isFavorite(product.id) ? 'fill-current' : ''} />
                      </button>
                      <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 bg-white">
                    <div className="mb-1">
                      <Link to={`/brands/${product.brandSlug}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider hover:text-blue-600 transition-colors">
                        {product.brand}
                      </Link>
                    </div>
                    
                    <Link to={`/products/${product.id}`} className="font-bold text-gray-900 text-base mb-2 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    </div>

                    {/* Price & Actions */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-end justify-between mb-3">
                        <div className="flex flex-col">
                          {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through mb-0.5">${(product.originalPrice * (quantities[product.id] || 1)).toFixed(2)}</span>
                          )}
                          <span className="text-xl font-bold text-blue-600">${(product.price * (quantities[product.id] || 1)).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Quantity & Add Button */}
                      <div className="flex gap-2">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-10 w-24">
                          <button 
                            onClick={(e) => updateQuantity(e, product.id, -1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-white rounded-l-lg transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="flex-1 text-center text-sm font-semibold text-gray-900 select-none">
                            {quantities[product.id] || 1}
                          </span>
                          <button 
                            onClick={(e) => updateQuantity(e, product.id, 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-white rounded-r-lg transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 h-10 rounded-lg transition-all duration-300 shadow-sm transform active:scale-95 ${
                            addedToCart[product.id] 
                              ? 'bg-green-500 text-white hover:bg-green-600' 
                              : 'bg-gray-900 text-white hover:bg-blue-600'
                          }`}
                        >
                          {addedToCart[product.id] ? <Check size={18} /> : <ShoppingBag size={18} />}
                          <span className="text-sm font-bold">
                            {addedToCart[product.id] ? 'Əlavə edildi' : 'Səbətə'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList