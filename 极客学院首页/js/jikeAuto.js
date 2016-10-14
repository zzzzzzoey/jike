/**********************************
这是轮播图效果的设置文件Auto.js
 **********************************/
define(function(require, exports, module) {
	// exports.doSomething = ...
	exports.autoPlay = function() {
		$(document).ready(function() {
			var pic = $('.swiper-wrapper').eq(0).children('a');
			var length = pic.length; // 当前图片总数
			var index = 0; //显示位置
			var interval, //轮播函数
				hasStarted = false, //是否已经开始轮播 
				t = 3000; //轮播时间间隔 
			var width = $('.swiper-wrapper').eq(0).children('a').eq(0).width(); //移动宽度
			var aPos = [{ //移动参数
				left: 0,
				top: 0,
				position: "absolute",
			}, {
				left: -width + "px",
				top: 0,
				position: "absolute",
			}, {
				left: width + "px",
				top: 0,
				position: "absolute"
			}];
			/*
			轮播图片上的hover事件，
			左右2侧的箭头显示及轮播的启动停止控制
			 */
			$(".index-banner").on("mouseover", function() {
				$("#banner-left").show(200);
				$("#banner-right").show(200);
				stopPlay();
			})

			$(".index-banner").on("mouseleave", function() {
				$("#banner-left").hide(200);
				$("#banner-right").hide(200);
				startPlay();
			})

			/*
			轮播上的前后箭头点击事件
			 */
			$("#banner-left").on('click', function() {
				pre();
			})
			$("#banner-right").on('click', function() {
				next();
			})

			/*
			轮播下的选择点击事件
			 */
			$('.swiper-pagination-switch').on('click', function() {
					var preIndex = index;
					index = $('.swiper-pagination-switch').index(this);
					if (preIndex > index) {
						playLeft(preIndex, index);
					} else if (preIndex < index) {
						playRight(preIndex, index);
					}
				})
				/* 
				 * 向前（左）
				 */
			function pre() {
				var preIndex = index;
				index = (--index + length) % length;
				playLeft(preIndex, index);
			}
			/** 
			 * 向后（右） 
			 */
			function next() {
				var preIndex = index;
				index = ++index % length;
				playRight(preIndex, index);
			}
			/** 
			 * 从preIndex页翻到index页 
			 * preIndex 整数，翻页的起始页 
			 * index 整数，翻到的那页 
			 * 左右方向不同
			 */
			function playRight(preIndex, index) {
				var thisPic = $('.swiper-wrapper').eq(0).children('a').eq(index);
				var prePic = $('.swiper-wrapper').eq(0).children('a').eq(preIndex);
				thisPic.css(aPos[1]).stop(true, true).animate(aPos[0], 1000);
				prePic.css(aPos[0]).stop(true, true).animate(aPos[2], 1000);
				$(".swiper-pagination-switch").eq(preIndex).removeClass('swiper-active-switch');
				$(".swiper-pagination-switch").eq(index).addClass('swiper-active-switch');
			}

			function playLeft(preIndex, index) {
				var thisPic = $('.swiper-wrapper').eq(0).children('a').eq(index);
				var prePic = $('.swiper-wrapper').eq(0).children('a').eq(preIndex);
				thisPic.css(aPos[2]).stop(true, true).animate(aPos[0], 1000);
				prePic.css(aPos[0]).stop(true, true).animate(aPos[1], 1000);
				$(".swiper-pagination-switch").eq(preIndex).removeClass('swiper-active-switch');
				$(".swiper-pagination-switch").eq(index).addClass('swiper-active-switch');
			}
			/** 
			 * 开始轮播 
			 */
			function startPlay() {
				if (!hasStarted) {
					hasStarted = true;
					interval = setInterval(next, t);
				};
			}
			/** 
			 * 停止轮播 
			 */
			function stopPlay() {
				clearInterval(interval);
				hasStarted = false;
			}

			// 开始轮播
			startPlay();
		})
	}
})