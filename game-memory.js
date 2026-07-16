// ==========================
// MEMORY MATCH GAME
// ==========================

const gameAudio=document.getElementById("gameAudio");

function playAudio(){
    if(!gameAudio)return;

    gameAudio.volume=.3;
    gameAudio.loop=true;

    if(gameAudio.paused){
        gameAudio.play().catch(()=>{});
    }
}

window.addEventListener("load",playAudio);
window.addEventListener("click",playAudio,{once:true});


// ==========================
// CARD DATA
// ==========================

const cards=[
    {id:"heart",icon:"💗"},
    {id:"star",icon:"⭐"},
    {id:"moon",icon:"🌙"},
    {id:"rose",icon:"🌹"},
    {id:"sun",icon:"☀️"},
    {id:"tulip",icon:"🌷"},
    {id:"spark",icon:"✨"},
    {id:"flower",icon:"💐"}
];


// ==========================
// ELEMENT
// ==========================

const memoryGrid=document.getElementById("memoryGrid");
const pairCount=document.getElementById("pairCount");
const moveCount=document.getElementById("moveCount");
const timeCount=document.getElementById("timeCount");
const gameMessage=document.getElementById("gameMessage");
const restartGame=document.getElementById("restartGame");

const winPopup=document.getElementById("winPopup");
const winText=document.getElementById("winText");


// ==========================
// VARIABLE
// ==========================

let deck=[];

let firstCard=null;
let secondCard=null;

let lockBoard=false;

let moves=0;
let matchedPairs=0;

let timer=120;
let timerInterval;


// ==========================
// SHUFFLE
// ==========================

function shuffle(array){

    let result=[...array];

    for(let i=result.length-1;i>0;i--){

        let random=Math.floor(Math.random()*(i+1));

        [result[i],result[random]]=
        [result[random],result[i]];

    }

    return result;
}


// ==========================
// CREATE DECK
// ==========================

function buildDeck(){

    return shuffle(
        [...cards,...cards].map((card,index)=>({

            ...card,

            uniqueId:
            card.id+"-"+index

        }))
    );

}


// ==========================
// CREATE CARD
// ==========================

function renderBoard(){

    memoryGrid.innerHTML="";


    deck.forEach(card=>{

        const button=document.createElement("button");

        button.type="button";

        button.className="memory-card";


        button.dataset.id=card.id;


        button.innerHTML=`

        <span class="memory-card-face card-front"></span>

        <span class="memory-card-face card-back">
        ${card.icon}
        </span>

        `;


        button.addEventListener("click",()=>{

            revealCard(button,card);

        });


        memoryGrid.appendChild(button);

    });

}


// ==========================
// FLIP CARD
// ==========================

function revealCard(button,card){


    if(
        lockBoard ||
        button.classList.contains("is-flipped") ||
        button.classList.contains("is-matched")
    ){
        return;
    }


    button.classList.add("is-flipped");


    if(!firstCard){

        firstCard={
            button,
            card
        };

        return;
    }


    secondCard={
        button,
        card
    };


    moves++;

    moveCount.textContent=moves;



    if(firstCard.card.id===secondCard.card.id){


        firstCard.button.classList.add("is-matched");

        secondCard.button.classList.add("is-matched");


        matchedPairs++;


        pairCount.textContent=
        `${matchedPairs} / ${cards.length}`;


        gameMessage.textContent=
        "💗 Nice Match!";


        firstCard=null;
        secondCard=null;



        if(matchedPairs===cards.length){

            clearInterval(timerInterval);

            saveBest();

            gameMessage.textContent=
            "🎉 Congratulations!";


            setTimeout(()=>{

                showWinPopup();

            },500);

        }


        return;

    }



    lockBoard=true;


    gameMessage.textContent=
    "❌ Try Again";



    setTimeout(()=>{


        firstCard.button.classList.remove("is-flipped");

        secondCard.button.classList.remove("is-flipped");


        firstCard=null;

        secondCard=null;


        lockBoard=false;


        gameMessage.textContent=
        "Choose another pair";


    },800);

}


// ==========================
// TIMER
// ==========================

function startTimer(){

    clearInterval(timerInterval);


    timer=120;


    updateTimer();


    timerInterval=setInterval(()=>{


        timer--;


        updateTimer();



        if(timer<=0){

            clearInterval(timerInterval);


            lockBoard=true;


            gameMessage.textContent=
            "⏰ Time's Up!";


            setTimeout(()=>{

                alert("Time's Up!");

                resetGame();

            },500);

        }


    },1000);

}


function updateTimer(){

    let min=Math.floor(timer/60);

    let sec=timer%60;


    timeCount.textContent=
    `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}


// ==========================
// BEST SCORE
// ==========================

function saveBest(){

    let best=
    localStorage.getItem("memoryBest");


    if(
        best===null ||
        moves<Number(best)
    ){

        localStorage.setItem(
            "memoryBest",
            moves
        );

    }

}


// ==========================
// RESET
// ==========================

function resetGame(){

    clearInterval(timerInterval);


    deck=buildDeck();


    firstCard=null;

    secondCard=null;

    lockBoard=false;


    moves=0;

    matchedPairs=0;


    moveCount.textContent="0";

    pairCount.textContent=
    `0 / ${cards.length}`;


    gameMessage.textContent=
    "Choose two cards to begin";


    renderBoard();

    startTimer();

}


// ==========================
// WIN POPUP
// ==========================

function showWinPopup(){


    const best=
    localStorage.getItem("memoryBest");


    const message=
`wihh selamat baeee
ini emang game kecil kecilan buat kamu,
tapi aku seneng banget bisa bikin ini buat kamu,
karena kamu jarang main game hehehe.
tolong main ini pas kamu free yahh? 
i love you bebee.`;



    winPopup.classList.add("show");


    winText.textContent="";


    let index=0;


    const typing=setInterval(()=>{


        winText.textContent+=message[index];


        index++;


        if(index>=message.length){

            clearInterval(typing);

        }


    },35);

}



function closeWinPopup(){

    winPopup.classList.remove("show");

}


// ==========================
// RESTART
// ==========================

restartGame.addEventListener(
"click",
resetGame
);


// ==========================
// REVEAL ANIMATION
// ==========================

const revealItems=
document.querySelectorAll(".reveal");


if(revealItems.length){

const observer=
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("visible");

}


});


},{threshold:.15});


revealItems.forEach(item=>
observer.observe(item));

}


// ==========================
// START
// ==========================

resetGame();

window.addEventListener("DOMContentLoaded",()=>{

playAudio();

});