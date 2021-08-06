const lettersGuessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const amountRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");
const word = "magnolia";

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
    const guess = letter.value;
    console.log(guess);
    letter.value=""; //empty the value of the input letter
});