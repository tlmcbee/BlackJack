/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const originalDeck = buildOriginalDeck();

/*----- State variables ---- */
let shuffledDeck;
let pot;
let wallet;
let playerHand = [];
let dealerHand = [];
let nextCard;


/*----- cached elements  -----*/
const walletEl = document.getElementById('wallet')
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const bet1Dollar  = document.getElementById('bet-1')
const bet5Dollars = document.getElementById('bet-5')

/*----- event listeners -----*/
document.getElementById('deal').addEventListener('click', dealNextCard)


/*----- functions -----*/
init();

function init() {
wallet = 20;g
walletEl.innerText = '$'+ wallet;
pot = null;
renderNewShuffledDeck();
}

function render() {


}

function playerHit() {
  hitBtn.addEventListener('click', dealNextCard)
  playerHand.push(nextCard)
  }


function renderMessage() {

}
 
function dealNextCard() {
  const nextCardIdx = shuffledDeck[0]
  nextCard = shuffledDeck.splice(nextCardIdx,1)
  return nextCard;
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
