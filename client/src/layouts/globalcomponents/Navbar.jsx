import { menuItems } from '@/demoDatas/menu'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-30 bg-white border-b relative overflow-visible'>
      <div className='container mx-auto px-6'>
        <ul className='flex justify-center items-center gap-8 h-12'>
          {menuItems.map((item) => (
            <li key={item.id} className='relative pt-3'>
              <Link
                to={item.link}
                className={'text-sm md:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors'}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar