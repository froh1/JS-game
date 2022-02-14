var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var d = new Image();
var back = new Image();
d.src = "safa.png";

var ch = new Image();
ch.src = "cherep.png";
var ptuh = new Image();
ptuh.src = "zz.mp3";


var paddleX = 500;


var audio = new Audio(); // Создаём новый элемент Audio
audio.src = "rain.mp3";

///////
var bat_y = 70;
var bat_x = 450;

var bat_width = 120;
var bat_height = 120;
var i = 0;
var animbat =[];
var b1 = new Image();
b1.src = "bat1.png";
animbat.push(b1);

var b2 = new Image();
b2.src = "bat2.png";
animbat.push(b2);

var b3 = new Image();
b3.src = "bat3.png";
animbat.push(b3);

var b4 = new Image();
b4.src = "bat4.png";
animbat.push(b4);

/////////

////// comtrol
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 32 && skullfly == false)
    {
        skullfly = true;
        sx = paddleX;
        sy = 560;
        px = 60;
        py = 30;
        ptu();
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function ptu()
{
  document.getElementById('ptuh').play();
}
////
function MacroCollision(ox1,oy1,oh1,ow1,ox2,oy2,oh2,ow2)
{
  var XColl=false;
  var YColl=false;

  if ((ox1 + ow1 >= ox2) && (ox1 <= ox2 + ow2)) XColl = true;
  if ((oy1 + oh1 >= oy2) && (oy1 <= oy2 + oh2)) YColl = true;

  if (XColl&&YColl){return true;}
  return false;
}


////
var skullfly = false;
var sx, sy, px, py;

var qwe = 0;
var speed = 10;
var f = true;
var falling = false;
var yp = bat_y;
var XColl=false;
var YColl=false;
function draw() {
  
   ctx.clearRect(0, 0, canvas.width, canvas.height);  
   ///////
      
      if(MacroCollision(bat_x,bat_y,bat_height,bat_width,sx,sy,py,px) && !falling){
        falling = true;
        yp = bat_y;
      }

      if(!falling)
      {
        if(f) bat_x+=5;
        if(bat_x+bat_width == 1000) f = false
        if(!f) bat_x-=5;
        if(bat_x == 0) f = true;

        if(qwe < speed)
          ctx.drawImage(animbat[0],bat_x,bat_y,bat_width,bat_height);
        else if(qwe < speed * 2)
          ctx.drawImage(animbat[1],bat_x,bat_y,bat_width,bat_height);
        else
          ctx.drawImage(animbat[2],bat_x,bat_y,bat_width,bat_height);
        qwe++;
        if(qwe == speed * 3)
          qwe = 0;
      }
      else
      {
        yp+=5;
        ctx.drawImage(animbat[3],bat_x,yp,bat_width,bat_height);
        if(yp+bat_height >= 700) { falling = false; }
      }

    /////////

   if(rightPressed && paddleX < canvas.width-90) {
     paddleX += 10;
   }
   else if(leftPressed && paddleX > 0) {
     paddleX -= 10;
   }
   if(skullfly)
      ctx.drawImage(ch, sx, sy, px, py);

    ctx.drawImage(d, paddleX, 580,90,105);
    if(sx == bat_x && sy == bat_y){
       f = false;
    }
   
  sy-= 25;
   
  
  if(sy <= 0)
    skullfly = false;
//////////
  



 requestAnimationFrame(draw); 
}
audio.addEventListener('canplaythrough', function() { 
   audio.play();
}, false);
audio.addEventListener('ended', function() { 
   audio.play();
}, false);

draw();