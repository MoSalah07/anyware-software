import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;
