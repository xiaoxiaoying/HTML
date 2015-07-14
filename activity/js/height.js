/**
 * Created by Administrator on 2015/4/12.
 */
//控制高度

var winWidth = 0;

var winHeight = 0;
$(document).ready(function() {

        //function findDimensions() { //函数：获取尺寸

            //获取窗口宽度

            if (window.innerWidth) {

                winWidth = window.innerWidth;

            }
            else if
            ((document.body) && (document.body.clientWidth))
            {

                winWidth = document.body.clientWidth;

            }

            //获取窗口高度

            if (window.innerHeight) {

                winHeight = window.innerHeight;

            }

            else if((document.body) && (document.body.clientHeight))
            {

                winHeight = document.body.clientHeight;

            }

            //通过深入Document内部对body进行检测，获取窗口大小

            if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {

                winHeight = document.documentElement.clientHeight;

                winWidth = document.documentElement.clientWidth;

            }

        //}
        consol("窗口的宽度 = "+winWidth+" 窗口的高度 = "+winHeight);
        //document.getElementById("head-top").style.width = winWidth + "px";
        //
        //document.getElementById("head-top").style.height = winWidth/640*1018+"px";
       // document.getElementById("number_").style.height  =winWidth/640*53+"px";
       // document.getElementById("number_").style.width  =winWidth/640*253+"px";
       //
       //var left = (winWidth/2 -winWidth/640*253)/2;
       //
       // document.getElementById("number_").style.marginLeft   =left+"px";
       // document.getElementById("prize-people").style.left  =winWidth/640*64*6+"px";
       // document.getElementById("prize-people").style.width  =winWidth/640*253+"px";
       // document.getElementById("prize-people").style.height  =winWidth/640*53+"px";
       // document.getElementById("prize-people").style.marginLeft  =left*2+"px";
       // document.getElementById("integral").style.width = winWidth +"px";
       // document.getElementById("inte").style.width = winWidth -120 +"px";
       // document.getElementById("inte").style.marginLeft = 60 +"px";
       // document.getElementById("close_").style.marginLeft = winWidth - 70 +"px";
       // document.getElementById("lottery").style.marginTop = winWidth/640*245 +"px";
       // document.getElementById("lottery").style.width = winWidth/640*570 +"px";
       // document.getElementById("lottery").style.height = winWidth/640*570 +"px";
       // document.getElementById("1").style.width = winWidth/640*190 +"px";
       // document.getElementById("1").style.height = winWidth/640*190 +"px";


        //document.getElementById("winning").style.height = winWidth/640*(510+1130+1060)+h+ "px";
        //document.getElementById("no-draw").style.height = winWidth/640*(510+1130+1060)+h+"px";
        //
        //document.getElementById("prize-setting").style.height = winWidth/640*1130+"px";
        //document.getElementById("action-back").style.height = winWidth/640*510+"px";
        //document.getElementById("action_back_top").style.top = winWidth/640*1060/2-winWidth/640*556/2+50+"px"
        //document.getElementById("action-people").style.left = winWidth/640*108+"px";
        //document.getElementById("action-people").style.width = winWidth/640*210+"px";
        //document.getElementById("action-people").style.height = winWidth/640*40+"px";
        //document.getElementById("wheel-back").style.width  = winWidth/640*503+"px";
        //document.getElementById("wheel-back").style.height  = winWidth/640*556+"px";
        //document.getElementById("light").style.width  = winWidth/640*503+"px";
        //document.getElementById("light").style.height  = winWidth/640*556+"px";
        //document.getElementById("rotate").style.width  = winWidth/640*503+"px";
        //document.getElementById("rotate").style.height  = winWidth/640*556+"px";
        //document.getElementById("pointer").style.width  =winWidth/640*502+"px";
        //document.getElementById("pointer").style.height  =winWidth/640*502+"px";
        //document.getElementById("button-text").style.height  =winWidth/640*130+"px";
        //document.getElementById("button-text").style.width  =winWidth/640*130+"px";
        //
        //document.getElementById("number-back").style.width  =winWidth+"px";
        //document.getElementById("number-back").style.marginTop  =winWidth/640*40+"px";
        //document.getElementById("number").style.left  =winWidth/640*64+"px";
        //
        //
        //document.getElementById("zero").style.width  =winWidth/640*21+"px";
        //document.getElementById("one").style.width  =winWidth/640*21+"px";
        //document.getElementById("two").style.width  =winWidth/640*21+"px";
        //document.getElementById("three").style.width  =winWidth/640*21+"px";
        //document.getElementById("four").style.width  =winWidth/640*21+"px";
        //document.getElementById("five").style.width  =winWidth/640*21+"px";
        //document.getElementById("six").style.width  =winWidth/640*21+"px";
        //document.getElementById("seven").style.width  =winWidth/640*21+"px";

        //document.getElementById("zero").style.height  =winWidth/640*20+"px";
        //document.getElementById("one").style.height  =winWidth/640*20+"px";
        //document.getElementById("two").style.height  =winWidth/640*20+"px";
        //document.getElementById("three").style.height  =winWidth/640*20+"px";
        //document.getElementById("four").style.height  =winWidth/640*20+"px";
        //document.getElementById("five").style.height  =winWidth/640*20+"px";
        //document.getElementById("six").style.height  =winWidth/640*20+"px";
        //document.getElementById("seven").style.height  =winWidth/640*20+"px";

        //document.getElementById("zero").style.marginTop  =winWidth/640*20+"px";
        //document.getElementById("prize").style.top  =winWidth/640*45+"px";
        //document.getElementById("action").style.top  =winWidth/640*45+"px";
        //document.getElementById("prize").style.width  =winWidth/640*200+"px";
        //document.getElementById("prize").style.height  =winWidth/640*62+"px";
        //document.getElementById("action").style.width  =winWidth/640*200+"px";
        //document.getElementById("action").style.height  =winWidth/640*62+"px";
        //document.getElementById("back").style.width  =winWidth/640*640+"px";
        //document.getElementById("back").style.height  =winWidth/640*640+"px";
        //document.getElementById("back").style.top  =winWidth/640*200+"px";
        //document.getElementById("prize-back").style.width  =winWidth/640*330+"px";
        //document.getElementById("prize-back").style.height  =winWidth/640*240+"px";
        //document.getElementById("prize-back").style.top  =winWidth*0.315+"px";
        ////document.getElementById("prize-back").style.left  =winWidth*0.24+"px";
        //document.getElementById("next").style.width  =winWidth/640*223+"px";
        //document.getElementById("next").style.height  =winWidth/640*62+"px";
        ////document.getElementById("next").style.top  =winWidth*0.18+"px";
        //document.getElementById("next").style.left  =winWidth*0.33+"px";
        //document.getElementById("text_honit").style.left  =winWidth*0.08+"px";
        //document.getElementById("text_honit").style.top  =winWidth*0.32+"px";
        //document.getElementById("next").style.top  =winWidth*0.80+"px";
        //
        //document.getElementById("draw-back").style.width  =winWidth/640*580+"px";
        //document.getElementById("draw-back").style.height  =winWidth/640*140+"px";
        //document.getElementById("draw-back").style.marginTop  =winWidth/640*1130/2+"px";
        //document.getElementById("hint").style.top  =winWidth/640*140/2-6+"px";



    }
    );
function getWinWidth (){
    return winWidth;
}function getWinHeight (){
    return winHeight;
}