
if ($(".tf-sw-top_bar").length > 0) {
  var preview = $(".tf-sw-top_bar").data("preview");
  var spacing = $(".tf-sw-top_bar").data("space");
  var loop = $(".tf-sw-top_bar").data("loop");
  var speed = $(".tf-sw-top_bar").data("speed");
  var delay = $(".tf-sw-top_bar").data("delay");
  var swiper = new Swiper(".tf-sw-top_bar", {
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: preview,
    loop: loop,
    spaceBetween: spacing,
    speed: speed,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-topbar",
      prevEl: ".nav-next-topbar",
    },
  });

  $(".tf-sw-top_bar").hover(
    function () {
      this.swiper.autoplay.stop();
    },
    function () {
      this.swiper.autoplay.start();
    }
  );
}

if ($(".tf-sw-slideshow").length > 0) {
  var preview = $(".tf-sw-slideshow").data("preview");
  var tablet = $(".tf-sw-slideshow").data("tablet");
  var mobile = $(".tf-sw-slideshow").data("mobile");
  var spacing = $(".tf-sw-slideshow").data("space");
  var loop = $(".tf-sw-slideshow").data("loop");
  var play = $(".tf-sw-slideshow").data("auto-play");
  var delay = $(".tf-sw-slideshow").data("delay");
  var speed = $(".tf-sw-slideshow").data("speed");
  var centered = $(".tf-sw-slideshow").data("centered");
  var swiper = new Swiper(".tf-sw-slideshow", {
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    autoplay: play,
    slidesPerView: mobile,
    loop: loop,
    spaceBetween: 0,
    speed: speed,
    pagination: {
      el: ".sw-pagination-slider",
      clickable: true,
    },
    navigation: {
      clickable: true,
      nextEl: ".navigation-prev-slider",
      prevEl: ".navigation-next-slider",
    },
    centeredSlides: false,
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacing,
        centeredSlides: false,

      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacing,
        centeredSlides: centered,
      },
    },
  });


}

if ($(".tf-sw-effect").length > 0) {
  var swiper2 = new Swiper(".tf-sw-effect", {
    spaceBetween: 0,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".sw-pagination-slider",
      clickable: true,
    },
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-slider",
      prevEl: ".nav-next-slider",
    },
  });
}


if ($(".thumbs-default").length > 0) {
  var direction = $(".tf-product-media-thumbs-default").data("direction");
  var thumbsSlider = new Swiper(".tf-product-media-thumbs-default", {
    spaceBetween: 10,
    slidesPerView: "auto",
    // slidesPerView: 2,
    direction: "vertical",
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        direction: "horizontal",
        slidesPerView: 5,
      },
      1150: {
        direction: "vertical",
        direction: direction,
      },
    },
    450: {
      direction: "vertical",
    },
  });
  var mainSlider = new Swiper(".tf-product-media-main-default", {
    spaceBetween: 0,
    // observer: true,
    // observeParents: true,
    navigation: {
      nextEl: ".thumbs-next",
      prevEl: ".thumbs-prev",
    },
    thumbs: {
      swiper: thumbsSlider,
    },

  });

}

if ($(".thumbs-slider-black").length > 0) {
  var direction = $(".tf-product-media-thumbs-black").data("direction");
  var thumbsSlider = new Swiper(".tf-product-media-thumbs-black", {
    spaceBetween: 10,
    slidesPerView: "auto",
    // slidesPerView: 2,
    direction: "vertical",
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        direction: "horizontal",
        slidesPerView: 5,
      },
      1150: {
        direction: "vertical",
        direction: direction,
      },
    },
    450: {
      direction: "vertical",
    },
  });
  var mainSlider = new Swiper(".tf-product-media-main-black", {
    spaceBetween: 0,
    // observer: true,
    // observeParents: true,
    navigation: {
      nextEl: ".thumbs-next-black",
      prevEl: ".thumbs-prev-black",
    },
    thumbs: {
      swiper: thumbsSlider,
    },

  });




}

if ($(".thumbs-slider-blue").length > 0) {
  var direction = $(".tf-product-media-thumbs-blue").data("direction");
  var thumbsSlider = new Swiper(".tf-product-media-thumbs-blue", {
    spaceBetween: 10,
    slidesPerView: "auto",
    // slidesPerView: 2,
    direction: "vertical",
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        direction: "horizontal",
        slidesPerView: 5,
      },
      1150: {
        direction: "vertical",
        direction: direction,
      },
    },
    450: {
      direction: "vertical",
    },
  });
  var mainSlider = new Swiper(".tf-product-media-main-blue", {
    spaceBetween: 0,
    // observer: true,
    // observeParents: true,
    navigation: {
      nextEl: ".thumbs-next-blue",
      prevEl: ".thumbs-prev-blue",
    },
    thumbs: {
      swiper: thumbsSlider,
    },

  });

}

if ($(".thumbs-slider-white").length > 0) {
  var direction = $(".tf-product-media-thumbs-white").data("direction");
  var thumbsSlider = new Swiper(".tf-product-media-thumbs-white", {
    spaceBetween: 10,
    slidesPerView: "auto",
    // slidesPerView: 2,
    direction: "vertical",
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        direction: "horizontal",
        slidesPerView: 5,
      },
      1150: {
        direction: "vertical",
        direction: direction,
      },
    },
    450: {
      direction: "vertical",
    },
  });
  var mainSlider = new Swiper(".tf-product-media-main-white", {
    spaceBetween: 0,
    // observer: true,
    // observeParents: true,
    navigation: {
      nextEl: ".thumbs-next-white",
      prevEl: ".thumbs-prev-white",
    },
    thumbs: {
      swiper: thumbsSlider,
    },

  });

}

if ($(".tf-sw-collection").length > 0) {
  var preview = $(".tf-sw-collection").data("preview");
  var tablet = $(".tf-sw-collection").data("tablet");
  var mobile = $(".tf-sw-collection").data("mobile");
  var spacingLg = $(".tf-sw-collection").data("space-lg");
  var spacingMd = $(".tf-sw-collection").data("space-md");
  var spacing = $(".tf-sw-collection").data("space");
  var loop = $(".tf-sw-collection").data("loop");
  var play = $(".tf-sw-collection").data("auto-play");
  var swiper = new Swiper(".tf-sw-collection", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    // observer: true,
    // observeParents: true,
    autoplay: play,
    slidesPerView: mobile,
    loop: loop,
    spaceBetween: spacing,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-collection",
      clickable: true,
    },
    slidesPerGroup: 1,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-collection",
      prevEl: ".nav-next-collection",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingMd,
        slidesPerGroup: 2,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        slidesPerGroup: 2,
      },
    },
  });
}

if ($(".tf-sw-lookbook").length > 0) {
  var preview = $(".tf-sw-lookbook").data("preview");
  var tablet = $(".tf-sw-lookbook").data("tablet");
  var mobile = $(".tf-sw-lookbook").data("mobile");
  var spacingLg = $(".tf-sw-lookbook").data("space-lg");
  var spacingMd = $(".tf-sw-lookbook").data("space-md");
  var swiper = new Swiper(".tf-sw-lookbook", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".sw-pagination-lookbook",
      clickable: true,
      
    },
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-lookbook",
      prevEl: ".nav-next-lookbook",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
      },
    },
  });
}

if ($(".tf-lookbook").length > 0) {
  var preview = $(".tf-lookbook").data("preview");
  var tablet = $(".tf-lookbook").data("tablet");
  var mobile = $(".tf-lookbook").data("mobile");
  var spacingLg = $(".tf-lookbook").data("space-lg");
  var spacingMd = $(".tf-lookbook").data("space-md");
  var swiper1 = new Swiper(".tf-lookbook", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    direction: "horizontal",
    pagination: {
      el: ".sw-pagination-lookbook",
      clickable: true,
    },
    navigation: {
      clickable: true,
      nextEl: ".prev-lookbook",
      prevEl: ".next-lookbook",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        direction: "vertical",
      },
    },
  });
  $(".swiper-button").click(function () {
    var slideIndex = $(this).data("slide");
    swiper1.slideTo(slideIndex,500,false);
  });
}

if ($(".tf-sw-testimonial").length > 0) {
  var preview = $(".tf-sw-testimonial").data("preview");
  var tablet = $(".tf-sw-testimonial").data("tablet");
  var mobile = $(".tf-sw-testimonial").data("mobile");
  var spacingLg = $(".tf-sw-testimonial").data("space-lg");
  var spacingMd = $(".tf-sw-testimonial").data("space-md");
  var swiper = new Swiper(".tf-sw-testimonial", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-testimonial",
      clickable: true,
    },
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-testimonial",
      prevEl: ".nav-next-testimonial",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
      },
    },
  });
}

if ($(".tf-sw-brand").length > 0) {
  var preview = $(".tf-sw-brand").data("preview");
  var tablet = $(".tf-sw-brand").data("tablet");
  var mobile = $(".tf-sw-brand").data("mobile");
  var spacingLg = $(".tf-sw-brand").data("space-lg");
  var spacingMd = $(".tf-sw-brand").data("space-md");
  var play = $(".tf-sw-brand").data("play");
  var loop = $(".tf-sw-brand").data("loop");
  var swiper = new Swiper(".tf-sw-brand", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-brand",
      clickable: true,
    },
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    loop: loop,
    autoplay: play,
    observer: true,
    observeParents: true,
    slidesPerGroup: 2,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-brand",
      prevEl: ".nav-next-brand",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
        slidesPerGroup: 3,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        slidesPerGroup: 3,
      },
    },
  });
}

if ($(".tf-sw-shop-gallery").length > 0) {
  var preview = $(".tf-sw-shop-gallery").data("preview");
  var tablet = $(".tf-sw-shop-gallery").data("tablet");
  var mobile = $(".tf-sw-shop-gallery").data("mobile");
  var spacingLg = $(".tf-sw-shop-gallery").data("space-lg");
  var spacingMd = $(".tf-sw-shop-gallery").data("space-md");
  var swiper = new Swiper(".tf-sw-shop-gallery", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-gallery",
      clickable: true,
    },
    slidesPerGroup: 2,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-gallery",
      prevEl: ".nav-next-gallery",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
        slidesPerGroup: 3,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        slidesPerGroup: 3,
      },
    },
  });
}

if ($(".tf-sw-mobile").length > 0) {
  var swiperMb;
  function initSwiper() {
    if (matchMedia("only screen and (max-width: 767px)").matches) {
      if (!swiperMb) {
        var preview = $(".tf-sw-mobile").data("preview");
        var spacing = $(".tf-sw-mobile").data("space");

        swiperMb = new Swiper(".tf-sw-mobile", {
          slidesPerView: preview,
          spaceBetween: spacing,
          speed: 1000,
          pagination: {
            el: ".sw-pagination-mb",
            clickable: true,
          },
          navigation: {
            clickable: true,
            nextEl: ".nav-prev-mb",
            prevEl: ".nav-next-mb",
          },
        });
      }
    } else {
      if (swiperMb) {
        swiperMb.destroy(true, true); 
        swiperMb = null; 
        $(".tf-sw-mobile .swiper-wrapper").removeAttr('style');
        $(".tf-sw-mobile .swiper-slide").removeAttr('style');
      }
    }
  }

  initSwiper();
  window.addEventListener("resize", function () {
    initSwiper();
  });
}


if ($(".tf-sw-mobile-1").length > 0) {
  var swiperMb1;
  function initSwiperMb() {
    if (matchMedia("only screen and (max-width: 767px)").matches) {
      if (!swiperMb1) {
        var preview = $(".tf-sw-mobile-1").data("preview");
        var spacing = $(".tf-sw-mobile-1").data("space");

        swiperMb1 = new Swiper(".tf-sw-mobile-1", {
          slidesPerView: preview,
          spaceBetween: spacing,
          speed: 1000,
          pagination: {
            el: ".sw-pagination-mb-1",
            clickable: true,
          },
          navigation: {
            clickable: true,
            nextEl: ".nav-prev-mb-1",
            prevEl: ".nav-next-mb-1",
          },
        });
      }
    } else {
      if (swiperMb1) {
        swiperMb1.destroy(true, true); 
        swiperMb1 = null; 
        $(".tf-sw-mobile-1 .swiper-wrapper").removeAttr('style');
        $(".tf-sw-mobile-1 .swiper-slide").removeAttr('style');
      }
    }
  }

  initSwiperMb();
  window.addEventListener("resize", function () {
    initSwiperMb();
  });
}


if ($(".tf-sw-product-sell-1").length > 0) {
  var preview = $(".tf-sw-product-sell-1").data("preview");
  var tablet = $(".tf-sw-product-sell-1").data("tablet");
  var mobile = $(".tf-sw-product-sell-1").data("mobile");
  var spacingLg = $(".tf-sw-product-sell-1").data("space-lg");
  var spacingMd = $(".tf-sw-product-sell-1").data("space-md");
  var perGroup = $(".tf-sw-product-sell-1").data("pagination");
  var perGroupMd = $(".tf-sw-product-sell-1").data("pagination-md");
  var perGroupLg = $(".tf-sw-product-sell-1").data("pagination-lg");
  var swiper = new Swiper(".tf-sw-product-sell-1", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-sell-1",
      clickable: true,
    },
    slidesPerGroup: perGroup,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-sell-1",
      prevEl: ".nav-next-sell-1",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
        slidesPerGroup: perGroupMd,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        slidesPerGroup: perGroupLg,
      },
    },
  });
}

if ($(".tf-sw-product-sell").length > 0) {
  var preview = $(".tf-sw-product-sell").data("preview");
  var tablet = $(".tf-sw-product-sell").data("tablet");
  var mobile = $(".tf-sw-product-sell").data("mobile");
  var spacingLg = $(".tf-sw-product-sell").data("space-lg");
  var spacingMd = $(".tf-sw-product-sell").data("space-md");
  var perGroup = $(".tf-sw-product-sell").data("pagination");
  var perGroupMd = $(".tf-sw-product-sell").data("pagination-md");
  var perGroupLg = $(".tf-sw-product-sell").data("pagination-lg");
  var swiper = new Swiper(".tf-sw-product-sell", {
    slidesPerView: mobile,
    spaceBetween: spacingMd,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-product",
      clickable: true,
    },
    slidesPerGroup: perGroup,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-product",
      prevEl: ".nav-next-product",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingLg,
        slidesPerGroup: perGroupMd,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        slidesPerGroup: perGroupLg,
      },
    },
  });
}

if ($(".tf-sw-recent").length > 0) {
  var preview = $(".tf-sw-recent").data("preview");
  var tablet = $(".tf-sw-recent").data("tablet");
  var mobile = $(".tf-sw-recent").data("mobile");
  var spacingLg = $(".tf-sw-recent").data("space-lg");
  var spacingMd = $(".tf-sw-recent").data("space-md");
  var spacing = $(".tf-sw-recent").data("space");
  var perGroup = $(".tf-sw-recent").data("pagination");
  var perGroupMd = $(".tf-sw-recent").data("pagination-md");
  var perGroupLg = $(".tf-sw-recent").data("pagination-lg");
  var swiper = new Swiper(".tf-sw-recent", {
    slidesPerView: mobile,
    spaceBetween: spacing,
    speed: 1000,
    pagination: {
      el: ".sw-pagination-recent",
      clickable: true,
    },
    slidesPerGroup: perGroup,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-recent",
      prevEl: ".nav-next-recent",
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacingMd,
        slidesPerGroup: perGroupMd,
      },
      1150: {
        slidesPerView: preview,
        spaceBetween: spacingLg,
        slidesPerGroup: perGroupLg,
      },
    },
  });
}

if ($(".tf-single-slide").length > 0) {
  var swiper = new Swiper(".tf-single-slide", {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      clickable: true,
      nextEl: ".single-slide-prev",
      prevEl: ".single-slide-next",
    },
  });
}


if ($(".flat-thumbs-testimonial").length > 0) {
  var previewThumbs = $(".tf-thumb-tes").data("preview");
  var spacingThumbs = $(".tf-thumb-tes").data("space");
  var thumbImg = new Swiper(".tf-thumb-tes", {
    speed: 500,

    spaceBetween: spacingThumbs,
    slidesPerView: previewThumbs,
    breakpoints: {
      768: {
        spaceBetween: spacingThumbs,
      },
    },
  });
  var preview = $(".tf-sw-tes-2").data("preview");
  var spacingMd = $(".tf-sw-tes-2").data("space-md");
  var spacingLg = $(".tf-sw-tes-2").data("space-lg");
  var swiperThumbs = new Swiper(".tf-sw-tes-2", {
    speed: 500,
    slidesPerView: preview,
    spaceBetween: spacingMd,
    navigation: {
      nextEl: ".nav-prev-tes-2",
      prevEl: ".nav-next-tes-2",
    },
   
    pagination: {
      el: ".sw-pagination-tes-2",
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: spacingLg,
      },
    },
  });
  thumbImg.controller.control = swiperThumbs;
  swiperThumbs.controller.control = thumbImg;
}

if ($(".tf-cart-slide").length > 0) {
  var swiper = new Swiper(".tf-cart-slide", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".cart-slide-pagination",
      clickable: true,
    },
  });
}

if ($(".tf-product-header").length > 0) {
  var swiper = new Swiper(".tf-product-header", {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      clickable: true,
      nextEl: ".nav-prev-product-header",
      prevEl: ".nav-next-product-header",
    },
  });
}