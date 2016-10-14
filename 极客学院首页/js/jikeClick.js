/*******************************
这是click事件文件click.js
 ********************************/

define(function(require, exports, module) {
	// exports.doSomething = ...
	exports.clickEvent = function() {
		/*
		 *初始化数据，这里4个点击事件功能一样
		 *就将初始化数据放在4个不同的对象中
		 *elem：记录点击时获取控制对应的对象
		 *moveLeftCount：移动计数
		 *theLength：elem的个数，elem个数最好比html中可显示的elem个数多于2个，
		 *这样的动画效果比较好，数量不足可在html复制多一份elem，使length*2
		 *theWidth：elem的宽度
		 *thePos：：每个elem放置位置
		 */
		var work = {
			elem: $(".lesson-list").children('li'),
			moveLeftCount: 0,
		};
		work.theLength = work.elem.length;
		work.theWidth = work.elem.eq(0).width();
		work.thePos = getOriginPos(work);
		// console.log(work);
		var enterprise = {
			elem: $("#enterprise a.swiper-slide"),
			moveLeftCount: 0,
		};
		enterprise.theLength = enterprise.elem.length;
		enterprise.theWidth = enterprise.elem.eq(0).width();
		enterprise.thePos = getOriginPos(enterprise);
		// console.log(enterprise);
		var university = {
			elem: $('#university a.swiper-slide'),
			moveLeftCount: 0,
		};
		university.theLength = university.elem.length;
		university.theWidth = university.elem.eq(0).width();
		university.thePos = getOriginPos(university);
		//console.log(university);
		//
		var newsReport = {
			elem: $('#news-report a.swiper-slide'),
			moveLeftCount: 0,
		};
		newsReport.theLength = newsReport.elem.length;
		newsReport.theWidth = newsReport.elem.eq(0).width();
		newsReport.thePos = getOriginPos(newsReport);
		//console.log(newsReport);
		if ($(window).scrollTop() > 1) {
			$('.top').show();
		} else {
			$('.top').hide();
		};
		/*
		 *focuswork-wrap下的点击事件
		 */
		var workClick = {
			clickLeft: $("#work-left").on("click", function() {
				work.moveLeftCount++;
				moveLeft(work, 200);
			}),
			clickRight: $("#work-right").on("click", function() {
				work.moveLeftCount--; //右移时可看作左移减数
				moveLeft(work, 200);
			})
		};

		/*
		 *enterprise下的点击事件
		 */
		var enterpriseClick = {
			clickLeft: $("#banner-left3").on("click", function() {
				enterprise.moveLeftCount++;
				moveLeft(enterprise, 400);
			}),
			clickRight: $("#banner-right3").on("click", function() {
				enterprise.moveLeftCount--;
				moveLeft(enterprise, 400);
			})
		}

		/*
		 *university下的点击事件
		 */
		var universityClick = {
			clickLeft: $("#banner-left2").on("click", function() {
				university.moveLeftCount++;
				moveLeft(university, 400);
			}),
			clickRight: $("#banner-right2").on("click", function() {
				university.moveLeftCount--;
				moveLeft(university, 400);
			})
		};

		/*
		 *媒体报道的点击事件
		 */
		var newsClick = {
			clickLeft: $("#banner-left4").on("click", function() {
				newsReport.moveLeftCount++;
				moveLeft(newsReport, 400);
			}),
			clickRight: $("#banner-right4").on("click", function() {
				newsReport.moveLeftCount--;
				moveLeft(newsReport, 400);
			})
		};
		/*
		其他click函数
		 */
		var otherClick = {
			gotop: $('.top').on('click', function() {
				$('html,body').animate({
					scrollTop: '0px'
				}, 800);
				$(this).hide();
			}),
			gotopShow: $(window).scroll(function() {
				if ($(window).scrollTop() > 1) {
					$('.top').show();
				} else {
					$('.top').hide();
				}
			}),
			qrcodeClose: $(".top-apprwm>span>img").on('click', function() {
				$(".top-apprwm").hide();
			}),
			adClose: $('.close').on('click', function() {
				$(this).parent('div').hide();
			}),
		};

		/*
		 *左移函数
		 */

		function moveLeft(obj, time) {
			if (obj.moveLeftCount >= obj.theLength) {
				obj.moveLeftCount -= obj.theLength;
			} else if (obj.moveLeftCount < 0) {
				obj.moveLeftCount += obj.theLength;
			}
			obj.elem.each(function(index, value) {
				if ((index - obj.moveLeftCount + obj.theLength) % obj.theLength == (obj.theLength - 1) || (index - obj.moveLeftCount + obj.theLength) % obj.theLength == 0) {
					obj.elem.eq(index).css(obj.thePos[(index - obj.moveLeftCount + obj.theLength) % obj.theLength]);
				} else {
					obj.elem.eq(index).animate(obj.thePos[(index - obj.moveLeftCount + obj.theLength) % obj.theLength], time);
				}
			})
		}

		/*
		 *初始化位置，并返回位置数组
		 */
		function getOriginPos(obj) {
			var orginPos = [];
			for (var i = 0; i < obj.theLength; i++) {
				orginPos[i] = {
					position: "absolute",
					left: (i - 2) * obj.theWidth + "px",
					top: 0,
				};
				obj.elem.eq(i).css(orginPos[i]);
			}
			return orginPos;
		}
	}


});