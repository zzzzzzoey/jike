(function() {
	/***********************
	 ******显示右边导航******
	 ************************/
	$(".more-container").mouseenter(
		function() {
			$(".more-select").show();
		}
	);
	/*************************
	 *******隐藏右边导航*******
	 **************************/
	$(".more-select").mouseleave(function() {
		$(this).hide();
	});

	$(window).scroll(function() { //鼠标滚轮事件
		if ($(window).scrollTop() > 0) {
			$(".to-top").show();
		} else {
			$('.to-top').hide();
		};
	});

	/*
	回到顶部
	 */
	$('.to-top').on('click', function() {
		//$(window).animate({scrollTop: "0px"}, 800);
		$('html,body').animate({
			scrollTop: "0px"
		}, 800);
	})
})()