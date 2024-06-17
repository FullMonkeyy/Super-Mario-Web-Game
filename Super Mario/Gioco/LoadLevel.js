//Global variables
var Utente;
var FrameTR=[];
var FrameTL=[];
var FrameCoin=[];
var FramePlant=[]
var ord=false;
var schiacciato=false;
var destra=true;
var pause=false;
var sound;
var jump=new Audio("SoundsEffects/Jump.mp3");
var paused=new Audio("SoundsEffects/Pause.mp3")
var winning=new Audio("SoundsEffects/WinningSound.mp3")
var catchedcoin=new Audio("SoundsEffects/CatchedCoin.mp3")
var damage=new Audio("SoundsEffects/DamageSound.mp3")
var step=3;
var nlvl;
LoadFramesss();
CaricaUtente();

//Start
//LoadGame(1);



//Functions
function LoadGame(level){


    var selection=document.getElementById("Selection");
    selection.style.display="none";

    var vitcon=document.getElementsByClassName("vitcon");
    for(var i=0; i<vitcon.length;i++){

        vitcon[i].style.display="block";
        if(vitcon[i].id=="coinss"){
            vitcon[i].style.display="flex";
        }
    }
    
    LoadLevel(level)
    setInterval(MoveSky,50);
    const sky=document.getElementById("sky");
    
    AbilitaInput();
}
function SalvaInfo(Utente){

    var msg=JSON.stringify(Utente);
    var UserName=Utente.nome;
    sessionStorage[UserName]=msg;

}
function CaricaUtente(){

    Utente=JSON.parse(sessionStorage[JSON.parse(sessionStorage["Utente"]).nome]);
    var divo=document.getElementById("testo");
    divo.innerHTML=Utente.nome;
    

}
function PopUpOpen(){

    var pop=document.getElementById("popup");
    
    pop.style.display="block"
    pause=true;
    if(sound!=null){
        sound.pause();
    }
    paused.play();
       
}
function PopUpClose(){

    var pop=document.getElementById("popup");
    pop.style.display="none";
    if(sound!=null){
        sound.play();
    }
    pause=false;
}
function Esci(){

    SalvaInfo(Utente);
    window.location.replace("../LOGIN/login.html");

}
function LoadFramesss(){
    for(var i=1;i<12;i++){

        for(var j=1;j<=6;j++){


            FrameTR.push("assets/MarioTR/row-"+i+"-column-"+j+".png");
            if(i==11 && j==2){
                break;
            }
        }

    }
    for(var i=1;i<12;i++){

        for(var j=1;j<=6;j++){


            FrameTL.push("assets/MarioTL/row-"+i+"-column-"+j+".png");
            if(i==11 && j==2){
                break;
            }
        }

    }

    for(var i=1; i<3;i++){
        for(var j=1;j<5;j++){
            FrameCoin.push("assets/Coins/row-"+i+"-column-"+j+".png");
        }
    }


    for(var i=0; i<4;i++){

        for(var j=0; j<5;j++){

            FramePlant.push("assets/Plants/2023-12-15_20_07_01-Window-removebg ("+i+"_"+j+").png")


        }


    }
}
function LoadLevel(n){

    if(n!=2){
        nlvl=n;
        var urll="https://www.apibaobab.com/api/v1/Scuola/super-mario/level/"+n;

        fetch(urll)
            .then(x=>x.json())
            .then(y=>{

                GeneraLivello(y);

            })
    }
    else{

        GeneraLivello(Lvl2);

    }


}
function MoveSky(){

    if(!pause){
    sky.style.left=parseInt(sky.style.left)-2+"px";
    }
    if(parseInt(sky.style.left)%1500==0){
        var nuovanuv=document.createElement("img");
        if(!ord){
            ord=true;
            sky.removeChild(document.getElementById("sky1"));
            nuovanuv.src="assets/sky.png";
            nuovanuv.width=1500;
            nuovanuv.id="sky1";
            sky.appendChild(nuovanuv);

        }else{
            ord=false;
            sky.removeChild(document.getElementById("sky2"));
            nuovanuv.src="assets/sky.png";
            nuovanuv.width=1500;
            nuovanuv.id="sky2";
            sky.appendChild(nuovanuv);
            

        }
        sky.style.left="0px";

    }

}
function playmusic(){
    sound=new Audio("SoundsEffects/GameTheme.mp3");
    sound.loop="true";
    sound.play();
}
function GeneraLivello(dato){


    var offsetX=300;
    var offsetY=722;

    for(var i=0; i<dato.length;i++){

        if(dato[i].Type=="wall"){
            blocks.push(new Block({x:dato[i].X*4+offsetX,y:-1*dato[i].Y*3.9+offsetY}))
        }
        else if(dato[i].Type=="coin" && !(nlvl==1 && i==29)){

            coins.push(new Coins({x:dato[i].X*4+offsetX,y:-1*dato[i].Y*3.9+offsetY}))


        }
        else if(dato[i].Type=="plant"){

            plants.push(new Plant({x:dato[i].X*4+offsetX,y:-1*dato[i].Y*3.9+offsetY}))

        }
        else if(dato[i].Type=="end_flag"){

            goal=new Goal({x:dato[i].X*4+offsetX,y:-1*dato[i].Y*3.9+offsetY})

        }
        else if(dato[i].Type=="plat"){

            platforms.push(new Platform({x:dato[i].X*4+offsetX,y:-1*dato[i].Y*3.9+offsetY}))

        }
        
    }
   
    setInterval(animate,7);

}
function AbilitaInput(){
    document.addEventListener('keydown',(event)=>{

        var window=document.getElementById("finestra");
        var poswindow=window.getBoundingClientRect();
        
      
        if(!pause){
            switch(event.key){
    
    
                case "ArrowLeft"://left
    
                        
                        key.left.pressed=true;  
                    
    
                    break;
                case "ArrowRight"://right
    
                        key.right.pressed=true;
    
    
                    break;
                case "ArrowDown"://down
                    break;
                case "ArrowUp"://up


                        key.up.pressed=true;
                        jump.play();
                        
                    break;
    
            }
        }
    
    })
    addEventListener('keyup',(event)=>{
    
        switch(event.key){
    
    
            case "ArrowLeft"://left
    
                player.velocity.x=0;
                key.left.pressed=false;
                //mariocounter=0;
    
    
                break;
            case "ArrowRight"://right
    
                player.velocity.x=0;
                key.right.pressed=false;
                //mariocounter=0;
    
                break;
                case "ArrowUp"://up

                //jump.pause();

            break;
    
        }
    
    })
}
