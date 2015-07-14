/**
 * Created by xiaoxiaoyin on 2015/6/18.
 */
function getHead(){
    //return "http://test.yiyouapp.com/app/logic/";
    return "http://192.168.0.12/app/logic/";
}

function getHttp(name,action){
    return getHead() + name + ".php?a=" + action;
}

function getImageUrl(url){
    return "http://yiyou-data.oss-cn-qingdao.aliyuncs.com/"+url;
}