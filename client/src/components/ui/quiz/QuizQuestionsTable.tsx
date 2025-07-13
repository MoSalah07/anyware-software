import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import QuizFormModal from "./QuizFormModal";
import type { QuizForm } from "./QuizFormModal";
import SkeletonTable from "../../shared/SkeletonTable";
import ActionButtons from "../../shared/ActionButtons";

type Quiz = QuizForm & { id: string };

type Props = {
  data: Quiz[] | null;
  isLoading?: boolean;
  onEdit: (quiz: QuizForm & { id: string }) => void;
  onDelete: (id: string) => void;
  onAdd: (quiz: QuizForm) => void;
};

export default function QuizQuestionsTable({
  data,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Pagination handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Open modal for editing quiz
  const handleEditClick = (quiz: Quiz) => {
    setEditQuiz(quiz);
    setModalOpen(true);
  };

  // Submit handler for modal (edit or add)
  const handleSubmit = (quizForm: QuizForm) => {
    if (editQuiz) {
      onEdit({ ...quizForm, id: editQuiz.id });
    } else {
      onAdd(quizForm);
    }
  };

  // Delete confirmation handlers
  const openDeleteConfirm = (id: string) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setDeleteId(null);
  };
  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    closeDeleteConfirm();
  };

  const paginatedData = data
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Options</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <SkeletonTable
                rows={rowsPerPage}
                columns={5}
                withActions={true}
                cellHeight={40}
              />
            ) : (
              data &&
              paginatedData.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.question.question}</TableCell>
                  <TableCell>{quiz.question.correctAnswer}</TableCell>
                  <TableCell>{quiz.question.options.join(", ")}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <ActionButtons
                      onDeleteClick={() => openDeleteConfirm(quiz.id)}
                      onEditClick={() => handleEditClick(quiz)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          {data && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[rowsPerPage]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

      {/* Quiz add/edit modal */}
      <QuizFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editQuiz || undefined}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={deleteConfirmOpen} onClose={closeDeleteConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this quiz?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
