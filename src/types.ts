import { Context as BaseContext } from 'grammy';

export type MyContext = BaseContext;

export interface QuestionOptions {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuestionObj {
  id: number;
  text: string;
  hasOptions: boolean;
  options?: QuestionOptions[];
  answer?: string;
}

export interface Question {
  [index: string]: QuestionObj[];
}