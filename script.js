const wallet = document.querySelector('h3')
const betButton = document.querySelector('#bet')
const hitButton = document.querySelector('#hit')
const doubleButton = document.querySelector('#double')
const stayButton = document.querySelector('#stay')
const playButton = document.querySelector('#play')
const playerCards = document.querySelectorAll('li')
const player = document.getElementById('player')
const dealer = document.getElementById('dealer')
const gamble = document.getElementById('gamble')

console.log(playerCards)

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
let hand = []
let dealerValue = 0
let playerValue = 0
let betValue = 0
let card

//player Hand Count
player.innerText = `You have: ${playerValue}`

//Dealer Hand Count
dealer.innerText = `Dealer has: ${dealerValue}`

// determine winner for player

// const playerWins =()=>{
//   switch (playerValue){
// case 21:
//   player.innerText = `You win and add `
//   }
// }

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
    if (!newDeck.includes(newCard.id) !== -1) {
      newDeck.push(newCard)
    } else {
      shuffleCards()
    }
  })
}
shuffleCards()



//assign value
const value = () => {}

//player place bet

const bet = () => {
  betButton.addEventListener('click', function () {
    wallet.innerText = `Your current chip amount is: $${(money -= 15)}`
    gamble.innerText = `Your current bet is: $${(betValue += 15)}`
    
    
  })
  
}
bet()

//start game
const playGame =()=>{
  
  playButton.addEventListener('click',function (){
    betButton.style.display='none'
    
    playButton.style.display='none'
    dealerHand()
    
  })
  
}
playGame()


//dealer hand
const dealerHand = () =>{
  card = newDeck.pop()
  console.log (card)
 
   //gets value of card to display
   cardString = card.toString()
   let split = cardString.split(' ')
   let cardValue = split[0]

   if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
     ;`${(dealerValue += 10)}`
   } else if (cardValue === 'ace') {
     ;`${(dealerValue += 11)}`
   } else {
     ;`${(dealerValue += parseInt(cardValue))}`
   }
   //display buttons
   dealer.innerText = `Dealer has: ${dealerValue}`
  hitButton.style.display ='unset'
}


//player Hits event handler

const hit = () => {
  hitButton.addEventListener('click', function () {
   
    betButton.style.display = 'none'
    //gets card
    card = newDeck.pop()
    console.log(card)
    //shows hand
    hand.push(card)
    //gets value of card to display
    cardString = card.toString()
    let split = cardString.split(' ')
    let cardValue = split[0]

    if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
      ;`${(playerValue += 10)}`
    } else if (cardValue === 'ace') {
      ;`${(playerValue += 11)}`
    } else {
      ;`${(playerValue += parseInt(cardValue))}`
    }
    player.innerText = `you have: ${playerValue}`

    //button shows up
    doubleButton.style.display = 'unset'
    stayButton.style.display = 'unset'

  })
}
hit()


//player double down
const doubleDown = () => {
  doubleButton.addEventListener('click', function () {
    hitButton.style.display = 'none'
    newDeck.pop()
    console.log(card)
    hand.push(card)
    console.log(hand)
    //gets value of card to display
    cardString = card.toString()
    let split = cardString.split(' ')
    let cardValue = split[0]

    if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
      ;`${(playerValue += 10)}`
    } else if (cardValue === 'ace') {
      ;`${(playerValue += 11)}`
    } else {
      ;`${(playerValue += parseInt(cardValue))}`
    }
    player.innerText = `you have: ${playerValue}`
    doubleButton.style.display = 'none'
   
  })
}
doubleDown()



//player stay
const stay = () => {
  stayButton.addEventListener('click', function () {
    
    hitButton.style.display = 'none'
    doubleButton.style.display = 'none'
    while (dealerValue<=17){
      dealerHand()
    } 
    console.log(hand)
  })
}
stay()
