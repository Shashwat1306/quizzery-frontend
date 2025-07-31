import { useEffect, useState } from "react";
import { getAllQuizzes } from "../api/quiz-api";
import { Link } from "react-router-dom";

type QuizSummary = {
  _id: string;
  title: string;
};

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getAllQuizzes();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
  <h2 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h2>
  <ul className="space-y-6">
    {quizzes.map((quiz) => (
      <li key={quiz._id} className="w-full p-6 border rounded-xl shadow-lg text-lg ">
        <div className="flex justify-between items-center">
          <span className="font-medium">{quiz.title}</span>
          <Link
            to={`/attempt/${quiz._id}`}
            className="text-blue-600 hover:text-blue-800 underline text-base font-semibold"
          >
            Attempt
          </Link>
        </div>
      </li>
    ))}
  </ul>
</div>



  );
};
export default AllQuizzes;
