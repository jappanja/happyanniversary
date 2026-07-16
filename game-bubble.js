document.addEventListener("DOMContentLoaded",()=>{

const bubbleField=document.getElementById("bubbleField");
const bubbleScore=document.getElementById("bubbleScore");
const bubbleTime=document.getElementById("bubbleTime");
const startBubble=document.getElementById("startBubble");
const bubbleMessage=document.getElementById("bubbleMessage");
const gameAudio=document.getElementById("gameAudio");

let score=0;
let timeLeft=30;
let timer=null;
let active=false;

const loveMessages=[
"aku sayang kamu",
"aku cinta kamu",
"kamu selalu spesial",
"aku beruntung punya kamu",
"jangan sedih sayang",
"jangan lupa aku sayang kamu",
"aku suka senyum kamu",
"kamu rumah aku",
"aku selalu sama kamu",
"kamu alasan aku senyum",
"aku suka semua tentang kamu",
"kamu cantik banget",
"terima kasih udah ada buat aku",
"aku bahagia sama kamu",
"aku sayang bgt sama kamu",
"aku pengen ketemu kamu terus",
"mata kamu bagus banget",
"selalu jaga diri ya",
"aku kangen kamu",
"aku suka senyum kamu",
"kamu buat aku senyum terus",
"aku selalu dukung kamu",
"aku pengen km senyum terus",
"aku gabisa tanpa kamu",
"aku nyaman sama kamu",
"km udah jadi bagian hidup aku",
"aku gaperna bosen sama kamu",
"aku bersyukur punya kamu",
"pengen ketemu ciuman",
"pengen peluk kamu terus",
];


function playAudio(){

if(!gameAudio)return;

gameAudio.volume=.3;
gameAudio.loop=true;

if(gameAudio.paused){
gameAudio.play().catch(()=>{});
}

}


document.addEventListener("click",playAudio,{once:true});


function showLove(text,x,y){

const notif=document.createElement("div");

notif.className="love-popup";
notif.textContent=text;

notif.style.left=x+"px";
notif.style.top=y+"px";

document.body.appendChild(notif);


setTimeout(()=>{
notif.classList.add("hide");
},700);


setTimeout(()=>{
notif.remove();
},1000);

}



function createBubble(){

if(!active)return;


const bubble=document.createElement("button");

bubble.className="bubble";
bubble.textContent="♡";


let size=45+Math.random()*45;


bubble.style.width=size+"px";
bubble.style.height=size+"px";

bubble.style.left=Math.random()*85+"%";
bubble.style.top=Math.random()*75+"%";


bubble.onclick=()=>{

score++;

bubbleScore.textContent=score;


const rect=bubble.getBoundingClientRect();


showLove(
loveMessages[Math.floor(Math.random()*loveMessages.length)],
rect.left+(rect.width/2),
rect.top
);


bubble.classList.add("pop");


setTimeout(()=>{
bubble.remove();
createBubble();
},150);

};


bubbleField.appendChild(bubble);

}



function startGame(){

if(active)return;


playAudio();


active=true;

score=0;

timeLeft=30;


bubbleScore.textContent="0";
bubbleTime.textContent="30";


bubbleMessage.textContent="Pecahkan bubble sebanyak mungkin";


bubbleField.innerHTML="";


for(let i=0;i<8;i++){
createBubble();
}



timer=setInterval(()=>{

timeLeft--;

bubbleTime.textContent=timeLeft;


if(timeLeft<=0){

clearInterval(timer);

active=false;

bubbleField.innerHTML="";


bubbleMessage.textContent=
`Waktu habis! Score : ${score}`;

}

},1000);

}


startBubble.addEventListener("click",startGame);

});