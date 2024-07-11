// I need it to pick and display a random number starting with 10 iterations

let url =
  "https://api.sheety.co/ebea7191455d4cbd3ebd1ab58d71433d/octaFxV2/2NdLevel3+tickets";

async function getTicketNumber() {
  const res = await fetch(url);
  const data = await res.json();
  const tickets = data["2NdLevel3+tickets"];

  console.log(tickets);

  return tickets.map((ticket) => ticket.ticketNumber);
}

const numEl = document.querySelector(".number");
const btnEl = document.querySelector(".btn");
const resetEl = document.querySelector(".reset");

const wait = (seconds) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
};
let ticketNumbers = "";
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
      numEl.innerHTML = "_";
      isSpinning = false;
      drumRoll.pause(); // Pause the audio
      drumRoll.currentTime = 0;
      return;
    }

    await wait(0.1);
    if (ticketNumbers) {
      numEl.innerHTML = ticketNumbers[randNum];
    }

    //   console.log(randNum[arr]);
  }
  isSpinning = false;
}

// once i click pick a winner spinning should be set to true and
// when true we shouldnt be able to go for a second spin until after the spinning is completed.

const jsConfetti = new JSConfetti();
var drumRoll = new Audio("./drum-roll-sound-effect.mp3");
var crash = new Audio("./crash.mp3");
btnEl.addEventListener("click", async () => {
  reset = false;
  if (!isSpinning) {
    drumRoll.play();
    await Lottery();
    if (!reset) {
      crash.play();
      jsConfetti.addConfetti();
    }
  }
});

resetEl.addEventListener("click", () => {
  // jsConfetti.addConfetti();

  reset = true;
});
