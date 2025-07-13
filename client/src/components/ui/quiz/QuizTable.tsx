import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Typography,
  List,
  ListItem,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IQuestion } from "../../../interfaces";

type Props = {
  questions: IQuestion[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function QuizQuestionsTable({ questions, onEdit, onDelete }: Props) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Questions and Answers
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Correct Answer</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q, index) => (
            <TableRow key={index}>
              <TableCell>{q.question}</TableCell>
              <TableCell>
                <List dense>
                  {q.options.map((opt, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      {opt}
                    </ListItem>
                  ))}
                </List>
              </TableCell>
              <TableCell>{q.correctAnswer}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit?.(q?._id as string)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => onDelete?.(q?._id as string)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuizQuestionsTable;
