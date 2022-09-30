
const wallet= document.querySelector('h3')


//Player's current value of money
 let money = 100
 wallet.innerText = `Your current chip amount is: $${money}`;
console.log(wallet.innerText)

//build standard deck of cards
let suites = ['hearts', 'clubs', 'spades', 'diamonds']
let cards =['ace', '1','2', '3','4','5','6','7','8','9']


class Card{
    constructor (suite,card){
        this.suite=suite
        this.card = card
    }
}

//iteration

suites.forEach((element)=>{
    cards.forEach((elements)=>{
        console.log(element)
    })
})

