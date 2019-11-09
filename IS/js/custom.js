window.onload = function () {
  let preloader = document.querySelector('#preloader');
  preloader.style.display = 'none';
}

// Хеадер меню
//Кликаем по hide-nav происходит событие
$(document).on('click', '.hide-nav', function () {

  //вставляем в переменную hide-nav
  let hideNav = $('.hide-nav');

  //вставляем в переменную меню которое будет искать
  let nav = $('.nav-column');

  //При нажатие на hide-nav добавляется класс active
  $(hideNav).toggleClass('active');

  // Делаем условие : if=если меню не видно и оно скрыто то при нажатие будет вскрываться
  if (nav.is(':visible')) {
    nav.slideUp();

    // в противном случае оно будет прятаться 
  } else {
    nav.slideDown();
  }
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  arrows: true,
  direction: 'vertical',
  freeMode: false,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.swiper-button-firstup',
    prevEl: '.swiper-button-firstdown',
  },
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,

  thumbs: {
    swiper: galleryThumbs
  }
});

// $(document).ready(function(){

//   $('ul.tabs li').click(function(){
//     var tab_id = $(this).attr('rel');

//     $(this).addClass('tab_content-active')
//       .siblings().removeClass('tab_content-active');
//     $("#"+tab_id).addClass('tab_content-active')
//       .siblings().removeClass('tab_content-active');
//   })

// })


// ТАБЫ
/* if in tab mode */
$("ul.tabs li").click(function () {

  $(".tab_content").removeClass("tab_content-active");
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).addClass("tab_content-active");

  $("ul.tabs li").removeClass("tab_content-active");
  $(this).addClass("tab_content-active");

  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

});

/* if in drawer mode */
$(".tab_drawer_heading").click(function () {

  $(".tab_content").removeClass("tab_content-active");
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).addClass("tab_content-active");

  $(".tab_drawer_heading").removeClass("d_active");
  $(this).addClass("d_active");

  $("ul.tabs li").removeClass("tab_content-active");
  $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("tab_content-active");
});


/* Extra class "tab_last" 
   to add border to right side
   of last tab */
$('ul.tabs li').last().addClass("tab_last");
// КОНЕЦ табов
// нижний слайдер
var mySwiper = new Swiper('.catalog', {
  slidesPerView: 5,
  spaceBetween: 4,
  loop: false,
  arrows: false,
  navigation: {
    nextEl: '.swiper-button-left',
    prevEl: '.swiper-button-right',
  },

  infinite: false,
  breakpoints: {
    1300: {
      slidesPerView: 5
    },
    1000: {
      slidesPerView: 4
    },
    800: {
      slidesPerView: 3
    },
    550: {
      slidesPerView: 2
    },
    300: {
      slidesPerView: 1
    },


  }


});



function myFunction() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("myBtn");
  // let inText = documet.getComputedStyle("document.information-leftblock-maintext",":before");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Показать полное описание ∨";
    moreText.style.display = "none";
    // inText.display= "inline"
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Скрыть полное описание ^";
    moreText.style.display = "inline";
    // inText:before.display= "none"
  }

}
// Слайдер с видео 
let swiper = new Swiper('.swiper-videocontainer', {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-prevvideo',
    prevEl: '.swiper-button-nextvideo',
  },
});

$(document).ready(function () {
  $('.popup-firstmodal').magnificPopup();

});
$(document).ready(function () {
  $('.popup-secondmodal').magnificPopup();

});

function findVideos() {
  let videos = document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}
// Конец слайдера с видео 
// Начало видео с ютуба
function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
// конец видео с ютуба
// Аккордион 
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || true;

    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click',
      { el: this.el, multiple: this.multiple },
      this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      //this is the ul.submenuItems
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
    }
  }

  var accordion = new Accordion($('.accordion-menu'), false);
})
// конец акордион
$('.category-slider-wrapper').slick({
  nextArrow: '.slider-arrow__prev',
        prevArrow: '.slider-arrow__next',
});
// бегунок


$(function () {
  $("#range-area").slider({
    range: true,
    min: 0,
    max: 150000,
    values: [75, 1300000],
    slide: function (event, ui) {
      $("#amount-area-min").val(ui.values[0]);
      $("#amount-area-max").val(ui.values[1]);
    }
  });
  $("#amount-area-min").val($("#range-area").slider("values", 0));
  $("#amount-area-max").val($("#range-area").slider("values", 1));
});


$('.numeric-button').on('click', function () {
  $('button').removeClass('numeric-button-active');
  $(this).addClass('numeric-button-active');
});
$('.page-switching-button').on('click', function () {
  $('button').removeClass('page-switching-active');
  $(this).addClass('page-switching-active');
});




// Модалка корзины
$(document).ready(function () {
  $('.modal-basket-modal').magnificPopup();

});
// Модалка травосборника
$(document).ready(function () {
  $('.modal-secondmodal').magnificPopup();

});

  $(document).ready(function() {
      $('.minus').click(function () {
          var $input = $(this).parent().find('input');
          var count = parseInt($input.val()) - 1;
          count = count < 1 ? 1 : count;
          $input.val(count);
          $input.change();
          return false;
      });
      $('.plus').click(function () {
          var $input = $(this).parent().find('input');
          $input.val(parseInt($input.val()) + 1);
          $input.change();
          return false;
      });
  });


function viewDiv(){
  document.getElementById("div1").style.display = "block";
  };

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  
  var deadline="January 01 2018 00:00:00 GMT+0300"; //for Ukraine
  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
  initializeClock('countdown', deadline);






