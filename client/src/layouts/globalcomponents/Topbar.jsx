import React from 'react'
import instagramIcon from '../../assets/instagram.png'
import facebookIcon from '../../assets/facebook.png'
import youtubeIcon from '../../assets/youtube.png'
import phoneIcon from '../../assets/phone.png'

const Topbar = () => {
  return (
    <div className='bg-blue-500 text-white px-6 py-2 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
            <img src={instagramIcon} alt='instagram' className='h-5 w-5' />
            <img src={facebookIcon} alt='facebook' className='h-5 w-5' />
            <img src={youtubeIcon} alt='youtube' className='h-5 w-5' />
        </div>
        <div className='w-1/2 flex items-center'>
            <marquee behavior="scroll" direction="left">5-10 gün içərisində qarantili və sürətli təlimat.</marquee>
        </div>
        <div className='flex items-center gap-2'>
            <img src={phoneIcon} alt='phone' className='h-5 w-5' />
            <span>+994 55 123 45 67</span>
        </div>
    </div>
  )
}

export default Topbar