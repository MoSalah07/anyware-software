import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IAnnouncement } from "../../interfaces";

interface IProductResponse {
  data: {
    announcements: IAnnouncement[];
    currentPage: number;
    total: number;
    totalPages: number;
  };
  message: string;
  success: boolean;
}

export const announcementApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Announcements"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAnnouncements: builder.query<
      IProductResponse,
      { page: number; limit?: number }
    >({
      query: (arg): { url: string } => {
        const { page } = arg;
        const limit = arg.limit || 20;
        return {
          url: `/api/announcements/all-announcement?limit=${limit}&page=${page}`,
        };
      },
      // Mutations in Query
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.announcements.map((item: IAnnouncement) => ({
                type: "Announcements" as const,
                id: item._id,
              })),
              { type: "Announcements" as const, id: "LIST" },
            ]
          : [{ type: "Announcements" as const, id: "LIST" }],
    }),
    // Create => Method POST
    createAnnouncement: builder.mutation<
      IAnnouncement,
      { content: string; postedby: string }
    >({
      query: (body) => ({
        url: "/api/announcements/create-announcement",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Announcements", id: "LIST" }],
    }),
    // Delete => Method Delete
    deleteAnnouncement: builder.mutation<IAnnouncement[], string>({
      query: (id: string) => {
        return {
          url: `/api/announcements/delete-announcement/${id}`,
          method: "DELETE",
        };
      },
      // Mutations
      invalidatesTags: [{ type: "Announcements", id: "LIST" }],
    }),
    //  Update => Method PUT
    updateAnnouncement: builder.mutation<
      IAnnouncement,
      { id: string; body: { content: string; postedby: string } }
    >({
      query: ({ id, body }) => {
        return {
          url: `/api/announcements/update-announcement/${id}`,
          method: "PUT",
          body,
        };
      },
      onQueryStarted: async (
        { id, ...patch },
        { dispatch, queryFulfilled }
      ): Promise<void> => {
        const patchResult = dispatch(
          announcementApiSlice.util.updateQueryData(
            "getAnnouncements",
            { page: Number(id) },
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Announcements", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useUpdateAnnouncementMutation,
} = announcementApiSlice;
