import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const total = calculateTotal()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Səbətiniz boşdur</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Hələ səbətinizə heç bir məhsul əlavə etməmisiniz. Alış-verişə başlamaq üçün ana səhifəyə keçin.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Alış-verişə davam et
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Səbət ({cartItems.length} məhsul)</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    {/* Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center p-4 shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link to={`/products/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-10">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-3 h-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 h-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">
                            ${item.price} x {item.quantity}
                          </div>
                          <div className="text-xl font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
                <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <Trash2 size={16} />
                    Səbəti təmizlə
                </button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Sifariş xülasəsi</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Məhsullar ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Çatdırılma</span>
                  <span className="font-medium text-green-600">Pulsuz</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Cəmi</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
                Sifarişi rəsmiləşdir
              </Link>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Təhlükəsiz ödəniş və sürətli çatdırılma zəmanəti
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
