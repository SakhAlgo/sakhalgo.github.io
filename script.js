let btn = document.querySelector('.btn');
let container = document.querySelector('.container');
let btnContainer = document.querySelector('.btn-container');
let signs = ['+', '-']
let question = document.querySelector('.question');
let answersContainer = document.querySelectorAll('.answer');
let description = document.querySelector('.description')


function shuffleFisherYates(array) {
  // Создаем копию массива, чтобы не изменять исходный
  const shuffledArray = [...array];


  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Выбираем случайный индекс от $0$ до $i$ (включительно)
    const j = Math.floor(Math.random() * (i + 1));
    // Меняем элементы местами
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }


  return shuffledArray;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


btn.addEventListener('click', function() {
    container.style.display = 'flex';
    btnContainer.style.display = 'none';

    setTimeout(function(){
        container.style.display = 'none';
        btnContainer.style.display = 'block';
        let percent = correctAnswers / totalQuestions * 100
        description.innerHTML = `Правильных ответов: ${correctAnswers}<br>
        Всего: ${totalQuestions}<br> 
        Процент: ${percent.toFixed(1)}%`

        btn.innerHTML = 'Повторить'
        document.cookie = `statistic=${encodeURIComponent(description.innerHTML)}`
    }, 10000)
});


class Question{
    constructor(){

        function getCorrectValues(min, max){
            let a, b, sign, question, correctAnswer
            do{
                a = getRandomIntInclusive(min, max);
                b = getRandomIntInclusive(min, max);
                sign = signs[getRandomIntInclusive(0, 1)]
                question = `${a} ${sign} ${b}`;
                if (sign === '+')  correctAnswer = a + b;
                if (sign === '-')  correctAnswer = a - b;
            } while(correctAnswer < min || correctAnswer > max )
            return [question, correctAnswer]
        }

        let values = getCorrectValues(10, 90)
        this.question = values[0]
        this.correctAnswer = values[1]


        this.answers = [
            this.correctAnswer,
            this.correctAnswer + getRandomIntInclusive(1, 10),
            this.correctAnswer + getRandomIntInclusive(1, 10),
            this.correctAnswer - getRandomIntInclusive(1, 10),
            this.correctAnswer - getRandomIntInclusive(1, 10),
        ];
        this.answers = shuffleFisherYates(this.answers);
    }

    display(){
        question.innerHTML = this.question;
        for(let i = 0; i < answersContainer.length; i++){
            answersContainer[i].innerHTML = this.answers[i];
        }
    }
}

let obj = new Question();
obj.display();

let correctAnswers = 0;
let totalQuestions = 0;

for(let i = 0; i < answersContainer.length; i++){
    answersContainer[i].addEventListener('click', function(){
        if (answersContainer[i].innerHTML == obj.correctAnswer){
            correctAnswers++;
            console.log('Correct answers: ' + correctAnswers);
            answersContainer[i].style.backgroundColor = '#00ff00';

            anime({
                targets: answersContainer[i],
                backgroundColor: '#ffffff',
                duration: 500,
                delay: 300,
                easing: 'linear'            
            })
        } else {
            answersContainer[i].style.backgroundColor = '#ff0000';
            anime({
                targets: answersContainer[i],
                backgroundColor: '#ffffff',
                duration: 500,
                delay: 300,
                easing: 'linear'            
            })
        }
        totalQuestions++;
        console.log('Total questions: ' + totalQuestions);
        obj = new Question();
        obj.display();
    });
}


console.log("Cookie:" + decodeURIComponent(document.cookie))

