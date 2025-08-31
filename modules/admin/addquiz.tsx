import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { questionSchema } from "../user/validations/quiz-validation";
import { submitQuiz } from "../quiz/api/quiz-api";

// Define and export QuestionType for use in other files
export type QuestionType = z.infer<typeof questionSchema>;

const AddQuiz = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [duration, setDuration] = useState(""); // ✅ matches backend schema

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuestionType>({
    resolver: zodResolver(questionSchema),
  });

  const correctOption = watch("correct");

  const onAddQuestion = (data: QuestionType) => {
    const formattedQuestion = {
      ...data,
      questionType: "MCQ" as const,
    };
    setQuestions((prev) => [...prev, formattedQuestion]);
    reset();
    console.log("Question added:", formattedQuestion);
  };

  const handleSubmitQuiz = async () => {
    if (!quizTitle.trim()) {
      alert("Quiz title is required");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      alert("Please enter a valid duration (in minutes)");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    const quizData = {
      title: quizTitle.trim(),
      questions,
      duration: Number(duration), // ✅ now matches schema
    };

    try {
      const result = await submitQuiz(quizData);
      console.log("Quiz submitted successfully", result);
      setQuestions([]);
      setQuizTitle("");
      setDuration(""); // reset after submission
    } catch (err) {
      console.error("Failed to submit quiz", err);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 border rounded-xl shadow bg-white">
        <h2 className="text-xl font-semibold text-center mb-4">Create Quiz</h2>

        {/* Quiz Title */}
        <Input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="mb-4"
        />

        {/* Duration Input */}
        <Input
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mb-4"
        />

        {/* Question Form */}
        <form onSubmit={handleSubmit(onAddQuestion)}>
          <Input
            type="text"
            placeholder="Question"
            {...register("question")}
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
          <br />

          <div className="flex items-center gap-2 my-2">
            <input
              type="radio"
              value="A"
              {...register("correct")}
              checked={correctOption === "A"}
            />
            <Input type="text" placeholder="Option A" {...register("optionA")} />
          </div>
          {errors.optionA && (
            <p className="text-red-500 text-sm">{errors.optionA.message}</p>
          )}

          <div className="flex items-center gap-2 my-2">
            <input
              type="radio"
              value="B"
              {...register("correct")}
              checked={correctOption === "B"}
            />
            <Input type="text" placeholder="Option B" {...register("optionB")} />
          </div>
          {errors.optionB && (
            <p className="text-red-500 text-sm">{errors.optionB.message}</p>
          )}

          <div className="flex items-center gap-2 my-2">
            <input
              type="radio"
              value="C"
              {...register("correct")}
              checked={correctOption === "C"}
            />
            <Input type="text" placeholder="Option C" {...register("optionC")} />
          </div>
          {errors.optionC && (
            <p className="text-red-500 text-sm">{errors.optionC.message}</p>
          )}

          <div className="flex items-center gap-2 my-2">
            <input
              type="radio"
              value="D"
              {...register("correct")}
              checked={correctOption === "D"}
            />
            <Input type="text" placeholder="Option D" {...register("optionD")} />
          </div>
          {errors.optionD && (
            <p className="text-red-500 text-sm">{errors.optionD.message}</p>
          )}

          {errors.correct && (
            <p className="text-red-500 text-sm">{errors.correct.message}</p>
          )}

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full mt-3"
          >
            Add Question
          </Button>
        </form>

        <hr className="my-4" />

        <p className="text-center text-gray-600">
          Questions Added: {questions.length}
        </p>

        <Button
          className="bg-green-500 hover:bg-green-600 w-full mt-3"
          onClick={handleSubmitQuiz}
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default AddQuiz;
