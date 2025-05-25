import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-10">
        {/* Top Section */}
        <div className="md:flex md:justify-between md:items-start space-y-10 md:space-y-0">
          {/* Brand & Newsletter */}
          <div className="md:w-1/3">
            <a href="/" className="flex items-center mb-6">
              <span className="ml-3 text-2xl font-bold text-white">
                PraveenKart
              </span>
            </a>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for the best products online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 md:w-2/3 sm:grid-cols-3">
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/categories/men" className="hover:underline">
                    Men
                  </a>
                </li>
                <li>
                  <a href="/categories/women" className="hover:underline">
                    Women
                  </a>
                </li>
                <li>
                  <a href="/categories/accessories" className="hover:underline">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="/categories/sale" className="hover:underline">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase">
                Customer Service
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/help/shipping" className="hover:underline">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/help/returns" className="hover:underline">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="/help/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase">
                About Us
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="hover:underline">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-10" />

        {/* Bottom Section */}
        <div className="sm:flex sm:justify-between sm:items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5v-2.2c0-2.46 1.49-3.82 3.77-3.82 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.9h2.74l-.44 2.88h-2.3v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.96-2.48 9.12 9.12 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.5 2a4.48 4.48 0 0 0-4.48 4.48c0 .35.04.7.11 1.04A12.8 12.8 0 0 1 3 3.24a4.48 4.48 0 0 0-.6 2.26 4.48 4.48 0 0 0 2 3.74 4.5 4.5 0 0 1-2.04-.56v.06a4.48 4.48 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2.03.08 4.48 4.48 0 0 0 4.19 3.13A9 9 0 0 1 1 19.54a12.7 12.7 0 0 0 6.88 2.02c8.25 0 12.77-6.83 12.77-12.76 0-.2 0-.42-.02-.63A9.13 9.13 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 8.63 4a4 4 0 0 1 7.37 7.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
