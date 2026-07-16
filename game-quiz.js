const quizData=[

{
question:"warna favorit aku apa hayo?",
options:["hitam","biru","pink","putih"],
answer:"biru"
},

{
question:"game yang belum pernah aku mainin apa?",
options:["mobile legends","valorant","freefire","pubg"],
answer:"valorant"
},

{
question:"kenapa bulu kaki aku lebat?",
options:[
"karena dari lahir",
"karena sering kena matahari",
"karena aku cukur terus",
"karena kebanyakan minum susu"
],
answer:"karena aku cukur terus"
},

{
question:"minuman yang paling sering aku pilih apa?",
options:["es teler","es teh","fanta","sprite"],
answer:"fanta"
},

{
question:"kenapa aku suka main ml?",
options:[
"karena pengen main",
"karena gila wr",
"karena mau push rank",
"karena suka top up"
],
answer:"karena gila wr"
},

{
question:"kenapa aku sayang sama kamu?",
options:[
"karena kamu lucu",
"karena kamu selalu ada",
"karena kamu cantik sexy hot awahahhwa",
"semua benar"
],
answer:"semua benar"
},

{
question:"momen kita yang paling aku suka?",
options:[
"waktu ketawa bareng",
"waktu ngobrol random",
"kapdkaklf",
"semua momen sama kamu"
],
answer:"kapdkaklf"
},

{
question:"siapa yang paling sayang sama aku?",
options:[
"mama",
"manda gendut",
"jea",
"bela"
],
answer:"manda gendut"
},

{
question:"ipk terakhir aku berapa hayo?",
options:[
"3,76",
"3,78",
"3,75",
"3,79"
],
answer:"3,75"
},

{
question:"tahun berapa aku beli macbook?",
options:[
"2022",
"2023",
"2024",
"2025"
],
answer:"2023"
},

{
question:"hoodie yang sering aku pake warnanya apa hayo?",
options:[
"hitam",
"abu abu",
"navy",
"putih"
],
answer:"abu abu"
},

{
question:"minuman favorit aku yang kedua apa?",
options:[
"pulpy",
"buavita",
"nutriboost",
"oreo milkshake"
],
answer:"buavita"
},

{
question:"jus favorit aku apa?",
options:[
"alpukat",
"jambu",
"mangga",
"duren"
],
answer:"mangga"
},

{
question:"kalau aku lagi sedih banget biasanya aku ngapain?",
options:[
"tidur",
"main game",
"telfon kamu",
"menyendiri"
],
answer:"telfon kamu"
},

{
question:"warna sepatu aku apa?",
options:[
"hitam",
"putih",
"cream",
"biru"
],
answer:"cream"
},

{
question:"aku pernah hampir mati ga?",
options:[
"belum pernah",
"pernah",
"sering",
"gatau"
],
answer:"pernah"
},

{
question:"kasus ngawur aku yang pernah terjadi apa hayo?",
options:[
"hampir bakar rumah",
"jatuh dari motor",
"nabrak mobel",
"nyasar jauh"
],
answer:"hampir bakar rumah"
},

{
question:"aku mulai gendut kapan?",
options:[
"waktu sekolah",
"waktu kuliah",
"liburan kuliah",
"gatau krn aku ga sayang km"
],
answer:"waktu kuliah"
},

{
question:"motor pertama aku apa?",
options:[
"vario",
"beat",
"aerox",
"scoopy"
],
answer:"vario"
},

{
question:"lagu favorit aku apa?",
options:[
"treat u better",
"shape of my heart",
"until i found you",
"jedak jeduk"
],
answer:"treat u better"
}

];

const quizQuestion=document.getElementById("quizQuestion");
const quizOptions=document.getElementById("quizOptions");
const quizMessage=document.getElementById("quizMessage");
const quizScore=document.getElementById("quizScore");
const quizProgress=document.getElementById("quizProgress");
const progressBox=document.getElementById("progressBox");
const finalScoreBox=document.getElementById("finalScoreBox");
const restartBtn=document.getElementById("restartBtn");
const gameAudio=document.getElementById("gameAudio");


let currentIndex=0;
let score=0;


function playAudio(){
    if(!gameAudio)return;
    gameAudio.volume=.3;
    gameAudio.loop=true;
    gameAudio.play().catch(()=>{});
}


window.addEventListener("load",()=>{
    if(sessionStorage.getItem("musicUnlocked")==="true"){
        playAudio();
    }
});


document.addEventListener("click",()=>{
    sessionStorage.setItem("musicUnlocked","true");
    playAudio();
},{once:true});



function renderQuestion(){

    let current=quizData[currentIndex];

    quizQuestion.textContent=current.question;

    quizOptions.innerHTML="";


    quizProgress.textContent=
    `${currentIndex + 1} / ${quizData.length}`;


    current.options.forEach(option=>{

        let button=document.createElement("button");

        button.className="option-btn";

        button.textContent=option;

        button.onclick=()=>checkAnswer(option);

        quizOptions.appendChild(button);

    });

}



function checkAnswer(selected){

    playAudio();


    document.querySelectorAll(".option-btn").forEach(btn=>{
        btn.disabled=true;
    });



    if(selected===quizData[currentIndex].answer){

        score++;

        quizMessage.textContent="ANJAYYY BENER awkoakwoa";
        quizMessage.style.color="#4caf50";


    }else{

        quizMessage.textContent=
        "SALAH! artinya km ga sayang aku dahlah";

        quizMessage.style.color="#ff5c7a";

    }



    currentIndex++;



    setTimeout(()=>{


        if(currentIndex < quizData.length){


            quizMessage.textContent="answer to begin";

            quizMessage.style.color="#a45172";


            renderQuestion();



        }else{

quizQuestion.textContent="all done ♡";

quizOptions.innerHTML="";


progressBox.style.display="none";

finalScoreBox.style.display="inline-block";


quizScore.textContent=score;


quizMessage.style.color="#a45172";

quizMessage.textContent=getLoveMessage(score);


restartBtn.style.display="block";

}


    },1000);

}




restartBtn.onclick=()=>{

    currentIndex=0;
    score=0;

    // sembunyikan score akhir
    finalScoreBox.style.display="none";

    // munculkan nomor soal lagi
    progressBox.style.display="inline-block";

    // reset angka score
    quizScore.textContent="0";

    // reset progress
    quizProgress.textContent="1 / " + quizData.length;

    quizMessage.textContent="answer to begin";
    quizMessage.style.color="#a45172";

    restartBtn.style.display="none";

    renderQuestion();

};



function getLoveMessage(score){


if(score===1){
return "parah km ga sayang sm aku ";
}

if(score===2){
return "kayaknya km ga sayang sm aku deh ";
}

if(score===3){
return "waduh baru 3, masih kurang sayang ";
}

if(score===4){
return "GA SAYANG AKUUUUU";
}

if(score===5){
return "dahlah emg ga sayang ";
}

if(score===6){
return "cmn segini km yg benar? emg parah";
}

if(score===7){
return "ga sayang sm aku";
}

if(score===8){
return "masih blm sayang sama aku, masih kurang perhatian";
}

if(score===9){
return "masih blm sayang sm aku";
}

if(score===10){
return "apala ga sayang sama aku";
}

if(score===11){
return "cmn segini nih? ga sayang ya";
}

if(score===12){
return "hmmmm";
}

if(score===13){
return "lumayan laa keliatan sayangnya";
}

if(score===14){
return "alah cmn segini ga sayang beneran sm aku";
}

if(score===15){
return "cmn bener 15 ga sayang fix";
}

if(score===16){
return "hmm sayang beneran ga sayang sm aku? ";
}

if(score===17){
return "lumayan la bener 17, sayang ya sama aku?";
}

if(score===18){
return "hmmm lumayan la keliatan sayangnya";
}

if(score===19){
return "buset salah 1, keren bub i love youuuu";
}

if(score===20){
return "ANJAYY BENER SEMUA HAHAHAH, i love you sayang akuuuu. makasih udah perhatian dan tau semual hal tentang aku ya cayangg";
}

}



renderQuestion();