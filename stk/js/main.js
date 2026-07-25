const data = require('./tests.json');

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Получить все вопросы в случайном порядке
const shuffledQuestions = shuffleArray([...data.questions]);

// Или выбрать случайные N вопросов
function getRandomQuestions(count) {
  const shuffled = shuffleArray([...data.questions]);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Пример: получить 10 случайных вопросов
const randomTen = getRandomQuestions(10);
