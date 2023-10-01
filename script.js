// JavaScript code

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare",
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // Timer variable

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const correctAnswersElement = document.getElementById("correct-answers");
const totalQuestionsElement = document.getElementById("total-questions");
const userScoreElement = document.getElementById("user-score");
const resultMessageElement = document.getElementById("result-message");
const restartButton = document.getElementById("restart");
const timerContainer = document.getElementById("timer-container");
const timerCircle = document.getElementById("timer-circle");
const timerText = document.getElementById("timer-text");
const timerExpireClass = "timer-expiring";
const questionContainer = document.getElementById("question-container");
const startButton = document.getElementById("start-quiz"); // Start button

const questionTime = 60; // 60 seconds for each question

document.addEventListener("DOMContentLoaded", function () {
    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        questionContainer.style.display = "block";
        displayQuestion();
        startTimer();
    });

    restartButton.addEventListener("click", restartQuiz);
});

function displayQuestion() {
    clearTimeout(timer); // Clear previous timer
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`;
        optionsElement.appendChild(li);
    });

    // Create and append a submit button for the current question
    const submitButton = document.createElement("button");
    submitButton.id = "submit";
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", checkAnswer);
    questionContainer.appendChild(submitButton);

    // Start the timer for this question
    startTimer();
}

function removeSubmitButton() {
    const submitButton = document.getElementById("submit");
    if (submitButton) {
        submitButton.remove();
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (!selectedOption) {
        return; // No answer selected
    }

    const userAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;

    removeSubmitButton(); // Remove the submit button for the current question

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        displayStats();
    } else {
        displayResult();
    }
}

function displayResult() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";
    removeSubmitButton(); // Remove any remaining submit button
    resultElement.style.display = "block";

    if (score === questions.length) {
        resultMessageElement.textContent = "Congratulations! You answered all questions correctly!";
    } else {
        resultMessageElement.textContent = "Good Luck Next Time!";
    }

    resultMessageElement.style.fontWeight = "bold";
    resultMessageElement.style.fontSize = "18px";
    restartButton.style.display = "block";
    timerContainer.style.visibility = "hidden";
}

function displayStats() {
    correctAnswersElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
    userScoreElement.textContent = score;
}

function startTimer() {
    clearInterval(timer); // Clear any existing timers

    let timeLeft = questionTime;
    timerContainer.style.visibility = "visible";

    const updateTimer = () => {
        const formattedTimeLeft = timeLeft; // Add 's' to indicate seconds
        timerText.textContent = formattedTimeLeft; // Update timer text
        const percentage = (timeLeft / questionTime) * 100;
        timerCircle.style.strokeDashoffset = (283 * (100 - percentage)) / 100;
    };

    updateTimer();

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerContainer.style.visibility = "hidden";
            checkAnswer(); // Consider the answer incorrect when time's up
        } else {
            timeLeft--;
            updateTimer();

            if (timeLeft <= 10) {
                timerText.classList.add(timerExpireClass);
            }
        }
    }, 1000);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.style.display = "none";
    restartButton.style.display = "none";
    timerText.classList.remove(timerExpireClass);
    displayQuestion();
    displayStats();
    startTimer(); // Restart the timer
}
