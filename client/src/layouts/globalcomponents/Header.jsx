import React from 'react'
import { Link } from 'react-router-dom'
import { User, Heart, Search } from 'lucide-react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import Cart from './Cart'
import FavoritesDrawer from './FavoritesDrawer'

const Header = () => {
  return (
    <div className="border-b border-gray-100">
      <Topbar />
      <div className='container mx-auto px-6 py-3 flex justify-between items-center gap-4'>
        <Link to="/" className='text-2xl font-bold tracking-tight'>Brendoo</Link>

        <div className='flex-1 max-w-xl'>
          <form className='flex items-center gap-2'>
            <input
              type='text'
              placeholder='Axtar...'
              className='w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type='submit' className='px-3 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2'>
              <Search size={18} />
              <span>Axtar</span>
            </button>
          </form>
        </div>

        <div className='flex items-center gap-2'>
          <Link to='/login' className='flex items-center gap-1 hover:text-blue-600'>
            <User size={50} className='bg-gray-600 text-white p-2 rounded-[10px]' />
          </Link>
          <FavoritesDrawer />
          <Cart />
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Header