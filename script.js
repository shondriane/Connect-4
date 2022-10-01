
const wallet= document.querySelector('h3')


//Player's current value of money
 let money = 100
 wallet.innerText = `Your current chip amount is: $${money}`;
console.log(wallet.innerText)

//build standard deck of cards
let suites = ['hearts', 'clubs', 'spades', 'diamonds']
let cards =['ace','2', '3','4','5','6','7','8','9','10','jack','queen','king']
let cardDeck=[]
let newDeck=[]

//iteration to get full deck 

 const fullDeck=() =>{
   cards.forEach((card)=>{
        suites.forEach((suite)=>{
           cardDeck.push(card+ ' '+ suite)     
        })   
    })
    return(cardDeck)
  }
 fullDeck()

//iteration to shuffle cards and push into a new Deck
const shuffleCards = ()=>{
   cardDeck.forEach((cardDecks,index)=>{
    let randomIndex=Math.floor(Math.random()*52)
    index = randomIndex
    let newCard;
  newCard=cardDeck.splice(randomIndex,1,cardDecks)
  newDeck.push(newCard)
     })
return newDeck
}   
    shuffleCards() 
     





