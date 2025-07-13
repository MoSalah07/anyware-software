import express from "express";
import {
  getAllQuizes,
  createQuiz,
  getSingleQuiz,
  deleteQuiz,
  updateQuiz,
  deleteQuestion,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/all-quiz", getAllQuizes);
router.get("/single-quiz/:id", getSingleQuiz);
router.post("/create-quiz", createQuiz);
router.delete("/delete-quiz/:id", deleteQuiz);
router.put("/update-quiz/:id", updateQuiz);
router.delete(
  "/delete-quiz/:quizId/delete-questions/:questionId",
  deleteQuestion
);

export default router;
