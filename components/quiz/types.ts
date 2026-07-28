export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type AgeGroup = '5-10' | '11-18' | 'Adult';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
export type NumQuestions = 5 | 10 | 15;

export type QuizState = 'setup' | 'loading' | 'active' | 'result';
