const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "Skinny and of common stock; afraid of scissors but not of rock. What am I?",
    choice1: "tree",
    choice2: "paper",
    choice3: "plastic",
    choice4: "rocks",
    answer: 2,
  },
  {
    question: "What goes up and down the stairs without moving?",
    choice1: "feather",
    choice2: "ghost",
    choice3: "carpet",
    choice4: "fly",
    answer: 3,
  },
  {
    question:
      "If a hen and a half lay an egg and a half in a a day and a half, how many eggs will half a dozen hens lay in half a dozen days?",
    choice1: "400",
    choice2: "2",
    choice3: "two",
    choice4: "two dozen",
    answer: 4,
  },
  {
    question: "Im tall when I'm young, and I'm short when I'm old, What am I?",
    choice1: "flower",
    choice2: "tree",
    choice3: "a candle",
    choice4: "brain",
    answer: 3,
  },
];
//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }
  questionCounter++;
  const questionIndex= Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers= true;
  };
choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice= e.target;
        const selectedAnswer= selectedChoice.dataset["number"];
console.log(selectedAnswer);
        getNewQuestion();
    });
});

startGame();
