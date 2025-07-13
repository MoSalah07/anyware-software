import { Box } from "@mui/material";
import { useState } from "react";
import QuizFormModal, {
  type QuizForm,
} from "../components/ui/quiz/QuizFormModal";
import HeadingTable from "../components/shared/HeadingTable";
import QuizTable from "../components/ui/quiz/QuizTable";
import {
  useGetQuizzesQuery,
  useDeleteQuestionMutation,
  useCreateQuizMutation,
  // useUpdateQuizMutation,
} from "../store/services/quiz.api.slice";
import type { IQuestion } from "../interfaces";

export default function Quiz() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: quizzes } = useGetQuizzesQuery({ page: 1 });
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [createQuiz] = useCreateQuizMutation();
  // const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation();

  const allQuestions: IQuestion[] =
    quizzes?.data?.quizzes.flatMap((quiz) =>
      quiz.questions.map((q) => ({
        ...q,
        quizId: quiz._id,
      }))
    ) || [];

  const handleSubmitQuiz = async (quizData: QuizForm) => {
    try {
      await createQuiz(quizData).unwrap();
      console.log("✅ Quiz Created Successfully");
      setOpenModal(false);
    } catch (error) {
      console.error("❌ Failed to create quiz", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const question = allQuestions.find((q) => q._id === questionId);
    if (!question || !question.quizId) return;

    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا السؤال؟");
    if (!confirmed) return;

    try {
      await deleteQuestion({ quizId: question.quizId, questionId }).unwrap();
      console.log("✅ تم حذف السؤال بنجاح");
    } catch (err) {
      console.error("❌ فشل في حذف السؤال", err);
    }
  };

  return (
    <Box component="section" p={2}>
      <HeadingTable onclick={() => setOpenModal(true)} title={"Quiz"} />

      <QuizFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitQuiz}
      />

      <QuizTable
        questions={allQuestions}
        onEdit={(id) => console.log("Edit question", id)}
        onDelete={handleDeleteQuestion}
      />
    </Box>
  );
}
