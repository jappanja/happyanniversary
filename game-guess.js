const guessInput=document.getElementById("guessInput");
const guessButton=document.getElementById("guessButton");
const guessMessage=document.getElementById("guessMessage");
const guessTries=document.getElementById("guessTries");
const gameAudio=document.getElementById("gameAudio");

window.addEventListener("load",()=>{

if(!gameAudio)return;

gameAudio.volume=.3;
gameAudio.loop=true;

gameAudio.play().catch(()=>{

document.addEventListener("pointerdown",function(){

gameAudio.play().catch(()=>{});

},{once:true});

});

});
const endingOverlay=document.getElementById("endingOverlay");
const endingText=document.getElementById("endingText");
const continueBtn=document.getElementById("continueBtn");

let targetNumber=Math.floor(Math.random()*20)+1;
let tries=0;

const letter=`hi sayang...

ciee kamu berhasil nebak angkanya hahaha 🤍
sebenernya ini cuma game kecil kan? tapi aku bikin semua ini karena aku pengen kamu senyum, walaupun cuma bentar.
makasih ya udah mau mainin semuanya satu-satu. makasih juga udah nemenin perjalanan kecil yang aku siapin buat kamu.
semoga tiap game yang kamu mainin tadi bisa jadi kenangan lucu buat kita.
kalo nanti kamu lagi capek, jangan lupa istirahat ya istirahat sama aku ya sayang?
kalo lagi sedih, cerita aja. jangan dipendem sendiri, aku gasuka sayang, ada aku kan be?
kalo lagi ngerasa semuanya berat, inget ya... kamu lebih hebat dari yang kamu pikirin dan kamu punya aku, pacar kamu.
makasih ya udah tetap ada, udah tetap jadi rumah yang paling aku suka.
aku harap ke depannya kita bisa sama sama terus, lewatin semuanya bareng, apalagi kalo lagi berantem. semoga kita selalu dikasih jalan buat baikan lagi, seberat apa pun masalahnya.
aku bakal selalu doain yang terbaik buat kamu, buat kuliah kamu, kesehatan kamu, dan semua mimpi yang lagi kamu kejar.
makasih udah jadi bagian paling indah di hidup aku.

happy anniversary. i love you, always gendut 🤍
`;

function playAudio(){

if(!gameAudio)return;

gameAudio.volume=.3;
gameAudio.loop=true;

if(gameAudio.paused){
gameAudio.play().catch(()=>{});
}
}


guessButton.onclick=()=>{

playAudio();

const value=Number(guessInput.value);

if(!value||value<1||value>20){
guessMessage.textContent="Please enter a number between 1 and 20.";
return;
}

tries++;
guessTries.textContent=tries;

if(value===targetNumber){

guessMessage.textContent="You found it.";

guessButton.disabled=true;
guessInput.disabled=true;

setTimeout(showEnding,700);

return;
}

if(value<targetNumber){
guessMessage.textContent="Try a little higher.";
}else{
guessMessage.textContent="Try a little lower.";
}

guessInput.value="";
};

function showEnding(){

endingOverlay.classList.add("show");

for(let i=0;i<60;i++){
setTimeout(createFlower,i*80);
}

typeWriter(letter);

}

function typeWriter(text){

endingText.textContent="";

let index=0;

const typing=setInterval(()=>{

endingText.textContent+=text.charAt(index);

index++;

endingText.scrollTop=endingText.scrollHeight;

if(index>=text.length){

clearInterval(typing);

continueBtn.style.display="inline-flex";

}

},35);

}

function createFlower(){

const flower=document.createElement("div");

flower.className="flower";

const flowers=[
"🌸",
"🌺",
"💮",
"🌷",
"🌹"
];

flower.textContent=flowers[Math.floor(Math.random()*flowers.length)];

flower.style.left=Math.random()*100+"vw";

flower.style.fontSize=(18+Math.random()*20)+"px";

flower.style.animationDuration=(5+Math.random()*4)+"s";

document.body.appendChild(flower);

setTimeout(()=>{
flower.remove();
},9000);

}