const game = document.querySelector("#game");

const scoreDisplay = document.querySelector("#score");

const film = 11;
const levels = ['easy', 'medium', 'hard'];

// use this const to make a fetch request to the specific category and difficulty level
function addGenre(){
// create a column by using createElement. 
    const column = document.createElement("div");
// grab the column and use classList.add to add a class we havent created.
//then go to the css file and add to the class. 
    column.classList.add("genre-column");
//add the columns to the HTML //
    column.innerHTML = "this is a column";
    game.append(column);

//add cards into the column //
    levels.forEach(level => {
    fetch(`https://opentdb.com/api.php?amount=1&category=13&difficulty=${level}&type=boolean`)
    //replace the difficulty with our const. {level}
    //asynchronious javascript //
        .then(response => response.json())
        .then(data => console.log(data));
    });

}

addGenre();