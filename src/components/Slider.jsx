
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Slider = () => {
  return (
    <div className="w-11/12 mx-auto py-4">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className="rounded-lg"
      >
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i}>
            <div className="h-48 bg-blue-600 flex items-center justify-center text-white text-xl rounded-md">
              Slide {i + 1}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
