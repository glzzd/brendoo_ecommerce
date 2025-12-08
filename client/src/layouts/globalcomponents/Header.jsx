import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User, Heart, Search, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Topbar from './Topbar'
import Navbar from './Navbar'
import Cart from './Cart'
import FavoritesDrawer from './FavoritesDrawer'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="border-b border-gray-100">
      <Topbar />
      <div className='container mx-auto px-6 py-3 flex justify-between items-center gap-4'>
        <Link to="/" className='text-2xl font-bold tracking-tight'>Brendoo</Link>

        <div className='flex-1 max-w-xl'>
          <form className='flex items-center gap-2'>
            <input
              type='text'
              placeholder={t('common.search')}
              className='w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type='submit' className='px-3 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2'>
              <Search size={18} />
              <span>{t('common.searchBtn')}</span>
            </button>
          </form>
        </div>

        <div className='flex items-center gap-2'>
          <LanguageSwitcher />
          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-gray-900 leading-none">{user?.name}</p>
                  <p className="text-xs text-gray-500">{t('common.account')}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title={t('common.logout')}
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to='/login' className='flex items-center gap-1 hover:text-blue-600'>
              <User size={50} className='bg-gray-600 text-white p-2 rounded-[10px]' />
            </Link>
          )}
          <FavoritesDrawer />
          <Cart />
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Header