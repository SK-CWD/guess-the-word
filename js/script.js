const lettersGuessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const amountRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

//this function below will update the <p> with however many dots are needed to replace the "word" the user is guessing.
const dots = function (word) {
    const dotLetters = [];
    for (const letter of word) {
        console.log(letter);
        dotLetters.push("●");
    }
    wordInProgress.innerText = dotLetters.join("");
};

dots(word);//dots will appear holding place for "MAGNOLIA". 8 dots will appear.

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
    }
};