class Dato{


    constructor(name,pass,punt){

        this.nome=name;
        this.password=pass;
        this.punteggio=punt;

    }

}
var Utente;
var reg=new Audio("SoundEffects/Registred.mp3");
function CreaUtente(){

    var UserName=document.getElementById("usernew").value;
    var pas1=document.getElementById("pass1").value;
    var pas2=document.getElementById("pass2").value;
    if(pas1!=pas2){
        alert("Le password non corrispondono");
    }
    else if(sessionStorage.getItem(UserName)!=null){

        alert("Utente gia' esistente");

    }else if(pas1 ==""){

        alert("Digitare una password");

    }
    else if(UserName!=""){
        var newuser=new Dato(UserName,pas1,0);
        sessionStorage.setItem(UserName,JSON.stringify(newuser));
        Regitrato();
        reg.play();
    }
    else{

        alert("Inserire il nome");

    }


}
function Regitrato(){

    var divo=document.getElementById("sig");
    divo.innerHTML="";
    var regi=document.createElement("div");
    regi.id="regi";
    regi.innerHTML="<div id='rd'>Registrazione avvenuta con successo</div>";
    divo.appendChild(regi);
    divo.innerHTML+="<br><button id='indietro' onclick='TornaIndietro()'> Torna al Login</button>";


}
function TornaIndietro(){

    window.location.replace("login.html");

}
function Logga(){


    var UserName=document.getElementById("user").value;
    var pas=document.getElementById("pass").value;
    if(sessionStorage.getItem(UserName)==null){
        alert("Utente non esistente");
    }
    else{

        var tmp =JSON.parse(sessionStorage[UserName]);

        if(tmp.password==pas){

            if(sessionStorage.getItem("Utente")==null){

                sessionStorage.setItem("Utente",sessionStorage.getItem(UserName))

            }
            else{

                sessionStorage["Utente"]=sessionStorage.getItem(UserName);

            }
            window.location.replace("../Gioco/SuperMario.html");
        }
        else
            alert("Password sbagliata");
    }
}
function CaricaStorico(){

    var players=[];
    var tmp;
    const keys = Object.keys(sessionStorage);
    var container=document.getElementById("contentstorico");

    for(var i=0; i<sessionStorage.length;i++){

        if(keys[i]!="Utente" && keys[i]!="undefined" && keys[i]!=null&& keys[i]!=""){
            Utente=JSON.parse(sessionStorage[keys[i]]);
            players.push(Utente);
        }

    }

    for(var i=0; i<players.length; i++){

        for(var j=1; j<players.length;j++){

            if(players[j].punteggio>players[i].punteggio){

                tmp=players[i];
                players[i]=players[j];
                players[j]=tmp;

            }

        }


    }


    for(var i=0; i<players.length;i++){

            container.innerHTML+="<br>"+(i+1)+"#"+" "+players[i].nome+" COINS: "+players[i].punteggio;
    }


}


