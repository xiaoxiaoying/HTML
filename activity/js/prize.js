/**
 * Created by Administrator on 2015/4/2.
 */

var arr = new Array('./images/first_prize.png', './images/second_prize.png', './images/thred_prize.png',
    './images/fourth_prize.png', './images/fiveth_prize.png', './images/sixth_prize.png');
var arrText = new Array("iphone6一部", "大号卡通公仔一个", "小黄人公仔一个", "天使奶瓶抱枕一个", "史迪奇公仔一个", "100积分");
var index;

var type ;
var winnin;
$(document).ready(
    function () {
        var click=false;
        $(".lottery-unit-0").click(function () {


            //if (bRotate) return;
            //consol("26 button-text 点击了 URL = "+ getUrl("luckdraw","is_choujiang")+"&user_id=11491&activity_id="+1);
            //alert(getUrl("activity","win_score")+"&activity_id="+activity_id+"&user_id="+user_id);



        });


          execuse = function  (type,txt) {

            if (type == 3) {

                $('.winning').show();
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
                        index = 5;
                        break;
                    case 8:
                        index = 5;
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
                    ctx.fillText("恭喜您！获得", 5, 20);
                    ctx.font = "20px  黑体";
                    ctx.fillStyle = '#e72342';
                    ctx.fillText(txt, 95, 20);
                    ctx.font = "14px  黑体";
                    ctx.fillStyle = '#480000';
                    ctx.fillText(arrText[index], 170, 20);
                    consol(arrText[index]);
                });


                $('.next').click(
                    function () {
                        if(winnin == 6){
                            window.location.href = './thanks.html';
                        }else {
                            window.location.href = './location_write.html';
                            setIsflag(txt);
                        }



                    }
                );
                var next;
                $(function () {
                    if ($('.next').onkeydown)
                        document.getElementById('next').style.backgroundImage = 'url("./images/next_select.png)';
                    consol(arr[index]);
                    document.getElementById('prize-back').style.backgroundImage = 'url("' + arr[index] + '")';
                });
            } else if (type == 2) {
                consol('执行的是2');
                //抽过一次奖不能再次参与抽奖

                $('.winning').hide();
                $('.no-draw').show();

                $('#hint').text("艺友们！每位会员限抽奖一次...");
            } else if (type == 1) {
                //抽奖时间没有开启
                $('.no-draw').show();
                $('.winning').hide();

                $('#hint').text("亲，抽奖时间尚未开始...");
            }


        }
        var lottery={
            index:-1,	//当前转动到哪个位置，起点位置
            count:0,	//总共有多少个位置
            timer:0,	//setTimeout的ID，用clearTimeout清除
            speed:20,	//初始转动速度
            times:0,	//转动次数
            cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,	//中奖位置
            init:function(id){
                if ($("#"+id).find(".lottery-unit").length>0) {
                    $lottery = $("#"+id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    //$lottery.find(".lottery-unit-"+this.index).id ="activity";
                    $lottery.find(".lottery-unit-"+this.index).addClass("active");
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                //alert("======165======"+index);
                $(lottery).find(".lottery-unit-"+index).removeClass("active");
                index += 1;
                if (index>count-1) {
                    index = 0;
                };
                $(lottery).find(".lottery-unit-"+index).addClass("active");


                this.index=index;
                return false;
            },
            stop:function(index){
                this.prize=index;
                return false;
            }
        };

        function roll(){
            lottery.times += 1;
            lottery.roll();
            if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
                clearTimeout(lottery.timer);
                lottery.prize=-1;
                lottery.times=0;
                click=false;
            }else{
                if (lottery.times<lottery.cycle) {
                    lottery.speed -= 10;
                }else if(lottery.times==lottery.cycle) {
                    var index = Math.random()*(lottery.count)|0;
                    lottery.prize = index;
                }else{
                    if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                        lottery.speed += 110;
                    }else{
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed<40) {
                    lottery.speed=40;
                };
                //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                lottery.timer = setTimeout(roll,lottery.speed);
            }
            return false;
        }



        window.onload=function(){
            lottery.init('lottery');
            $("#lottery a").click(function(){
                $.ajax({
                    //url: "http://192.168.0.27/yiyou-app/yiyou-app/logic/luckdraw.php?a=user_winner&activity_id=1&user_id=274",
                    url: getUrl("activity","win_score")+"&activity_id="+activity_id+"&user_id="+user_id,
                    //url: "http://192.168.0.53/~apple/logic/activity.php?a=user_winner&activity_id="+activity_id,
                    type: 'GET',
                    cache: false,
                    dataType: 'jsonp',//here
                    success: function (response) {
                        var temp = eval(response);
                        alert(" 27 i = "+temp.i+"  s = "+temp.s+" r =  "+temp.r);
                        if(temp.s == true) {
                            //可以抽奖
                            execuse(3,temp.i);
                            if (click) {
                                return false;
                            }else{
                                lottery.speed=100;
                                roll();
                                click=true;
                                return false;
                            }
                        }else if(temp.s == false){
                            //积分不够
                        }
                    },
                    complete : function(XMLHttpRequest, textStatus){
                        consol('complete '+ textStatus);
                    },

                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        alert('error:'+errorThrown);
                    }

                });

            });
        };

        $('#prize-people').click(
            function(){
                //alert('123');
                window.location.href='action.win';
            }

        );

        $('#number_').click(
            function(){

                $('#integral').show(200);
            }
        );

        $('#close_').click(
            function(){
                $('#integral').hide();
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
var mImg = new Array('./images/0.png', './images/1.png', './images/2.png', './images/3.png', './images/4.png', './images/5.png', './images/6.png',
    './images/7.png', './images/8.png', './images/9.png');
var imgId = new Array('seven', 'six', 'five', 'four', 'three', 'two', 'one', 'zero');
function setParameter(activityId, number,userId) {
    activity_id = 22;
    //activity_id = activityId;
    mNumber = number;
    user_id = 278;
    //user_id = userId;
    //alert("activityId = "+activityId+ " number = "+number);
}




function getUrlHead(){
    //return "http://192.168.0.27/yiyou-app/yiyou-app/logic/";
    return "http://192.168.0.12/app/logic/";
    //return "http://app.yiyouapp.com/logic/"
}

function getUrl(a,action){
    return getUrlHead()+a+".php?a="+action;
}
