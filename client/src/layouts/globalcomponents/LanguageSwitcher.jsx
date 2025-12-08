import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors p-2">
        <Globe size={20} />
        <span className="uppercase font-medium text-sm">{currentLanguage.split('-')[0]}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 w-24 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
        <button 
          onClick={() => changeLanguage('en')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${currentLanguage.startsWith('en') ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
        >
          English
        </button>
        <button 
          onClick={() => changeLanguage('az')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${currentLanguage === 'az' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
        >
          Azərbaycan
        </button>
        <button 
          onClick={() => changeLanguage('tr')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${currentLanguage === 'tr' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
        >
          Türkçe
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
