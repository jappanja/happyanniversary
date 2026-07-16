const logoutButton=document.getElementById("logoutButton");
const loginForm=document.getElementById("loginForm");
const loginScreen=document.getElementById("loginScreen");
const introScreen=document.getElementById("introScreen");
const appScreen=document.getElementById("appScreen");
const openLetterBtn=document.getElementById("openLetterBtn");

const welcomeName=document.getElementById("welcomeName");
const bgAudio=document.getElementById("bgAudio");

const codeDisplay=document.getElementById("codeDisplay");
const passwordInput=document.getElementById("passwordInput");


/* AUDIO */

if(bgAudio){

  bgAudio.addEventListener("timeupdate",()=>{
    sessionStorage.setItem("musicTime",bgAudio.currentTime);
  });

  bgAudio.addEventListener("play",()=>{
    sessionStorage.setItem("musicPlaying","true");
  });

  bgAudio.addEventListener("pause",()=>{
    sessionStorage.setItem("musicPlaying","false");
  });

}


function playMusic(){

  if(!bgAudio || !bgAudio.paused) return;

  bgAudio.loop=true;
  bgAudio.volume=.35;

  const savedTime=sessionStorage.getItem("musicTime");

  if(savedTime){
    bgAudio.currentTime=parseFloat(savedTime);
  }

  bgAudio.play().catch(()=>{
    console.log("audio menunggu interaksi");
  });

}


/* LOGIN */

function showIntro(){

  welcomeName.textContent="i love you, amanda";

  loginScreen.classList.add("hidden");

  if(introScreen){
    introScreen.classList.remove("hidden");
  }

  sessionStorage.setItem("isLoggedIn","true");

}


function showMainView(){

  if(introScreen){
    introScreen.classList.add("hidden");
  }

  appScreen.classList.remove("hidden");

  playMusic();

  createFloatingHearts();

}



if(loginForm){

  loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const password=passwordInput.value.trim();

    if(password!=="1707"){
      alert("kode salah, coba lagi ya");
      return;
    }

    showIntro();

  });

}



if(openLetterBtn){

  openLetterBtn.addEventListener("click",()=>{
    showMainView();
  });

}



window.addEventListener("load",()=>{

  if(sessionStorage.getItem("isLoggedIn")==="true"){

    loginScreen.classList.add("hidden");
    introScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");

    createFloatingHearts();

    const savedScroll =
    sessionStorage.getItem("scrollPosition");

    if(savedScroll){

      setTimeout(()=>{

        window.scrollTo(
          0,
          parseInt(savedScroll)
        );

      },300);

    }

  }

});


/* LOGOUT */

function logout(){

  if(!confirm("Yakin ingin logout?")) return;


  if(bgAudio){
    bgAudio.pause();
    bgAudio.currentTime=0;
  }


  sessionStorage.clear();


  loginScreen.classList.remove("hidden");


  if(introScreen){
    introScreen.classList.add("hidden");
  }


  appScreen.classList.add("hidden");


  passwordInput.value="";

  updateCodeDisplay();

}



if(logoutButton){
  logoutButton.addEventListener("click",logout);
}



/* NUMBER BUTTON */

const numberButtons=document.querySelectorAll(".number-btn[data-value]");

numberButtons.forEach(button=>{

  button.addEventListener("click",()=>{

    const value=button.dataset.value;
    const current=passwordInput.value.trim();

    if(current.length<4){

      passwordInput.value=current+value;

      updateCodeDisplay();

    }

  });

});


const clearButton=document.querySelector(".clear-btn");

if(clearButton){

  clearButton.addEventListener("click",()=>{

    passwordInput.value="";

    updateCodeDisplay();

  });

}



function updateCodeDisplay(){

  const value=passwordInput.value.trim();

  codeDisplay.textContent=value.padEnd(4,"_").split("").join(" ");

}
/* LETTER */

const letterTrigger=document.getElementById("letterTrigger");
const typedLetter=document.getElementById("typedLetter");

function typeLetter(){

  if(!typedLetter || !letterTrigger) return;

  if(letterTrigger.dataset.opened==="true") return;

  const message=[
    "happy anniversary, my love.",
    "",
    "thank you for still choosing me,",
    "in the simplest ways that still feel so warm.",
    "i hope this year keeps giving you",
    "more peace, more comfort, and more reasons to feel deeply loved.",
    "may all the good things that are meant for you",
    "arrive in their own time,",
    "and may you always remember that i am grateful for you.", 
    "",
    "i love you, amanda.",
  ].join("\n");


  letterTrigger.dataset.opened="true";
  letterTrigger.disabled=true;
  letterTrigger.textContent="letter already opened";

  typedLetter.classList.add("is-visible");
  typedLetter.textContent="";


  let index=0;

  const typing=setInterval(()=>{

    typedLetter.textContent=message.slice(0,index+1);

    index++;

    if(index>=message.length){
      clearInterval(typing);
    }

  },25);

}


if(letterTrigger){
  letterTrigger.addEventListener("click",typeLetter);
}



/* GIFT MODAL */

const giftModal=document.getElementById("giftModal");
const giftBackButton=document.getElementById("giftBackButton");

const giftModalTitle=document.getElementById("giftModalTitle");
const giftModalEmoji=document.getElementById("giftModalEmoji");
const giftModalMessage=document.getElementById("giftModalMessage");
const giftModalPhotoGrid=document.getElementById("giftModalPhotoGrid");


const giftDetails={

  flower:{
    emoji:"🌹",
    title:"flower",
    message:"pertama emang bunga merah, tapi sekarang pink. warna favorit kamu, aku selalu bersyukur masih bisa kasih sesuatu buat kamu. aku seneng kasih kamu bunga, tolong ingat aku selalu ya sayang. i love you, genduttt.",
    photos:[
      "bahan/bunga.jpg",
      "bahan/bunga 1.jpg"
    ]
  },

  doll:{
    emoji:"🧸",
    title:"doll",
    message:"hahaha, maaf ya kalau gajelas gini. kamu suka ayam geprek, jadi aku beliin part of ayam yaitu ceker ayam. pukul ayam ini aja ya sayang kalo lagi seedih, jangan pukul dadanya okey??",
    photos:[
      "bahan/boneka.jpg",
      "bahan/boneka 1.jpg"
    ]
  },

  cup:{
    emoji:"☕",
    title:"cup",
    message:"maaf ini kamu gatau ya hadiah ini?? hahahah, kamu semok dan sexy udah itu aja. lucu ga? aku pas lagi scroll shopee nemu ini, lucu bgt langsung keinget kamu.",
    photos:[
      "bahan/cup.jpg",
      "bahan/cup 1.jpg"
    ]
  },

  hirono:{
    emoji:"🎀",
    title:"hirono",
    message:"ini hirono udah berkali kali bikin kita berantem ya sayang? maaf yaa. sekarang aku sadar gimana kamu senengnya sama hirono kecil ini. semoga dapet apa yang kamu mau yaaa!! i lup yu baeee",
    photos:[
      "bahan/hirono.jpg",
      "bahan/hirono 1.jpg"
    ]
  },

  web:{
    emoji:"🌐",
    title:"web",
    message:"buat halaman kecil ini, yang aku buat dengan usaha dan hati-hati biar kamu punya satu ruang yang terasa istimewa dan bisa kamu buka kapan pun hehe. aku harap kamu suka ya sayang, aku seneng banget bisa bikin ini buat kamu. i love you, GENDUTTKUUU.",
    photos:[
      "bahan/web.png"
    ]
  }

};



function openGiftModal(key){

  const gift=giftDetails[key];

  if(!gift) return;


  giftModalEmoji.textContent=gift.emoji;
  giftModalTitle.textContent=gift.title;
  giftModalMessage.textContent=gift.message;


  giftModalPhotoGrid.innerHTML="";


  gift.photos.forEach(photo=>{

    const img=document.createElement("img");

    img.src=photo;
    img.alt=gift.title;

    giftModalPhotoGrid.appendChild(img);

  });


  giftModal.classList.remove("hidden");
  giftModal.setAttribute("aria-hidden","false");

}



function closeGiftModal(){

  giftModal.classList.add("hidden");
  giftModal.setAttribute("aria-hidden","true");

}



document.querySelectorAll(".gift-card")
.forEach(button=>{

  button.addEventListener("click",()=>{

    openGiftModal(button.dataset.gift);

  });

});


if(giftBackButton){

  giftBackButton.addEventListener(
    "click",
    closeGiftModal
  );

}


if(giftModal){

  giftModal.addEventListener("click",(e)=>{

    if(e.target===giftModal){
      closeGiftModal();
    }

  });

}
/* REVEAL */

const revealItems=document.querySelectorAll(".reveal");

if(revealItems.length){

  const revealObserver=new IntersectionObserver(
    entries=>{

      entries.forEach(entry=>{

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

        }

      });

    },
    {
      threshold:.18
    }
  );


  revealItems.forEach(item=>{
    revealObserver.observe(item);
  });

}



/* FLOATING HEARTS */

function createFloatingHearts(){

  const container=document.querySelector(".floating-hearts");

  if(!container) return;


  container.innerHTML="";


  for(let i=0;i<18;i++){

    const heart=document.createElement("span");

    heart.className="heart";

    heart.textContent=
    i%2===0 ? "💖":"💗";


    heart.style.left=
    Math.random()*100+"%";


    heart.style.animationDelay=
    Math.random()*4+"s";


    heart.style.animationDuration=
    (7+Math.random()*5)+"s";


    container.appendChild(heart);

  }

}



/* FLOWER FALL */

const flowerContainer=
document.querySelector(".flower-container");


const flowers=[
  "🌸",
  "🌺",
  "🌷",
  "💮",
  "🌹"
];


function createFlower(){

  if(!flowerContainer) return;


  const flower=document.createElement("span");


  flower.className="flower";

  flower.textContent=
  flowers[
    Math.floor(
      Math.random()*flowers.length
    )
  ];


  flower.style.left=
  Math.random()*100+"vw";


  flower.style.fontSize=
  (16+Math.random()*18)+"px";


  flower.style.animationDuration=
  (8+Math.random()*6)+"s";


  flower.style.opacity=
  .6+Math.random()*.4;


  flowerContainer.appendChild(flower);


  setTimeout(()=>{

    flower.remove();

  },15000);

}


setInterval(
  createFlower,
  450
);




/* SPARKLE */

const sparkleContainer=
document.querySelector(".sparkle-container");


function createSparkle(){

  if(!sparkleContainer) return;


  const sparkle=document.createElement("span");


  sparkle.className="sparkle";


  sparkle.style.left=
  Math.random()*100+"vw";


  sparkle.style.top=
  (20+Math.random()*70)+"vh";


  sparkle.style.animationDuration=
  (1+Math.random()*2)+"s";


  sparkleContainer.appendChild(
    sparkle
  );


  setTimeout(()=>{

    sparkle.remove();

  },3000);

}


setInterval(
  createSparkle,
  300
);



/* GALLERY VIEWER */

const galleryViewer=
document.getElementById("galleryViewer");

const galleryImage=
document.getElementById("galleryImage");

const galleryClose=
document.getElementById("galleryClose");

const galleryPrev=
document.getElementById("galleryPrev");

const galleryNext=
document.getElementById("galleryNext");


const galleryImages=[
  "bahan/1.jpeg",
  "bahan/2.jpeg",
  "bahan/3.jpeg",
  "bahan/4.jpeg",
  "bahan/5.jpeg",
  "bahan/6.jpeg",
  "bahan/7.jpeg",
  "bahan/8.jpeg"
];


let galleryIndex=0;



function openGallery(index){

  if(!galleryViewer) return;


  galleryIndex=index;

  galleryImage.src=
  galleryImages[galleryIndex];


  galleryViewer.classList.remove(
    "hidden"
  );

}



function closeGallery(){

  galleryViewer.classList.add(
    "hidden"
  );

}



if(galleryClose){

  galleryClose.addEventListener(
    "click",
    closeGallery
  );

}



if(galleryNext){

  galleryNext.addEventListener(
    "click",
    ()=>{

      galleryIndex++;

      if(
        galleryIndex>=galleryImages.length
      ){
        galleryIndex=0;
      }


      galleryImage.src=
      galleryImages[galleryIndex];

    }
  );

}



if(galleryPrev){

  galleryPrev.addEventListener(
    "click",
    ()=>{

      galleryIndex--;

      if(
        galleryIndex<0
      ){
        galleryIndex=
        galleryImages.length-1;
      }


      galleryImage.src=
      galleryImages[galleryIndex];

    }
  );

}



document
.querySelectorAll(".photo-card img")
.forEach((img,index)=>{

  img.addEventListener(
    "click",
    ()=>{

      openGallery(index);

    }
  );

});
