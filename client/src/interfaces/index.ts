export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  postedby: string;
  createdAt: Date;
  updatedAt: Date;
}

// Quiz
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  _id?: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface IQuestion {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  quizId?: string;
}

export interface IQuiz {
  _id: string;
  title: string;
  description?: string;
  questions: IQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface IQuizResponse {
  data: {
    quizzes: IQuiz[];
    currentPage: number;
    total: number;
    totalPages: number;
  };
  message: string;
  success: boolean;
}
