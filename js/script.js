const lettersGuessed = document.querySelector(".guessed-letters");//guessedLettersElement
const button = document.querySelector(".guess");//guessLetterButton
const letter = document.querySelector(".letter");//letterInput
const wordInProgress = document.querySelector(".word-in-progress");//wordInProgress
const remaining = document.querySelector(".remaining");//remainingGuessesElement
const amountRemaining = document.querySelector(".remaining span");//remainingGuessessSpan
const message = document.querySelector(".message");//message
const hiddenButton = document.querySelector(".play-again");//playAgainButton

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    dots(word);//dots will appear holding place for "MAGNOLIA". 8 dots will appear.
}

getWord();
//this function below will update the <p> with however many dots are needed to replace the "word" the user is guessing.
const dots = function (word) {
    const dotLetters = [];
    for (const letter of word) {
        // console.log(letter);
        dotLetters.push("●");
    }
    wordInProgress.innerText = dotLetters.join("");
};



button.addEventListener("click", function (e) {
    e.preventDefault();//prevents the default behavior of clicking a button, the formsubmitting, and reloading the page.
    message.innerText = "";
    const guess = letter.value;
    const goodGuess = validate(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letter.value=""; //empty the value of the input letter
});

const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input.length === 0 ){
        message.innerText = "Please enter a letter from a-z.";
    } else if (input.length > 1){
        message.innerText = "Please enter only 1 letter at a time";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter letters only from A-Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter! Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
         updateGuessesRemaining(guess);
         lettersUsed();
        updateWordInProgress(guessedLetters);
        
    }
};

const lettersUsed = function () {
    lettersGuessed.innerHTML = "";
    for (const letterList of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letterList;
        lettersGuessed.append(li);
    }
};
//ALL IS CORRECT FROM ABOVE
//This function below will replace the circle symbols with the correct letters guessed.
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for(const newLetter of wordArray) {
        if (guessedLetters.includes(newLetter)) {
            revealWord.push(newLetter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }      
    wordInProgress.innerText = revealWord.join(""); 
    didUserWin(); 
};

const updateGuessesRemaining = function (guess) {
    const upperCaseWord = word.toUpperCase();
    if (!upperCaseWord.includes(guess)) {
        message.innerText = "Sorry! That letter is not in the word. Try again.";
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good Job! The word does contain the letter ${guess}`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! You have no more guesses. The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        amountRemaining.innerText = `${remainingGuesses} guess`;
    } else {
        amountRemaining.innerText = `${remainingGuesses} guesses`;
    }
};

const didUserWin = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    } 
};

const startOver = function () {
    button.classList.add("hide");
    remaining.classList.add("hide");
    lettersGuessed.classList.add("hide");
    hiddenButton.classList.remove("hide");
};

hiddenButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    amountRemaining.innerText = `${remainingGuesses} guesses`;
    guessedLetters.innerHTML = "";
    message.innerText = "";

    getWord();

    button.classList.remove("hide");
    hiddenButton.classList.add("hide");
    remainingGuesses.classList.remove("hide");
    guessedLetters.classList.remove("hide");
});