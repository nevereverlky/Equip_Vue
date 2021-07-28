
$(function() {
  "use strict";


//sidebar menu js
  $.sidebarMenu($('.sidebar-menu'));

// === toggle-menu js
  $(".toggle-menu").on("click", function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

// === sidebar menu activation js

  $(function() {
    for (var i = window.location, o = $(".sidebar-menu a").filter(function() {
      return this.href == i;
    }).addClass("active").parent().addClass("active"); ;) {
      if (!o.is("li")) break;
      o = o.parent().addClass("in").parent().addClass("active");
    }
  }),




    /* Back To Top */

    $(document).ready(function(){
      $(window).on("scroll", function(){
        if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn();
        } else {
          $('.back-to-top').fadeOut();
        }
      });

      $('.back-to-top').on("click", function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
      });
    });


  // page loader

  $(window).on('load', function(){

    $('#pageloader-overlay').fadeOut(1000);

  })


  $(function () {
    $('[data-toggle="popover"]').popover()
  })


  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


  // theme setting
  $(".switcher-icon").on("click", function(e) {
    e.preventDefault();
    $(".right-sidebar").toggleClass("right-toggled");
  });

  $('#theme1').click(theme1);
  $('#theme2').click(theme2);
  $('#theme3').click(theme3);
  $('#theme4').click(theme4);
  $('#theme5').click(theme5);
  $('#theme6').click(theme6);
  $('#theme7').click(theme7);
  $('#theme8').click(theme8);
  $('#theme9').click(theme9);
  $('#theme10').click(theme10);
  $('#theme11').click(theme11);
  $('#theme12').click(theme12);

  function theme1() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme1');
  }

  function theme2() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme2');
  }

  function theme3() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme3');
  }

  function theme4() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme4');
  }

  function theme5() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme5');
  }

  function theme6() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme6');
  }

  function theme7() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme7');
  }

  function theme8() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme8');
  }

  function theme9() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme9');
  }

  function theme10() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme10');
  }

  function theme11() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme11');
  }

  function theme12() {
    $('#sidebar-wrapper').attr('class', 'bg-theme bg-theme12');
  }




});
