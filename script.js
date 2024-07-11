// I need it to pick and display a random number starting with 10 iterations

let url =
  "https://api.sheety.co/5bacd7badf24b75faef80014dd4a3842/octaFxV2/2NdLevel3+tickets";

async function getTicketNumber() {
  const res = await fetch(url);
  const data = await res.json();
  const tickets = data["2NdLevel3+tickets"];

  return tickets
    .filter((ticket) => ticket.country === "Nigeria")
    .map((ticket) => ticket.ticketNumber);
}

const numEl = document.querySelector(".number");
const btnEl = document.querySelector(".btn");
const resetEl = document.querySelector(".reset");
const jackEl = document.querySelector(".jack");

const wait = (seconds) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
};
let ticketNumbers = [];
(async function get() {
  ticketNumbers = await getTicketNumber();
})();

let reset = false;
let isSpinning = false;
// const duration = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
async function Lottery() {
  // const durationLength = Math.floor(Math.random() * duration.length) + 1;

  isSpinning = true;
  console.log(isSpinning);
  for (let i = 0; i < 55; i++) {
    // Generate a random number from 0 to length of arr
    const randNum = Math.floor(Math.random() * ticketNumbers.length);
    // Add a one second delay
    // Set interval is an

    if (reset) {
      numEl.classList.add("hide");
      isSpinning = false;
      drumRoll.pause(); // Pause the audio
      drumRoll.currentTime = 0;
      return;
    }

    await wait(0.1);
    if (ticketNumbers) {
      numEl.innerHTML = ticketNumbers[randNum];
    }

    numEl.classList.remove("hide");
  }
  isSpinning = false;
}

// once i click pick a winner spinning should be set to true and
// when true we shouldnt be able to go for a second spin until after the spinning is completed.

const jsConfetti = new JSConfetti();
let drumRoll = new Audio("./drum-roll-sound-effect.mp3");
let crash = new Audio("./crash.mp3");
btnEl.addEventListener("click", async () => {
  jackEl.classList.add("hide");

  reset = false;
  if (!isSpinning) {
    drumRoll.play();
    await Lottery();
    if (!reset) {
      crash.play();
      jsConfetti.addConfetti({
        // emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],

        confettiColors: [
          "#0634f0",
          "#5171f5",
          "#ff7096",
          "#fb8500",
          "#fb8500",
          "#f9bec7",
        ],
      });
    }
  }
});

resetEl.addEventListener("click", () => {
  // jsConfetti.addConfetti();

  reset = true;
  jackEl.classList.remove("hide");
  numEl.classList.add("hide");
});
