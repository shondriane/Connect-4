const wallet = document.querySelector('h3')
const betButton = document.querySelector('#bet')
const hitButton = document.querySelector('#hit')
const doubleButton = document.querySelector('#double')
const stayButton = document.querySelector('#stay')
const playButton = document.querySelector('#play')
const display = document.getElementById('dealerCards')
const player = document.getElementById('player')
const dealer = document.getElementById('dealer')
const gamble = document.getElementById('gamble')
const playerCards = document.getElementById('playingCards')



//Player's current value of money
let money = 100
wallet.innerText = `Current chip amount is: $${money}`
console.log(wallet.innerText)

//alert to remind player of the initial goal to buy plane tickets
const howmuch =()=>{
  switch(money){
    case 30:
      alert ('you have just enough to take bus back home, reconsider catching a flight')
      break;
    case 15:
      alert ('oh oh you\'re luck maybe running out')
      break;
      case 0:
        alert('why didn\'t you catch the bus back home? Now you\'re stranded!')
        break;
        default:
  }
  }

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
let playerAce =0
let dealerAce=0
let dealerValue = 0
let playerValue = 0
let betValue = 0
let card
let hitClicked =0
let dealerCard=0

// set time out to get new hand
timeOut = ()=>{
  setTimeout(newHand,2000)
}

restartGame = ()=>{
  if (money<=15){
    setTimeout (function (){
      location.reload();
    },2000)
    wallet.innerText ="You had to walk away, Game Over"
  }
  else timeOut()

}

const handReset = (elem)=>{
  while(elem.firstChild){
    elem.removeChild(elem.firstChild)
  }  
}


newHand =()=>{
  dealer.innerText = " "
  player.innerText= " "
  gamble.innerText = " "
  playerValue =0
  dealerValue=0
  betValue =0
  hitClicked=0
  playerAce=0
  dealerAce=0
  betButton.style.display= 'unset'
  playButton.style.display= 'unset'
  hitButton.style.display ='none'
 handReset(display)
 handReset(playerCards)
 

}

   //gets value of card to display for Dealer
   const value = (card)=>{
    cardString = card.toString()
    let split = cardString.split(' ')
    let cardValue = split[0]
  

    if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
    
      `${(dealerValue += 10)}`
    } else if (cardValue === 'ace') {
     dealerAce++
    
    `${(dealerValue+=11)}` 
    
    }
     else {
       
      ;`${(dealerValue +=parseInt(cardValue))}`
    }
    if (dealerAce>0 && dealerValue>21){
      `${dealerValue-=10}`
    }
   }
  
//gets value of card to display for Player and change value if aces exist
const valueP =(card)=>{
cardString = card.toString()
let split = cardString.split(' ')
let cardValue = split[0]
 
if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
  ;`${(playerValue +=10)}`
} else if (cardValue === 'ace') {
  playerAce++
  `${(playerValue+=11)}`
}
else {
  ;`${(playerValue +=parseInt(cardValue))}`
}
if (playerAce>0 && playerValue>21){
  `${playerValue-=10}`
}
}

// show cards
const showCardsDealer =(card)=>{
const image = document.createElement('img')
 image.setAttribute("src",`./cards/${card}.png`) 
  display.appendChild(image)
  }

  const showCardsPlayer =(card)=>{
    const imageNew = document.createElement('img')
 imageNew.setAttribute("src",`./cards/${card}.png`) 
  playerCards.appendChild(imageNew)
  }
 


// determine winner 
const playerWins =()=>{
  
  if (dealerValue ===playerValue){
    dealer.innerText = "Push "
    player.innerText = "Push"
  }
  
  else if (dealerValue >21){
    dealer.innerText = "Dealer Bust"
    player.innerText=`You Won: $${betValue*2}`
    wallet.innerText = `Current chip amount is: $${money+=(betValue*2)}`
    
  }
  else if (playerValue>21){
    dealer.innerText = " "
    player.innerText = "You Bust"
    
  }
  else if (dealerValue ===21 && playerValue<21){
    dealer.innerText = "Dealer Won"
    player.innerText = "You Lost"
  }
  else if (playerValue ===21 && dealerValue<21){
    dealer.innerText = "Dealer Lost"
    player.innerText =`You Won: $${betValue*3}`
    wallet.innerText = `Current chip amount is: $${money+=(betValue*3)}`
  }

  else if (dealerValue ===17 && playerValue <17){
    dealer.innerText = "Dealer Won"
    player.innerText = "You Lost"
  }
  else if (dealerValue > playerValue){
    dealer.innerText = "Dealer Won"
    player.innerText = "You Lost"
  }
  else {
    dealer.innerText = "Dealer Lost"
    player.innerText =`You Won: $${betValue*2}`
    wallet.innerText = `Current chip amount is: $${money+=(betValue*2)}`
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
const shuffleCards = (cardDeck) => {
  let count =52
  while(count){
    newDeck.push(cardDeck.splice(Math.floor(Math.random()*count),1)[0])
    count-=1
  }
}
shuffleCards(cardDeck)


//player place bet
const bet = () => {
  betButton.addEventListener('click', ()=> {
    wallet.innerText = `Current chip amount is: $${(money -= 15)}`
    gamble.innerText = `Current bet amount is: $${(betValue += 15)}`  
    //disable bet if money is less than 15
    howmuch()
    if (money<15){
      betButton.style.display='none'
      doubleButton.style.display='none'
    }
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

//dealer event handler
//get dealer card, value,and image
const dealerHand = () =>{
  ++dealerCard
  if (newDeck.length===0){
    shuffleCards()
  }
  card = newDeck.pop()
showCardsDealer(card)
 value(card)

   //display buttons
   hitButton.style.display ='unset'
   //reset dealer text
    dealer.innerText = `Dealer's card is: ${dealerValue}`
 
}


//player Hits event handler
//get player card, value, and image
const hit = () => {
  hitButton.addEventListener('click', ()=> {
   ++hitClicked
   if (newDeck.length===0){
    shuffleCards()
  }
    betButton.style.display = 'none'
    card = newDeck.pop()
showCardsPlayer(card)
valueP(card)

//reset button
player.innerText = `You have: ${playerValue}`
    //button shows up
    doubleButton.style.display = 'unset'
    stayButton.style.display = 'unset'
   if (hitClicked >1){
    doubleButton.style.display='none'
   }  
  })
}
hit()


//player double down event handler
// double value of bet, gets one card and sets dealer hand
const doubleDown = () => {
  doubleButton.addEventListener('click', ()=> {
    gamble.innerText = `Current bet amount is: $${(betValue+= 15)}`
    player.innerText = `you have: ${playerValue-=15}`
    console.log(playerValue)
    console.log(betValue)
    stayButton.style.display ='none'
    doubleButton.style.display='none'
    card =newDeck.pop()
    showCardsPlayer(card)
  
   
    //while loop for dealer hand
    while (dealerValue <17){
      dealerHand()
    } 
    playerWins()
    hitButton.style.display ='none'
  })
  
}
doubleDown()


//player stay event listener
//all display buttons disappear, get dealer hand and determine winner
const stay = () => {
  stayButton.addEventListener('click',() =>{
    stayButton.style.display='none'
    hitButton.style.display = 'none'
    doubleButton.style.display = 'none'
    if (playerValue>21){
      handReset(display)
      dealer.innerText=" "
      dealerValue = " "
    }
    else{
      while (dealerValue <17){
        dealerHand()
        console.log(card)
      } 
    }
   
    playerWins()
  })
  
}
stay()
