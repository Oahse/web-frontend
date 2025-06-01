import React, { useEffect, useRef, useState } from "react";
// import Slider from "./slider";
import DropDown from "@/components/dropdown";
import QuantitySelector from '@/components/quantityselector';

const ShopFilterSidebar = ({filterslist = {},onFilter = () => {}}) => {
  // console.log(filters?.currency,'------=====');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [filters, setFilters] = useState(filterslist);
    const [activeFilters, setActiveFilters] = useState(filterslist);
    const [minprice, setMinprice] = useState(filters?.price[0]);
    const [maxprice, setMaxprice] = useState(filters?.price[1]);
    const handleCategorySelect = (category, index) => {
      setSelectedCategoryIndex(index);
      setActiveFilters((prev) => ({
        ...prev,
        categories: [category], // assuming multiple categories are allowed
      }));
      // handleFilter('categories',category)
    };
    

    const handleFilter = (type, item) => {
      console.log(type,item, 'currency')
      setActiveFilters((prev) => {
        let updated;
        const current = Array.isArray(prev[type]) ? prev[type] : [];
    
        if (Array.isArray(prev[type])) {
          if (current.includes(item)) {
            updated = current.filter((i) => i !== item);
          }else{
            if (type === 'price'){
              updated = [minprice, maxprice];
            }else {
              if (type === 'currency'){
                updated = item;
              }else {
                updated = [...current, item];
              }
            }
          } 
        } else {
          // Single select or simple value
          updated = item;
        }
        // console.log({ ...prev, [type]: updated })
        return { ...prev, [type]: updated };
      });
    };    
    
    
    const isFirstRender = useRef(true);
    useEffect(() => {
      if (!isFirstRender.current) {
        setActiveFilters((prev) => ({
          ...prev,
          currency: filters?.currency[139],
        }));
      } else {
        isFirstRender.current = false;
      }
    }, []);
    useEffect(() => {
      if (!isFirstRender.current) {
        setActiveFilters((prev) => ({
          ...prev,
          price: [minprice, maxprice],
        }));
      } else {
        isFirstRender.current = false;
      }
    }, [minprice, maxprice]);
    

    useEffect(() => {
      console.log(activeFilters,'activeFilters')
      onFilter?.(activeFilters);
    }, [activeFilters]);

    return (
      <div
        className="offcanvas offcanvas-start canvas-filter"
        id="filterShop"
        tabIndex="-1"
        aria-labelledby="filterShopLabel"
      >
        <div className="canvas-wrapper">
          <header className="canvas-header">
            <div className="filter-icon">
              <span className="icon icon-filter"></span>
              <span>Filter</span>
            </div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></span>
          </header>

          <div className="canvas-body">
            {filters?.categories.length > 0 && (
              <div className="widget-facet wd-categories">
                <div
                  className="facet-title"
                  data-bs-target="#categories"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="categories"
                >
                  <span>Product Categories</span>
                  <span className="icon icon-arrow-up"></span>
                </div>
                <div id="categories" className="collapse show">
                  <ul className="list-categoris current-scrollbar mb_36">
                      {filters?.categories.map((category, index) => (
                        <li
                          key={index}
                          className="list-item d-flex gap-12 align-items-center"
                        >
                          <input
                            type="checkbox"
                            name="categories"
                            className="tf-check"
                            id={category.name}
                            checked={activeFilters.categories?.includes(category) || false}
                            onChange={() => handleFilter("categories", category)}
                          />
                          <label htmlFor={category.name} className="label">
                              <img data-src={category.image} className=" lazyload" style={{ width:'24px', height:'24px',borderRadius:'50px'}} src={category.image} alt={category.name} />
                              <span className="ms-2">{category.name}</span>
                          </label>
                        </li>
                      ))}
                    
                  </ul>
                </div>
              </div>
            )}

            <form action="#" id="facet-filter-form" className="facet-filter-form">
              {/* Availability */}
              {filters?.availabilities && (
                <div className="widget-facet">
                  <div
                    className="facet-title"
                    data-bs-target="#availability"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="availability"
                  >
                    <span>Availability</span>
                    <span className="icon icon-arrow-up"></span>
                  </div>
                  <div id="availability" className="collapse show">
                    <ul className="tf-filter-group current-scrollbar mb_36">
                      {filters?.availabilities.map((item, index) => (
                        <li
                          key={index}
                          className="list-item d-flex gap-12 align-items-center"
                        >
                          <input
                            type="checkbox"
                            name="availability"
                            className="tf-check"
                            id={item}
                            checked={activeFilters.availabilities?.includes(item) || false}
                            onChange={() => handleFilter("availabilities", item)}
                          />
                          <label htmlFor={item} className="label">
                            <span>{item}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
              )}
              {/* currency */}
              {filters?.currency && (
                <div className="widget-facet">
                  <div
                    className="facet-title"
                    data-bs-target="#currency"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="price"
                  >
                    <span>Currency</span>
                    <span className="icon icon-arrow-up"></span>
                  </div>
                  <div id="currency" className="collapse show">
                    <div className="widget-currency">
                      <DropDown active={139} items={filters?.currency} onSelect={(item)=>handleFilter('currency', item)}/>
                    </div>
                  </div>
                </div>
              )}
              

              {/* Price */}
              {filters?.price && (
                <div className="widget-facet">
                  <div
                    className="facet-title"
                    data-bs-target="#price"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="price"
                  >
                    <span>Price</span>
                    <span className="icon icon-arrow-up"></span>
                  </div>
                  <div id="price" className="collapse show">
                    <div className="widget-price filter-price">
                      <div
                        className="price-val-range"
                        id="price-value-range"
                        data-min={filters?.price[0] || 0}
                        data-max={filters?.price[1] || 500}
                      ></div>
                      <div className="box-title-price">
                          
                          
                          <div className="card-product-info">
                            <div className="pr-stock">
                                <div className="caption-price">
                                    <QuantitySelector value={minprice} onChange={(val) => setMinprice(Math.max(0, val))} editable/>
                                    
                                    <QuantitySelector value ={maxprice} onChange={setMaxprice} editable/>
                                </div>
                              
                            </div>
                          </div>
                      </div>
                      {/* Add your slider component or input here */}
                    </div>
                  </div>
                </div>
              )}

              {/* Brand */}
              {filters?.brands && (
                <div className="widget-facet">
                  <div
                    className="facet-title"
                    data-bs-target="#brand"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="brand"
                  >
                    <span>Brand</span>
                    <span className="icon icon-arrow-up"></span>
                  </div>
                  <div id="brand" className="collapse show">
                    <ul className="tf-filter-group current-scrollbar mb_36">
                      {filters?.brands.map((brandName) => (
                        <li
                          key={brandName}
                          className="list-item d-flex gap-12 align-items-center"
                        >
                          <input
                            type="checkbox"
                            name="brand"
                            className="tf-check"
                            id={brandName}
                            checked={activeFilters.brands?.includes(brandName) || false}
                            onChange={() => handleFilter("brands", brandName)}
                          />
                          <label htmlFor={brandName} className="label">
                            <span>{brandName}</span>
                            {/* Add count if available */}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Color */}
              {/* {filters?.colors && (
                <div className="widget-facet">
                  <div
                    className="facet-title"
                    data-bs-target="#color"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="color"
                  >
                    <span>Color</span>
                    <span className="icon icon-arrow-up"></span>
                  </div>
                  <div id="color" className="collapse show">
                    <ul className="tf-filter-group filter-color current-scrollbar mb_36">
                      {filters?.colors.map(({ id, label, count, bgClass }) => (
                        <li
                          key={id}
                          className="list-item d-flex gap-12 align-items-center"
                        >
                          <input
                            type="checkbox"
                            name="color"
                            className={`tf-check-color ${bgClass}`}
                            id={id}
                            value={label}
                            checked={activeFilters.colors?.includes(label) || false}
                            onChange={() => handleFilter("colors", label)}
                          />
                          <label htmlFor={id} className="label">
                            <span>{label}</span>&nbsp;<span>({count})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )} */}

              {/* Size---- */}
              {filters?.sizes && 
                  <div className="widget-facet">
                    <div
                      className="facet-title"
                      data-bs-target="#size"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="size"
                    >
                      <span>Size</span>
                      <span className="icon icon-arrow-up"></span>
                    </div>
                    <div id="size" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar">
                        {filters?.sizes.map((size, index) => (
                          <li key={index} className="list-item d-flex gap-12 align-items-center">
                            <input
                              type="checkbox"
                              name="size"
                              className="tf-check tf-check-size"
                              value={size.label}
                              id={size.label}
                              checked={activeFilters.sizes?.includes(size) || false}
                              onChange={() => handleFilter("sizes", size)}
                            />
                            <label htmlFor={size.label} className="label">
                              <span>{size.label}</span>&nbsp;<span>({size.size})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              }

              {/* Rating */}
              {filters?.ratings && 
                  <div className="widget-facet">
                    <div
                      className="facet-title"
                      data-bs-target="#rating"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="rating"
                    >
                      <span>Rating</span>
                      <span className="icon icon-arrow-up"></span>
                    </div>
                    <div id="rating" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar mb_36">
                        {filters?.ratings.map((star) => (
                          <li key={star} className="list-item d-flex gap-12 align-items-center" 
                          
                          >
                            <input
                              type="checkbox"
                              name="rating"
                              className="tf-check"
                              id={`rating${star}`}
                              checked={activeFilters.ratings?.includes(star) || false}
                              onChange={()=>handleFilter('ratings',star)}
                              value={star}
                            />
                            <label htmlFor={`rating${star}`} className="label">
                              <span>
                                {[...Array(star)].map((_, i) => (
                                  <span key={i} className="icon icon-star text-warning "></span>
                                ))}
                                <span className="ms-2">{star} star</span>
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              }
              {/* Discount */}
              {filters?.discounts && 
                  <div className="widget-facet">
                    <div
                      className="facet-title"
                      data-bs-target="#discount"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="discount"
                    >
                      <span>Discount</span>
                      <span className="icon icon-arrow-up"></span>
                    </div>
                    <div id="discount" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar mb_36">
                        {filters?.discounts.map((discount) => (
                          <li key={discount} className="list-item d-flex gap-12 align-items-center" 
                          
                          >
                            <input
                              type="checkbox"
                              name="discount"
                              className="tf-check"
                              id={`${discount}`}
                              value={discount}
                              checked={activeFilters.discounts?.includes(discount) || false}
                              onChange={()=>handleFilter('discounts',discount)}
                            />
                            <label htmlFor={`${discount}`} className="label">
                              <span>{discount} % or more</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              }
              {/* Shipping-------- */}
              {/* filters?.shippings && 
                  <div className="widget-facet">
                    <div
                      className="facet-title"
                      data-bs-target="#shipping"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="shipping"
                    >
                      <span>Shipping</span>
                      <span className="icon icon-arrow-up"></span>
                    </div>
                    <div id="shipping" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar mb_36">
                        {filters?.shippings.map((shipping) => (
                          <li key={shipping?.id} className="list-item d-flex gap-12 align-items-center">
                            <input
                              type="checkbox"
                              name="shipping"
                              className="tf-check"
                              id={shipping?.id}
                              value={shipping?.label}
                              checked={activeFilters.shippings?.includes(shipping) || false}
                              onClick={()=>handleFilter('shippings',shipping)}
                            />
                            <label htmlFor={shipping?.id} className="label">
                              <span>{shipping?.label}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                 */
              }
              {/* Condition */}
              {/* filters?.conditions && 
                  <div className="widget-facet">
                    <div
                      className="facet-title"
                      data-bs-target="#condition"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="condition"
                    >
                      <span>Condition</span>
                      <span className="icon icon-arrow-up"></span>
                    </div>
                    <div id="condition" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar mb_36">
                        {filters?.conditions.map((condition) => (
                          <li key={condition} className="list-item d-flex gap-12 align-items-center" 
                          
                          >
                            <input
                              type="checkbox"
                              name="condition"
                              className="tf-check"
                              id={condition}
                              value={condition}
                              checked={activeFilters.conditions?.includes(condition) || false}
                              onClick={()=>handleFilter('conditions',condition)}
                              
                            />
                            <label htmlFor={condition} className="label">
                              <span>{condition}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  */
              }
              </form>
            </div>
          </div>
        </div>
      );
};

export default ShopFilterSidebar;
