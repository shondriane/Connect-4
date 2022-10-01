
const wallet= document.querySelector('h3')


//Player's current value of money
 let money = 100
 wallet.innerText = `Your current chip amount is: $${money}`;
console.log(wallet.innerText)

//build standard deck of cards
let suites = ['hearts', 'clubs', 'spades', 'diamonds']
let cards =['ace', '1','2', '3','4','5','6','7','8','9','jack', 'queen','king']



//iteration to get full deck 

const fullDeck=() =>{
    let cardDeck=[]
    cards.forEach((card)=>{
        suites.forEach((suite)=>{
           cardDeck.push(card+ ' '+ suite)
          
        })
        return cardDeck;
    })
}

//shuffle cards
let randomCard =()=>{
  
}
console.log(randomCard)



