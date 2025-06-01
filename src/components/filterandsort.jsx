import React, { useState, useEffect, useCallback } from "react";
import ShopFilterSidebar from "@/components/filter";
import DropDown from "@/components/dropdown";

const sortItemsByOption = (items, sortValue) => {
  const sorted = [...items];
  switch (sortValue) {
    case "a-z":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "z-a":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-low-high":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return sorted.sort((a, b) => b.price - a.price);
    case "date-old-new":
      return sorted.sort((a, b) => new Date(a.discountStartDate) - new Date(b.discountStartDate));
    case "date-new-old":
      return sorted.sort((a, b) => new Date(b.discountStartDate) - new Date(a.discountStartDate));
    default:
      return sorted;
  }
};
const getDiscountPrice = (price, discount) => {
  if (discount){
    return (price-(price * (discount / 100))).toFixed(2);
  }else{
    return price;
  }
  
};
// Filtering logic
const filterItems = (items, filters) => {
    // const res = items.filter((item) => {
    
    //     // // Colors
    //     // if (filters?.colors?.length) {
    //     //   const colorMatch = item.colors?.some(color =>
    //     //     filters.colors.some(filterColor => filterColor.label === color.name)
    //     //   );
    //     //   if (!colorMatch) {
    //     //     return false;
    //     //   }
    //     // }
   

    //     // }
    
    
    //     // // Shipping options
    //     // if (filters?.shippings?.length) {
    //     //   const shippingMatch = filters.shippings.some(opt =>
    //     //     item.shipping?.includes(opt.label)
    //     //   );
    //     //   if (!shippingMatch) {
    //     //     return false;
    //     //   }
    //     // }
    
    //     // // Conditions
    //     // if (filters?.conditions?.length && !filters.conditions.includes(item.condition)) {
    //     //   return false;
    //     // }
        
    //     return true;
        
    //   });
    const result = [];
    const [minPrice = 0, maxPrice = Infinity] = filters.price || [];
    
    for (const item of items) {
      // Currency match
      if (filters?.currency && !(filters?.currency?.sortValue === item.currency)) continue;

      // Check brand
      if (filters?.brands && !filters.brands.includes(item.brand)) continue;

      // Check price
      if (getDiscountPrice(item?.price, item?.discount) < minPrice || getDiscountPrice(item?.price, item?.discount) > maxPrice) continue;

      // Discounts
      if (
        filters?.discounts &&
        item?.discount < Math.min(...filters.discounts.map(d => parseInt(d)))
      ) continue;

      // Ratings
      if (filters?.ratings && !filters.ratings.includes(parseInt(item?.rating))) continue;

      // Sizes
      if (filters?.sizes && !item.sizes?.some(size =>
        filters.sizes.some(filterSize => filterSize?.label === size.label)
      )) continue;

      // Availability
      if (filters?.availabilities && !filters?.availabilities?.includes(item.availability)) continue;

      // Category
      if (filters?.categories && !filters?.categories?.some(category => category?.name === item.category)) continue;

        
      result.push(item);
    }
    console.log(result,'______',filters)
    return result;
    
  };
  
  
  // Main component
const FilterAndSort = ({ items = [], filterslist = {}, sortinglist = [], onFilterSort = () => {} }) => {
    const [selectedSort, setSelectedSort] = useState("featured");
    const [filters, setFilters] = useState(filterslist);

    const handleFilterSort = (itemsList, filtersInput, sortValue) => {
        const filtered = filterItems(itemsList, filtersInput);
        // console.log(filtersInput,'filtersInput++++++')
        const sorted = sortItemsByOption(filtered, sortValue);
        onFilterSort(sorted);
    };

    // Run once on mount
    useEffect(() => {
        handleFilterSort(items, filters, selectedSort);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSort = (sort) => {
        const sortValue = sort?.sortValue || "featured";
        setSelectedSort(sortValue);
        handleFilterSort(items, filters, sortValue);
    };

    const handleFilter = (updatedFilters) => {
        setFilters(updatedFilters);
        handleFilterSort(items, updatedFilters, selectedSort);
    };

    const activeSortIndex = sortinglist.findIndex(opt => opt.sortValue === selectedSort);

    return (
        <>
            <div className="tf-shop-control grid-3 align-items-center">
                <div className="tf-control-filter">
                    <a href="#filterShop" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft" className="tf-btn-filter">
                        <span className="icon icon-filter"></span>
                        <span className="text">Filter</span>
                    </a>
                    
                </div>
                <ul className="tf-control-layout d-flex justify-content-center" />
                <div className="tf-control-sorting d-flex justify-content-end">
                    <DropDown active={activeSortIndex} items={sortinglist} onSelect={handleSort} />
                </div>
            </div>

            {/* Filter Sidebar */}
            <ShopFilterSidebar
                filterslist={filters}
                categories={filters?.categories}
                onFilter={handleFilter}
            />
        </>
    );
    };
  
export default FilterAndSort;
