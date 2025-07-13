import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: [(val) => val.length >= 3, "At least 3 options required"],
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.options.includes(value);
      },
      message: "Correct answer must be one of the options",
    },
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    semester: {
      type: String,
      default: "2025-S2",
    },
    question: {
      type: QuestionSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
