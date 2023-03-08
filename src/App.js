import React from 'react';
import './index.scss';


const levels = [
  {
    title: 'Выберите уровень',
    variants: ['Легкий уровень', 'Стандартный уровень', 'Сложный уровень'],
    correct: 1,
  },
];

const questionsLight = [
  {
    title: 'Как зовут Поттера?',
    variants: ['Гарри Уильям', 'Гарри Джеймс', 'Джордж Гарри'],
    correct: 1,
  },
  {
    title: 'Выберите заклинание, которое явялется непростительным.',
    variants: ['Экспеллиармус', 'Авада Кедавра', 'Экспекто Патронум'],
    correct: 1,
  },
  {
    title: 'Как зовут создателя Философского камня?',
    variants: [
      'Николас Фламель',
      'Оливер Риксор',
      'Оливер Фламель',
    ],
    correct: 0,
  },
];

const questionsMiddle = [
  {
    title: 'Кто не преподавал защиту от темных искусств?',
    variants: ['Златопуст Локонс', 'Беллатриса Лестрейндж', 'Северус Снегг'],
    correct: 1,
  },
  {
    title: 'Кто в фильме дал Гарри жабросли?',
    variants: ['Хагрид', 'Профессор Стебль', 'Невил'],
    correct: 2,
  },
  {
    title: 'Как по мнению Рона, он выглядел в парадном наряде, который прислала ему мать?',
    variants: [
      'Как Мерлинова борода',
      'Как гриндилоу',
      'Как бабушка Тесси',
    ],
    correct: 2,
  },
];

const questionsHard = [
  {
    title: 'Кто выдает себя за Грозного Глаза, когда Гарри учился на 4-ом курсе?',
    variants: ['Волдеморт', 'Питер Петтигрю', 'Барти Крауч Младший'],
    correct: 2,
  },
  {
    title: 'Что в конце фильма Гарри сделал с Бузинной палочкой?',
    variants: ['Вернул в могилу Дамблдора', 'Уничтожил и выбросил', 'Спрятал в тайнике'],
    correct: 1,
  },
  {
    title: 'Это Леви-О-са, а не...',
    variants: [
      'Леви-о-СА',
      'ЛЕВИ-О-СА',
      'ЛЕви-о-са',
    ],
    correct: 0,
  },
];

function Start({start, level, onClickLevel}) {
  return (
    <>
      <h1>Пройди тест на знание Гарри Поттера и получи подарок от Букли!</h1>
      <img src="" />
      {/* <h1>{level.title}</h1> */}
      <ul>
        {level.variants.map((text, index) => (
        <li onClick = {() => onClickLevel(index)} key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn140.picsart.com/233706363056212.png?r1024x1024" />
      <h2>Поздравляю! Вам письмо из Хогвартса!</h2>
      <h3>Правильных вариантов ответа: <br/> {correct} из {questionsLight.length}</h3>
      <a href='/'>
      <button>Попробовать снова</button>
      </a>
    </div>
  );
}


function Game({step, question, onClickVariant}) {
  const percentage = Math.round(step / questionsLight.length * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
        <li onClick = {() => onClickVariant(index)} key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [start, setStart] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [indexQuestion, setIndex] = React.useState(0);
  const questionsArray = [questionsLight, questionsMiddle, questionsHard];
  const questions = questionsArray[indexQuestion];
  const question = questions[step];

const onClickLevel = (index) => {
  setStart(start+1);
  setIndex(index);
}

const onClickVariant = (index) => {
  console.log(step, index);
  setStep(step+1);

  if (index === question.correct) {
    setCorrect(correct+1)
  }
}

  return (
    <div className="App">
      { start == false ? (
        <Start start={start} level = {levels[0]} onClickLevel = {onClickLevel} />
      ) : (
        step !== questions.length ? (
        <Game step={step} question = {question} onClickVariant = {onClickVariant} />
        ) : (
          <Result correct = {correct}/> 
        )
      )
      
      }   
    </div>
  );
}

export default App;
