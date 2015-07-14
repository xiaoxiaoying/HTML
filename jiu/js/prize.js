/**
 * Created by Administrator on 2015/4/2.
 */

var arr = new Array('./images/1.png', './images/6.png', './images/3.png',
    './images/8.png', './images/2.png', './images/7.png', './images/4.png', './images/5.png');
var arrText = new Array("绘画工具箱一个", "水粉颜料24色", "手提可装纸画板", "米娅铅笔12支", "艺友100积分", "艺友50积分", "艺友20积分", "艺友10积分");


var type;
var isf;
var isf1;
var winnin;
$(document).ready(
    function () {
        var click = false;
        execuse = function (type, txt) {
            var index;
            if (type == 3) {

                $('#hit').show();
                if (txt == null)return;
                consol(txt);
                switch (txt) {
                    case 1:
                        index = 0;
                        break;
                    case 2:
                        index = 1;
                        break;
                    case 3:
                        index = 2;
                        break;
                    case 4:
                        index = 3;
                        break;
                    case 5:
                        index = 4;
                        break;
                    case 6:
                        index = 5;
                        break;
                    case 7:
                        index = 6;
                        break;
                    case 8:
                        index = 7;
                        break;

                }
                //绘制中奖提示文字
                $(function () {
                    var canvas = document.getElementById('mycanvas');
                    consol(canvas);
                    var ctx = canvas.getContext('2d');
                    ctx.font = "14px  黑体";
                    ctx.fillStyle = "#480000";
                    //winWidth/640
                    ctx.fillText("恭喜您！获得", 50, 140);
                    ctx.font = "20px  黑体";
                    ctx.fillStyle = '#e72342';
                    //alert(index + "  === 60 ==")
                    ctx.fillText(arrText[index], 135, 140);
                    consol(arrText[index]);
                });


                $('.next').click(
                    function () {
                        if (isf1 >= 5) {
                            $('#hit').hide();
                            $('#success').show();

                        } else {
                            window.location.href = './location_write.html?isflag=' + isf1;
                            //setIsflag(txt);
                        }


                    }
                );
                var next;

                //$('#prize-back').attr("style","backgroundImage:url(../images/2.png)");
                //$('#prize-back').css({
                //    "background-image":"url(./images/2.png)"
                //});
                $(function () {
                    document.getElementById('prize-back').style.backgroundImage = 'url("' + arr[index] + '")';
                    //if ($('.next').onkeydown)
                    //    document.getElementById('next').style.backgroundImage = 'url("./images/next_select.png)';
                    consol(arr[index]);
                    //document.getElementById('prize-back').style.backgroundImage = 'url(./images/2.png)';
                });
            }



        }
        var lottery = {
            index: -1,	//当前转动到哪个位置，起点位置
            count: 0,	//总共有多少个位置
            timer: 0,	//setTimeout的ID，用clearTimeout清除
            speed: 20,	//初始转动速度
            times: 0,	//转动次数
            cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1,	//中奖位置
            init: function (id) {
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    $lottery = $("#" + id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    //$lottery.find(".lottery-unit-"+this.index).id ="activity";
                    $lottery.find(".lottery-unit-" + this.index).addClass("active");
                }
                ;
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                ;
                $(lottery).find(".lottery-unit-" + index).addClass("active");


                this.index = index;
                //alert(index+" 136 ");
                return false;
            },
            stop: function (index) {
                this.prize = index;
                //alert(index+" 140 ");
                return false;
            }
        };

        function roll() {
            lottery.times += 1;
            lottery.roll();
            if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
                clearTimeout(lottery.timer);
                lottery.prize = -1;
                lottery.times = 0;
                click = false;
                execuse(3, isf1);
            } else {
                //alert(lottery.times +" === "+lottery.cycle);
                if (lottery.times < lottery.cycle) {
                    lottery.speed -= 10;
                } else if (lottery.times == lottery.cycle) {
                    //var index = Math.random() * (lottery.count) | 0;
                    //alert("160 == "+index);

                    lottery.prize = isf ;
                } else {
                    if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                        lottery.speed += 110;
                    } else {
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed < 40) {
                    lottery.speed = 40;
                }
                ;
                //alert(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                lottery.timer = setTimeout(roll, lottery.speed);
            }
            return false;
        }


        window.onload = function () {
            lottery.init('lottery');
            $("#lottery a").click(function () {


                $.ajax({
                    //url: "http://192.168.0.27/yiyou-app/yiyou-app/logic/luckdraw.php?a=user_winner&activity_id=1&user_id=274",
                    url: getUrl("activity", "win_score") + "&activity_id=" + activity_id + "&user_id=" + user_id,
                    //url: "http://192.168.0.53/~apple/logic/activity.php?a=user_winner&activity_id="+activity_id,
                    type: 'GET',
                    cache: false,
                    dataType: 'jsonp',//here
                    success: function (response) {
                        var temp = eval(response);
                        //alert(" 27 i = " + temp.i + "  s = " + temp.s + " r =  " + temp.r);
                        if (temp.s == true) {
                            //可以抽奖
                            //            //execuse(3, temp.i);
                            isf1 = temp.i;
                            switch (temp.i) {
                                case 1:
                                    isf = 0;
                                    break;
                                case 2:
                                    isf = 6;
                                    break;
                                case 3:
                                    isf = 2;
                                    break;
                                case 4:
                                    isf = 4;
                                    break;
                                case 5:
                                    isf = 1;
                                    break;
                                case 6:
                                    isf = 5;
                                    break;
                                case 7:
                                    isf = 7;
                                    break;
                                case 8:
                                    isf = 3;
                                    break;
                            }

                            if (click) {
                                return false;
                            } else {
                                lottery.speed = 100;
                                    roll();
                                click = true;
                                return false;
                            }

                        } else if (temp.s == false) {
                            //积分不够
                            $('#in_student').show();
                        }
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        consol('complete ' + textStatus);
                    },

                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (click) {
                            return false;
                        } else {
                            lottery.speed = 100;
                            roll();
                            click = true;
                            return false;
                        }
                        //alert('error:' + errorThrown+"  211 text = "+textStatus+"  xml = "+XMLHttpRequest);
                    }

                });

            });
        };
        /**
         * 获奖名单
         */
        $('#prize-people').click(
            function () {
                //alert('123');
                window.location.href = 'action.win';
            }
        );
        /**
         * 获取积分方式
         */
        $('#number_').click(
            function () {
                $("#integral").fadeToggle(2000);
            }
        );
        $('#select_in').click(
            function () {
                window.location.href = './location_write.html?isflag=' + 5;
            }
        );
        $('#break').click(
            function () {
                $("#in_student").fadeToggle(1000);
            }
        );
        /**
         * 关闭获取积分方式页面
         */
        $('#close_').click(
            function () {
                $("#integral").fadeToggle(1000);
            }
        );
        /**
         * 确定
         */
        $('#determine').click(
            function () {
                window.location.href = 'action.return';
            }
        );
        /**
         * 再一次进行抽奖
         */
        $('#gree').click(
            function () {
                $('#success').hide();
                var canvas = document.getElementById('mycanvas');
                var ctx = canvas.getContext('2d');

                lottery.init('lottery');
            }
        );
    }
);


function consol(mas) {
    console.log(mas);
}

/**
 * 移动端传入
 * @param userId
 * @param number
 */
var activity_id = 22;
var user_id = 278;
var mNumber = '';
function setParameter(activityId, number, userId) {
    activity_id = activityId;
    //activity_id = activityId;
    mNumber = number;
    user_id = userId;
    //user_id = userId;
    //alert("activityId = "+activityId+ " number = "+number);
}


function getUrlHead() {
    //return "http://192.168.0.27/yiyou-app/yiyou-app/logic/";
    return "http://192.168.0.12/app/logic/";
    //return "http://app.yiyouapp.com/logic/"
}

function getUrl(a, action) {
    return getUrlHead() + a + ".php?a=" + action;
}
