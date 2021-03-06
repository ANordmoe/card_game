import Deck from "./deck.js";

let CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

let computerCardSlot = document.querySelector(".computer-card-slot");
let playerCardSlot = document.querySelector(".player-card-slot");
let computerDeckElement = document.querySelector(".computer-deck");
let playerDeckElement = document.querySelector(".player-deck");
let text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop;

playerDeckElement.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  let deck = new Deck();
  deck.shuffle();

  let deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;

  let playerCard = playerDeck.cards.pop();
  let computerCard = computerDeck.pop();

  console.log(playerCard, computerCard);

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = "Draw";
    console.log("it's a draw!");
    let warCards = [playerCard, computerCard];
    let cardsEqual = true;
    while (cardsEqual) {
      playerCard = playerDeck.cards.pop();
      computerCard = computerDeck.pop();
      playerCardSlot.appendChild(playerCard.getHTML());
      computerCardSlot.appendChild(computerCard.getHTML());

      warCards.push(playerCard, computerCard);

      console.log(playerCard, computerCard);
      if (isRoundWinner(playerCard, computerCard)) {
        console.log("you win this round!", playerDeck.cards);
        cardsEqual = false;
        warCards.forEach((card) => playerDeck.push(card));
        console.log(playerDeck.cards);
      } else if (isRoundWinner(computerCard, playerCard)) {
        console.log("computer wins!", computerDeck.cards);
        cardsEqual = false;
        warCards.forEach((card) => computerDeck.push(card));

        console.log(computerDeck.cards);
      }
    }
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
