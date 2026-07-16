const revealItems=document.querySelectorAll(".reveal");

if(revealItems.length){
const revealObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
}
});
},{threshold:.12});

revealItems.forEach(item=>revealObserver.observe(item));
}


/* FLOWER EFFECT */

const container=document.querySelector(".flower-container");

const flowers=[
"🌸",
"🌺",
"🌷",
"💮",
"🌹",
"✨"
];

function createFlower(){

if(!container)return;

const flower=document.createElement("span");

flower.className="flower";
flower.textContent=flowers[Math.floor(Math.random()*flowers.length)];

flower.style.left=Math.random()*100+"vw";
flower.style.fontSize=(16+Math.random()*20)+"px";
flower.style.animationDuration=(8+Math.random()*6)+"s";

container.appendChild(flower);

setTimeout(()=>{
flower.remove();
},15000);

}

setInterval(createFlower,450);