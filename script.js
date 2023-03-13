const dL = document.getElementById('switch')
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

//alert to remind player of the initial goal to buy plane tickets
const howmuch = () => {
  switch (money) {
    case 600:
      {
        alert("You won! If you continue to play it's extra money in the bank")
      }
      break
    case 300:
      {
        alert('you are half way there, you got this!')
      }
      break
    case 25:
      alert(
        'you have just enough money to take a bus back home, reconsider catching a flight'
      )
      break
    case 15:
      alert("oh oh you're luck maybe running out")
      break
    case 10:
      alert("why didn't you catch the bus back home? Now you may get stranded!")
      break
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

let hideDealer = ['blank']
let cardDeck = []
let newDeck = []
let playerAce = 0
let dealerAce = 0
let dealerValue = 0
let playerValue = 0
let betValue = 0
let card
let hitClicked = 0
let dealerCard = 0
let playerHand={}
let dealerHandCards={}

// first card for dealer
const dealerHide = () => {
  card = hideDealer[0].toString()
  const image = document.createElement('img')
  image.id = 'hide'
  image.setAttribute('src', `./cards/${card}.png`)
  display.appendChild(image)
}

// Restart Game
timeOut = () => {
  setTimeout(newHand, 3500)
}

restartGame = () => {
  if (money <= 15) {
    setTimeout(function () {
      location.reload()
    }, 2500)
    wallet.innerText = 'You had to walk away, Game Over'
  } else timeOut()
}

const handReset = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild)
  }
}

newHand = () => {
  dealer.innerText = ' '
  player.innerText = ' '
  gamble.innerText = ' '
  playerValue = 0
  dealerValue = 0
  betValue = 0
  hitClicked = 0
  playerAce = 0
  dealerAce = 0
  hideDealer = ['blank']
  betButton.style.display = 'unset'
  playButton.style.display = 'unset'
  hitButton.style.display = 'none'
  stayButton.style.display = 'none'
  handReset(display)
  handReset(playerCards)
}

//gets value of card to display for Dealer and change value if aces exist
const value = (card) => {
  cardString = card.toString()
  let split = cardString.split(' ')
  let cardValue = split[0]
  let value = 0

  if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
    value = 10
    dealerHandCards[card] = value
  } else if (cardValue === 'ace') {
    dealerAce++
    value = dealerValue < 10 ? 11 : 1
    dealerHandCards[card] = value
  } else {
    value = parseInt(cardValue)
    dealerHandCards[card] = value
  }

  dealerValue += value

  if (dealerAce > 0 && dealerValue > 21) {
    const dealerKeys = Object.keys(dealerHandCards);
    for (let i = 0; i < dealerKeys.length; i++) { const key = dealerKeys[i];
      if (dealerHandCards[key] === 11) {
        dealerValue -= 10; 
        dealerHandCards[key] = 1; 
        dealerAce--; 
       } 
     } 
   }
  return value
}

//gets value of card to display for Player and change value if aces exist
const valueP = (card) => {
  cardString = card.toString()
  let split = cardString.split(' ')
  let cardValue = split[0]
  let value = 0
  if (cardValue === 'jack' || cardValue === 'king' || cardValue === 'queen') {
    value = 10
 playerHand[card] = value

  } else if (cardValue === 'ace') {
    playerAce++
    value = playerValue <= 10 ? 11 : 1
playerHand[card]= value

  } else {
    value = parseInt(cardValue)
   playerHand[card]=value

  }
  playerValue+= value

  if (playerAce > 0 && playerValue > 21) {
     const playerKeys = Object.keys(playerHand);
     for (let i = 0; i < playerKeys.length; i++) { const key = playerKeys[i];
       if (playerHand[key] === 11) {
         playerValue -= 10; 
         playerHand[key] = 1; 
         playerAce--; 
        } 
      } 
    }
  return value
}

// show cards for dealer and flips the last card to the first card
const showCardsDealer = (card) => {
  const image = document.createElement('img')
  image.setAttribute('src', `./cards/${card}.png`)
  display.appendChild(image)
}
const dealerNew = () => {
  hideDealer[0] = hideDealer.splice(length - 1).toString()
  card = hideDealer[0]
  let old = document.getElementById('hide')
  old.setAttribute('src', `./cards/${card}.png`)
  display.appendChild(old)
  display.removeChild(display.lastElementChild)
}
//show cards for player
const showCardsPlayer = (card) => {
  const imageNew = document.createElement('img')
  imageNew.setAttribute('src', `./cards/${card}.png`)
  playerCards.appendChild(imageNew)
}

// determine winner
const playerWins = () => {
  if (playerValue === 21 && dealerValue < 21) {
    dealer.innerText = `Dealer has ${dealerValue}. Dealer Lost`
    player.innerText = `You have ${playerValue}. You won:$${betValue * 3}`
    wallet.innerText = `Current chip amount is: $${(money += betValue * 3)}`
  } else if (playerValue > 21) {
    dealer.innerText = ' '
    player.innerText = `You have ${playerValue}. It's a Bust`
  } else if (dealerValue === 21 && playerValue < 21) {
    dealer.innerText = `Dealer has ${dealerValue}. Dealer Won`
    player.innerText = `You have ${playerValue}. You Lost `
  } else if (dealerValue === playerValue) {
    dealer.innerText = `Dealer has ${dealerValue}. Push`
    player.innerText = `You have ${playerValue}. Push`
  } else if (dealerValue > 21) {
    dealer.innerText = `Dealer has ${dealerValue}. Dealer Bust`
    player.innerText = `You have ${playerValue}. You Won: $${betValue * 2}`
    wallet.innerText = `Current chip amount is: $${(money += betValue * 2)}`
  } else if (dealerValue > playerValue) {
    dealer.innerText = `Dealer has ${dealerValue}. Dealer Won`
    player.innerText = `You have ${playerValue}. You Lost `
  } else {
    dealer.innerText = `Dealer has ${dealerValue}. Dealer Lost`
    player.innerText = `You have ${playerValue}. You Won: $${betValue * 2}`
    wallet.innerText = `Current chip amount is: $${(money += betValue * 2)}`
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
const shuffleCards = (oldDeck, newDeck) => {
  let count = 52

  while (count) {
    newDeck.push(oldDeck.splice(Math.floor(Math.random() * count), 1)[0])
    count -= 1
  }
}
shuffleCards(cardDeck, newDeck)

//player place bet
const bet = () => {
  betButton.addEventListener('click', () => {
    howmuch()
    wallet.innerText = `Current chip amount is: $${(money -= 15)}`
    gamble.innerText = `Current bet amount is: $${(betValue += 15)}`

    //disable bet if money is less than 15
    if (money <= 15) {
      betButton.style.display = 'none'
      doubleButton.style.display = 'none'
    }
  })
}
bet()

//start game
const playGame = () => {
  playButton.addEventListener('click', function () {
    dealerHide()
    betButton.style.display = 'none'
    playButton.style.display = 'none'

    dealerHand()
  })
}
playGame()

//dealer event handler, get dealer card, value,and image
const dealerHand = (deakerValue, dealerAce) => {
  if (newDeck.length === 0) {
    shuffleCards(cardDeck, newDeck)
  }
  ++dealerCard
  card = newDeck.pop()
  cardDeck.push(card)
  hideDealer.push(card)
  showCardsDealer(card)
  value(card)
  //display buttons disappear
  hitButton.style.display = 'unset'
  //reset dealer text
  dealer.innerText = `Dealer's card is: ${dealerValue}`
}

//player Hits event handler, get player card, value, and image
const hit = () => {
  hitButton.addEventListener('click', () => {
    if (newDeck.length === 0) {
      shuffleCards(cardDeck, newDeck)
    }
    betButton.style.display = 'none'
    ++hitClicked
    card = newDeck.pop()
    cardDeck.push(card)
    showCardsPlayer(card)
    valueP(card)

    //button disappears if player value is greater than 21
    player.innerText = `You have: ${playerValue}`
    if (playerValue >= 21) {
      hitButton.style.display = 'none'
    }
    //button shows up
    doubleButton.style.display = 'unset'
    stayButton.style.display = 'unset'
    if (hitClicked > 1) {
      doubleButton.style.display = 'none'
    }
  })
}
hit()

//player double down event handler
// double value of bet, gets one card and sets dealer hand
const doubleDown = () => {
  doubleButton.addEventListener('click', () => {
    if (newDeck.length === 0) {
      shuffleCards(cardDeck, newDeck)
    }
    gamble.innerText = `Current bet amount is: $${(betValue += 15)}`
    player.innerText = `you have: ${(playerValue -= 15)}`
    stayButton.style.display = 'none'
    doubleButton.style.display = 'none'
    card = newDeck.pop()
    cardDeck.push(card)
    showCardsPlayer(card)
    //while loop for dealer hand
    while (dealerValue < 17) {
      dealerHand()
    }
    dealerNew()
    playerWins()
    hitButton.style.display = 'none'
  })
}
doubleDown()

//player stay event listener
//all display buttons disappear, get dealer hand and determine winner
const stay = () => {
  stayButton.addEventListener('click', () => {
    stayButton.style.display = 'none'
    hitButton.style.display = 'none'
    doubleButton.style.display = 'none'
    playerHand={}
    if (playerValue > 21) {
      handReset(display)
      dealer.innerText = ' '
      dealerValue = ' '
    } else {
      while (dealerValue < 17) {
        dealerHand()
      }
      dealerNew()
      dealerHandCards={}
    }
    hitButton.style.display = 'none'
    playerWins()
  })
}
stay()
