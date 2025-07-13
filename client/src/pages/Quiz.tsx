import { Box } from "@mui/material";
import { useState, useCallback } from "react";
import QuizFormModal, {
  type QuizForm,
} from "../components/ui/quiz/QuizFormModal";
import HeadingTable from "../components/shared/HeadingTable";
import QuizQuestionsTable from "../components/ui/quiz/QuizQuestionsTable";
import {
  useGetQuizzesQuery,
  useDeleteQuizMutation,
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "../store/services/quiz.api.slice";
import type { IQuiz } from "../interfaces";
import PageHead from "../components/shared/PageHead";

type Quiz = QuizForm & { id: string };

export default function Quiz() {
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useGetQuizzesQuery({ page: 1 });

  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const quizzesArray: Quiz[] =
    data?.data?.quizzes
      ?.filter((quiz: IQuiz) => !!quiz._id)
      .map((quiz: IQuiz) => ({
        id: quiz._id!,
        title: quiz.title,
        question: {
          question: quiz.question.question,
          options: quiz.question.options,
          correctAnswer: quiz.question.correctAnswer,
        },
      })) ?? [];

  const handleCreateQuiz = useCallback(
    async (quizData: QuizForm) => {
      try {
        await createQuiz(quizData).unwrap();
        setOpenModal(false);
        console.log(" Quiz Created Successfully");
      } catch (error) {
        console.error(" Failed to create quiz", error);
      }
    },
    [createQuiz]
  );

  const handleEditQuiz = useCallback(
    async (quizData: Quiz) => {
      try {
        const { id, ...body } = quizData;
        await updateQuiz({ id, body }).unwrap();
        console.log("Quiz Updated Successfully");
      } catch (error) {
        console.error(" Failed to update quiz", error);
      }
    },
    [updateQuiz]
  );

  const handleDeleteQuiz = useCallback(
    async (id: string) => {
      try {
        await deleteQuiz(id).unwrap();
        console.log(" Quiz Deleted Successfully");
      } catch (error) {
        console.error(" Failed to delete quiz", error);
      }
    },
    [deleteQuiz]
  );

  return (
    <>
      <PageHead title="Quiz" description="Quiz" />
      <Box component="section" p={2}>
        <HeadingTable onclick={() => setOpenModal(true)} title="Quiz" />

        <QuizFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateQuiz}
        />

        <QuizQuestionsTable
          data={quizzesArray}
          isLoading={isLoading}
          onAdd={(quiz) => console.log("Add question", quiz)}
          onEdit={handleEditQuiz}
          onDelete={handleDeleteQuiz}
        />
      </Box>
    </>
  );
}
