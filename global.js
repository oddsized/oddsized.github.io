jQuery(function($){

// https://idangero.us/swiper/demos/
//https://idangero.us/swiper/api/#pagination
var menu = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];
var swiperV = new Swiper('.swiper-container-v', {
  direction: 'vertical',
  spaceBetween: 0,
  hashNavigation: {
    replaceState: true,
    watchState: true,
  },
  mousewheel: true,
  speed: 600,
  autoplay: {
    delay: 2000
  },
  parallax: true,
  loop: true,
  pagination: {
  	el: '#topbar',
    clickable: true,
   	renderBullet: function (index, className) {
    	return '<span class="' + className + '">' + (menu[index]) + '</span>';
    },
  },
});

var swiperH = new Swiper('.swiper-container-h', {
  direction: 'horizontal',
  loop: true,
  speed: 600,
  parallax: true,
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination-h',
    //type: 'fraction',
    clickable: true,
  },
  slidesPerView: 1,
  //slidesPerColumn: 2,
  spaceBetween: 0,
  // Responsive breakpoints
  breakpointsInverse: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 480px
    560: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    // when window width is >= 640px
    960: {
      slidesPerView: 5,
      spaceBetween: 20
    }
  },

 keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  /*

  mousewheel: {
  	enabled: false,
  },
  keyboard: {
  	enabled: true,
  },
  */
});


var fetchUrlData = function( url, el, callback ) {

	$.ajax({
          url: url, // json data
          contentType: 'application/json',
          dataType: 'json', // ? change this to jsonp if it is a cross org. req.
          contentType: 'json',
          success: function(json) {
              //console.log(json);
              createList(json, el);
              callback();
          }
	});

}

var createList = function(obj, el) {

	var list;
	if(obj.data){
    list = obj.data;
  }else if(obj.list){
     list = obj.list;
  }else{
     list = obj;
  }

  $.each(list, function(index, value) { //var data = JSON.stringify(value);
  	var item = $('<div class="swiper-slide color-3" data-swiper-parallax="-300">'+index + " - " + value.title.rendered+'</div>');
    $(el).append( item );
  });

};

// https://v2.wp-api.org/reference/categories/
wpposturl = 'https://www.webdesigndenhaag.net';
fetchUrlData( wpposturl+'/wp-json/wp/v2/posts?filter[categories]=portfolio&per_page=10&orderby=date&order=desc', '#itemlist', function(){
	swiperH.update();
});

var pageurl = 'https://webbouwer.org/blog/wp-json/wp/v2/pages';
var pagebox = "#pagelist";
$.ajax({
          url: pageurl, // json data
          contentType: 'application/json',
          dataType: 'json', // ? change this to jsonp if it is a cross org. req.
          contentType:'json',
          success: function(json) {
            //console.log(json);
            createList(json, pagebox);
            callback();

          }
	});

  var createPageList = function(obj, el) {

  	var list;
  	if(obj.data){
      list = obj.data;
    }else if(obj.list){
       list = obj.list;
    }else{
       list = obj;
    }

    $.each(list, function(index, value) { //var data = JSON.stringify(value);
      var item = $('<div class="page-container" data-swiper-parallax="-300">'+index + " - " + value.title.rendered+'</div>');
      $(el).append( item );
    });

  };


});
