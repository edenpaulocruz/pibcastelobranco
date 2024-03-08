const quizContainer = document.querySelector('[data-js="quiz"]');
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

buildQuiz();
