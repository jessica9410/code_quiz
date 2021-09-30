//selected questions, choices and answers
var questions = [{
    question: "Skinny and of common stock; afraid of scissors but not of rock. What am I?",
    choices: ["tree", "paper", "plastic", "rocks"],
    answer: "paper",
}, ];

console.log(questions[0].choices[1]);

var time = questions.length * 11;
var timerId;

//select elements by class
var startbtn = document.querySelector("#startQuiz");
var questionsElement = document.querySelector("#questions");
var questionChoices = document.querySelector("#user-choice");
var questionIndex = 0;
var timeEl = document.getElementById("time");
var secondsLeft = 11;
var timerInterval;
var score = 0;

startbtn.addEventListener("click", startQuiz);

function startQuiz() {
    console.log("starting-game");
    //start the timer
    timerInterval = setInterval(timer, 1000);
    // empty the page
    document.querySelector("#start-screen").innerHTML = "";
    document.querySelector("#end-screen").innerHTML = "";
    getNextQuestion();
}

function getNextQuestion() {
    //add a question to the page
    document.querySelector("#title").textContent =
        questions[questionIndex].question;
    //add the possible answers to the page
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

    console.log(questions[0].answer);
    var correctAnswer = questions[0].answer;

    if (userAnswer === correctAnswer) {
        alert("answer is correct!");
    }
}

function timer() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till time is up!";

    if (secondsLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
    }
}