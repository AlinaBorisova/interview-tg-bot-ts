import questionsData from '../questions.json';
import { Question } from "./types";

const getRandomQuestion = (topic:string) => {
  let questionTopic = topic.toLowerCase();
  let questions: Question = questionsData;

  if (questionTopic === 'случайный вопрос') {
    questionTopic = Object.keys(questions)[Math.floor(
      Math.random() * Object.keys(questions).length - 1,
    )];
  }

  const randomQuestionIndex = Math.floor(
    Math.random() * questions[questionTopic].length,
  );


  return {
    question: questions[questionTopic][randomQuestionIndex],
    questionTopic,
  };
};

const getCorrectAnswer = (topic:string, id:number) => {
  let questions: Question = questionsData;
  const question = questions[topic].find(question => question.id === id);

  if (!question?.hasOptions) {
    return question?.answer;
  }
  return question.options?.find(option => option.isCorrect)?.text;
}

export { getRandomQuestion, getCorrectAnswer };