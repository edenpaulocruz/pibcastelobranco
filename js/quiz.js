const quizContainer = document.querySelector('[data-js="quiz"]');
const submitButton = document.querySelector('[data-js="submit"]');
const myQuestions = [
	{
		id: 1,
		question: "Há quanto tempo você está em seu casamento atual?",
		answers: {
			a: "Menos de cinco anos.",
			b: "Menos de dez anos.",
			c: "Menos de quinze anos.",
			d: "Quinze anos ou mais."
		}
	},
	{
		id: 2,
		question: "Este é seu primeiro casamento?",
		answers: {
			a: "Sim.",
			b: "Não, este é meu segundo casamento.",
			c: "Não, este é meu terceiro casamento ou mais."
		}
	},
	{
		id: 3,
		question: "Você e seu cônjuge atualmente oram juntos?",
		answers: {
			a: "Quase todos os dias.",
			b: "Às vezes.",
			c: "Raramente.",
			d: "Nunca."
		},
		obs: "Se você respondeu 'Nunca', vá para a pergunta 12."
	},
	{
		id: 4,
		question: "Se sim, por quanto tempo?",
		answers: {
			a: "5-10 minutos.",
			b: "15-30 minutos.",
			c: "30-45 minutos.",
			d: "45-60 minutos."
		}
	}
]

function buildQuiz() {
  const output = [];

  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      const answers = [];
      const observations = [];

      for (letter in currentQuestion.answers) {
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

  submitButton.innerHTML = 'Gerar PDF';
  submitButton.setAttribute('data-js', 'pdf-generator');
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
  const generatePdfButton = document.querySelector('[data-js="pdf-generator"]');
  generatePdfButton.addEventListener('click', generatePdf);
}

function generatePdf() {
  const result = document.querySelector('main').innerHTML;

  let style = '<style>';
  style = style + '.smaller-text {font-size: 12px;line-height: .25;}';
  style = style + '.bold-text {font-weight: bold;}';
  style = style + '.italic-text {margin: 1rem 0 1.5rem;}';
  style = style + '</style>';

  // CRIA UM OBJETO WINDOW
  // let win = window.open('', '', 'height=700,width=700');
  let win = window.open('', '');

  win.document.write('<html><head>');
  win.document.write('<title>Resultado</title>');   // <title> CABEÇALHO DO PDF.
  win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(result);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
  win.document.write('</body></html>');

  win.document.close(); 	                                         // FECHA A JANELA

  win.print();                                                            // IMPRIME O CONTEUDO
}

buildQuiz();

submitButton.addEventListener('click', showResults);
