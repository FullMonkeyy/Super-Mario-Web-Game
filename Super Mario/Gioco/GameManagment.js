var img = new Image();


//CANVAS PROPRIETY
const gravity=0.5;
const canvas=document.querySelector("canvas");
const c=canvas.getContext("2d");
canvas.width=1500;
canvas.height=723;
var volo=false;
var scrolloff=+23;
const max=3600;


//MECCANICHE DI GIOCO
const player=new Player();
var goal;
const platforms=[];
const blocks=[];
const plants=[];
const traguardo=new Goal({x:3800,y:700});
const coins=[];
const ground=document.getElementById("ground");
const background=document.getElementById("background");
ground.style.position="relative";
background.style.position="relative";
const key=new Key();
let mariocounter=0;
var img = new Image();
var plat=new Image();
plat.src='assets/platform.png';
var block=new Image();
block.src="assets/Block.png"
var goalimg=new Image();
goalimg.src="assets/Flag.png";
var plantimg=new Image();

plantimg.src=FramePlant[0];
//var bandierina=new Image();
//bandierina.src='assets/platform.png';
var imgcoins=new Image();

//imgcoins.src=FrameCoin[0];
imgcoins.src=FrameCoin[0];
var framecoin=0;
var frameplant=0;
var framehealth=1;

var mezzo=0;
var tocca=false;
var toccatodestra=false;
var toccatosinistra=false;
var danno=false;
var immunita=false;
var perso=false;
var vinto=false;
rectplay=new Rectangle(0,0,0,0);
plantrect=new Rectangle(0,0,0,0);
coinsrect=new Rectangle(0,0,0,0);
var blockrect=new Rectangle(0,0,0,0);

function NoImmunita(){

    immunita=false;

}


function animate(){
    
    rectplay.update(player.position.x-10,player.position.y, player.position.x+45,player.position.y-90);
    //requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
 

    platforms.forEach(platform=>{
        platform.draw();
    })
    blocks.forEach(block=>{
        block.draw();
    })
    plants.forEach(plant=>{
        //plant.position.y;
        plant.draw(frameplant);
        //c.fillRect(plant.position.x,plant.position.y,100,-100);
    })
    

    goal.draw();

    plantimg.src=FramePlant[frameplant];
    imgcoins.src=FrameCoin[framecoin];
    coins.forEach(con=>{
        con.draw();
    })
    if(framecoin==8){
        framecoin=0;
    }
    else{
        if(mezzo==6){
            framecoin++;
        }    
    }
    if(frameplant==19){
        frameplant=0;
    }
    else{
        if(mezzo==6){
            frameplant++;
            mezzo=0;
        }
        else{
            mezzo++;
        }      
    }
    
    toccatosinistra=false;
    toccatodestra=false;
    if(destra){
        blocks.forEach(b=>{

            //XRAY
            blockrect.update(b.position.x,b.position.y+100,b.position.x+50,b.position.y);
            //c.fillRect(blockrect.left,blockrect.bottom,20,20);
            //c.fillRect(blockrect.right,blockrect.top,20,20);
    
            tocca=!(blockrect.right<rectplay.left|| blockrect.left>rectplay.right||blockrect.bottom<rectplay.top|| blockrect.top>rectplay.bottom);
    
            if(tocca){
                toccatodestra=true;
                 //console.log("TOCCA");                 
            }
        })
    }
    else{
        blocks.forEach(b=>{

            //XRAY
            blockrect.update(b.position.x+50,b.position.y+100,b.position.x+100,b.position.y);
            //c.fillRect(blockrect.left,blockrect.bottom,20,20);
            //c.fillRect(blockrect.right,blockrect.top,20,20);
    
            
            tocca=!(blockrect.right<rectplay.left|| blockrect.left>rectplay.right||blockrect.bottom<rectplay.top|| blockrect.top>rectplay.bottom);
    
            if(tocca){
                toccatosinistra=true;
                 //console.log("TOCCA");                 
            }
        })
    }
    danno=false;
    plants.forEach(p=>{

        plantrect.update(p.position.x+20,p.position.y+plantimg.height/1.8,p.position.x+20+70,p.position.y)
        //c.fillRect(plantrect.left,plantrect.bottom,20,20);
        //c.fillRect(plantrect.right,plantrect.top,20,20);
        tocca=!(plantrect.right<rectplay.left|| plantrect.left>rectplay.right||plantrect.bottom<rectplay.top|| plantrect.top>rectplay.bottom);
    
            if(tocca && !immunita){
                danno=true;
                 //console.log("TOCCA");                 
            }

    })
    if(danno){
        damage.play();
        console.log("DANNO RICEVUTO");
        immunita=true;
        setTimeout(NoImmunita,3000);
        player.health--;
        var cuori=document.getElementById("cuori");
        if(framehealth!=4){
            framehealth++;
        }
        
        cuori.setAttribute("src","assets/Hearth/"+framehealth+".png");

        

    }
   
    if(!vinto){
        player.update();
    }
    else{
        player.draw();
    }
    //c.fillRect(rectplay.left,rectplay.bottom,20,20);
    //c.fillRect(rectplay.right,rectplay.top,20,20);
    //c.fillRect(rectplay.left,rectplay.bottom,rectplay.right,rectplay.top);
    ground.style.left= (-scrolloff)+"px";
    background.style.left=(-scrolloff/3)+"px";

    if(!(key.right.pressed==true && key.left.pressed==true)){
        if(key.right.pressed==true && player.position.x < 400 && !toccatodestra){

            player.velocity.x=+step;
            destra=true;
            mariocounter++;
            img.src = FrameTR[mariocounter];

    
        }else if(key.left.pressed && player.position.x > 220 && !toccatosinistra){

            player.velocity.x=-step;
            destra=false;
            mariocounter++;
            img.src = FrameTL[mariocounter];

        }
        else if(key.left.pressed && player.position.x <= 220 && player.position.x > 1 && scrolloff<1  && !toccatosinistra){

            player.velocity.x=-step;
            destra=false;
            mariocounter++;
            img.src = FrameTL[mariocounter];


        }else if(key.right.pressed && player.position.x >= 400 && player.position.x <=1450 && scrolloff>=max-200 && !toccatodestra ){

            player.velocity.x=+step;
            destra=true;
            mariocounter++;
            img.src = FrameTR[mariocounter];


        }
        else{

            player.velocity.x=0;
            
            if(key.right.pressed && scrolloff<=max-200 && !toccatodestra){
                img.src = FrameTR[mariocounter];
                mariocounter++;
                scrolloff+=step;
                platforms.forEach(platform=>{
                    platform.position.x-=step;
                
                })
                blocks.forEach(b=>{
                    b.position.x-=step;
                
                })
                coins.forEach(con=>{
                    con.position.x-=step;
                
                })
                plants.forEach(plant=>{
                    plant.position.x-=step;
                    //c.fillRect(plant.position.x,plant.position.y,100,-100);
                })
                goal.position.x-=step; 

                
            }
            else if(key.left.pressed && scrolloff>1 && !toccatosinistra){
                img.src = FrameTL[mariocounter];
                scrolloff-=step;
                mariocounter++;
                platforms.forEach(platform=>{
                    platform.position.x+=step;
                
                })
                blocks.forEach(b=>{
                    b.position.x+=step;
                
                })
                coins.forEach(con=>{
                    con.position.x+=step;
                
                })
                plants.forEach(plant=>{
                    plant.position.x+=step;
                    //c.fillRect(plant.position.x,plant.position.y,100,-100);
                })
                goal.position.x+=step;                
            }
            
            if(!key.left.pressed && !key.right.pressed || toccatodestra || toccatosinistra ){

                mariocounter=0;

            }

            if(destra){
                img.src = FrameTR[mariocounter];
    
            }else{
    
                img.src = FrameTL[mariocounter];    
    
            }
        
        }
    }
    else{

        mariocounter=0;
        player.velocity.x=0;
        if(destra){
            img.src = FrameTR[mariocounter];
        }else{
            img.src = FrameTL[mariocounter];    
        }
        

    }

    if(key.up.pressed && !volo){
        volo=true;
        player.velocity.y -=17;
        key.up.pressed=false;
        if(destra){
            img.src = FrameTR[mariocounter];
        }else{
            img.src = FrameTL[mariocounter];    
        }

    }
 
    if(destra){
        img.src = FrameTR[mariocounter];

    }else{

        img.src = FrameTL[mariocounter];    

    }

    //collisioni

    //Piattaforme
    if(!perso){    
    platforms.forEach(platform=>{
        if(player.position.y+player.height<=platform.position.y && player.position.y + player.height+ player.velocity.y >=platform.position.y
            && player.position.x+player.width>=platform.position.x && player.position.x<=platform.position.x+platform.width){
            player.velocity.y=0;
            volo=false;
            if(destra){
                img.src = FrameTR[mariocounter];
    
            }else{
    
                img.src = FrameTL[mariocounter];    
    
            }
            
        }
    })
    //Muri
    blocks.forEach(platform=>{

        if(player.position.y+player.height<=platform.position.y && player.position.y + player.height+ player.velocity.y >=platform.position.y
            && player.position.x+player.width>=platform.position.x && player.position.x<=platform.position.x+platform.width){
            player.velocity.y=0;
            volo=false;
            if(destra){
                img.src = FrameTR[mariocounter];
    
            }else{
    
                img.src = FrameTL[mariocounter];    
    
            }
            
        }
        if(player.position.x+player.width>=platform.position.x && player.position.x<=platform.position.x+platform.width && player.position.y-180>=platform.position.y && player.position.y-180+player.velocity.y<=platform.position.y ){

            player.velocity.y=0;
            volo=false;
            if(destra){
                img.src = FrameTR[mariocounter];
    
            }else{
    
                img.src = FrameTL[mariocounter];    
    
            }


        }

        


    })

    coins.forEach(con=>{

        coinsrect.update(con.position.x+10,con.position.y+50,con.position.x+40,con.position.y);
        //c.fillRect(coinsrect.left,coinsrect.bottom,20,20);
        //c.fillRect(coinsrect.right,coinsrect.top,20,20);
        tocca=!(coinsrect.right<rectplay.left|| coinsrect.left>rectplay.right||coinsrect.bottom<rectplay.top|| coinsrect.top>rectplay.bottom);
    
            if(tocca && !con.catched){
                
                catchedcoin.play();
                //console.log("PRESAAAA");
                con.catched=true;
                player.points++;
                document.getElementById("punteggio").innerHTML=player.points;
                
            }

    })
    }
    

    //controllo perdita
    if(framehealth==4 && !perso){
        Perso();
    }

    //controllo vincita
    if(player.position.x>=goal.position.x+30 && !vinto){
        vinto=true;
        gd=setInterval(GoSlowlyDown,10);
    }

}
var gd;
var to;
function Perso(){

    player.velocity.y=-25;
    pause=true;
    perso=true;
    document.getElementById("gameover").style.display="block";
    sound.pause();

}
function Win(){

    winning.play();
    clearInterval(gd);
    pause=true;  
    sound.pause();
    Utente.punteggio+=player.points;
    SalvaInfo(Utente);
    document.getElementById("vinto").style.display="block";

}
function GoSlowlyDown(){

    if(player.position.y<goal.position.y+100){
        player.position.y+=1;
    }
    else{
        clearTimeout(to)
        Win();

    }

}











