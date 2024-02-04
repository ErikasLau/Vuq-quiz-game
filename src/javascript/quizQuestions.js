let quizQuestions = null;
let quizLength = null;

const loadAllQuizQuestions = async () => {
  const response = await fetch("src/javascript/questions.json");
  quizQuestions = await response.json();
};

const getQuizQuestion = () => {
  quizLength = quizQuestions.results.length;

  const randomQuestion = Math.floor(Math.random() * quizLength);

  const foundQuestion = quizQuestions.results[randomQuestion];
  quizQuestions.results.splice(randomQuestion, 1);

  convertFromBase64(foundQuestion);

  return foundQuestion;
};

const convertFromBase64 = (question) => {
  for (var key in question) {
    if (question.hasOwnProperty(key)) {
      if (Array.isArray(question[key])) {
        for (let i = 0; i < question[key].length; i++) {
          question[key][i] = atob(question[key][i]);
        }
        continue;
      }
      question[key] = atob(question[key]);
    }
  }
};

const getQuizLength = () => {
  return quizLength;
};

export { loadAllQuizQuestions, getQuizQuestion, getQuizLength };
