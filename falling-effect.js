const effectContainer=document.createElement("div");
effectContainer.className="falling-effect-container";
document.body.appendChild(effectContainer);
const fallingItems=[
"🌸",
"🌷",
"🌹",
"🌺",
"💮",
"💗",
"💕",
"✨"
];
function createFallingItem(){
const item=document.createElement("span");
item.className="falling-item";
item.innerHTML=
fallingItems[
Math.floor(Math.random()*fallingItems.length)
];
item.style.left=
Math.random()*100+"vw";
item.style.fontSize=
(15+Math.random()*20)+"px";
item.style.animationDuration=
(7+Math.random()*6)+"s";
item.style.opacity=
0.5+Math.random()*0.5;
effectContainer.appendChild(item);
setTimeout(()=>{
item.remove();
},15000);
}
setInterval(createFallingItem,450);