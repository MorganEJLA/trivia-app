const game = document.querySelector("#game");
let score = 0
const scoreDisplay = document.querySelector("#score");
const genres = [
    {
        name: 'Film',
        id: 11
    },

    {
        name: 'Books',
        id: 10
    },
    {
        name: 'Music',
        id: 12
    },

    {
        name: 'Video Games',
        id: 15
    }

]



const levels = ['easy', 'medium', 'hard'];

// use this const to make a fetch request to the specific category and difficulty level
function addGenre(genre) {
// create a column by using createElement. 
    const column = document.createElement("div");
// grab the column and use classList.add to add a class we havent created.
//then go to the css file and add to the class. 
    column.classList.add("genre-column");
//add the columns to the HTML //
    column.innerHTML = genre.name;
    game.append(column);

//add cards into the column //
    levels.forEach(level => {
// create a card //
        const card = document.createElement("div")
        card.classList.add('card');
        column.append(card);

//assign a dollar amount to the level of question//
        if (level==='easy'){
            card.innerHTML = 100
        }else if (level ==='medium'){
            card.innerHTML = 200
        }else if (level === 'hard'){
            card.innerHTML = 300
        }
        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
    //replace the difficulty with our const. {level}
    //asynchronious javascript //
            .then(response => response.json())
            .then(data => {
    //not enough data to get 10 items per difficulty level and get random 
    //question using Math.random() and passing it through instead of 0.
    //take the card element and add set Attribute so we can add any attributes to the card div. 
    //eg:if amount = 10 above you could:
    //const randomNumber = Math.floor(Math.random() * 10)
    //pass through randomNumber , so:
                //data.results[randomNumber].question
            card.setAttribute('data-question', data.results[0].question)
        // doing data.results[0] will pull up the first item in the array which includes category, correct
        // answer etc.  to get a specific item you use a key. 
            card.setAttribute('data-answer', data.results[0].correct_answer)
            card.setAttribute('data-value', card.getInnerHTML())
        //add an evenListener 
            })
            .then(done => card.addEventListener('click', flipCard))
       
        


    })

}

genres.forEach(genre => addGenre(genre))


addGenre(genres[0]);



function flipCard() {
    // console.log('clicked');
    //to display the question create a div. 
    this.innerHTML = ''
    this.style.fontSize = '15px'
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')
    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'
    trueButton.classList.add('true-button')
    falseButton.classList.add('false-button')

    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)

    // this keyword used so whatever card is clicked you append the following//
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)
    //disable eventListeners //
    const allCards = Array.from(document.querySelectorAll('.card'))

    //Array from//find all cards and put in an array//
    allCards.forEach(card => card.removeEventListener('click', flipCard))


}

function getResult(){
    //check if the answers match //
    const allCards =  Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement
    if(cardOfButton.getAttribute('data-answer') === this.innerHTML){
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 200)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 200)
    }
    cardOfButton.removeEventListener('click', flipCard)
   

    }
