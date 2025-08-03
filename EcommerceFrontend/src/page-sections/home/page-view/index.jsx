import React, { Fragment } from "react";

import BannerSection from "../BannerSection/index";
import ShopByCategorySection from "../Shop-By-Category";
import NewArrivalsSection from "../New-Arrivals";
import TestimonialSection from "../Testimonial";
import ClientLogoSection from "../ClientLogos";
import BestSellerSection from "../productSection";

const HomePageView = () => {
  return (
    <Fragment>
      <BannerSection />
      <ShopByCategorySection />
      <NewArrivalsSection />
      <BestSellerSection />
      {/* <TestimonialSection />
      <ClientLogoSection /> */}
    </Fragment>
  );
};

export default HomePageView;
