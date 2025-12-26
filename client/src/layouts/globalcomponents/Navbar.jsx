import { menuItems } from '@/demoDatas/menu'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const supportedLangs = ['en', 'az', 'tr']
  const langCode = i18n.language?.split('-')[0]
  const currentLang = supportedLangs.includes(langCode) ? langCode : 'en'

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
                {item.name[currentLang]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar