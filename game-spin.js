window.addEventListener("DOMContentLoaded", playAudio);

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const spinResult = document.getElementById("spinResult");
const spinMessage = document.getElementById("spinMessage");

const gameAudio = document.getElementById("gameAudio");

// Popup
const popup = document.getElementById("resultPopup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

function playAudio() {

    if (!gameAudio) return;

    gameAudio.volume = 0.3;
    gameAudio.loop = true;

    if (gameAudio.paused) {
        gameAudio.play().catch(() => {});
    }

}

document.addEventListener("pointerdown", playAudio, { once: true });

const messages = [
    "lagi kesel ya?",
    "agy emosi?",
    "mau pukul?",
    "nangis ya?",
    "berantem sayang?",
    "im here"
];

const words = [
    "sayang, aku tau kamu lagi kesel banget ya sekarang? aku minta maaf ya sayang, sekarang coba chat akuu bilang kalau lagi kesel ya, aku temenin sayang aku peluk.",

    "sayang, lagi emosi banget kah? coba tarik nafas dulu ya baby, terus telfon aku, aku pasti temenin kamu sayang, aku bantu redain emosinya",

    "jangan pukul pukul dadanya sayang, ada aku disini aku temenin kamu sampe merasa enakan ya baby. nanti sakit dadanya okey? mending pukul ceker ayamnya sayang",

    "cup cup, sini nangis sama aku, pencet call sayang aku temenin yaa. jangan nangis lama lama ya sayang, orang secantik kamu jangan nangis. kalo nangis terus aku fuafjd kamu nanti hehe. i love you baby",

    "maaf ya sayang bikin berantem terus, entah kamu berantem sama mama, atau aku. aku temenin terus sama kamu, selalu sama kamu",

    "aku disini buat kamu, selamanya sama kamu. dan tolong jangan nikah sama siapapun ya, aku loh mau nikah sama kamuuu. aku sayang banget sama kamu"
];

let spinning = false;
let rotation = 0;
let typingInterval;

// =========================
// TYPEWRITER
// =========================

function typeWriter(title, text) {

    clearInterval(typingInterval);

    popup.classList.add("show");

    popupTitle.textContent = title;
    popupText.textContent = "";

    let i = 0;

    typingInterval = setInterval(() => {

        popupText.textContent += text.charAt(i);

        i++;

        if (i >= text.length) {
            clearInterval(typingInterval);
        }

    }, 28);

}

// =========================
// CLOSE POPUP
// =========================

closePopup.addEventListener("click", () => {

    popup.classList.remove("show");

});

// =========================
// SPIN
// =========================

spinButton.addEventListener("click", () => {

    if (spinning) return;

    spinning = true;
    spinButton.disabled = true;

    clearInterval(typingInterval);

    popup.classList.remove("show");

    spinResult.textContent = "Spinning...";
    spinMessage.textContent = "The wheel is spinning... 💖";

    const spin =
        360 * (5 + Math.floor(Math.random() * 4)) +
        Math.floor(Math.random() * 360);

    rotation += spin;

    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {

        const finalRotation = rotation % 360;

        const index = Math.floor(((360 - finalRotation) % 360) / 60);

        spinResult.textContent = messages[index];

        typeWriter(messages[index], words[index]);

        spinning = false;
        spinButton.disabled = false;

    }, 3000);

});