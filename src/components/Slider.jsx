import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    title: "Discover Blockbusters",
    description: "Explore top-rated movies and what's trending now.",
    image:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Your Favorite Picks",
    description: "Manage your favorite movies easily in one place.",
    image:
      "https://images.unsplash.com/photo-1510422908328-746ed313f736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZCUyMGJhbm5lciUyMGZvciUyMG1vdmllJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Add & Share Movies",
    description: "Contribute by adding movies you love to the portal.",
    image:
      "https://plus.unsplash.com/premium_photo-1724088684340-63e0cfbc30fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGJhY2tncm91bmQlMjBiYW5uZXIlMjBmb3IlMjBtb3ZpZSUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
  },
];

const Slider = () => {
  return (
    <div className="w-10/12 md:w-11/12 mx-auto py-4">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className="rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-64 md:h-80 lg:h-96 flex items-center justify-center bg-cover bg-center rounded-lg text-white relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center max-w-md mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
