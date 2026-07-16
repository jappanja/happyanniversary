document.addEventListener("DOMContentLoaded",()=>{


const dinoRunner = document.getElementById("dinoRunner");
const dinoTree = document.getElementById("dinoTree");

const dinoScore = document.getElementById("dinoScore");
const dinoStatus = document.getElementById("dinoStatus");

const startDino = document.getElementById("startDino");
const dinoStage = document.getElementById("dinoStage");



// ======================
// VARIABLE
// ======================

let isJumping = false;

let gameRunning = false;

let gameOver = false;


let score = 0;

let speed = 6;


let treePosition = window.innerWidth;





// ======================
// JUMP
// ======================

function jumpDino(){


    if(
        isJumping ||
        gameOver ||
        !gameRunning
    ) return;



    isJumping = true;


    let jumpHeight = 14;



    let up = setInterval(()=>{


        jumpHeight += 6;


        dinoRunner.style.bottom =
        jumpHeight + "px";



        if(jumpHeight >= 130){


            clearInterval(up);



            let down = setInterval(()=>{


                jumpHeight -= 6;


                dinoRunner.style.bottom =
                jumpHeight + "px";



                if(jumpHeight <= 14){


                    clearInterval(down);


                    dinoRunner.style.bottom =
                    "14px";


                    isJumping = false;


                }


            },20);


        }



    },20);



}





// ======================
// TREE MOVEMENT
// ======================

function moveTree(){


    if(
        !gameRunning ||
        gameOver
    ) return;



    treePosition -= speed;


    dinoTree.style.left =
    treePosition + "px";



    if(treePosition < -80){


        treePosition =
        window.innerWidth + 
        Math.random()*300;



        score++;


        dinoScore.textContent =
        score;



        if(score % 5 === 0){

            speed++;

        }


    }



    checkCollision();



    requestAnimationFrame(moveTree);


}






// ======================
// COLLISION
// ======================

function checkCollision(){


    let dino =
    dinoRunner.getBoundingClientRect();


    let tree =
    dinoTree.getBoundingClientRect();



    if(

        dino.left < tree.right - 15 &&

        dino.right > tree.left + 15 &&

        dino.bottom > tree.top + 10 &&

        dino.top < tree.bottom

    ){

        endGame();

    }


}






// ======================
// START GAME
// ======================

function startGame(){


    gameRunning = true;

    gameOver = false;


    score = 0;

    speed = 6;



    treePosition =
    window.innerWidth + 200;



    dinoScore.textContent =
    "0";


    dinoStatus.textContent =
    "Running";


    startDino.textContent =
    "Restart Game";



    dinoRunner.style.bottom =
    "14px";



    dinoTree.style.left =
    treePosition + "px";



    moveTree();


}







// ======================
// GAME OVER
// ======================

function endGame(){


    gameOver = true;

    gameRunning = false;



    dinoStatus.textContent =
    "Game Over";



    startDino.textContent =
    "Restart Game";


}






// ======================
// RESTART
// ======================

function restartGame(){


    score = 0;

    speed = 6;


    gameOver = false;

    gameRunning = true;



    treePosition =
    window.innerWidth + 200;



    dinoScore.textContent =
    "0";


    dinoStatus.textContent =
    "Running";



    dinoRunner.style.bottom =
    "14px";



    dinoTree.style.left =
    treePosition + "px";



    moveTree();


}







// ======================
// BUTTON
// ======================

startDino.addEventListener("click",()=>{


    if(gameOver){

        restartGame();

    }
    else if(!gameRunning){

        startGame();

    }


});







// ======================
// KEYBOARD
// ======================

document.addEventListener("keydown",(e)=>{


    if(
        e.code === "Space" ||
        e.code === "ArrowUp"
    ){

        jumpDino();

    }



    if(
        e.code === "Enter" &&
        gameOver
    ){

        restartGame();

    }


});






// ======================
// CLICK JUMP
// ======================

dinoStage.addEventListener("click",()=>{


    jumpDino();


});






// ======================
// RESPONSIVE
// ======================

window.addEventListener("resize",()=>{


    if(!gameRunning){


        treePosition =
        window.innerWidth;


        dinoTree.style.left =
        treePosition + "px";


    }


});



});