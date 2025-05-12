
/**
  * Range Two Price
  * Filter Products
  * Filter Sort 
  * Switch Layout
  * Handle Sidebar Filter
  * Handle Dropdown Filter
 */
(function ($) {
  "use strict";

  /* Range Two Price
  -------------------------------------------------------------------------------------*/
  var rangeTwoPrice = function () {
    if ($("#price-value-range").length > 0) {
      var skipSlider = document.getElementById("price-value-range");
      var skipValues = [
        document.getElementById("price-min-value"),
        document.getElementById("price-max-value"),
      ];

      var min = parseInt(skipSlider.getAttribute("data-min"));
      var max = parseInt(skipSlider.getAttribute("data-max"));

      noUiSlider.create(skipSlider, {
        start: [min, max],
        connect: true,
        step: 1,
        range: {
          min: min,
          max: max,
        },
        format: {
          from: function (value) {
            return parseInt(value);
          },
          to: function (value) {
            return parseInt(value);
          },
        },
      });

      skipSlider.noUiSlider.on("update", function (val, e) {
        skipValues[e].innerText = val[e];
      });
    }
  };

  /* Filter Products
  -------------------------------------------------------------------------------------*/
  var filterProducts = function () {
    const priceSlider = document.getElementById("price-value-range");
  
    const minPrice = parseInt(priceSlider.dataset.min);
    const maxPrice = parseInt(priceSlider.dataset.max);
  
    const filters = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      size: null,
      color: null,
      availability: null,
      brands: null, 
      sale: false,
    };
  
    priceSlider.noUiSlider.on("update", function (values) {
      filters.minPrice = parseInt(values[0]);
      filters.maxPrice = parseInt(values[1]);
  
      $("#price-min-value").text(filters.minPrice);
      $("#price-max-value").text(filters.maxPrice);
  
      applyFilters();
      updateMetaFilter();
    });
  
    $('input[name="availability"]').change(function () {
      filters.availability =
        $(this).attr("id") === "inStock" ? "In stock" : "Out of stock";
      applyFilters();
      updateMetaFilter();
    });
  
    $('input[name="brand"]').change(function () {
      filters.brands = $(this).attr("id");
      applyFilters();
      updateMetaFilter();
    });
  
    $('input[name="color"]').change(function () {
      filters.color = $(this).attr("id");
      applyFilters();
      updateMetaFilter();
    });
  
    $('input[name="size"]').change(function () {
      filters.size = $(this).attr("id");
      applyFilters();
      updateMetaFilter();
    });
  
    $(".shop-sale-text").click(function () {
      filters.sale = !filters.sale;
      $(this).toggleClass("active", filters.sale);
      applyFilters();
      updateMetaFilter();
    });
  
    function updateMetaFilter() {
      const appliedFilters = $("#applied-filters");
      const metaFilterShop = $(".meta-filter-shop");
      appliedFilters.empty();
  
      if (filters.availability) {
        appliedFilters.append(
          `<span class="filter-tag">${filters.availability} <span class="remove-tag icon-close" data-filter="availability"></span></span>`
        );
      }
      if (filters.size) {
        appliedFilters.append(
          `<span class="filter-tag">${filters.size} <span class="remove-tag icon-close" data-filter="size"></span></span>`
        );
      }
      if (filters.minPrice > minPrice || filters.maxPrice < maxPrice) {
        appliedFilters.append(
          `<span class="filter-tag">$${filters.minPrice} - $${filters.maxPrice} <span class="remove-tag icon-close" data-filter="price"></span></span>`
        );
      }
      if (filters.color) {
        const colorElement = $(`input[name="color"][value='${filters.color}']`);
        const backgroundClass = colorElement
          .attr("class") 
          .split(" ") 
          .find((cls) => cls.startsWith("bg_")); 
        const line = backgroundClass === "bg_white" ? "border-line-dark" : "";
        appliedFilters.append(
          `<div class="filter-tag color-tag">
              <span class="color ${backgroundClass} ${line}"></span>
              ${filters.color}
              <span class="remove-tag icon-close" data-filter="color"></span>
          </div>`
        );
      }
      if (filters.brands) { 
        appliedFilters.append(
          `<span class="filter-tag">${filters.brands} <span class="remove-tag icon-close" data-filter="brand"></span></span>`
        );
      }

      if (filters.sale) {
        appliedFilters.append(
          `<span class="filter-tag on-sale">On Sale <span class="remove-tag icon-close" data-filter="sale"></span></span>`
        );
      }
  
      const hasFiltersApplied = appliedFilters.children().length > 0;
      metaFilterShop.toggle(hasFiltersApplied);
  
      $("#remove-all").toggle(hasFiltersApplied);
    }
  
    $("#applied-filters").on("click", ".remove-tag", function () {
      const filterType = $(this).data("filter");
  
      if (filterType === "size") {
        filters.size = null;
        $('input[name="size"]').prop("checked", false);
      }
      if (filterType === "color") {
        filters.color = null;
        $('input[name="color"]').prop("checked", false);
      }
      if (filterType === "availability") {
        filters.availability = null;
        $('input[name="availability"]').prop("checked", false);
      }
      if (filterType === "brand") {
        filters.brands = null; 
        $('input[name="brand"]').prop("checked", false);
      }
      if (filterType === "price") {
        filters.minPrice = minPrice;
        filters.maxPrice = maxPrice;
        priceSlider.noUiSlider.set([minPrice, maxPrice]);
      }
      if (filterType === "sale") {
        filters.sale = false;
        $(".shop-sale-text").removeClass("active");
      }
  
      applyFilters();
      updateMetaFilter();
    });
  
    $("#remove-all,#reset-filter").click(function () {
      filters.size = null;
      filters.color = null;
      filters.availability = null;
      filters.brands = null; 
      filters.minPrice = minPrice;
      filters.maxPrice = maxPrice;
      filters.sale = false;
  
      $(".shop-sale-text").removeClass("active");
      $('input[name="brand"]').prop("checked", false);
      $('input[name="availability"]').prop("checked", false);
      $('input[name="color"]').prop("checked", false);
      $('input[name="size"]').prop("checked", false);
      priceSlider.noUiSlider.set([minPrice, maxPrice]);
  
      applyFilters();
      updateMetaFilter();
    });
  
    function applyFilters() {
      let visibleProductCountGrid = 0;
      let visibleProductCountList = 0;
  
      $(".wrapper-shop .card-product").each(function () {
        const product = $(this);
        let showProduct = true;
  
        const priceText = product.find(".current-price").text().replace("$", "");
        const price = parseFloat(priceText);
  
        if (price < filters.minPrice || price > filters.maxPrice) {
          showProduct = false;
        }
        if (
          filters.size &&
          !product.find(`.size-item:contains('${filters.size}')`).length
        ) {
          showProduct = false;
        }
        if (
          filters.color &&
          !product.find(`.color-swatch:contains('${filters.color}')`).length
        ) {
          showProduct = false;
        }
        if (filters.availability) {
          const availabilityStatus = product.data("availability");
          if (filters.availability !== availabilityStatus) {
            showProduct = false;
          }
        }
        if (filters.sale && !product.find(".on-sale-wrap").length) {
          showProduct = false;
        }
        if (filters.brands) { 
          const brandId = product.attr("data-brand");
          if (filters.brands !== brandId) {
            showProduct = false;
          }
        }
  
        product.toggle(showProduct);
  
        if (showProduct) {
          if (product.hasClass("grid")) {
            visibleProductCountGrid++;
          } else if (product.hasClass("list-layout")) {
            visibleProductCountList++;
          }
        }
      });
  
      $("#product-count-grid").html(
        `<span class="count">${visibleProductCountGrid}</span> Products Found`
      );
      $("#product-count-list").html(
        `<span class="count">${visibleProductCountList}</span> Products Found`
      );
      updateLastVisibleItem();
  
      if (visibleProductCountGrid >= 12 || visibleProductCountList >= 12) {
        $(".wg-pagination,.tf-loading").show();
      } else {
        $(".wg-pagination,.tf-loading").hide();
      }
    }
  
    function updateLastVisibleItem() {
      setTimeout(() => {
        $(".card-product.list-layout").removeClass("last");
        const lastVisible = $(".card-product.list-layout:visible").last();
        if (lastVisible.length > 0) {
          lastVisible.addClass("last");
        }
      }, 50);
    }
  };
  

  /* Filter Sort
  -------------------------------------------------------------------------------------*/  
  var filterSort = function () {
    let isListActive = $(".sw-layout-list").hasClass("active");
    let originalProductsList = $("#listLayout .card-product").clone();
    let originalProductsGrid = $("#gridLayout .card-product").clone();
    let paginationList = $("#listLayout .wg-pagination").clone();
    let paginationGrid = $("#gridLayout .wg-pagination").clone();

    $(".select-item").on("click", function () {
      const sortValue = $(this).data("sort-value");
      $(".select-item").removeClass("active");
      $(this).addClass("active");
      $(".text-sort-value").text($(this).find(".text-value-item").text());

      applyFilter(sortValue, isListActive);
    });

    $(".tf-view-layout-switch").on("click", function () {
      const layout = $(this).data("value-layout");

      if (layout === "list") {
        isListActive = true;
        $("#gridLayout").hide();
        $("#listLayout").show();
      } else {
        isListActive = false;
        $("#listLayout").hide();
        setGridLayout(layout);
      }
    });

    function applyFilter(sortValue, isListActive) {
      let products;

      if (isListActive) {
        products = $("#listLayout .card-product");
      } else {
        products = $("#gridLayout .card-product");
      }

      if (sortValue === "best-selling") {
        if (isListActive) {
          $("#listLayout").empty().append(originalProductsList.clone());
        } else {
          $("#gridLayout").empty().append(originalProductsGrid.clone());
        }
        bindProductEvents();
        displayPagination(products, isListActive);
        return;
      }

      if (sortValue === "price-low-high") {
        products.sort(
          (a, b) =>
            parseFloat($(a).find(".current-price").text().replace("$", "")) -
            parseFloat($(b).find(".current-price").text().replace("$", ""))
        );
      } else if (sortValue === "price-high-low") {
        products.sort(
          (a, b) =>
            parseFloat($(b).find(".current-price").text().replace("$", "")) -
            parseFloat($(a).find(".current-price").text().replace("$", ""))
        );
      } else if (sortValue === "a-z") {
        products.sort((a, b) =>
          $(a).find(".title").text().localeCompare($(b).find(".title").text())
        );
      } else if (sortValue === "z-a") {
        products.sort((a, b) =>
          $(b).find(".title").text().localeCompare($(a).find(".title").text())
        );
      }

      if (isListActive) {
        $("#listLayout").empty().append(products);
      } else {
        $("#gridLayout").empty().append(products);
      }
      bindProductEvents();
      displayPagination(products, isListActive);
    }

    function displayPagination(products, isListActive) {
      if (products.length >= 12) {
        if (isListActive) {
          $("#listLayout").append(paginationList.clone());
        } else {
          $("#gridLayout").append(paginationGrid.clone());
        }
      }
    }

    function setGridLayout(layoutClass) {
      $("#gridLayout")
        .show()
        .removeClass()
        .addClass(`wrapper-shop tf-grid-layout ${layoutClass}`);
      $(".tf-view-layout-switch").removeClass("active");
      $(`.tf-view-layout-switch[data-value-layout="${layoutClass}"]`).addClass(
        "active"
      );
    }
    function bindProductEvents() {
      if ($(".card-product").length > 0) {
        $(".color-swatch").on("click, mouseover", function () {
          var swatchColor = $(this).find("img").attr("src");
          var imgProduct = $(this)
            .closest(".card-product")
            .find(".img-product");
          imgProduct.attr("src", swatchColor);
          $(this)
            .closest(".card-product")
            .find(".color-swatch.active")
            .removeClass("active");
          $(this).addClass("active");
        });
      }
      $(".size-box").on("click", ".size-item", function () {
        $(this).closest(".size-box").find(".size-item").removeClass("active");
        $(this).addClass("active");
      });
    }
    bindProductEvents();
  };

  /* Switch Layout 
  -------------------------------------------------------------------------------------*/   
  var swLayoutShop = function () {
    let isListActive = $(".sw-layout-list").hasClass("active");
    let userSelectedLayout = null;

    function hasValidLayout() {
      return (
        $("#gridLayout").hasClass("tf-col-2") ||
        $("#gridLayout").hasClass("tf-col-3") ||
        $("#gridLayout").hasClass("tf-col-4") ||
        $("#gridLayout").hasClass("tf-col-5") ||
        $("#gridLayout").hasClass("tf-col-6") ||
        $("#gridLayout").hasClass("tf-col-7")
      );
    }

    function updateLayoutDisplay() {
      const windowWidth = $(window).width();
      const currentLayout = $("#gridLayout").attr("class");

      if (!hasValidLayout()) {
        console.warn(
          "Page does not contain a valid layout (2-7 columns), skipping layout adjustments."
        );
        return;
      }

      if (isListActive) {
        $("#gridLayout").hide();
        $("#listLayout").show();
        $(".wrapper-control-shop")
          .addClass("listLayout-wrapper")
          .removeClass("gridLayout-wrapper");
        return;
      }

      if (userSelectedLayout) {
        if (windowWidth <= 767) {
          setGridLayout("tf-col-2");
        } else if (windowWidth <= 1150 && userSelectedLayout !== "tf-col-2") {
          setGridLayout("tf-col-3");
        } else if (
          windowWidth <= 1400 &&
          (userSelectedLayout === "tf-col-5" ||
            userSelectedLayout === "tf-col-6" ||
            userSelectedLayout === "tf-col-7")
        ) {
          setGridLayout("tf-col-4");
        } else {
          setGridLayout(userSelectedLayout);
        }
        return;
      }

      if (windowWidth <= 767) {
        if (!currentLayout.includes("tf-col-2")) {
          setGridLayout("tf-col-2");
        }
      } else if (windowWidth <= 1150) {
        if (!currentLayout.includes("tf-col-3")) {
          setGridLayout("tf-col-3");
        }
      } else if (windowWidth <= 1400) {
        if (
          currentLayout.includes("tf-col-5") ||
          currentLayout.includes("tf-col-6") ||
          currentLayout.includes("tf-col-7")
        ) {
          setGridLayout("tf-col-4");
        }
      } else {
        $("#listLayout").hide();
        $("#gridLayout").show();
        $(".wrapper-control-shop")
          .addClass("gridLayout-wrapper")
          .removeClass("listLayout-wrapper");
      }
    }

    function setGridLayout(layoutClass) {
      $("#listLayout").hide();
      $("#gridLayout")
        .show()
        .removeClass()
        .addClass(`wrapper-shop tf-grid-layout ${layoutClass}`);
      $(".tf-view-layout-switch").removeClass("active");
      $(`.tf-view-layout-switch[data-value-layout="${layoutClass}"]`).addClass(
        "active"
      );
      $(".wrapper-control-shop")
        .addClass("gridLayout-wrapper")
        .removeClass("listLayout-wrapper");
      isListActive = false;
    }

    $(document).ready(function () {
      if (isListActive) {
        $("#gridLayout").hide();
        $("#listLayout").show();
        $(".wrapper-control-shop")
          .addClass("listLayout-wrapper")
          .removeClass("gridLayout-wrapper");
      } else {
        $("#listLayout").hide();
        $("#gridLayout").show();
        updateLayoutDisplay();
      }
    });

    $(window).on("resize", updateLayoutDisplay);

    $(".tf-view-layout-switch").on("click", function () {
      const layout = $(this).data("value-layout");
      $(".tf-view-layout-switch").removeClass("active");
      $(this).addClass("active");

      if (layout === "list") {
        isListActive = true;
        userSelectedLayout = null;
        $("#gridLayout").hide();
        $("#listLayout").show();
        $(".wrapper-control-shop")
          .addClass("listLayout-wrapper")
          .removeClass("gridLayout-wrapper");
      } else {
        userSelectedLayout = layout;
        setGridLayout(layout);
      }
    });
  };

  /* Handle Sidebar Filter 
  -------------------------------------------------------------------------------------*/ 
  var handleSidebarFilter = function () {
    $(".filterShop").click(function () {
      if ($(window).width() <= 1150) {
        $(".sidebar-filter,.overlay-filter").addClass("show");
      }
    });
    $(".close-filter ,.overlay-filter").click(function () {
      $(".sidebar-filter,.overlay-filter").removeClass("show");
    });
  };

  /* Loading product 
  -------------------------------------------------------------------------------------*/ 
  var loadItem = function () {
    const gridInitialItems = 8;
    const listInitialItems = 4;
    const gridItemsPerPage = 4;
    const listItemsPerPage = 2;

    let listItemsDisplayed = listInitialItems;
    let gridItemsDisplayed = gridInitialItems;
    let scrollTimeout;

    function hideExtraItems(layout, itemsDisplayed) {
      layout.find(".loadItem").each(function (index) {
        if (index >= itemsDisplayed) {
          $(this).addClass("hidden");
        }
      });
      if (layout.is("#listLayout")) updateLastVisible(layout);
    }

    function showMoreItems(layout, itemsPerPage, itemsDisplayed) {
      const hiddenItems = layout.find(".loadItem.hidden");

      setTimeout(function () {
        hiddenItems.slice(0, itemsPerPage).removeClass("hidden");
        if (layout.is("#listLayout")) updateLastVisible(layout);
        checkLoadMoreButton(layout);
      }, 600);

      return itemsDisplayed + itemsPerPage;
    }

    function updateLastVisible(layout) {
      layout.find(".loadItem").removeClass("last-visible");
      layout
        .find(".loadItem")
        .not(".hidden")
        .last()
        .addClass("last-visible");
    }
    function checkLoadMoreButton(layout) {
      if (layout.find(".loadItem.hidden").length === 0) {
        if (layout.is("#listLayout")) {
          $("#loadMoreListBtn").hide();
          $("#infiniteScrollList").hide();
        } else if (layout.is("#gridLayout")) {
          $("#loadMoreGridBtn").hide();
          $("#infiniteScrollGrid").hide();
        }
      }
    }

    hideExtraItems($("#listLayout"), listItemsDisplayed);
    hideExtraItems($("#gridLayout"), gridItemsDisplayed);

    $("#loadMoreListBtn").on("click", function () {
      listItemsDisplayed = showMoreItems(
        $("#listLayout"),
        listItemsPerPage,
        listItemsDisplayed
      );
    });



    $("#loadMoreGridBtn").on("click", function () {
      gridItemsDisplayed = showMoreItems(
        $("#gridLayout"),
        gridItemsPerPage,
        gridItemsDisplayed
      );
    });

    // Infinite Scrolling
    function onScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const infiniteScrollList = $("#infiniteScrollList");
        const infiniteScrollGrid = $("#infiniteScrollGrid");

        if (
          infiniteScrollList.is(":visible") &&
          isElementInViewport(infiniteScrollList)
        ) {
          listItemsDisplayed = showMoreItems(
            $("#listLayout"),
            listItemsPerPage,
            listItemsDisplayed
          );
        }

        if (
          infiniteScrollGrid.is(":visible") &&
          isElementInViewport(infiniteScrollGrid)
        ) {
          gridItemsDisplayed = showMoreItems(
            $("#gridLayout"),
            gridItemsPerPage,
            gridItemsDisplayed
          );
        }
      }, 300);
    }
    function isElementInViewport(el) {
      const rect = el[0].getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    $(window).on("scroll", onScroll);
  };



  $(function () {
    rangeTwoPrice();
    filterProducts();
    filterSort();
    swLayoutShop();
    loadItem();
    handleSidebarFilter();
  });
})(jQuery);

