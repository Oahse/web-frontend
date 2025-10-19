import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, MailIcon, PhoneIcon, ArrowRightIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  // Categories for quick links
  const categories = [
    { name: 'Cereal Crops', path: '/products/cereal-crops' },
    { name: 'Legumes', path: '/products/legumes' },
    { name: 'Fruits & Vegetables', path: '/products/fruits-vegetables' },
    { name: 'Spices and Herbs', path: '/products/spices-herbs' },
    { name: 'Nuts & Beverages', path: '/products/nuts-flowers-beverages' },
  ];

  // Help links
  const helpLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  // Account links
  const accountLinks = [
    { name: 'My Account', path: '/account' },
    { name: 'My Orders', path: '/account/orders' },
    { name: 'Wishlist', path: '/account/wishlist' },
    { name: 'Track Order', path: '/account/track-order' },
  ];

  return (
    <footer className="bg-surface pt-12 pb-16 md:pb-10 border-t border-border-light mt-12 text-copy">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Newsletter */}
        <div className="bg-background rounded-lg p-6 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-main mb-3">Subscribe to our Newsletter</h3>
              <p className="text-copy-light">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto md:min-w-[350px]">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary bg-surface text-copy"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-r-md hover:bg-primary-dark transition-colors flex items-center whitespace-nowrap">
                  Subscribe
                  <ArrowRightIcon size={16} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center">
                <img src="/banwee_logo_text_green.png" alt="Banwee" className="h-6" />
              </div>
            </Link>
            <p className="text-copy-light mb-6 max-w-md">
              Banwee brings you the finest organic products from Africa, ethically sourced and sustainably
              produced.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPinIcon size={20} className="text-primary flex-shrink-0 mr-3 mt-1" />
                <p className="text-copy-light">
                  1234 Fashion Street, Suite 567, New York, NY 10001
                </p>
              </div>
              <div className="flex items-center">
                <MailIcon size={20} className="text-primary flex-shrink-0 mr-3" />
                <a href="mailto:info@banwee.com" className="text-copy-light hover:text-primary">
                  info@banwee.com
                </a>
              </div>
              <div className="flex items-center">
                <PhoneIcon size={20} className="text-primary flex-shrink-0 mr-3" />
                <a href="tel:+12125551234" className="text-copy-light hover:text-primary">
                  (212) 555-1234
                </a>
              </div>
              <Link to="/contact" className="inline-flex items-center text-primary hover:underline">
                Get direction
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-lg font-semibold text-main mb-5">Shop Categories</h5>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={category.path} className="text-copy-light hover:text-primary">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h5 className="text-lg font-semibold text-main mb-5">Help</h5>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-copy-light hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h5 className="text-lg font-semibold text-main mb-5">My Account</h5>
            <ul className="space-y-3">
              {accountLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-copy-light hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-6 border-t border-border-light">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-copy-light">© 2025 Banwee Store. All Rights Reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-copy-lighter hover:text-primary" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-copy-lighter hover:text-primary" aria-label="Twitter">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-copy-lighter hover:text-primary" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-copy-lighter hover:text-primary" aria-label="Youtube">
                <YoutubeIcon size={20} />
              </a>
              <a href="#" className="text-copy-lighter hover:text-primary" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};