var num = 0, //操作数1
    result = 0, //结果
    numsave = 0; //操作数2
var dot = 0, //小数点标志
    dotlength = 0; //小数位数
var oprator = 0; //操作符输入判定
var calculate = 0; //执行判定
var clear = 1; //重置判定
var methor = 0; //计算法则
var lock = 0; //非法操作，溢出判定
var screen = document.getElementById("screen");
var calculator = document.getElementById("calculator");
calculator.addEventListener("click", function(e) {//用鼠标点击吧
    //console.log(e.target.innerHTML);
    if (e.target.id == "screen") { //屏幕木有什么可按

    } else {
        switch (e.target.innerHTML) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": //数字输入
                {
                    if (!lock) {
                        if (screen.innerHTML == "0" || oprator == 1) { //判定是否输入第一个数字
                            clear = 0; //未清屏
                            screen.innerHTML = e.target.innerHTML; //屏幕要显示输入的内容
                            oprator = 0; //操作符清0
                        } else {
                            screen.innerHTML += e.target.innerHTML;
                        }
                        num = Number(screen.innerHTML); //取出数字
                    }
                    // console.log(num);
                    break;
                }
            case ".": //小数点
                {
                    if (!lock) {
                        clear = 0; //未清屏
                        if (!dot) { //小数点只能有一个
                            screen.innerHTML += e.target.innerHTML; //显示
                            dot = 1;
                            if (oprator) { //显示小数点
                                oprator = 0; //操作符清0
                                screen.innerHTML = "0.";
                                num = 0;
                            }
                        }

                    }
                    break;
                }
            case "C": //clear,所有全局变量设回默认值
                {
                    num = 0;
                    result = 0;
                    numsave = 0;
                    dot = 0;
                    dotlength = 0;
                    oprator = 0;
                    calculate = 0;
                    reapeat = 0;
                    clear = 1;
                    methor = 0;
                    lock = 0;
                    screen.innerHTML = "0";
                    break;
                }
            case "←": //退格键，只对数字输入时有效，符号无效
                {
                    if (!lock) {
                        if (screen.innerHTML.length == 1 || oprator == 1) { //长度为1时或者已输入操作符屏幕清零
                            screen.innerHTML = "0";
                        } else {
                            if (screen.innerHTML.indexOf(".")) { //小数判断
                                dotlength--;
                                if (screen.innerHTML.indexOf(".") == screen.innerHTML.length - 1) {
                                    dot = 0;
                                    dotlength = 0;
                                }
                            }
                            screen.innerHTML = screen.innerHTML.substr(0, screen.innerHTML.length - 1);
                        }
                        num = Number(screen.innerHTML); //取出修改的数字
                    }
                    //console.log(num);
                    break;
                }
            case "+": //+
                {
                    if (!lock) {
                        symbol(); //调用双操作数符号设定的函数，下同
                        methor = 1;
                    }
                    break;
                }
            case "-": //-
                {
                    if (!lock) {
                        if (screen.innerHTML == "0" || oprator == 1) { //负号与减号的判定
                            oprator = 0; //操作符清0;
                            screen.innerHTML = "-";
                        } else {
                            symbol();
                            methor = 2;
                        }
                    }
                    break;
                }
            case "X": //乘
                {
                    if (!lock) {
                        symbol();
                        methor = 3;
                    }
                    break;
                }
            case "÷": //除
                {
                    if (!lock) {
                        symbol();
                        methor = 4;
                    }
                    break;
                }
            case "mod": //求余
                {
                    if (!lock) {
                        symbol();
                        methor = 5;
                    }
                    break;
                }
            case "x^y": //n次幂
                {
                    if (!lock) {
                        symbol();
                        methor = 6;
                    }
                    break;
                }
            case "<sup>y</sup>√x": //n次根
                {
                    if (!lock) {
                        symbol();
                        methor = 7;
                    }
                    break;
                }
            case "!": //阶乘，单操作数运算符，直接执行，下同
                {
                    if (!lock) {
                        if (num >= 0 && num.toString().indexOf(".") == -1) {
                            if (num == 0) {
                                result = 1;
                            } else {
                                result = 1;
                                for (var i = 1; i <= num; i++) {
                                    result = result * i;
                                }
                            }
                        } else {
                            result = "Error";
                        }
                        screen.innerHTML = over(result);
                        num = result;
                        methor = 0; 
                        set(); //调用单操作数及执行设定函数，下同
                    }
                    break;
                }
            case "sin": //以下是一些三角函数对数绝对值等操作
                {
                    if (!lock) {
                        screen.innerHTML = over(Math.sin(num * Math.PI / 180));
                        num = screen.innerHTML;
                        methor = 0;
                        set();
                    }
                    break;
                }
            case "cos":
                {
                    if (!lock) {
                        screen.innerHTML = over(Math.cos(num * Math.PI / 180));
                        num = screen.innerHTML;
                        methor = 0;
                        set();
                    }

                    break;
                }
            case "tan":
                {
                    if (!lock) {
                        screen.innerHTML = over(Math.tan(num * Math.PI / 180));
                        num = screen.innerHTML;
                        methor = 0;
                        set();
                    }

                    break;
                }
            case "abs":
                {
                    if (!lock) {
                        screen.innerHTML = over(Math.abs(num));
                        num = screen.innerHTML;
                        methor = 0;
                        set();
                    }

                    break;
                }
            case "ln":
                {
                    if (!lock) {
                        screen.innerHTML = over(Math.log(num));
                        num = screen.innerHTML;
                        methor = 0;
                        set();
                    }

                    break;
                }
            case "=": //执行最终结果的计算
                {
                    if (!lock) {
                        num = opration(numsave, num, methor);
                        numsave = num;
                        screen.innerHTML = num;
                        set();
                    }
                    break;
                }
        }
    }

})

function symbol() { //双操作数的设定
    dot = 0;
    dotlength = 0;
    //num = 0;
    if (calculate) {
        numsave = opration(numsave, num, methor);
    } else {
        numsave = num;
    }
    screen.innerHTML = numsave;
    oprator = 1;
    calculate = 1;
    //console.log(numsave);
}

function set() { //=与单操作数的设定
    oprator = 1;
    calculate = 0;
    dot = 0;
    dotlength = 0;
    //console.log(num);
}

function opration(numsave, num, methor) { //双操作数的计算
    switch (methor) {
        case 1:
            result = Number(numsave).add(Number(num));
            break;
        case 2:
            result = Number(numsave).sub(Number(num));
            break;
        case 3:
            result = Number(numsave).mul(Number(num));
            break;
        case 4:
            result = Number(numsave).div(Number(num));
            break;
        case 5:
            result = Number(numsave).mod(Number(num));
            break;
        case 6:
            result = Math.pow(Number(numsave), Number(num));
            break;
        case 7:
            result = Math.pow(Number(numsave), (1).div(Number(num)));
            break;
        default:
            result = Number(num);
            break;
    }
    return over(result);
}

function over(result) { //溢出，错误判定及保留一定位数
    if (Math.abs(result) > Math.pow(10, 12) || result == undefined || isNaN(result)) {
        lock = 1;
        return "Error";
    } else {
        result = Number(Number(result).toFixed(8));
        return result;
    }
}

//以下针对加减乘除求余的误差减少
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function(arg) {
    return accDiv(this, arg);
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function(arg) {
    return accMul(this, arg);
}

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg) {
    return accAdd(this, arg);
}

//减法函数，用来得到精确的减法结果
//说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1减去arg2的精确结果
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个sub方法，调用起来更加方便。
Number.prototype.sub = function(arg) {
    return accSub(this, arg);
}

//求余函数
function accMod(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m) % (arg2 * m)) / m;
}
//给Number类型增加一个mod方法，调用起来更加方便。
Number.prototype.mod = function(arg) {
    return accMod(this, arg);
}
