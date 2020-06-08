//window.resizeBy(300, 300);
// Очистка полей
$('input[type="text"]').val('');
//myWindow.resizeTo(800,600);
//    myWindow.focus();
//    let myWindow = window.open("","","width=800,height=600");
     
    
// Проверка имени
$(document).ready(function() {
  $(':input[type="submit"]').prop('disabled', true);
  $('input[type="text"]').keyup(function() {
     if($(this).val() != '') {
        $(':input[type="submit"]').prop('disabled', false);
        $('#start').css('cursor','pointer');
     }
  });
});

//Выбор карты
let a = 1; // Индикатор
$('select').click(function(){
  let value = $('select').val();
  
	if (value == 'Day'){
    $('#Pers1').css('display','block');
    $('#Pers2').css('display','none');
    a = 1;
  }
  if (value == 'Night'){
    $('#Pers2').css('display','block');
    $('#Pers1').css('display','none');
    a = 2;
  }
});



//Автозапуск видео ЗВУК НЕ РАБОТАТ ИЗ ЗА ПОЛИТИКИ БРАУЗЕРОВ
 $('.butStart').click(function(){
    $('main').css('display','none');
    $('.video').css('display', 'block');
 });

//Закрытие видео по нажатию на Esc
    $(document).keyup(function(e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        $('.video').css('display', 'none');
        $('main').css('display','none');
        $('#canvasBg').css('display', 'block');
        $('#canvasTom').css('display', 'block');
        $('#canvas').css('display', 'block');
        $('#time').css('display', 'block');
        $('#xp').css('display', 'block'); 
        $('#score').css('display', 'block');  
      }   
    });

    
//////////////////////////////////////////////


let cvsBg = document.getElementById("canvasBg");
let ctxBg = cvsBg.getContext("2d");

    
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let cvsTom = document.getElementById("canvasTom");
let ctxTom = cvsTom.getContext("2d");

//УДАЛИТЬ НЕ ИСПОЛЬЗУЕТСЯ
let cvsDeath = document.getElementById("canvasDeath");
let ctxDeath = cvsDeath.getContext("2d");

let bg1 = new Image();
let bg2 = new Image();
let heroImg = new Image();
let tomImg = new Image();
let cheeseImg = new Image();
let platImg = new Image();
let bgDeath = new Image();


tomImg.src = "./media/cartoon_img_075.png";
heroImg.src = "./media/tom_and_jerry_PNG2.png";
platImg.src = "./media/sprite/plat.jpg";
bgDeath.src = "./media/sprite/bgDeath.jpg";
bg1.src = "./media/sprite/bg1.jpg";
bg2.src = "./media/sprite/bg2.jpg";
cheeseImg.src = "./media/sprite/image-removebg-preview.png";

let music = new Audio(); 
music.src = "./media/fonovaya-muzyka-fon-dlya-igr-bystraya-muzyka.mp3";
music.volume = 1;
music.autoPlay = true;
music.preLoad = true;
music.controls = true; 



//Персонаж
let hero = {
    xp : 100,
    score : 0,
    x : 15,
    y : 420,

    move() { // движение до середины
        if (this.x < cvs.width / 2 - 70){           
            this.x += 1 - Math.pow(1 - 0.5, 3);  //0.5 прогресс анимации ПЕРЕДЕЛАТЬ             
        }
        // else  прокрутка фона
      },

      //прыжок
    moveUp() {
        if (hero.y > 400){
        hero.y -= 250;
        hero.x -= 10; //Math.sqrt(1 - Math.pow(x - 1, 2));
        }
    },

    gravitation() { // гравитация
        if (this.y < 420){
            let g = 2;
            this.y += g *g; 
            g += 0.5;
        }
      },
    live(){ // БЕЗ КОСТЫЛЕЙ НЕ РАБОТАЕТ
        // декремент хр каждую секунду
        if (hero.xp > 1){
            setInterval(hero.xp--, 1000);
            }
        
    },
    healing(){// Лечение
        if( // 1118/12-ширина кадра героя
            cvs.width - cheese.x >= cvs.width - hero.x 
            && cvs.width -cheese.x <= cvs.width -hero.x + 1118/12
            && cheese.y >= hero.y
            && cheese.y <= hero.y + 157// 157 - высота кадра героя
            && this.y + 157 >= cvs.height - 500
            &&((this.x+1118/12)-(cheese.x+cheeseImg.width)) >= ((this.x+1118/12)/2-(cheese.x+cheeseImg.width)/2)
            && ((this.y+157) - (cheese.y + cheeseImg.height)) >= ((this.y+157)/2 - (cheese.y+cheeseImg.height)/2)
          
        ){
                ++this.score;
                this.xp += 10;
                cheese.x = cvs.width + Math.floor(Math.random() * (100 - 5 + 1)) + 5;

            }
    },
    attacing(){// Нападение
        
        if( // 1118/12-ширина кадра героя
            cvs.width - tom.x >= cvs.width - hero.x 
            && cvs.width -tom.x <= cvs.width -hero.x + 1118/12
            && tom.y >= hero.y
            && tom.y <= hero.y + 157// 157 - высота кадра героя
            && this.y + 157 >= cvs.height - 500
            &&((this.x+1118/12)-(tom.x+577/12)) >= ((this.x+1118/12)/2-(tom.x+577/12)/2)
            && ((this.y+157) - (tom.y + 110)) >= ((this.y+157)/2 - (tom.y+110)/2)
          
        ){
                
                this.xp -= 30;
                tom.x = cvs.width + Math.floor(Math.random() * (1000 - 5 + 1)) + 5;

            }
    },

        animation(){

            let sx = 0,//Координата X начальной точки обрезки
            tick_count = 0;
            let sprite = new Image();//спрайт
            sprite.src = './media/sprite/12.png';
            sprite.onload = function() {
              tick();
            };
            
            function tick() {
              if (tick_count >= 12) {
                drawCat();
                tick_count = 0;
              }
              tick_count += 1;
              requestAnimationFrame(tick);
            }
            
            function drawCat() {
              ctx.clearRect(0, 0, cvs.width, cvs.height); //очистка канваса
              sx = (sx === 1118 ? 0 : sx + 1118/12); //переброс в начало, если спрайт закончился 384 - width картинки, 384/4 =96 -шаг, на который сдвигаем
              ctx.drawImage(sprite, sx, 0, 1118/12, 157, hero.x, hero.y, 1118/12, 157); //отображение первого спрайта
            }
             

        }

};


//Атакующий персонаж
let tom = {
    y : 440,
    x : cvs.width + 115,

    move() { // движение 

        if (this.x > 1){
           this.x -= 3.5; 
        }
        else {
            this.x = cvs.width + Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
        }
      },
      animation(){

        let sx = 0,//Координата X начальной точки обрезки
        tick_count = 0;
        let sprite = new Image();//спрайт
        sprite.src = './media/sprite/11.png';
        sprite.onload = function() {
          tick();
        };
        
        function tick() {
          if (tick_count >= 12) {
            drawCat();
            tick_count = 0;
          }
          tick_count += 1;
          requestAnimationFrame(tick);
        }
        
        function drawCat() {
          ctxTom.clearRect(0, 0, cvs.width, cvs.height); //очистка канваса
          sx = (sx === 577 ? 0 : sx + 577/12); //переброс в начало, если спрайт закончился 384 - width картинки, 384/4 =96 -шаг, на который сдвигаем
          ctxTom.drawImage(sprite, sx, 0, 577/12, 110, tom.x, tom.y, 577/12, 110); //отображение первого спрайта
        }
         

    }
};

//Сыр
let cheese = {
    y : cvs.height - Math.floor(Math.random() * (400 - 30 + 1)) + 30,
    x : cvs.width + 1,
    move() { // движение 
        if (this.x > 1){
           this.x -= 2; 
        }
        else {
            this.x = cvs.width + Math.floor(Math.random() * (100 - 5 + 1)) + 5;
            this.y = cvs.height/2 + Math.floor(Math.random() * (200 - 0 + 1)) + 0;
        }
      }
};


  //отслеживание нажатия
  document.addEventListener("keydown", hero.moveUp);
 


  
   
 
// Не работат из за политики браузера
 //music.play();


function draw() {  
    
    if (a == 1){
      ctxBg.drawImage(bg1, 0, 0);}
      if (a == 2){
        ctxBg.drawImage(bg2, 0, 0);} 

    ctxBg.drawImage(cheeseImg, cheese.x, cheese.y);
    ctxBg.drawImage(platImg, 0, 543);
    ctxBg.drawImage(platImg, 400, 543);
    hero.move();
    hero.gravitation();
    hero.healing();
 //   hero.live();
    tom.move();
    cheese.move();
    death();
    hero.attacing();
    requestAnimationFrame(draw);
}

onload = draw;

setInterval(hero.animation,3000);
setInterval(tom.animation,3000);
//hero.animation();
//tom.animation();

//Таймер
let i = 1;
setInterval(function() {i++; $("#time").text('Time:  ' + i);}, 1000);
setInterval(function() {$("#xp").text('Xp:  ' + hero.xp)}, 1); //КОСТЫЛЬ!!
setInterval(function() {$("#score").text('Score:  ' + hero.score)}, 1);

///////////////

  
//////////////////////////////////////////
function death(){
let t = 0
if (hero.xp <= 0 && t <= 1){
 //   const _mainScore = hero.score;
 //   const _mainTime = i;   
 //   t++;
 //  let mainScore = _mainScore;
 //  let mainTime = _mainTime;
 //  $("#youName").text('input[type="text"]'.val());  
    $('canvas').css ('display', 'none');
    $('#time').css ('display', 'none');
    $('#xp').css ('display', 'none');
    $('#score').css ('display', 'none');
    $('#death').css ('display', 'block');
}
}
$('#top').click(function(){	
    $('#death').css('display','none');
    $('#top').css('display', 'none');
    $('#rating').css('display','block');
    $('#death').remove();
    $("#youScore").text(mainScore);
    $("#youTime").text(mainTime);
  });


  