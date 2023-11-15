/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const originalDeck = buildOriginalDeck();

/*----- State variables ---- */
let shuffledDeck;
let pot;
let wallet;
let playerHand;
let dealerHand;
let winner;


/*----- cached elements  -----*/
const walletEl = document.getElementById('wallet')
const bet1Dollar  = document.getElementById('bet-1')
const bet5Dollars = document.getElementById('bet-5')
const dealBtn = document.getElementById('deal').addEventListener('click', firstDeal)
const hitBtn = document.getElementById('hit').addEventListener('click', playerHit)
const stayBtn = document.getElementById('stay').addEventListener('click', playerStay)
const playerCards = document.getElementById('player-cards')
const dealerCards = document.getElementById('dealer-cards')
const outcomeEl = document.getElementById('outcome')
const resultEl = document.getElementById('result')

/*----- event listeners -----*/



/*----- functions -----*/
init();

function init() {
  playerHand = [];
  dealerHand = [];
  wallet = 20;
  walletEl.innerText = '$'+ wallet;
  pot = null;
  winner = null;
  renderNewShuffledDeck();
  render();
}

function render() {
  renderHand(playerHand, playerCards)
  renderHand(dealerHand, dealerCards)
}

function renderMessage() {

}

function firstDeal() {
  for(let i = 0; i < 2; i++) {
    dealerHand.push(shuffledDeck.pop())
    playerHand.push(shuffledDeck.pop())
  }
  render();
}

function scoreHand(hand) {
  let score = 0;
  hand.forEach(card => {
    score += card.value
  })
  return score;
}

function playerStay() {
  while(scoreHand(dealerHand) < 17) {
    dealerHand.push(shuffledDeck.pop());
    if(scoreHand(dealerHand) >= 21) return scoreHand(dealerHand);
  };
  render();
}

function playerHit() {
  playerHand.push(shuffledDeck.pop())
  render()
}



function renderHand(hand, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  hand.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    container.innerHTML = cardsHtml;
}

function renderNewShuffledDeck() {
  shuffledDeck = getNewShuffledDeck();
}

function getNewShuffledDeck() {
  const tempDeck = [...originalDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function buildOriginalDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
   });
  return deck;
}
