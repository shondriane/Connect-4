const wallet = document.querySelector('h3')
const betButton = document.querySelector('#bet')
const hitButton = document.querySelector('#hit')
const doubleButton = document.querySelector('#double')
const stayButton = document.querySelector('#stay')
const playerCards = document.getElementById('dealerCards')



//stayButton.display='content'

//Player's current value of money
let money = 100
wallet.innerText = `Your current chip amount is: $${money}`
console.log(wallet.innerText)

//build standard deck of cards
let suites = ['hearts', 'clubs', 'spades', 'diamonds']
let cards = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king'
]
let cardDeck = []
let newDeck = []
let hand=[]

//iteration to get full deck

const fullDeck = () => {
  cards.forEach((card) => {
    suites.forEach((suite) => {
      cardDeck.push(card + ' ' + suite)
    })
  })
  return cardDeck
}
fullDeck()

//iteration to shuffle cards and push into a new Deck
const shuffleCards = () => {
  cardDeck.forEach((cardDecks, index) => {
    let randomIndex = Math.floor(Math.random() * 52)
    index = randomIndex
    let newCard
    newCard = cardDeck.splice(randomIndex, 1, cardDecks)
    if (!newDeck.indexOf(newCard.id) !== -1) {
      newDeck.push(newCard)
    } else {
      shuffleCards() //this is not working!!!
    }
  })
}
shuffleCards()

console.log(newDeck)

//player place bet

const bet = () => {
  betButton.addEventListener('click', function () {
    wallet.innerText = `Your current chip amount is: $${(money -= 15)}`
  })
}
bet()

//player Hits event handler

const hit = () => {
  hitButton.addEventListener('click', function () {
    betButton.style.display = 'none'
 
    //   doubleButton.display='block'
   
    let card = newDeck[Math.floor(Math.random() * 52)]
    console.log(card)
    hand.push(card)
    doubleButton.style.display = 'unset'
    stayButton.style.display = 'unset'
  })
}
hit()

//player double down
const doubleDown =() =>{
doubleButton.addEventListener('click', function () {
  hitButton.style.display = 'none'
  let card = newDeck[Math.floor(Math.random() * 52)]
  console.log(card)
  hand.push(card)
  console.log(hand)
  doubleButton.style.display='none'
  stayButton.style.display='none'
})
}
doubleDown()

//player stay
const stay =() =>{
  stayButton.addEventListener('click', function () {
    hitButton.style.display = 'none'
    doubleButton.style.display='none'
console.log(hand)
    
  })
  }
  stay()