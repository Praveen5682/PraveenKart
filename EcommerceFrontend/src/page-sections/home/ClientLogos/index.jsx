import React from "react";

const clientLogos = [
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-1.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-2.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-3.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-4.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-5.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-6.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-7.png",
    alt: "",
  },
  {
    logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-8.png",
    alt: "",
  },
];

const ClientLogoSection = () => {
  return (
    <section className="ezy__clients2 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 justify-center mb-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 2xl:col-span-6 2xl:col-start-4 text-center">
            <h2 className="font-bold text-[25px] lg:text-[45px] leading-none mb-6">
              Meet Our Clients & Partners
            </h2>
            <p className="text-lg leading-6 opacity-70 mb-6">
              Create amazing carousel to display your client or partner logos
              with extensive design controls.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center text-center">
          {clientLogos.map((client, i) => (
            <img
              src={client.logo}
              alt={client.alt}
              className="max-h-[50px] h-auto max-w-full px-12 my-8"
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogoSection;
