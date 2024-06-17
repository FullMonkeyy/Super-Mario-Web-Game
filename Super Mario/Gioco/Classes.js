class Player{

    constructor(){

        this.position={x:250,y:300}
        this.width=15
        this.height=0
        this.velocity={x:0,y:0}
        this.health=3;
        this.points=0;
    }
    

    draw(){

        

        if(mariocounter>=62){
            mariocounter=0;
        }
        if(destra){
            img.src = FrameTR[mariocounter];
        }
        else{
            img.src = FrameTL[mariocounter];
        }
        //console.log(mariocounter);
        //c.fillRect(this.position.x-10,this.position.y,55,-90);
        //c.fillStyle="red";
        c.drawImage(img, this.position.x-25, this.position.y-95,img.width/3,img.height/3);
        

       
    }
    update(){
        this.draw();
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        if(this.position.y-this.height+this.velocity.y<=canvas.height || perso){
            this.velocity.y+=gravity;
        }
        else{ this.velocity.y=0;
            volo=false;
        }
        
    }

}
class Platform{

    constructor({x,y}){
        this.position={
            x,
            y,
        }

        this.width=100;
        this.height=25;
        
    }
    draw(){
        c.drawImage(plat,this.position.x,this.position.y,this.width,this.height);
    }
    
}
class Goal{

    constructor({x,y}){
        this.position={
            x,
            y,
        }

        this.width=100;
        this.height=25;
        
    }
    draw(){
        c.drawImage(goalimg,this.position.x,this.position.y-220,goalimg.width/1.5,goalimg.height/1.5);
        
    }
}
class Coins{

    constructor({x,y}){
        this.position={
            x,
            y,
        }

        this.width=50;
        this.height=50;
        this.catched=false;
        
    }
    draw(){

        if(!this.catched){
        c.drawImage(imgcoins,this.position.x,this.position.y,this.width,this.height);
        }
    }
   

}
class Block{

    constructor({x,y}){
        this.position={
            x,
            y,
        }

        this.width=100;
        this.height=100;
        
    }
    draw(){
        c.drawImage(block,this.position.x,this.position.y,this.width,this.height);
    }


}
class Plant{

    constructor({x,y}){
        this.position={
            x,
            y,
        }

        this.width=150;
        this.height=150;
        
        
    }
    draw(offsett){
       
            c.drawImage(plantimg,this.position.x,this.position.y-20+Math.ceil(offsett/3.2),plantimg.width/1.5,plantimg.height/1.5);
    }


}
class Dato{

    constructor(name,pass,punt){

        this.nome=name;
        this.password=pass;
        this.punteggio=punt;

    }
    

}
class Rectangle{
    constructor(left,bottom,right,top){
        this.left=left;
        this.bottom=bottom;
        this.right=right;
        this.top=top;
    }
    update(left,bottom,right,top){

        this.left=left;
        this.bottom=bottom;
        this.right=right;
        this.top=top;

    }
}
class Key{

    constructor(){

        this.right={
            pressed:false
        }
        this.left={
            pressed:false
        }

        this.up={
            pressed:false
        }

    }

}
class Element{
    constructor(x,y,type){

        this.X=x;
        this.Y=y;
        this.Type=type
    }
}