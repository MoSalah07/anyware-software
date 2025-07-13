import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IQuiz, IQuizResponse } from "../../interfaces";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

export const quizApiSlice = createApi({
  reducerPath: "quizApi",
  tagTypes: ["Quizzes"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query<IQuizResponse, { page: number }>({
      query: ({ page }) => `/api/quiz/all-quiz?limit=20&page=${page}`,
      providesTags: (result) =>
        result?.data?.quizzes?.length
          ? [
              ...result.data.quizzes.map((quiz) => ({
                type: "Quizzes" as const,
                id: quiz._id,
              })),
              { type: "Quizzes", id: "LIST" },
            ]
          : [{ type: "Quizzes", id: "LIST" }],
    }),

    getSingleQuiz: builder.query<IQuiz, string>({
      query: (id) => `/api/quiz/single-quiz/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Quizzes", id }],
    }),

    createQuiz: builder.mutation<IQuiz, Partial<IQuiz>>({
      query: (body) => ({
        url: "/api/quiz/create-quiz",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Quizzes", id: "LIST" }],
    }),

    updateQuiz: builder.mutation<IQuiz, { id: string; body: Partial<IQuiz> }>({
      query: ({ id, body }) => ({
        url: `/api/quiz/update-quiz/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Quizzes", id },
        { type: "Quizzes", id: "LIST" },
      ],
    }),

    deleteQuiz: builder.mutation<{ deleted: IQuiz }, string>({
      query: (id) => ({
        url: `/api/quiz/delete-quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Quizzes", id },
        { type: "Quizzes", id: "LIST" },
      ],
    }),

    deleteQuestion: builder.mutation<
      { message: string },
      { quizId: string; questionId: string }
    >({
      query: ({ quizId, questionId }) => ({
        url: `/api/quiz/delete-quiz/${quizId}/delete-questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { quizId }) => [
        { type: "Quizzes", id: quizId },
        { type: "Quizzes", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetSingleQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useDeleteQuestionMutation,
} = quizApiSlice;
