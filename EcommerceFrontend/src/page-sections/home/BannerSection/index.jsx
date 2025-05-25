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

// Custom CSS for Swiper buttons and pagination
const customStyles = `
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: white;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    width: 16px;
    height: 16px;
    background: #ffd700;
    opacity: 1;
  }

  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .group:hover .swiper-button-prev,
  .group:hover .swiper-button-next {
    opacity: 1;
    pointer-events: auto;
  }

  .swiper-button-prev, .swiper-button-next {
    color: white !important;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    font-size: 18px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-button-prev:hover, .swiper-button-next:hover {
    background: #ffd700;
    color: black !important;
  }
`;

const BannerSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getBanner,
    queryKey: ["allbanners"],
  });

  const allBannersdata = data?.data;

  console.log("allBannersdata", allBannersdata);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading banners. Please try again later.</div>;
  }

  if (!allBannersdata || allBannersdata.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-600 h-60">
        No Banners Available
      </div>
    );
  }

  return (
    <>
      <style>{customStyles}</style>

      <div className="relative group w-full lg:h-[86vh] md:h-[60vh] h-[40vh] overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full h-full"
        >
          {allBannersdata?.length > 0 ? (
            allBannersdata.map((banner, index) => (
              <SwiperSlide key={index} className="relative">
                <img
                  src={`${IMG_URL}/uploads/${banner.bannerimage}`}
                  alt={`banner-${index}`}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))
          ) : (
            <div>No banners available</div>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default BannerSection;
