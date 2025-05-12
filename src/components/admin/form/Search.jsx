import React, { useState, useEffect, useRef } from 'react';

// Import images
import product1 from '@/assets/images/products/product-1.jpg';
import product2 from '@/assets/images/products/product-2.jpg';
import product3 from '@/assets/images/products/product-3.jpg';
import product4 from '@/assets/images/products/product-4.jpg';
import product5 from '@/assets/images/products/product-5.jpg';
import product6 from '@/assets/images/products/product-6.jpg';
import product7 from '@/assets/images/products/product-7.jpg';

// Example product data with categories
const productsData = [
  {
    category: 'Top Selling Products',
    products: [
      { id: 1, img: product1, title: 'Neptune Longsleeve', link: 'product-list.html' },
      { id: 2, img: product2, title: 'Ribbed Tank Top', link: 'product-list.html' },
      { id: 3, img: product3, title: 'Ribbed Modal T-shirt', link: 'product-list.html' },
    ],
  },
  {
    category: 'Order Products',
    products: [
      { id: 4, img: product4, title: 'Oversized Motif T-shirt', link: 'product-list.html' },
      { id: 5, img: product5, title: 'V-neck Linen T-shirt', link: 'product-list.html' },
      { id: 6, img: product6, title: 'Jersey Thong Body', link: 'product-list.html' },
      { id: 7, img: product7, title: 'Jersey Thong Body', link: 'product-list.html' },
    ],
  },
  // Add more categories if needed...
];

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const boxContentRef = useRef(null);
  const showSearchRef = useRef(null);
  const searchInputRef = useRef(null);

  // This effect handles closing the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        boxContentRef.current &&
        !boxContentRef.current.contains(e.target) &&
        showSearchRef.current &&
        !showSearchRef.current.contains(e.target)
      ) {
        setIsActive(false); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      setIsActive(true); // Show search suggestions if input has text
    } else {
      setIsActive(false); // Hide search suggestions if input is empty
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Handle the actual search logic here (e.g., call API)
  };

  // Filter products based on the search query
  const filterProducts = () => {
    return productsData
      .map((categoryData) => {
        // Filter category by its name
        const filteredProducts = categoryData.products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Only include categories that have at least one matching product
        if (filteredProducts.length > 0 || categoryData.category.toLowerCase().includes(searchQuery.toLowerCase())) {
          return {
            ...categoryData,
            products: filteredProducts,
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null categories
  };

  return (
    <form className="form-search flex-grow" onSubmit={handleSubmit}>
      <fieldset className="name">
        <input
          type="text"
          placeholder="Search"
          className="show-search"
          name="name"
          value={searchQuery}
          onChange={handleInputChange}
          ref={searchInputRef}
          aria-required="true"
          required=""
        />
      </fieldset>
      <div className="button-submit">
        <button type="submit">
          <i className="icon-search"></i>
        </button>
      </div>
      <div
        className={`box-content-search ${isActive ? 'active' : ''}`}
        id="box-content-search"
        ref={boxContentRef}
      >
        {filterProducts().map((categoryData, index) => (
          <ul className="mb-24" key={index}>
            <li className="mb-14">
              <div className="body-title">{categoryData.category}</div>
            </li>
            <li className="mb-14">
              <div className="divider"></div>
            </li>
            <li>
              <ul>
                {categoryData.products.map((product) => (
                  <li key={product.id} className="product-item gap14 mb-10">
                    <div className="image no-bg">
                      <img src={product.img} alt={product.title} />
                    </div>
                    <div className="flex items-center justify-between gap20 flex-grow">
                      <div className="name">
                        <a href={product.link} className="body-text">
                          {product.title}
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
    </form>
  );
};

export default Search;
