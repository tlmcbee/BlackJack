/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const originalDeck = buildOriginalDeck();

/*----- State variables ---- */
let shuffledDeck;
let pot;
let wallet;


/*----- cached elements  -----*/
const walletEl = document.getElementById('wallet')

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
wallet = 20;
walletEl.innerText = wallet;
pot = null;
renderNewShuffledDeck();
}

function render() {


}

function renderMessage() {

}
 
function dealCards() {

}

function renderNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
}

function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
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
