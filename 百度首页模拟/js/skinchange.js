(function() {
    var skin = $("#skin");
    var colorpick = $("#colorpick");
    var colorSubmit = $("#color-submit");
    var colorCancel = $("#color-cancel");
    var color = $("#color");
    // var colorDisplay = 0;//display属性设置
    $('#container').css('background-color', "#FFFFFF"); //默认值
    $('body').css('background-color', "#FFFFFF")
        //console.log($('body').css('background-color'));
    if (typeof(localStorage.color) == "undefined") { //强迫症用的，可以无视
        color.val("#FFFFFF");
    } else {
        color.val(localStorage.color);
        $('#container').css('background-color', localStorage.color);
        $('body').css('background-color', localStorage.color);
    }
    //console.log(color);
    skin.on("click", function() { //加载换肤界面
        colorpick.toggle();
    })
    colorSubmit.on("click", function() { //确定修改颜色
        localStorage.color = color.val();
        $('#container').css('background-color', localStorage.color);
        $('body').css('background-color', localStorage.color);
        colorpick.hide();
    })
    colorCancel.on("click", function() { //取消修改颜色
        colorpick.hide();
        color.val(localStorage.color);
    })
})()
