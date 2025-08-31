import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  type QuizQuestion = {
    _id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  };

  type QuizType = {
    _id: string;
    title: string;
    duration: number; // ✅ added duration
    questions: QuizQuestion[];
  };

  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  type QuizReview = {
    question: string;
    correctAnswer: string;
    userAnswer: string;
    options: { [key: string]: string };
  };

  type ResultType = {
    score: number;
    total: number;
    review: QuizReview[];
  };

  const [result, setResult] = useState<ResultType | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // ✅ start as null

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:7778/api/quiz/${id}`);
        setQuiz(res.data);
        setTimeLeft(res.data.duration * 60); // ✅ dynamic duration (minutes → seconds)
      } catch (err) {
        console.error("Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (!loading && quiz && !result && timeLeft !== null) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null) return prevTime;
          if (prevTime <= 1) {
            clearInterval(interval);
            handleSubmit(); // ⏱️ Auto-submit
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loading, quiz, result, timeLeft]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:7778/api/quiz/submit", {
        quizId: id,
        answers,
      });

      const { score, total, review } = res.data;
      setResult({ score, total, review });
    } catch (err) {
      alert("Submission failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Attempt Quiz</h2>
      {!result && timeLeft !== null && (
        <p className="text-lg font-semibold text-red-600 mb-4">
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
      )}

      {result ? (
        <div className="p-6 border rounded shadow bg-gray-50">
          <p className="text-2xl font-bold text-green-700 mb-4">Quiz Review</p>
          <p className="text-lg mb-2">
            Score: {result.score} / {result.total} (
            {((result.score / result.total) * 100).toFixed(2)}%)
          </p>

          <div className="space-y-6 mt-6">
            {result.review.map((q, index) => (
              <div key={index} className="p-4 border rounded bg-white shadow">
                <p className="font-semibold mb-2">
                  {index + 1}. {q.question}
                </p>

                {["A", "B", "C", "D"].map((opt) => (
                  <p
                    key={opt}
                    className={
                      "ml-4 " +
                      (opt === q.correctAnswer
                        ? "text-green-700 font-semibold"
                        : opt === q.userAnswer
                        ? "text-red-600"
                        : "")
                    }
                  >
                    {opt}. {q.options[opt]}
                  </p>
                ))}

                <p className="mt-2 text-sm">
                  Your Answer:{" "}
                  <span
                    className={
                      q.userAnswer === q.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {q.userAnswer || "Not Answered"}
                  </span>
                </p>

                {q.userAnswer !== q.correctAnswer && (
                  <p className="text-sm text-green-700">
                    Correct Answer: {q.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/all-quizzes")}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
          >
            Back to All Quizzes
          </button>
        </div>
      ) : (
        <>
          {quiz.questions.map((q, index) => (
            <div key={q._id} className="mb-6 p-4 border rounded shadow">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {["A", "B", "C", "D"].map((opt) => {
                  const getOptionValue = (q: QuizQuestion, opt: string) => {
                    switch (opt) {
                      case "A":
                        return q.optionA;
                      case "B":
                        return q.optionB;
                      case "C":
                        return q.optionC;
                      case "D":
                        return q.optionD;
                      default:
                        return "";
                    }
                  };
                  return (
                    <label key={opt} className="block">
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={() =>
                          setAnswers({ ...answers, [q._id]: opt })
                        }
                      />
                      {` ${opt}. ${getOptionValue(q, opt)}`}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default AttemptQuiz;
