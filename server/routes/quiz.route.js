import express from "express";
import {
  getAllQuizes,
  createQuiz,
  getSingleQuiz,
  deleteQuiz,
  updateQuizو,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/all-quiz", getAllQuizes);
router.get("/single-quiz/:id", getSingleQuiz);
router.post("/create-quiz", createQuiz);
router.delete("/delete-quiz/:id", deleteQuiz);
router.put("/update-quiz/:id", updateQuiz);

export default router;
