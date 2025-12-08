import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../../demoDatas/products';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  Minus, 
  Plus, 
  Check, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronRight, 
  ChevronLeft,
  Truck,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find similar products
      const related = products.filter(p => 
        p.category === foundProduct.category && 
        p.id !== foundProduct.id
      );
      
      // Shuffle and take 4
      const shuffled = related.sort(() => 0.5 - Math.random());
      setSimilarProducts(shuffled.slice(0, 4));
      
      setLoading(false);
    } else {
      setLoading(false);
      // Optional: navigate to 404
    }
    window.scrollTo(0, 0);
    // Reset states
    setQuantity(1);
    setCurrentImageIndex(0);
    setActiveTab('description');
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Məhsul tapılmadı</h2>
        <Link to="/products" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          Məhsullara qayıt
        </Link>
      </div>
    );
  }

  const isAddedToCart = cartItems.some(item => item.id === product.id);
  const isFavorite = favorites.some(fav => fav.id === product.id);
  
  // Use images array if available, otherwise fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleUpdateQuantity = (change) => {
    setQuantity(prev => {
      const newQty = prev + change;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">Ana Səhifə</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-gray-900">Məhsullar</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center group border border-gray-100">
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <img 
                src={images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply p-12 transition-transform duration-500 hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold tracking-wider uppercase rounded shadow-sm">Yeni</span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold tracking-wider uppercase rounded shadow-sm">Top Satış</span>
                )}
                {product.discount && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold tracking-wider uppercase rounded shadow-sm">-{product.discount}%</span>
                )}
              </div>
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-xl border-2 flex-shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center transition-all ${
                      idx === currentImageIndex ? 'border-gray-900 shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between mb-4">
                <Link to={`/brands/${product.brandSlug}`} className="text-sm font-bold text-blue-600 uppercase tracking-wider hover:underline">
                  {product.brand}
                </Link>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Share2 size={20} />
                    </button>
                    <button 
                        onClick={() => toggleFavorite(product)}
                        className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'}`}
                    >
                        <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                    </button>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 fill-current"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900 ml-2">{product.rating}</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                  {product.reviewCount} dəyərləndirmə
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm font-medium text-gray-500">
                  {product.views} baxış
                </span>
              </div>

              <div className="flex items-end gap-4">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              Bu məhsul yüksək keyfiyyətli materiallardan hazırlanmışdır. Gündəlik istifadə üçün idealdır və rahatlığı ilə seçilir. {product.brand} markasının keyfiyyət zəmanəti ilə.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 h-14 border border-gray-200 w-fit">
                <button 
                  onClick={() => handleUpdateQuantity(-1)}
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-14 text-center font-bold text-xl text-gray-900">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleUpdateQuantity(1)}
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className={`flex-1 h-14 px-8 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-lg hover:shadow-xl transform active:scale-95 ${
                  isAddedToCart
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                    : 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-blue-200'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check size={24} />
                    <span>Səbətə əlavə edildi</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={24} />
                    <span>Səbətə əlavə et</span>
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Truck size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Çatdırılma</span>
                        <span className="text-sm font-bold">Pulsuz Çatdırılma</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Zəmanət</span>
                        <span className="text-sm font-bold">Original Məhsul</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <RefreshCw size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Qaytarılma</span>
                        <span className="text-sm font-bold">30 Gün İadə</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Tabs / Detailed Info */}
        <div className="mt-16">
            <div className="flex border-b border-gray-200 mb-8">
                <button 
                    onClick={() => setActiveTab('description')}
                    className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors ${
                        activeTab === 'description' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Məhsul Haqqında
                </button>
                <button 
                    onClick={() => setActiveTab('specs')}
                    className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors ${
                        activeTab === 'specs' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Xüsusiyyətlər
                </button>
                <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors ${
                        activeTab === 'reviews' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Rəylər ({product.reviewCount})
                </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
                {activeTab === 'description' && (
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2">
                            <li>Yüksək keyfiyyətli material</li>
                            <li>Rahat və şıq dizayn</li>
                            <li>Uzun ömürlü istifadə</li>
                            <li>Asan təmizlənə bilən</li>
                        </ul>
                    </div>
                )}
                {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">Brend</span>
                            <span className="font-medium text-gray-900">{product.brand}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">Kateqoriya</span>
                            <span className="font-medium text-gray-900 capitalize">{product.category.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">Material</span>
                            <span className="font-medium text-gray-900">100% Cotton</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">Mövsüm</span>
                            <span className="font-medium text-gray-900">Bütün fəsillər</span>
                        </div>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="text-center py-12 text-gray-500">
                        <p>Hələki rəy yoxdur.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Bənzər Məhsullar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map(similarProduct => (
                <ProductCard 
                  key={similarProduct.id}
                  product={similarProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
