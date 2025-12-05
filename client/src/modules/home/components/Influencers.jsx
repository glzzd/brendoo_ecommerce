import React, { useState, useEffect } from 'react'
import { influencers } from '@/demoDatas/influencers'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const Influencers = () => {
  const allInfluencers = [...influencers, ...influencers, ...influencers]
  
  const [startIndex, setStartIndex] = useState(0)
  const [selectedStory, setSelectedStory] = useState(null)
  const [storyIndex, setStoryIndex] = useState(0)
  const itemsPerPage = 4

  const next = () => {
    setStartIndex((prev) => (prev + 1) % (allInfluencers.length - itemsPerPage + 1))
  }

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + (allInfluencers.length - itemsPerPage + 1)) % (allInfluencers.length - itemsPerPage + 1))
  }

  const visibleInfluencers = allInfluencers.slice(startIndex, startIndex + itemsPerPage)

  const openStory = (influencer) => {
    setSelectedStory(influencer)
    setStoryIndex(0)
  }

  const closeStory = () => {
    setSelectedStory(null)
    setStoryIndex(0)
  }

  // Auto-advance stories
  useEffect(() => {
    let timer
    if (selectedStory) {
      const currentStory = selectedStory.stories[storyIndex]
      timer = setTimeout(() => {
        if (storyIndex < selectedStory.stories.length - 1) {
          setStoryIndex(prev => prev + 1)
        } else {
          closeStory()
        }
      }, currentStory.duration || 3000)
    }
    return () => clearTimeout(timer)
  }, [selectedStory, storyIndex])

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bizi seçən influencerlər</h2>
          <div className="flex gap-2">
            <button 
                onClick={prev}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors border border-gray-100"
                aria-label="Previous"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={next}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors border border-gray-100"
                aria-label="Next"
            >
                <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleInfluencers.map((influencer, idx) => (
                <div key={`${influencer.id}-${idx}`} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                        {/* Circular Story Trigger */}
                        <div 
                            className="relative cursor-pointer group shrink-0"
                            onClick={() => openStory(influencer)}
                        >
                            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                                    <img 
                                        src={influencer.image} 
                                        alt={influencer.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            {/* Play Icon Overlay on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex flex-col min-w-0">
                            <h3 className="font-bold text-gray-900 text-base truncate">{influencer.name}</h3>
                            <p className="text-blue-600 text-sm font-medium truncate">{influencer.handle}</p>
                            <p className="text-gray-500 text-xs mt-1">{influencer.followers} İzləyici</p>
                        </div>
                    </div>
                    
                    
                </div>
            ))}
        </div>

        {/* Story Viewer Modal */}
        {selectedStory && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                <button 
                    onClick={closeStory}
                    className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50"
                >
                    <X size={32} />
                </button>

                <div className="relative w-full max-w-md aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl">
                    {/* Progress Bars */}
                    <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                        {selectedStory.stories.map((_, i) => (
                            <div key={i} className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full bg-white transition-all duration-300 ease-linear ${
                                        i < storyIndex ? 'w-full' : 
                                        i === storyIndex ? 'w-full animate-[progress_3s_linear]' : 'w-0'
                                    }`}
                                    style={{
                                        animationDuration: `${selectedStory.stories[storyIndex].duration}ms`,
                                        animationPlayState: i === storyIndex ? 'running' : 'paused'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="absolute top-8 left-4 flex items-center gap-3 z-20">
                        <img 
                            src={selectedStory.image} 
                            alt={selectedStory.name} 
                            className="w-8 h-8 rounded-full border border-white/50"
                        />
                        <span className="text-white font-semibold text-sm">{selectedStory.name}</span>
                    </div>

                    {/* Content */}
                    <div className="w-full h-full flex items-center justify-center">
                        {selectedStory.stories[storyIndex].type === 'image' ? (
                            <img 
                                src={selectedStory.stories[storyIndex].url} 
                                alt="Story" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className={`w-full h-full flex items-center justify-center p-8 text-center ${selectedStory.stories[storyIndex].bg}`}>
                                <p className="text-white text-2xl font-bold">
                                    {selectedStory.stories[storyIndex].content}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation Zones */}
                    <div className="absolute inset-0 flex z-10">
                        <div 
                            className="w-1/3 h-full" 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (storyIndex > 0) setStoryIndex(prev => prev - 1);
                            }} 
                        />
                        <div 
                            className="w-2/3 h-full" 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (storyIndex < selectedStory.stories.length - 1) {
                                    setStoryIndex(prev => prev + 1);
                                } else {
                                    closeStory();
                                }
                            }} 
                        />
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  )
}

export default Influencers
