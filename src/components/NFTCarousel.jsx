import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid, Autoplay } from 'swiper/modules';
import { NFTCard } from './NFTCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

export const NFTCarousel = ({ nfts }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Grid, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        className="px-2"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {nfts.map((nft) => (
          <SwiperSlide key={nft.id}>
            <NFTCard {...nft} onBuy={() => console.log('Buy NFT:', nft.id)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-white' 
          : 'bg-white/90 hover:bg-white text-sky-600 backdrop-blur-sm'
      } shadow-lg hidden sm:flex`}>
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button className={`swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-white' 
          : 'bg-white/90 hover:bg-white text-sky-600 backdrop-blur-sm'
      } shadow-lg hidden sm:flex`}>
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};