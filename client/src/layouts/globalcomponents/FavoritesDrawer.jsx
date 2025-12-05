import React from 'react'
import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerClose,
} from '@/components/ui/drawer'
import { Heart, X, ShoppingCart, Trash2 } from 'lucide-react'

const FavoritesDrawer = () => {
  const { favorites, removeFromFavorites, favoritesCount } = useFavorites()
  const { addToCart } = useCart()

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className='flex items-center gap-1 hover:text-blue-600 relative group'>
          <div className="relative">
            <Heart size={50} className='bg-red-600 text-white p-2 rounded-[10px]'/>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {favoritesCount}
              </span>
            )}
          </div>
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="h-full max-w-md ml-auto rounded-none border-l border-gray-200 focus:outline-none">
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Sevimlilər ({favoritesCount})</h2>
                <DrawerClose className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <X size={20} />
                </DrawerClose>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                            <Heart size={32} />
                        </div>
                        <p className="font-medium">Sevimlilər siyahısı boşdur</p>
                        <DrawerClose asChild>
                            <button className="text-blue-600 hover:underline text-sm">
                                Məhsullara bax
                            </button>
                        </DrawerClose>
                    </div>
                ) : (
                    favorites.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-100 transition-colors shadow-sm">
                            {/* Image */}
                            <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">{item.name}</h3>
                                    <p className="text-xs text-gray-500">{item.brand}</p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2">
                                    <div className="font-bold text-blue-600">
                                        ${item.price}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <button 
                                          onClick={() => {
                                            addToCart(item)
                                            removeFromFavorites(item.id)
                                          }}
                                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                          title="Səbətə at"
                                      >
                                          <ShoppingCart size={16} />
                                      </button>
                                      <button 
                                          onClick={() => removeFromFavorites(item.id)}
                                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                                          title="Sil"
                                      >
                                          <Trash2 size={16} />
                                      </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FavoritesDrawer
