function MyDrag(options) {
    this.el = options.el || ''
    this.flag = false
    this.nx = 0
    this.ny = 0
    this.dx = 0
    this.dy = 0
    this.x = 0
    this.y = 0
    this.cur = {
        x: 0,
        y: 0
    }

    this.init()
}

MyDrag.prototype.down = function() {
    this.flag = true
    var touch ;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    this.cur.x = touch.clientX;
    this.cur.y = touch.clientY;
    this.dx = this.el.offsetLeft;
    this.dy = this.el.offsetTop;
}
MyDrag.prototype.move = function() {
    if(this.flag){
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.nx = touch.clientX - this.cur.x;
        this.ny = touch.clientY - this.cur.y;
        this.x = this.dx+this.nx;
        this.y = this.dy+this.ny;
        this.el.style.left = this.x+"px";
        this.el.style.top = this.y +"px";
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",function(){
            event.preventDefault();
        },false);
    }
}
MyDrag.prototype.end = function() {
    this.flag = false
}
MyDrag.prototype.init = function() {
  //  var div2 = document.getElementById("div2");
    var that = this
    this.el.addEventListener("mousedown",function(){
        that.down();
    },false);
    this.el.addEventListener("touchstart",function(){
        that.down();
    },false)
    this.el.addEventListener("mousemove",function(){
        that.move();
    },false);
    this.el.addEventListener("touchmove",function(){
        that.move();
    },false)
    document.body.addEventListener("mouseup",function(){
        that.end();
    },false);
    this.el.addEventListener("touchend",function(){
        that.end();
    },false);
}


/*var flag = false;
var cur = {
    x:0,
    y:0
}
var nx,ny,dx,dy,x,y ;
function down(){
    flag = true;
    var touch ;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    cur.x = touch.clientX;
    cur.y = touch.clientY;
    dx = div2.offsetLeft;
    dy = div2.offsetTop;
}*/
/*function move(){
    if(flag){
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        nx = touch.clientX - cur.x;
        ny = touch.clientY - cur.y;
        x = dx+nx;
        y = dy+ny;
        div2.style.left = x+"px";
        div2.style.top = y +"px";
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",function(){
            event.preventDefault();
        },false);
    }
}*/
//鼠标释放时候的函数
/*
function end(){
    flag = false;
}
var div2 = document.getElementById("div2");
div2.addEventListener("mousedown",function(){
    down();
},false);
div2.addEventListener("touchstart",function(){
    down();
},false)
div2.addEventListener("mousemove",function(){
    move();
},false);
div2.addEventListener("touchmove",function(){
    move();
},false)
document.body.addEventListener("mouseup",function(){
    end();
},false);
div2.addEventListener("touchend",function(){
    end();
},false);*/
