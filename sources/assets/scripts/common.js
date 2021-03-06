// console 객체가 없을 경우
if (!window.console) {
	window.console = {
		log : function(){},
		dir : function(){}
	};
} else if (!window.console.dir){
	window.console.dir = function(){};
}


(function(){
	$(document).ready(function(){
		var agents = [/(opr|opera)/gim,/(chrome)/gim,/(firefox)/gim,/(safari)/gim,/(msie[\s]+[\d]+)/gim,/(trident).*rv:(\d+)/gim];
		var agent = navigator.userAgent.toLocaleLowerCase();
		for(var ag in agents){
			if(agent.match(agents[ag])){
				$(document.body).addClass(String(RegExp.$1+RegExp.$2).replace(/opr/,'opera').replace(/trident/,'msie').replace(/\s+/,''));
				break;
			}
		}
	});
})();



$(document).ready(function(e) {
	Menus.init();
	Slider.init();
	Video.init();

	// icheck
	$('.select-video input[type=radio]').iCheck();
	$('.radios input[type=radio]').iCheck();

	// placeholder
	$('.writer textarea').phImage();
});


/* header - gnb */
var Menus = (function($) {
	var scope,
		$menuContainer,
		$btnMenus,
		init = function () {
			$menuContainer = $('nav.menus');
			$btnMenus = $menuContainer.find('a[href^="#"]');
			
			initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function initEvent() {
		$(window).on("scroll", onScroll);

		$btnMenus.on('click', function (e) {
			e.preventDefault();

			$(window).off("scroll");

			$btnMenus.each(function () {
			    $(this).removeClass('is-selected');
			});
			$(this).addClass('is-selected');

			var target = this.hash,
				menu = target;
			$target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - 79
			}, 500, 'swing', function () {
				$(window).on("scroll", onScroll);
				window.location.hash = target;
			});
		});
	}

	function onScroll(event){
		var scrollPos = $(document).scrollTop() <= 0 ? 0 : $(document).scrollTop() + 79;
		$('.menus a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));

			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.menus a').removeClass("is-selected");
				currLink.addClass("is-selected");
			}
			else{
				currLink.removeClass("is-selected");
			}
		});
	}

	return {
		init: function () {
			init();
		}
	};
}(jQuery));



/* video */
var Video = (function(e) {
	var scope,
		$videoContainer,
		$video,
		$description,
		$btnItems,
		currentIndex = 2,
		isFirst = true,
		data = [
			{
				title : '창업 이야기',
				desc : '외식업에 관심이 있는 당신을 위해 삼양은 최고의 식자재와 전문적인 컨설팅을 지원합니다.',
				cssClass : 'story-founded',
				iframe : '<iframe id="video-frame" width="100%" height="100%" src="//www.youtube.com/embed/C4zAzDM95KA?version=3&loop=1&autoplay=0&rel=0&showinfo=0&controls=1&autohide=1" frameborder="0" allowfullscreen></iframe>'
			},
			{
				title : '건강 이야기',
				desc : '당신이 언제나 건강할 수 있도록 삼양은 생명공학, 의약분야에 첨단 치료기술을 개발하고 있습니다.',
				cssClass : 'story-health',
				iframe : '<iframe id="video-frame" width="100%" height="100%" src="//www.youtube.com/embed/WYwQ7-Thj-g?version=3&loop=1&autoplay=0&rel=0&showinfo=0&controls=1&autohide=1" frameborder="0" allowfullscreen></iframe>'
			},
			{
				title : '자동차 이야기',
				desc : '당신의 편리한 생활을 만들기 위해 삼양은 엔지니어링 플라스틱 소재를 개발하고 있습니다.',
				cssClass : 'story-car',
				iframe : '<iframe id="video-frame" width="100%" height="100%" src="//www.youtube.com/embed/KOUtSIVoNpE?version=3&loop=1&autoplay=0&rel=0&showinfo=0&controls=1&autohide=1" frameborder="0" allowfullscreen></iframe>'
			}
		],
		init = function () {
			$videoContainer = $('.video-container');
			$video = $videoContainer.find('.video');
			$description = $videoContainer.find('.description');
			$btnItems = $videoContainer.find('> a.btn');

			initLayout();
			initEvent();
		};

	function initLayout() {
		resetLayout(currentIndex);
	}

	function initEvent() {
		$btnItems.on('click', function(e) {
			e.preventDefault();

			var target = this.hash.split('#').pop();
			isFirst = true;
			resetLayout(target);
		});
	}

	function resetLayout(targetIndex) {
		beforeLayout(function() {
			currentIndex = targetIndex;

			$video.html(data[currentIndex].iframe);
			$btnItems.each(function(index) {
				var target = this.hash.split('#').pop();
				
				if( currentIndex == target ) {
					strDesc = '';
					strDesc += '<div class="' + data[currentIndex].cssClass + '">';
					strDesc += '	<h3>' + data[currentIndex].title + '</h3>';
					strDesc += '	<p>' + data[currentIndex].desc + '</p>';
					strDesc += '</div>';

					$(this).css('left', '449');
					$description.html(strDesc);
					$description.stop().fadeIn('500', 'swing');
				} else if( isFirst ) {
					// left
					isFirst = false;
					$(this).stop().animate({
						'left': '46'
					}, 1000, 'swing', function () {
					});
				} else {
					// right
					$(this).stop().animate({
						'left': '944'
					}, 1000, 'swing', function () {
					});
				}
			});
		});
	}

	function beforeLayout(callback) {
		$description.stop().fadeOut('500', 'swing');

		$btnItems.each(function(index) {
			$(this).stop().animate({
				'left': '449'
			}, 500, 'swing', function () {
			});
		}).promise().done(function () {
			$video.empty();
			callback();
		});
	}

	return {
		init: function() {
			init();
		}
	};
}(jQuery));



/* slider */
var Slider = (function($) {
	var scope,
		$sliderContainer,
		options = {
			infinite: true,
			dots: true,
			arrows: true,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
            prevArrow: '<button type="button" class="btn-slider prev">이전</button>',
            nextArrow: '<button type="button" class="btn-slider next">다음</button>',
            customPaging : function(slider, i) {
                var thumbTxt = $(slider.$slides[i]).data('thumb');
                var thumbClass = $(slider.$slides[i]).data('thumb-class');
                return '<button type="button" class="">' + i + '</button>';
            },
		},
		init = function () {
			$sliderContainer = $('.list-comments.type-card');
			
			initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function initEvent() {
		$sliderContainer.slick(options);
	}

	return {
		init: function () {
			init();
		}
	};
}(jQuery));



