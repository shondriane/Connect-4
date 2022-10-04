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
let hitClicked =0
let dealerCard=0

// set time out to get new hand
timeOut = ()=>{
  setTimeout(newHand,1500)
}

restartGame = ()=>{
  if (money<=15){
    setTimeout (function (){
      location.reload();
    },1400)
    wallet.innerText ="You had to walk away, Game Over"
  }
  else timeOut()

}

newHand =()=>{
  dealer.innerText = " "
  player.innerText= " "
  gamble.innerText = " "
  playerValue =0
  dealerValue=0
  betValue =0
  hitClicked=0
  betButton.style.display= 'unset'
  playButton.style.display= 'unset'
  hitButton.style.display ='none'
}


// determine winner 
const playerWins =()=>{
  
  if (dealerValue ===21 && playerValue===21){
    dealer.innerText = "Push "
    player.innerText = "Push"
  }
  else if (dealerValue === 17 && playerValue ===17){
    dealer.innerText = "Push "
    player.innerText = 'Push'
  }
  else if (dealerValue >21 && playerValue <=21){
    dealer.innerText = "Dealer Bust"
    player.innerText=`You won: $${betValue*2}`
    wallet.innerText = `Your current chip amount is: $${money+=(betValue*2)}`
    
  }
  else if (dealerValue ===21 && playerValue<21){
    dealer.innerText = "Dealer won"
    player.innerText = "You lost"
  }
  else if (playerValue>21){
    dealer.innerText = "Dealer Won"
    player.innerText = "You Bust"
  }
  else if (dealerValue ===17 && playerValue <17){
    dealer.innerText = "Dealer Won"
    player.innerText = "You lost"
  }
  else{
    dealer.innerText = "Dealer Lost"
    player.innerText =`You won: $${betValue*2}`
    wallet.innerText = `Your current chip amount is: $${money+=(betValue*2)}`
  }
restartGame()
}

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


switch(money){
  case 15:
    alert ('oh oh you\'re luck maybe running out')
    break;
    case 0:
      alert('why didn\'t you catch the bus back home? Now you\'re stranded!')
      break;
}

//player place bet
const bet = () => {
 
  betButton.addEventListener('click', ()=> {
    wallet.innerText = `Your current chip amount is: $${(money -= 15)}`
    gamble.innerText = `Your current bet is: $${(betValue += 15)}`  
    if (money<=15){
      betButton.style.display='none'
    }
  })
  
}
bet()

//disable bet if money is less than 15


//start game
const playGame =()=>{
  
  playButton.addEventListener('click',function (){
    betButton.style.display='none'
    
    playButton.style.display='none'
    dealerHand()
    
  })
  
}
playGame()

// const displayCard = (){

// }

//dealer hand
const dealerHand = () =>{
  ++dealerCard
  if (newDeck.length===0){
    shuffleCards()
  }
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
   hitButton.style.display ='unset'
    dealer.innerText = `Dealer's card is: ${dealerValue}`
 
}


//player Hits event handler

const hit = () => {
  hitButton.addEventListener('click', ()=> {
   ++hitClicked
   if (newDeck.length===0){
    shuffleCards()
  }
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
   if (hitClicked >1){
    doubleButton.style.display='none'

   }
   
  })
}
hit()


//player double down
const doubleDown = () => {
  doubleButton.addEventListener('click', ()=> {
    
    stayButton.style.display ='none'
    doubleButton.style.display='none'
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
    while (dealerValue <=17 && dealerValue<=21){
      dealerHand()
      playerWins()
    } 
    hitButton.style.display ='none'
  })
  
}
doubleDown()



//player stay
const stay = () => {
  stayButton.addEventListener('click',() =>{
    stayButton.style.display='none'
    hitButton.style.display = 'none'
    doubleButton.style.display = 'none'
    while (dealerValue <=17 && dealerValue<=21){
      dealerHand()
    } 
    playerWins()
  })
  
}
stay()
