import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null); // ← To hold the score

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:7778/api/quiz/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error("Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:7778/api/quiz/submit", {
        quizId: id,
        answers,
      });

      const { score, total } = res.data;
      setResult({ score, total }); // ← Save the result in state
    } catch (err) {
      alert("Submission failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Attempt Quiz</h2>

      {result ? (
        <div className="p-9 border rounded shadow bg-green-100 min-w-[300px] min-h-[200px]">
          <p className="text-2xl font-bold text-green-700 mb-2">Result</p>
          <p className="mt-3 text-lg">
            Score: {result.score} / {result.total}
          </p>
          <p className="text-lg mb-4">
            Percentage: {((result.score / result.total) * 100).toFixed(2)}%
          </p>
          <button
            onClick={() => navigate("/all-quizzes")}
            className="bg-blue-600 text-white px-5 py-2 rounded text-base"
          >
            Back to All Quizzes
          </button>
        </div>
      ) : (
        // ❓ Else show the quiz
        <>
          {quiz.questions.map((q, index) => (
            <div key={q._id} className="mb-6 p-4 border rounded shadow">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {["A", "B", "C", "D"].map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={opt}
                      checked={answers[q._id] === opt}
                      onChange={() => setAnswers({ ...answers, [q._id]: opt })}
                    />
                    {` ${opt}. ${q[`option${opt}`]}`}
                  </label>
                ))}
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
