import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useThemeStore } from '../store/useThemeStore';

const carouselItems = [
  {
    id: 1,
    title: "Discover Digital Masterpieces",
    description: "Explore unique NFTs from world-class artists",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-purple-600 to-blue-500",
  },
  {
    id: 2,
    title: "Collect Rare Artifacts",
    description: "Own exclusive digital collectibles that tell a story",
    image: "https://images.unsplash.com/photo-1646483236639-0d0b60c54bbe?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    id: 3,
    title: "Join the NFT Revolution",
    description: "Be part of the future of digital ownership",
    image: "https://images.unsplash.com/photo-1637611331620-51149c7ceb94?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-green-500 to-teal-500",
  }
];

export const HeroCarousel = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="relative h-[600px]">
      <Swiper
        effect="fade"
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full w-full"
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-[2000ms] hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} mix-blend-multiply opacity-70`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <h2 className="text-6xl font-bold mb-6 tracking-tight">{item.title}</h2>
                  <p className="text-2xl mb-8 text-gray-200">{item.description}</p>
                  <button className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-white text-gray-900 hover:bg-gray-200' 
                      : 'bg-sky-500 text-white hover:bg-sky-600'
                  }`}>
                    Start Exploring
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};