import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter 
} from '@/components/ui/drawer'
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react'

const Cart = () => {
  const { t, i18n } = useTranslation()
  const supportedLangs = ['en', 'az', 'tr']
  const langCode = i18n.language?.split('-')[0]
  const currentLang = supportedLangs.includes(langCode) ? langCode : 'en'
  const { cartItems, removeFromCart, updateQuantity, cartCount, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className='flex items-center gap-1 hover:text-blue-600 relative group'>
          <div className="relative">
            <ShoppingCart size={50} className='bg-blue-600 text-white p-2 rounded-[10px]'/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="h-full max-w-md ml-auto rounded-none border-l border-gray-200 focus:outline-none">
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{t('cart.title')} ({cartCount} {t('cart.products').toLowerCase()})</h2>
                <DrawerClose className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <X size={20} />
                </DrawerClose>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                            <ShoppingCart size={32} />
                        </div>
                        <p className="font-medium">{t('cart.empty')}</p>
                        <DrawerClose asChild>
                            <button className="text-blue-600 hover:underline text-sm">
                                {t('cart.continueShopping')}
                            </button>
                        </DrawerClose>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-100 transition-colors shadow-sm">
                            {/* Image */}
                            <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                <img src={item.image} alt={item.name[currentLang]} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">{item.name[currentLang]}</h3>
                                    <p className="text-xs text-gray-500">{item.brand}</p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2">
                                    <div className="font-bold text-blue-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 text-gray-600"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Remove */}
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="self-start p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500 font-medium">{t('cart.total')}:</span>
                        <span className="text-2xl font-bold text-gray-900">${calculateTotal()}</span>
                    </div>
                    <div className="grid gap-3">
                        <DrawerClose asChild>
                            <button 
                                onClick={() => {
                                    if (isAuthenticated) {
                                        navigate('/checkout')
                                    } else {
                                        navigate('/login', { state: { from: { pathname: '/checkout' } } })
                                    }
                                }}
                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
                            >
                                {t('cart.checkout')}
                            </button>
                        </DrawerClose>
                        <button 
                            onClick={clearCart}
                            className="w-full py-3 bg-white text-gray-600 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-red-500 transition-colors"
                        >
                            {t('cart.clear')}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Cart
