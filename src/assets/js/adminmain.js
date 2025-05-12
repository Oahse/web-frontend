/**
    * selectImages
    * menuleft
    * tabs
    * progresslevel
    * collapse_menu
    * fullcheckbox
    * showpass
    * gallery
    * coppy
    * select_colors_theme
    * icon_function
    * box_search
*/

; (function ($) {

    "use strict";
  
    var selectImages = function () {
      if ($(".image-select").length > 0) {
        const selectIMG = $(".image-select");
        selectIMG.find("option").each((idx, elem) => {
          const selectOption = $(elem);
          const imgURL = selectOption.attr("data-thumbnail");
          if (imgURL) {
            selectOption.attr(
              "data-content",
              "<img src='%i'/> %s"
                .replace(/%i/, imgURL)
                .replace(/%s/, selectOption.text())
            );
          }
        });
        selectIMG.selectpicker();
      }
    };
  
    var tabs = function(){
      $('.widget-tabs').each(function(){
          $(this).find('.widget-content-tab').children().hide();
          $(this).find('.widget-content-tab').children(".active").show();
          $(this).find('.widget-menu-tab').find('li').on('click',function(){
              var liActive = $(this).index();
              var contentActive=$(this).siblings().removeClass('active').parents('.widget-tabs').find('.widget-content-tab').children().eq(liActive);
              contentActive.addClass('active').fadeIn("slow");
              contentActive.siblings().removeClass('active');
              $(this).addClass('active').parents('.widget-tabs').find('.widget-content-tab').children().eq(liActive).siblings().hide();
          });
      });
    };
  
    $('ul.dropdown-menu.has-content').on('click', function(event){
      event.stopPropagation();
    });
    $('.button-close-dropdown').on('click', function(){
      $(this).closest('.dropdown').find('.dropdown-toggle').removeClass('show');
      $(this).closest('.dropdown').find('.dropdown-menu').removeClass('show');
    });
  
    
  
    var select_colors_theme = function () {
      if ($('div').hasClass("select-colors-theme")) {
        $(".select-colors-theme .item").on("click", function (e) {
          $(this).parents(".select-colors-theme").find(".active").removeClass("active");
          $(this).toggleClass("active");
        })
      }
    }
  
    var icon_function = function () {
      if ($('div').hasClass("list-icon-function")) {
        $(".list-icon-function .trash").on("click", function (e) {
          $(this).parents(".item-row").remove();
        })
      }
    }
  
  
  
    var variant_picker = function () {
      if ($(".variant-picker-item").length) {
        $(".variant-picker-item label").on("click", function (e) {
          $(this)
            .closest(".variant-picker-item")
            .find(".variant-picker-label-value")
            .text($(this).data("value"));
        });
      }
    };
  
  
    
  
    // Dom Ready
    $(function () {
      selectImages();
      tabs();
      select_colors_theme();
      icon_function();
      variant_picker();
      
    });
  
  })(jQuery);
  