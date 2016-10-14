(function() {
	var loginLeft = ($(document).width() - $(".login").width()) / 2; //login框的x轴
	var loginTop = ($(document).height() - $(".login").height()) / 2; //login框的y轴
	var logoutLeft = ($(document).width() - $(".logout").width()) / 2; //logout框的x轴
	var logoutTop = ($(document).height() - $(".logout").height()) / 2; //logout框的y轴
	var dragFlag = false; //拖拽标志
	var dragPosition = {
		mouseX: 0,
		mouseY: 0,
		loginX: loginLeft,
		loginY: loginTop,
		deltaX: 0,
		deltaY: 0
	}; //记录拖拽前的数据
	logFlagShow(); //初始化

	function logFlagShow() {
		if (localStorage.logFlag == 1) {
			$(".top-nav.user").show();
			$('.top-left').show();
			$("#login").hide();
			localStorage.loginFlag = 1;
			//console.log($(".top-nav.user"));
		} else {
			$(".top-nav.user").hide();
			$('.top-left').hide();
			$("#login").show();
			$('.channel-wrap').hide();
			localStorage.loginFlag = 0;
		}
	}


	$("#login").on('click', function() { //login点击弹出登录框
		$('.login-box').show();
		loginLeft = ($(document).width() - $(".login").width()) / 2;
		loginTop = ($(document).height() - $(".login").height()) / 2;
		$('.login').offset({ //设定弹框位置
			left: loginLeft,
			top: loginTop
		});
	});
	$('#login-close').on('click', function() { //关掉login登陆框
		$('.login-box').hide(); //隐藏login框
		dragPosition = { //初始化拖拽数据
			mouseX: 0,
			mouseY: 0,
			loginX: loginLeft,
			loginY: loginTop,
			deltaX: 0,
			deltaY: 0
		};
	});
	$('.login-title').on('mousedown', function(e) {
		dragFlag = true; //可拖拽标志
		dragPosition.mouseX = e.pageX; //记录当前准备拖拽的位置数据
		dragPosition.mouseY = e.pageY;
		dragPosition.loginX = loginLeft;
		dragPosition.loginY = loginTop;
	});
	$('.login-title').on('mousemove', function(e) { //拖拽函数
		if (dragFlag == true) { //触发拖拽
			dragPosition.deltaX = e.pageX - dragPosition.mouseX;
			dragPosition.deltaY = e.pageY - dragPosition.mouseY;
			loginLeft = dragPosition.loginX + dragPosition.deltaX; //计算拖拽位置坐标
			loginTop = dragPosition.loginY + dragPosition.deltaY;
			$('.login').offset({ //设置位置
				left: loginLeft,
				top: loginTop
			});
		};
	});
	$('.login-title').on('mouseup', function() {
		dragFlag = false; //取消拖拽
	});
	$('.login-title').on('mouseleave', function() {
		dragFlag = false; //取消拖拽
	});

	$('#login-btn').on('click', function() { //登录
			var userName = $('#user').val();
			var password = $('#password').val();
			var errorMessage = $('#info-error');
			if (userName == "") { //提示填用户名
				errorMessage.html('请您填写手机/邮箱/用户名');
			} else if (password == '') { //提示填蜜吗
				errorMessage.html('请您填写密码');
			} else if (userName == "admin" && password == "admin") { //模拟登录成功
				errorMessage.empty();
				$('.login-box').hide();
				localStorage.loginFlag = 1;
				//console.log(localStorage.loginFlag);
				/*
				初始化设定
				 */
				if ($('#auto-login').is(":checked")) {
					localStorage.logFlag = 1;
				} else {
					localStorage.logFlag = 0;
				}
				$(".top-nav.user").show();
				$('.top-left').show();
				$("#login").hide();
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
			} else { //输入错误
				errorMessage.html('您输入的帐号不存在或密码错误，请您重新输入');
			};
		})
		/*用户名重新输入*/
	$('.user-cancel').on('click', function() {
		$('#user').val('');
	})


	$('#logout').on('click', function() { //退出
		$('.logout-box').show();
		logoutLeft = ($(document).width() - $(".logout").width()) / 2;
		logoutTop = ($(document).height() - $(".logout").height()) / 2;
		$('.logout').offset({ //设定弹框位置
			left: logoutLeft,
			top: logoutTop
		});
	})

	$('.logout-close').on('click', function() { //关闭退出框
		$('.logout-box').hide();
	})

	$('.switch-accunt').on('click', function() { //切换账号，重新登录
		$('.logout-box').hide();
		dragPosition = { //初始化拖拽数据
			mouseX: 0,
			mouseY: 0,
			loginX: ($(document).width() - $(".login").width()) / 2,
			loginY: ($(document).height() - $(".login").height()) / 2,
			deltaX: 0,
			deltaY: 0
		};
		$('.login-box').show();
		$('.login').offset({ //设定弹框位置
			left: loginLeft,
			top: loginTop
		});
	})

	var footerTop = $('.footer-box').offset().top;
	$('#logout-confirm').on('click', function() { //退出账户，初始化退出状态
		localStorage.logFlag = 0;
		localStorage.loginFlag = 0;
		logFlagShow();
		$('.logout-box').hide();
		$('.footer-box').offset({
			top: footerTop
		});
	})

	$('#logout-close').on('click', function() { //关闭退出框
		$('.logout-box').hide();
	})
})()