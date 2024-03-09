import { questions as myQuestions } from "./data.js";

const quizContainer = document.querySelector('[data-js="quiz"]');
const submitButton = document.querySelector('[data-js="submit"]');

function buildQuiz() {
  const output = [];

  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      const answers = [];
      const observations = [];

      for (const letter in currentQuestion.answers) {
        answers.push(
          `<label class="radiocontainer">
            ${currentQuestion.answers[letter]}
            <input type="radio" name="question${questionNumber}" value="${letter}">
            <span class="checkmark"></span>
          </label>`
        );
      }

      if (currentQuestion.obs) {
        observations.push(
          `<p class="observation">${currentQuestion.obs}</p>`
        )
      }

      output.push(
        `<div class="quiz-item" id="${currentQuestion.id}">
          <div class="question"> ${currentQuestion.id}. ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
          <div> ${observations.join("")} </div>
        </div>`
      );
    }
  );

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  const output = [];

  submitButton.innerHTML = 'Guardar respostas';
  submitButton.setAttribute('data-js', 'save-result');
  submitButton.classList.add('secondary-button');

  myQuestions.forEach( (currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    output.push(
      `<div>
        <p class="smaller-text bold-text">${currentQuestion.question}</p>
        <p class="smaller-text italic-text">${currentQuestion.answers[userAnswer]}</p>
      `
    )
  });

  quizContainer.innerHTML = output.join("");

  const p = document.createElement('p');
  p.innerText = 'Para guardar as respostas escolha Salvar PDF como destino da impressão.';
  p.classList.add('alert-text');
  quizContainer.appendChild(p);

  const saveResultButton = document.querySelector('[data-js="save-result"]');
  saveResultButton.addEventListener('click', saveResult);
}

function saveResult() {
  quizContainer.removeChild(quizContainer.lastElementChild);

  const resultPage = `
    <html>
      <head>
        <title>Resultado - Questionário Desafio 40 Dias de Oração Juntos</title>
        <style>
          .smaller-text {font-size: 16px;line-height: 1;}
          .bold-text {font-weight: bold;}
          .italic-text {font-style: italic; margin: 1rem 0 1.5rem;}
        </style>
      </head>
      <body>
        <h1>Resultado - Questionário Desafio 40 Dias de Oração Juntos</h1>
        <hr>
        ${quizContainer.innerHTML}
      </body>
    </html>
  `
  let win = window.open('', '');
  win.document.write(resultPage);
  win.document.close();
  win.print();

  window.location.reload(true)
}

buildQuiz();

submitButton.addEventListener('click', showResults);
