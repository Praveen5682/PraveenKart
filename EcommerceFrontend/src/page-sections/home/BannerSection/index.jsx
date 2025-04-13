import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../services/components/banner/getbanner";

const IMG_URL = import.meta.env.VITE_IMG_URL;

// Custom CSS
const customStyles = `
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: white;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    width: 16px;
    height: 16px;
    background: #ffcc00;
    opacity: 1;
  }

  .swiper-button-prev, .swiper-button-next {
    color: #fff !important;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    font-size: 16px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-button-prev:hover, .swiper-button-next:hover {
    background: #ffcc00;
    color: black !important;
  }
`;

const BannerSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getBanner,
    queryKey: ["allbanners"],
  });

  const allBannersdata = data?.data;

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (isError) {
    return <div>Error loading banners. Please try again later.</div>; // Error state
  }

  return (
    <>
      {/* Inject Custom Styles */}
      <style>{customStyles}</style>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="w-full lg:h-[80vh] md:h-[60vh] h-[40vh] bg-black select-none"
      >
        {/* Render banners if available */}
        {allBannersdata?.length > 0 ? (
          allBannersdata.map((banner, index) => (
            <SwiperSlide key={index} className="relative">
              <img
                src={IMG_URL + "/uploads/" + banner.bannerimage}
                alt={`banner-${index}`}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <div>No banners available</div> // Optional message if no banners are found
        )}
      </Swiper>
    </>
  );
};

export default BannerSection;
