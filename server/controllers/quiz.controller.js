import Quiz from "../models/quiz.model.js";
import { validateObjectId } from "../utils/isValidObjectId.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const getAllQuizes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const [quizzes, total] = await Promise.all([
      Quiz.find({}, { __v: 0 })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Quiz.countDocuments(),
    ]);

    if (!quizzes.length) {
      return sendError(res, "No quizzes found", 404);
    }

    return sendSuccess(
      res,
      {
        quizzes,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
      "Quizzes fetched successfully",
      200
    );
  } catch (error) {
    return sendError(res, "Server error", 500, error.message);
  }
};

export const getSingleQuiz = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Quiz ID");

    const quiz = await Quiz.findById(req.params.id).lean();

    if (!quiz) return sendError(res, "Quiz not found", 404);

    return sendSuccess(res, quiz, "Quiz fetched successfully", 200);
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server error",
      400,
      error.message
    );
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, question } = req.body;

    if (!title?.trim() || typeof question !== "object") {
      return sendError(res, "Title and question are required", 400);
    }

    const { question: text, options, correctAnswer } = question;

    if (
      !text?.trim() ||
      !Array.isArray(options) ||
      options.length < 3 ||
      options.length > 4 ||
      !correctAnswer?.trim()
    ) {
      return sendError(
        res,
        "Question must have text, 3 to 4 options, and a correct answer",
        400
      );
    }

    if (!options.includes(correctAnswer)) {
      return sendError(res, "Correct answer must be one of the options", 400);
    }

    const existingQuiz = await Quiz.findOne({ title: title.trim() });
    if (existingQuiz) {
      return sendError(res, "Quiz title already exists", 409);
    }

    const newQuiz = await Quiz.create({
      title: title.trim(),
      question: {
        question: text.trim(),
        options,
        correctAnswer,
      },
    });

    return sendSuccess(res, { newQuiz }, "Quiz created successfully", 201);
  } catch (error) {
    return sendError(res, "Server error", 500, error.message);
  }
};

export const updateQuiz = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Quiz ID");

    const { title, question } = req.body;

    if (!title?.trim() || typeof question !== "object") {
      return sendError(res, "Title and question are required", 400);
    }

    const { question: text, options, correctAnswer } = question;

    if (
      !text?.trim() ||
      !Array.isArray(options) ||
      options.length < 3 ||
      !correctAnswer?.trim()
    ) {
      return sendError(
        res,
        "Question must have text, at least 3 options, and correctAnswer",
        400
      );
    }

    if (!options.includes(correctAnswer)) {
      return sendError(res, "Correct answer must be one of the options", 400);
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        question: {
          question: text.trim(),
          options,
          correctAnswer,
        },
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return sendError(res, "Quiz not found", 404);
    }

    return sendSuccess(res, { updatedQuiz }, "Quiz updated successfully", 200);
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server error",
      400,
      error.message
    );
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Quiz ID");

    const deleted = await Quiz.findByIdAndDelete(req.params.id);

    if (!deleted) return sendError(res, "Quiz not found", 404);

    return sendSuccess(res, { deleted }, "Quiz deleted successfully", 200);
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server error",
      400,
      error.message
    );
  }
};
