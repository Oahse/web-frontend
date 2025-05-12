import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js';
import PhotoSwipe from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js';

(function ($) {
    "use strict";

    // Reusable function to initialize Swipers for different product galleries
    function initializeSwiper(thumbsSelector, mainSelector, nextSelector, prevSelector) {
        var direction = $(thumbsSelector).data("direction");
        var thumbs = new Swiper(thumbsSelector, {
            spaceBetween: 10,
            slidesPerView: "auto",
            freeMode: true,
            direction: "vertical",
            watchSlidesProgress: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                0: {
                    direction: "horizontal",
                    slidesPerView: 5,
                },
                1150: {
                    direction: direction,
                },
            },
            450: {
                direction: "vertical",
            },
        });
        var main = new Swiper(mainSelector, {
            spaceBetween: 0,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: nextSelector,
                prevEl: prevSelector,
            },
            thumbs: {
                swiper: thumbs,
            },
        });

        // Update color button based on the active slide
        function updateActiveColorButton(activeIndex) {
            $(".color-btn").removeClass("active");
            var currentSlide = $(mainSelector + " .swiper-slide").eq(activeIndex);
            var currentColor = currentSlide.data("color");
            if (currentColor) {
                $(".color-btn[data-color='" + currentColor + "']").addClass("active");
                $('.value-currentColor').text(currentColor);
                $(".select-currentColor").text(currentColor);
            }
        }

        main.on('slideChange', function () {
            updateActiveColorButton(this.activeIndex);
        });

        // Function to scroll to the correct slide and thumb based on color
        function scrollToColor(color) {
            var matchingSlides = $(mainSelector + " .swiper-slide").filter(function() {
                return $(this).data("color") === color;
            });
            if (matchingSlides.length > 0) {
                var firstIndex = matchingSlides.first().index();
                main.slideTo(firstIndex, 1000, false);
                thumbs.slideTo(firstIndex, 1000, false);
            }
        }

        $(".color-btn").on("click", function () {
            var color = $(this).data("color");
            $(".color-btn").removeClass("active");
            $(this).addClass("active");
            scrollToColor(color);
        });
        updateActiveColorButton(main.activeIndex);
    }

    // Initialize multiple Swipers
    if ($(".thumbs-slider").length > 0) initializeSwiper(".tf-product-media-thumbs", ".tf-product-media-main", ".thumbs-next", ".thumbs-prev");
    if ($(".thumbs-slider1").length > 0) initializeSwiper(".tf-product-media-thumbs1", ".tf-product-media-main1", ".thumbs-next1", ".thumbs-prev1");
    if ($(".thumbs-slider2").length > 0) initializeSwiper(".tf-product-media-thumbs2", ".tf-product-media-main2", ".thumbs-next2", ".thumbs-prev2");
    if ($(".thumbs-slider3").length > 0) initializeSwiper(".tf-product-media-thumbs3", ".tf-product-media-main3", ".thumbs-next3", ".thumbs-prev3");
    if ($(".thumbs-slider4").length > 0) initializeSwiper(".tf-product-media-thumbs4", ".tf-product-media-main4", ".thumbs-next4", ".thumbs-prev4");

    // Function for image zoom (generic function)
    function initializeImageZoom() {
        if (matchMedia("only screen and (min-width: 768px)").matches) {
            var zoomElements = document.querySelectorAll('.tf-image-zoom, .tf-image-zoom1');
            zoomElements.forEach(function(el) {
                new Drift(el, {
                    zoomFactor: 2,
                    inlinePane: false,
                    handleTouch: false,
                    hoverBoundingBox: true,
                    containInline: true,
                });
            });
        }
    }

    // Image zoom magnifier
    function initializeImageZoomMagnifier() {
        var driftAll = document.querySelectorAll('.tf-image-zoom-magnifier');
        driftAll.forEach(function(el) {
            new Drift(el, {
                zoomFactor: 2,
                inlinePane: true,
                containInline: false,
            });
        });
    }

    // Image zoom for inner zoom container
    function initializeImageZoomInner() {
        var driftAll = document.querySelectorAll('.tf-image-zoom-inner');
        var pane = document.querySelector('.tf-product-zoom-inner');
        driftAll.forEach(function(el) {
            new Drift(el, {
                paneContainer: pane,
                zoomFactor: 2,
                inlinePane: false,
                containInline: false,
            });
        });
    }

    // Initialize Lightbox
    function initializeLightbox(galleryId) {
        const lightbox = new PhotoSwipeLightbox({
            gallery: galleryId,
            children: 'a',
            pswpModule: PhotoSwipe,
            bgOpacity: 1,
            secondaryZoomLevel: 2,
            maxZoomLevel: 3,
        });
        lightbox.init();
    }

    // Initialize all lightboxes
    function initializeLightboxes() {
        initializeLightbox('#gallery-started');
        initializeLightbox('#gallery-swiper-started');
        initializeLightbox('#gallery-swiper-started1');
        initializeLightbox('#gallery-swiper-started2');
        initializeLightbox('#gallery-swiper-started3');
        initializeLightbox('#gallery-swiper-started4');
    }

    // Model viewer functionality
    function initializeModelViewer() {
        if ($(".tf-model-viewer").length) {
            $(".tf-model-viewer-ui-button").on("click", function (e) {
                $(this).closest(".tf-model-viewer").find("model-viewer").removeClass("disabled");
                $(this).closest(".tf-model-viewer").toggleClass("active");
            });
            $(".tf-model-viewer-ui").on("dblclick", function (e) {
                $(this).closest(".tf-model-viewer").find("model-viewer").addClass("disabled");
                $(this).closest(".tf-model-viewer").toggleClass("active");
            });
        }
    }

    // Initialize everything on DOM ready
    $(function () {
        section_zoom();
        initializeImageZoom();
        initializeImageZoomMagnifier();
        initializeImageZoomInner();
        initializeLightboxes();
        initializeModelViewer();
    });

    // Zoom effect for section images
    function section_zoom() {
        $(".tf-image-zoom").on("mouseover", function () {
            $(this).closest(".section-image-zoom").addClass("zoom-active");
        });
        $(".tf-image-zoom").on("mouseleave", function () {
            $(this).closest(".section-image-zoom").removeClass("zoom-active");
        });
    }
})(jQuery);
