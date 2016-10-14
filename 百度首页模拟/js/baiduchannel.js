(function() {
	var footerTop = $('.footer-box').offset().top;
	localStorage.showChannel; //显示隐藏的标记
	var left = [];
	var _left = JSON.parse(localStorage.getItem('channelLeft'));
	var channelTitle = ["我的关注", '导航', '推荐', '音乐', '体育', '视频', '购物', '小说']; //标签数组
	channelInitialization(); //初始化
	/*初始化程序*/
	function channelInitialization() {
		if (localStorage.loginFlag == 1) {
			if (localStorage.showChannel == 1) {
				$('.channel-wrap').show();
				$('.footer-box').offset({
					top: 100 + $('.channel-wrap').offset().top + $('.channel-wrap').height()
				});
				$('#channel-show').hide();
			} else {
				$('.channel-wrap').hide();
				$('#channel-show').show();
			};

		};

		if (_left != null) {
			var i = 0;
			while (_left[i] != null) {
				var span = $('<span>').appendTo('.titles');
				span.html(_left[i]);
				$('.mode-item-right').each(function(index, value) {
					if ($(value).children('.mode-title').html() == _left[i]) {
						$(this).removeClass('mode-item-right').addClass('mode-item-left').appendTo('.my-list');
					}
				})
				i++;
			}
		}
	}

	$('#channel-show').on('click', function() { //显示channel频道
		$('.channel-wrap').show();
		localStorage.showChannel = 1;
		$('.footer-box').offset({
			top: 100 + $('.channel-wrap').offset().top + $('.channel-wrap').height()
		});
		$(this).hide();

	});

	$('.channel-set').on('click', function() { //下拉channel设置
		$('.slide-menu-box').slideToggle(300);
		$('.titles>span').remove();
		$('.channel-body .channel-focus').removeClass('channel-focus');
		$('.my-watchlist').addClass('focus');
		$('#channel0').addClass('channel-focus');
		var i = 0;
		$('.mode-item-left').each(function(index, value) { //显示要显示的东西
			var span = $('<span>').appendTo('.titles');
			left[i] = $(value).children('.mode-title').html();
			span.html(left[i]);
			i++;
			//console.log($(value).children('.mode-title').html());
		});
		while (i < 7) {
			left[i] = null;
			i++;
		}
		localStorage.setItem('channelLeft', JSON.stringify(left));
		_left = JSON.parse(localStorage.getItem('channelLeft'));
		//console.log(_left,_left.length);
	});

	$('#channel-hide').on('click', function() { //隐藏channel频道
		$('.channel-wrap').hide();
		localStorage.showChannel = 0;
		$('.footer-box').offset({
			top: footerTop
		});
		$('#channel-show').show();
		$('.slide-menu-box').hide();
		$('.titles>span').remove();
		$('.channel-body .channel-focus').removeClass('channel-focus');
		$('.my-watchlist').addClass('focus');
		$('#channel0').addClass('channel-focus');
		var i = 0;
		$('.mode-item-left').each(function(index, value) { //显示要显示的东西
			var span = $('<span>').appendTo('.titles');
			left[i] = $(value).children('.mode-title').html();
			span.html(left[i]);
			i++;
			//console.log($(value).children('.mode-title').html());
		});
		while (i < 7) {
			left[i] = null;
			i++;
		}
		localStorage.setItem('channelLeft', JSON.stringify(left));
		_left = JSON.parse(localStorage.getItem('channelLeft'));
	});

	$(".mode-item-right").on('click', function() { //设置移动channel频道
		if ($(this).hasClass('mode-item-right')) { //向左移；
			$(this).removeClass('mode-item-right').addClass('mode-item-left').appendTo('.my-list');
		} else { //向右移
			$(this).removeClass('mode-item-left').addClass('mode-item-right').appendTo('.unsubscribed');
		}
	});
	$(".mode-item-left").on('click', function() { //设置移动channel频道

		if ($(this).hasClass('mode-item-left')) { //向右移；
			$(this).removeClass('mode-item-left').addClass('mode-item-right').appendTo('.unsubscribed');
		} else { //向右移
			$(this).removeClass('mode-item-right').addClass('mode-item-left').appendTo('.my-list');
		}
	});

	$(document).on('click', ".channel-title span", function() { //标签切换
		var thisTarget = $(this);
		$('.channel-title .focus').removeClass('focus');
		$('.channel-body .channel-focus').removeClass('channel-focus');
		thisTarget.addClass('focus');
		$.each(channelTitle, function(index, value) {
			if (value == thisTarget.html()) {
				$('#channel' + index).addClass('channel-focus');
			}
		})
	})
})()