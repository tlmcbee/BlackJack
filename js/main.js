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
const potEl = document.getElementById('pot')
const playerCards = document.getElementById('player-cards')
const dealerCards = document.getElementById('dealer-cards')
const outcomeEl = document.getElementById('outcome')
const resetBtn = document.getElementById('reset')
const newHandBtn = document.getElementById('new-hand')
const dealBtn = document.getElementById('deal')
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const bet1Btn = document.getElementById("bet-1")
const bet5Btn = document.getElementById('bet-5')

/*----- event listeners -----*/
dealBtn.addEventListener('click', firstDeal)
hitBtn.addEventListener('click', playerHit)
stayBtn.addEventListener('click', playerStay)
bet1Btn.addEventListener('click', bet1)
bet5Btn.addEventListener('click', bet5)
newHandBtn.addEventListener('click', newHand)
resetBtn.addEventListener('click', init)


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
  resetBtn.style.visibility = "hidden"
  outcomeEl.innerText = "PLACE YOUR BET"
  potEl.innerText = 'Pot'
  render();
}

function render() {
  renderHand(playerHand, playerCards)
  renderHand(dealerHand, dealerCards)
  renderMessage()
  renderControls()
}

function renderMessage() {
  outcomeEl.style.visibility = "visible"
}


function bet5() {
  pot += 10;
  wallet -=5; 
  potEl.innerText = '$' + pot
  walletEl.innerText = '$' + wallet
  render()
}

function bet1() {
  pot += 2;
  wallet -=1;
  potEl.innerText = '$' + pot
  walletEl.innerText = '$' + wallet
  render()
}

function firstDeal() {
  for(let i = 0; i < 2; i++) {
    dealerHand.push(shuffledDeck.pop())
    playerHand.push(shuffledDeck.pop())
  }
  dealBtn.disabled = true;
  bet1Btn.disabled = true;
  bet5Btn.disabled = true;
  hitBtn.disabled = false;
  stayBtn.disabled = false;
  if (scoreHand(playerHand) === 21 && scoreHand(dealerHand) === 21) {
    winner = 't'
    outcomeEl.innerText = "Bummer! It's a Push"
  } else if (scoreHand(playerHand) === 21) {
    winner = 'p'
    outcomeEl.innerText = "Blackjack!!! Player Wins"
  }
  render();
}


function renderControls() {
  newHandBtn.style.visibility = winner ? 'visible' : 'hidden'
  if(wallet === 0) {
  resetBtn.style.visibility = 'visible';
  bet1Btn.disabled = true;
  bet5Btn.disabled = true;
 } else {
  resetBtn.style.visibility = 'hidden'
 }


}
function newHand() {
  handleWallet();
  playerHand = [];
  dealerHand = [];
  winner = null;
  renderNewShuffledDeck();
  dealBtn.disabled = false;
  bet1Btn.disabled = false;
  bet5Btn.disabled = false;
  outcomeEl.innerText = "PLACE YOUR BET"
  potEl.innerText = 'Pot'
  newHandBtn.style.visibility = 'hidden'
  render()
}

function scoreHand(hand) {
  let score = 0;
  hand.forEach(card => {
    score += card.value
  })
  return score;
}

function playerStay() {
  hitBtn.disabled = true;
  while(scoreHand(dealerHand) < 17) {
    dealerHand.push(shuffledDeck.pop());
    if(scoreHand(dealerHand) >= 21) return scoreHand(dealerHand);
  };
  getWinner()
  render();
}

function playerHit() {
  playerHand.push(shuffledDeck.pop())
  if(scoreHand(playerHand) > 21) {
    winner = 'd'
    outcomeEl.innerText = "Player Busts"
    newHandBtn.style.visibility = 'visible'
  }
  render()
}

function handleWallet() {
  if(winner === 'p') {
    wallet += pot;
    walletEl.innerText = "$" + wallet
  } else if (winner === 't') {
    wallet = wallet + (pot/2)
  }
  pot = 0
  potEl.innerText = "Pot" 
}

function getWinner() {
  if (scoreHand(playerHand) === scoreHand(dealerHand)) {
    winner = 't'
    outcomeEl.innerText = "It's a Push"
  } else if (scoreHand(playerHand) <= 21 && scoreHand(dealerHand) > 21) {
    winner = 'p'
    outcomeEl.innerText = `Dealer Busts with ${scoreHand(dealerHand)}`
  } else if (scoreHand(playerHand) > scoreHand(dealerHand)) {
    winner = 'p'
    outcomeEl.innerText = `Player wins with ${scoreHand(playerHand)}`
  } else if (scoreHand(playerHand) < scoreHand(dealerHand)) {
    winner = 'd'
    outcomeEl.innerText = `Dealer Wins with ${scoreHand(dealerHand)}`
  }
  stayBtn.disabled = true;
  handleWallet()
}

function renderHand(hand, container) {
  container.innerHTML = '';
  let cardsHtml = '';
  hand.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
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
