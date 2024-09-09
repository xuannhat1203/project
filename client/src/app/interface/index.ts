export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface ExamSubject {
  id: number;
  title: string;
  description: string;
  courseId: number;
}

export interface Exam {
  id: number;
  title: string;
  description: string;
  duration: number;
  examSubjectId: number;
}

export interface Question {
  id: number;
  question: string;
  examId: number;
  options: string[];
  answer: string;
}

export interface UserAnswer {
  id: number;
  useId: number;
  exampId: number;
  score: number;
}

export interface User {
  id: number;
  username: string;
  passWord: string;
  email: string;
  role: number;
  profilePicture: string;
  status: number;
}
