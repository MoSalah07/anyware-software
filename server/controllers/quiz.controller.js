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
      return sendError(res, "Quizzes not found", 404);
    }

    return sendSuccess(
      res,
      {
        quizzes,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
      "Quizes fetched successfully",
      200
    );
  } catch (error) {
    return sendError(res, "Server Error", 500, error.message);
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
      error.message.includes("Invalid") ? error.message : "Server Error",
      400,
      error.message
    );
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title?.trim() || !Array.isArray(questions) || questions.length === 0) {
      return sendError(
        res,
        "Title and at least one question are required",
        400
      );
    }

    const isInvalidQuestion = questions.some(
      (q) =>
        !q.question?.trim() ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        !q.correctAnswer?.trim()
    );

    if (isInvalidQuestion) {
      return sendError(
        res,
        "Each question must have question text, at least 2 options, and correct answer",
        400
      );
    }

    const existingQuiz = await Quiz.findOne({ title: title.trim() });
    if (existingQuiz) {
      return sendError(res, "Quiz title already exists", 409);
    }

    const newQuiz = await Quiz.create({
      title,
      description,
      questions,
    });

    return sendSuccess(res, { newQuiz }, "Quiz created successfully", 201);
  } catch (error) {
    return sendError(res, "Server Error", 500, error.message);
  }
};

export const updateQuiz = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Quiz ID");

    const { title, description, questions } = req.body;

    if (!title?.trim() || !Array.isArray(questions) || questions.length === 0) {
      return sendError(
        res,
        "Title and at least one question are required",
        400
      );
    }

    const isInvalidQuestion = questions.some(
      (q) =>
        !q.question?.trim() ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        !q.correctAnswer?.trim()
    );

    if (isInvalidQuestion) {
      return sendError(
        res,
        "Each question must have question text, at least 2 options, and correct answer",
        400
      );
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description?.trim() || "",
        questions,
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
      error.message.includes("Invalid") ? error.message : "Server Error",
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
      error.message.includes("Invalid") ? error.message : "Server Error",
      400,
      error.message
    );
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    validateObjectId(quizId, "Quiz ID");
    validateObjectId(questionId, "Question ID");

    const quiz = await Quiz.findById(quizId);

    if (!quiz) return sendError(res, "Quiz not found", 404);

    quiz.questions = quiz.questions.filter(
      (q) => q._id.toString() !== questionId
    );

    await quiz.save();

    return sendSuccess(res, null, "Question deleted successfully", 200);
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server Error",
      400,
      error.message
    );
  }
};
