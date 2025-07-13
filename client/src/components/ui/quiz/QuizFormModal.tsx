import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const quizSchema = z.object({
  title: z.string().min(3, "Title is required"),
  question: z.object({
    question: z.string().min(3, "Question text is required"),
    correctAnswer: z.string().min(1, "Correct answer is required"),
    options: z
      .array(z.string().min(1, "Option cannot be empty"))
      .min(3, "At least 3 options are required")
      .max(4, "No more than 4 options allowed"),
  }),
});

export type QuizForm = z.infer<typeof quizSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (quiz: QuizForm) => void;
  initialData?: QuizForm;
};

const defaultValues: QuizForm = {
  title: "",
  question: {
    question: "",
    correctAnswer: "",
    options: ["", "", ""],
  },
};

export default function QuizFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    reset(initialData || defaultValues);
  }, [initialData, open, reset]);

  const onFormSubmit = (data: QuizForm) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? "Edit Quiz" : "Create Quiz"}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent dividers>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Question Text"
            fullWidth
            margin="dense"
            {...register("question.question")}
            error={!!errors.question?.question}
            helperText={errors.question?.question?.message}
          />

          <TextField
            label="Correct Answer"
            fullWidth
            margin="dense"
            {...register("question.correctAnswer")}
            error={!!errors.question?.correctAnswer}
            helperText={errors.question?.correctAnswer?.message}
          />

          <Controller
            control={control}
            name="question.options"
            render={({ field }) => (
              <>
                {field.value.map((opt, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <TextField
                      fullWidth
                      label={`Option ${index + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...field.value];
                        updated[index] = e.target.value;
                        field.onChange(updated);
                      }}
                      margin="dense"
                      error={!!errors.question?.options?.[index]}
                      helperText={errors.question?.options?.[index]?.message}
                    />
                    {field.value.length > 3 && (
                      <IconButton
                        color="error"
                        onClick={() => {
                          const updated = [...field.value];
                          updated.splice(index, 1);
                          field.onChange(updated);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                {field.value.length < 4 && (
                  <Box textAlign="right" mt={1}>
                    <Button
                      onClick={() => field.onChange([...field.value, ""])}
                    >
                      ➕ Add Option
                    </Button>
                  </Box>
                )}
              </>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Quiz
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
