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
const duration = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
async function Lottery() {
  const durationLength = Math.floor(Math.random() * duration.length) + 1;

  for (let i = 0; i < duration[durationLength]; i++) {
    console.log(duration[durationLength]);
    // Generate a random number from 0 to length of arr
    const randNum = Math.floor(Math.random() * ticketNumbers.length);
    // Add a one second delay
    // Set interval is an

    console.log(reset);
    if (reset) return;

    await wait(0.1);
    if (ticketNumbers) {
      numEl.innerHTML = ticketNumbers[randNum];
    }

    //   console.log(randNum[arr]);
  }
}

btnEl.addEventListener("click", () => {
  reset = false;
  Lottery();
});

resetEl.addEventListener("click", () => {
  reset = true;
  numEl.innerHTML = "_";
});
