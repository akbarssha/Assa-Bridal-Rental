import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Bride12 from "../assets/Bride12.jpeg";
import Bride13 from "../assets/Bride13.jpeg";
import Bride14 from "../assets/Bride14.jpg";
import Bride15 from "../assets/Bride15.jpg";
import Bride16 from "../assets/Bride16.jpg";
import Bride17 from "../assets/Bride17.jpg";


const images = [Bride12, Bride13, Bride14, Bride15,Bride16,Bride17];

export default function Bridecollection() {
  return (
    <div className="w-full py-20 bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 overflow-x-hidden">
        {/* <Navbar /> */}
      <div className="w-full py-20">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
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
                      alt={`Bride-${index}`}
                      className="rounded-3xl w-full h-[450px] object-cover object-top shadow-2xl"
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
