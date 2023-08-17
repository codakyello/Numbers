// I need it to pick and display a random number starting with 10 iterations
let url =
  "https://api.sheety.co/ebea7191455d4cbd3ebd1ab58d71433d/octaFx/111 &12+Tickets";

async function getTicketNumber() {
  const res = await fetch(url);
  const data = await res.json();
  const tickets = data["111 &12+Tickets"];

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

async function Lottery() {
  for (let i = 0; i < 30; i++) {
    // Generate a random number from 0 to length of arr
    const randNum = Math.floor(Math.random() * ticketNumbers.length);
    // Add a one second delay
    // Set interval is an

    await wait(0.1);
    if (ticketNumbers) {
      numEl.innerHTML = ticketNumbers[randNum];
    }

    //   console.log(randNum[arr]);
  }
}

btnEl.addEventListener("click", Lottery);

resetEl.addEventListener("click", () => {
  numEl.innerHTML = "💰";
});
