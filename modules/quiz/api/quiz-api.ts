// lib/api/quiz.ts
import axios from "axios";
import type { QuestionType } from "../../admin/addquiz"; // or wherever it's defined

export type quizData = {
  title: string;
  questions: QuestionType[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = API_BASE_URL;

export const submitQuiz = async (quiz: quizData) => {
  console.log('API_BASE_URL', API_BASE_URL, 'Quiz Data:', quiz);
  return axios.post('/quiz/add', quiz); 
};

export const getAllQuizzes = async () => {
  const res = await axios.get("/quiz/all");
  return res.data;
}; 

export const getQuiz = async () => {
  const res = await axios.get("/api/quiz");
  return res.data;
};
