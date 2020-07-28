//DOM Elements
var secondsDisplay = document.querySelector("#seconds");
var scoreDisplay = document.querySelector("#score");
var goButton = document.querySelector("#start-button");
var quizDisplay = document.querySelector("#quiz");
var quizContainer = document.querySelector("#quiz-container");
var submitEl = document.querySelector("#submit");
var resultsEl = document.querySelector("#results");
var initialsEl = document.querySelector("#initials");
var messageEl = document.querySelector("#message");

//vars used in this code
var totalSeconds = 0;
var secondsElapsed = 0;
var interval; //variable to help set up the timer
var score = 0; //score based on quiz results
var counter = 0; //possibly used in a loop to go thru the questions

//object that holds the questions, multiple choice options, and correct answer
var quizQuestions = [
  {
    question: "Which element is most commonly considered the heart of Organic Chemistry?",
    answers: [
      "Carbon",
      "Nitrogen",
      "Boron",
      "Oxygen"
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "Which of these gases is not diatomic?",
    answers: [
      "Oxygen",
      "Neon",
      "Chlorine",
      "Nitrogen"
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "How many protons does the nucleus of Carbon have?",
    answers: [
      "5",
      "6",
      "7",
      "8"
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "When looking at organic reactions, what purpose does the Nucleophile serve?",
    answers: [
      "Provides a medium in which the reaction takes place",
      "Calibrates the equilibrium of the reaction",
      "Is the site for where a new bond is formed between two reactants",
      "It combines the Infinity Stones"
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "How many electrons can fit in the valence shell?",
    answers: [
      "42",
      "2",
      "4",
      "8",
    ],
    correctAnswerIndex: 3,
  },
  {
    question: "What kind of bond is in a Carbonyl functional group?",
    answers: [
      "single",
      "double",
      "triple",
      "James"
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "How would you describe the bond in table salt (sodium chloride)?",
    answers: [
      "covalent",
      "ionic",
      "metallic",
      "salty"
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "Which element is not found in the structure of sugar?",
    answers: [
      "carbon",
      "hydrogen",
      "oxygen",
      "nitrogen"
    ],
    correctAnswerIndex: 3,
  },
  {
    question: "What is the intermolecular force responsible for causing ice to float?",
    answers: [
      "Van der Waals",
      "strong",
      "hydrogen bonding",
      "gravity"
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "Where was helium first discovered",
    answers: [
      "In the sun",
      "Deep underground",
      "In Albert Einstein's morning coffee",
      "In the ocean"
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "Congratulations, you've finished!",
  }
]

//begins quiz when Go button clicked
function startTimer() {
  setTime();
  hideStartBtn();

  if (totalSeconds > 0) {
    interval = setInterval(function () {
      secondsElapsed++;
      renderTime();
      secondsDisplay.textContent = "Time: " + getFormattedSeconds();
      if (secondsElapsed <=0) {
        clearInterval(interval);
        showResults();
      }
    }, 1000)
  }
  displayQuestion(0);
}

//displays the next question pulled from the object
function displayQuestion(quizQuestionsIndex) {
  quizDisplay.innerHTML = ""; //this line resets the content holding the question
  var thisQuestion = quizQuestions[quizQuestionsIndex];
  quizDisplay.textContent = thisQuestion.question; //this line populates the previously emptied question content with the next question

  for (var i = 0; i < thisQuestion.answers.length; i++) { //for loop that iterates over the length of the array of possible answers for each question
    var answerContainer = document.createElement("div"); //creates a div to hold the button about to be created
    var answerButton = document.createElement("Button"); //creates as many buttons as there are indices of possible answers
    
    quizDisplay.appendChild(answerContainer); //inserts the created div into the html
    answerContainer.appendChild(answerButton); //inserts the created button into the created div
    answerButton.innerHTML = thisQuestion.answers[i]; //designates the text for each button corresponding with the possible answer from the array

    if (thisQuestion.correctAnswerIndex === i) { //if statement that compares the correct answer with the current index thru the loop's path
      answerButton.addEventListener("click", handleCorrectAnswer); //if the button index === correct answer index, this path used
    }
    else {
      answerButton.addEventListener("click", handleIncorrectAnswer); //if the button index =/= correct answer index, this path used
    }
  }
}

function setTime() {
  clearInterval(interval);
  totalSeconds = 75;
}

function renderTime() {
  secondsDisplay.textContent = getFormattedSeconds();

  if (secondsElapsed >= 75) {
    stopTimer();
    alert("Time's Up!");
    // alert("Your score is: " + score);
  }
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed);
  return secondsLeft;
}

//stops timer when it reaches zero
function stopTimer() {
  clearInterval(interval);
  showResults();
  // if (counter < 9) {
  //   secondsElapsed = 0;
  //   setTime();
  //   secondsDisplay.textContent = totalSeconds;
  // }
  // else if (counter >= 9) {
  //   score = score + totalSeconds;
  //   console.log(score)
  // }
}

//path taken if user chooses the correct answer
function handleCorrectAnswer() {
  score += 10;
  counter++;
  scoreDisplay.textContent = "Score: " + score;
  if (counter <= 9) {
    messageEl.textContent = "correct!";
    displayQuestion(counter);
    // alert("correct");
  }
  else {
    // alert("finished2");
    stopTimer();
    scoreDisplay.textContent = score;
  }
  console.log(totalSeconds);
  console.log(secondsElapsed);
  console.log(score);
}

//path taken if user chooses an incorrect answer
function handleIncorrectAnswer() {
  counter++;
  totalSeconds -= 10;
  secondsElapsed += 10;
  // displayQuestion(counter);
  if (counter <= 9) {
    messageEl.textContent = "incorrect!";
    displayQuestion(counter);
    // alert("incorrect");
  }
  else {
    // alert("finished");
    stopTimer();
  }
  console.log(totalSeconds);
  console.log(secondsElapsed);
  console.log(score);
}

function showResults () {
  resultsEl.removeAttribute("class");
  quizContainer.setAttribute("class", "hide");
}

//hides the button that begins the quiz
function hideStartBtn() {
  var x = document.getElementById("start-button");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
  else {
    x.style.display = "none";
  }
}

function saveResults() {
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var newScore = {
  initials: initialsEl.value,
  score: score
}
highScores.push(newScore);
localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.href="leaderboard.html";
}

goButton.addEventListener("click", startTimer);
submitEl.addEventListener("click", saveResults);