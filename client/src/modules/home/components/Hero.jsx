import React, { useEffect, useMemo, useState } from 'react'
import { heroSlides } from '@/demoDatas/hero'
import hero1 from '@/assets/hero_1.avif'

const Hero = () => {
  const images = useMemo(() => ({ hero1 }), [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i) => setIndex(i)
  const prev = () => setIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  const next = () => setIndex((prev) => (prev + 1) % heroSlides.length)

  const alignToClasses = (align) => {
    if (align === 'center') return 'items-center justify-center text-center'
    if (align === 'right') return 'items-center justify-end text-right pr-8 md:pr-12'
    return 'items-center justify-start text-left pl-8 md:pl-12'
  }

  return (
    <section className='container mx-auto mb-6'>
      <div className='relative w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden shadow-md'>
        <div
          className='absolute inset-0 flex transition-transform duration-700'
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id} className='min-w-full h-full relative'>
              <img
                src={images[slide.imageKey]}
                alt={slide.title}
                className='absolute inset-0 w-full h-full object-cover object-top'
              />
              <div className='absolute inset-0 bg-gradient-to-b from-black/10 to-transparent' />
              <div className={`absolute inset-0 flex ${alignToClasses(slide.align)}`}>
                <div className='max-w-xl'>
                  <h2 className='text-2xl md:text-4xl font-bold text-gray-900 drop-shadow'>
                    {slide.title}
                  </h2>
                  {slide.description && (
                    <p className='mt-3 md:mt-4 text-gray-700'>{slide.description}</p>
                  )}
                  {slide.ctaText && (
                    <a
                      href={slide.ctaLink}
                      className='mt-6 inline-block px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                    >
                      {slide.ctaText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label='Previous'
          onClick={prev}
          className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full w-9 h-9 shadow'
        >
          ‹
        </button>
        <button
          aria-label='Next'
          onClick={next}
          className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full w-9 h-9 shadow'
        >
          ›
        </button>

        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero