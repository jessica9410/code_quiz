//selected questions, choices and answers

var questions = [{
        question: "Skinny and of common stock; afraid of scissors but not of rock. What am I?",
        choices: ["tree", "paper", "plastic", "rocks"],
        answer: "paper",
    },
    {
        question: "What goes up and down the stairs without moving?",
        choices: ["feather", "ghost", "carpet", "fly"],
        answer: "carpet",
    },
    {
        question: "If a hen and a half lay an egg and a half in a a day and a half, how many eggs will half a dozen hens lay in half a dozen days?",
        choices: ["400", "2", "two", "two dozen"],
        answer: "two dozen",
    },
    {
        question: "Im tall when I'm young, and I'm short when I'm old, What am I?",
        choices: ["flower", "tree", "a candle", "brain"],
        answer: "a candle",
    },
];

console.log(questions[0].choices[1]);
console.log(questions[1].choices[2]);
console.log(questions[2].choices[3]);
console.log(questions[3].choices[2]);


var time = questions.length * 15;
var timerId;

//select elements by class
var startbtn = document.querySelector("#startQuiz");
var questionsElement = document.querySelector("#questions");
var questionChoices = document.querySelector("#user-choice");
var questionIndex = 0;
var timeEl = document.getElementById("time");
var secondsLeft = 15;
var timerInterval;
var scoreField = document.getElementById("player-score");
var initialsField = document.getElementById("player-name");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var clearScoreButton = document.getElementById("clear-btn");
var submitButton = document.getElementById("submit-btn");
var viewHighScores = document.getElementById("highscores-link");


var shuffledQuestions, currentQuestionIndex;


startbtn.addEventListener("click", startQuiz);

function startQuiz() {
    console.log("starting-game");
    //start the timer
    timerInterval = setInterval(timer, 1000);
    // empty the page
    document.querySelector("#start-screen").innerHTML = "";
    getNextQuestion();
}
//add a question to the page
function getNextQuestion() {
    document.querySelector("#title").textContent =
        questions[questionIndex].question;
    //add the possible answers to the pae
    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = questions[questionIndex].choices[i];
        btn.setAttribute("data-answer", questions[questionIndex].choices[i]);
        btn.classList.add("user-choice");
        questionChoices.appendChild(btn);
        console.log();
    }
}
//i need to use this function to change the next question
questionChoices.addEventListener("click", getAnswer);

function getAnswer(event) {

    var userAnswer = event.target.innerHTML;

    console.log(questions[questionIndex].answer);
    var correctAnswer = questions[questionIndex].answer;;

    if (userAnswer === correctAnswer) {
        alert("answer is correct!");

    }
    document.querySelector("#title").textContent = "";
    questionChoices.textContent = "";
    questionIndex++;
    getNextQuestion();
}

function timer() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till time is up!";

    if (secondsLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        document.querySelector("#end-screen").classList.remove("hide");
    }
} // Save scores
function saveScore() {
    clearInterval(timerID);
    timeEl.textContent = "Time: " + timeLeft;
    setTimeout(function() {
        //localStorage.setItem("scores", JSON.stringify(scores));
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};


var loadScores = function() {
    // Get score from local storage

    if (!savedScores) {
        return false;
    }

    // Convert scores from stringfield format into array
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};


// Show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials,
            timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    //console.log(scores)
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};


// View high scores link
viewHighScores.addEventListener("click", showHighScores);


submitButton.addEventListener("click", function(event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});


// Clear localStorage items 
clearScoreButton.addEventListener("click", function() {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});