/*****************************************
这是hover效果的设置文件HoverEvent.js
 *****************************************/
define(function(require, exports, module) {

  // exports.doSomething = ...
  exports.hoverEvent = function(){
  	/*
	nav导航条的hover效果
	 */
	var navHover = {
		mouseEnter: $("a[node-type='nav-link']").on('mouseenter', function() {
			var index = $("a[node-type='nav-link']").index(this);
			// alert(index);
			$(".panel-item").eq(index).css({
				background: '#f7f7f7',
			});
			$(".panel-item").eq(index).children(".angle").show();
		}),
		mouseLeave: $("a[node-type='nav-link']").on('mouseleave', function() {
			var index = $("a[node-type='nav-link']").index(this);
			// alert(index);
			$(".panel-item").eq(index).removeAttr('style');
			$(".panel-item").eq(index).children(".angle").removeAttr('style');
		})
	};

	/*
	轮播图片下的课程
	 */
	var course = {
		mouseEnter: $(".focuswork-wrap").on("mouseenter", function() {
			$("#work-left").show(200);
			$("#work-right").show(200);
		}),
		mouseLeave: $(".focuswork-wrap").on("mouseleave", function() {
			$("#work-left").hide(200);
			$("#work-right").hide(200);
		})
	};
	/*
	左右箭嘴的样式改变
	 */
	var arrow = {
		leftEnter: $(".arrow-left").on("mouseenter", function() {
			$(this).addClass("arrow-left2").removeClass('arrow-left');
		}),
		rightEnter: $(".arrow-right").on("mouseenter", function() {
			$(this).addClass("arrow-right2").removeClass('arrow-right');
		}),
		leftLeave: $(document).on('mouseleave', '.arrow-left2', function() {
			$(this).addClass("arrow-left").removeClass('arrow-left2');
		}),
		rightLeave: $(document).on('mouseleave', '.arrow-right2', function() {
			$(this).addClass("arrow-right").removeClass('arrow-right2');
		})
	};
	/*
	右边的recommend-move-event
	 */
	var recommendMove = {
		moveEvent: $("li[node-type='recommend-move-event']").on('mouseenter', function() {
			$('.start-list').hide();
			$('.move-list').show();
			var index = $("li[node-type='recommend-move-event']").index(this);
			$("li[node-type='recommend-tab-item']").eq(index).addClass("active");
			$("ul[node-type='recommend-tab-content']").eq(index).show();
		}),
		moveList: $(".move-list").on('mouseleave', function() {
			$('.start-list').show();
			$('.move-list').hide();
			$("li[node-type='recommend-tab-item']").removeClass("active");
			$("ul[node-type='recommend-tab-content']").hide();
		}),
		tabItem: $("li[node-type='recommend-tab-item']").on('mouseenter', function() {
			$("li[node-type='recommend-tab-item']").removeClass('active');
			$("ul[node-type='recommend-tab-content']").hide();
			$(this).addClass('active');
			var index = $("li[node-type='recommend-tab-item']").index(this);
			$("ul[node-type='recommend-tab-content']").eq(index).show();
		}),
	};
	/*
	live-box的hover标签切换
	 */
	$('.livebox-week-day').on('mouseenter', function() {
		$('.livebox-week-day').removeClass('weekactive');
		$('.livebox-lesson-list').removeClass('lessonshow');
		$(this).addClass('weekactive');
		var index = $(".livebox-week-day").index(this);
		$('.livebox-lesson-list').eq(index).addClass('lessonshow');
	});
	/*
	hot-lesson的标签切换
	 */
	var hotLesson = $('.hot-lesson>ul>li').on('mouseenter', function() {
		var lesson = $('.hot-lesson>ul>li');
		lesson.removeClass('on');
		$(this).addClass('on');
		$('.one-classfiy-lesson').hide();
		var index = lesson.index(this);
		$('.one-classfiy-lesson').eq(index).show();
	});
	/*
	lesson-list的slide效果
	 */
	var lessonList = {
		mouseEnter: $('.lesson-list>ul>li').on('mouseenter', function() {
			var lesson_infor = $(this).children('.lesson-infor');
			lesson_infor.animate({
				height: "175px",
			}, 400);
			lesson_infor.children('p').show();
			lesson_infor.children('p').animate({
					height: "52px",
					opacity: "1",
					display: "block"
				},
				400);
			var div = lesson_infor.children('.timeandicon').children('div');
			var div0 = div.eq(0);
			var div1 = div.eq(1);
			div0.children('dl').children('.zhongji').show();
			div0.children('.learn-number').show();
			div1.children('.lessonicon-box').css({
				bottom: '-2px',
			});
		}),
		mouseLeave: $('.lesson-list>ul>li').on('mouseleave', function() {
			var lesson_infor = $(this).children('.lesson-infor');
			lesson_infor.animate({
				height: "88px",
			}, 400);
			lesson_infor.children('p').animate({
					height: "0px",
					opacity: "0",
					display: "none"
				},
				400,
				function() {
					lesson_infor.children('p').hide();
				});
			var div = lesson_infor.children('.timeandicon').children('div');
			var div0 = div.eq(0);
			var div1 = div.eq(1);
			div0.children('dl').children('.zhongji').hide();
			div0.children('.learn-number').hide();
			div1.children('.lessonicon-box').css({
				bottom: '4px',
			});
		}),
	};
	/*
	learn-card的hover事件
	 */
	var learnCard = {
		mouseEnter: $('.learn-card>a').on('mouseenter', function() {
			var index = $('.learn-card>a').index(this);
			if (index % 5 == 4) {
				$(this).css({
					border: "1px solid #35B558",
					"margin-top": "0"
				});
			} else {
				$(this).css({
					"border-width": "1px 0 1px 1px",
					"border-style": "solid",
					"border-color": "#35B558",
					"margin-top": "0",
				});
				$(this).next('a').css({
					"border-left": "1px solid #35B558",
					"border-top": "1px solid #E4E4E4",
					"border-bottom": "1px solid #E4E4E4",
					"margin-top": "0",
				})
			}
		}),
		mouseLeave: $('.learn-card>a').on('mouseleave', function() {
			var index = $('.learn-card>a').index(this);
			if (index % 5 == 4) {
				$(this).css({
					border: "1px solid #E4E4E4",
					"margin-top": "0"
				});
			} else {
				$(this).css({
					"border-width": "1px 0 1px 1px",
					"border-style": "solid",
					"border-color": "#E4E4E4",
					"margin-top": "0",
				});
				$(this).next('a').css({
					"border-left": "1px solid #E4E4E4",
					"border-top": "1px solid #E4E4E4",
					"border-bottom": "1px solid #E4E4E4",
					"margin-top": "0",
				})
			}
		})
	};
	/*
	strategy合作企业的hover事件
	 */
	var strategy = {
		mouseEnter: $('.strategy').on('mouseenter', function() {
			$("#banner-left3").show(200);
			$("#banner-right3").show(200);
		}),
		mouseLeave: $('.strategy').on('mouseleave', function() {
			$("#banner-left3").hide(200);
			$("#banner-right3").hide(200);
		})
	};
	/*
	.swiper-car-box合作院校hover事件
	 */
	var swiperCar = {
		mouseEnter: $('.swiper-car-box').on('mouseenter', function() {
			$("#banner-left2").show(200);
			$("#banner-right2").show(200);
		}),
		mouseLeave: $('.swiper-car-box').on('mouseleave', function() {
			$("#banner-left2").hide(200);
			$("#banner-right2").hide(200);
		}),
	};
	/*
	 媒体hover事件
	 */
	var strategy2 = {
		mouseEnter: $('.strategy2').on('mouseenter', function() {
			$("#banner-left4").show(200);
			$("#banner-right4").show(200);
		}),
		mouseLeave: $('.strategy2').on('mouseleave', function() {
			$("#banner-left4").hide(200);
			$("#banner-right4").hide(200);
		}),
	};
  }

  // // 或者通过 module.exports 提供整个接口
  // module.exports = ...

});