import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import groom1 from "../assets/groom1.jpg";
import groom2 from "../assets/groom2.jpg";
import groom3 from "../assets/groom3.jpg";
import groom4 from "../assets/groom4.jpg";
import groom5 from "../assets/groom5.jpg";
import groom6 from "../assets/groom6.jpg";

const images = [groom1, groom2, groom3, groom4, groom5, groom6];

export default function Groomcollection() {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 overflow-x-hidden">
      
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={16}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 1.6,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {({ isActive, isPrev, isNext }) => {
                let style =
                  "scale-75 blur-md opacity-40 transition-all duration-500 ease-in-out";

                if (isActive) {
                  style =
                    "scale-105 blur-0 opacity-100 z-20 transition-all duration-500 ease-in-out";
                } else if (isPrev || isNext) {
                  style =
                    "scale-95 blur-sm opacity-70 z-10 transition-all duration-500 ease-in-out";
                }

                return (
                  <div className={style}>
                    <img
                      src={image}
                      alt={`Groom-${index}`}
                      className="
                        rounded-2xl sm:rounded-3xl 
                        w-full 
                        h-[280px] sm:h-[350px] md:h-[420px] 
                        object-cover object-top
                        shadow-xl sm:shadow-2xl shadow-blue-500/30
                        border border-blue-400/20
                      "
                    />
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}