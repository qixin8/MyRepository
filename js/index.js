var box = document.querySelector("#box");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var a1=document.querySelector(".a1");
var img1=document.querySelector("#img1");
var desW = 640;
var desH = 960;

if(winW/winH<desW/desH){
    box.style.webkitTransform = "scale("+winH/desH+")";
}else{
    box.style.webkitTransform = "scale("+winW/desW+")";
}
window.setTimeout(function(){
    a1.id="a1";
    img1.className="animated swing infinite";
    a1.getElementsByTagName("p")[0].className="animated bounceInLeft";
    a1.getElementsByTagName("p")[1].className="animated bounceInRight";
    window.setTimeout(function(){
        a1.getElementsByTagName("p")[2].className="animated rotateInDownLeft";
    },500)

},50);


[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
});

function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch-this.startY;
    var index = this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none"
        }
        arguments[0].firstElementChild.id="";
        a1.getElementsByTagName("p")[0].className="";
        a1.getElementsByTagName("p")[1].className="";
        a1.getElementsByTagName("p")[2].className="";
        img1.className="";
        document.querySelector(".a4>h2").className="";

    });
    if(movePos>0){
        this.prevSIndex = (index == 0?oLis.length-1:index-1);
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+(-winH+movePos)+"px)";
    }else if(movePos<0){
        this.prevSIndex = (index == oLis.length-1?0:index+1);
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+(winH+movePos)+"px)";
    }
    oLis[this.prevSIndex].className = 'zIndex';
    oLis[this.prevSIndex].style.display ="block";
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+")  translate(0,"+movePos+"px)";

}
function end(e){
    if(this.flag){
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.5s ease-out";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName =="LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="a"+(this.index+1);
            if(this.index===0){
                img1.className="animated swing infinite";
                a1.getElementsByTagName("p")[0].className="animated bounceInLeft";
                a1.getElementsByTagName("p")[1].className="animated bounceInRight";
                window.setTimeout(function(){
                    a1.getElementsByTagName("p")[2].className="animated rotateInDownLeft";
                },500)
            }
            if((this.index+1)===4){
                document.querySelector(".a4>h2").className="animated shake";
            }

        },false)
    }
}