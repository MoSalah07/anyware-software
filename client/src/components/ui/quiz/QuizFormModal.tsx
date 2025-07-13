import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const questionSchema = z.object({
  question: z.string().min(3, "Question is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(3, "At least 3 options are required"),
});

const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export type QuizForm = z.infer<typeof formSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (quiz: QuizForm) => void;
  initialData?: QuizForm;
};

const defaultQuestion = {
  question: "",
  correctAnswer: "",
  options: ["", "", ""],
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
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      questions: [defaultQuestion],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        description: "",
        questions: [defaultQuestion],
      });
    }
  }, [initialData, open, reset]);

  const onFormSubmit = (data: QuizForm) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? "Edit Quiz" : "Create New Quiz"}</DialogTitle>
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
            label="Description"
            fullWidth
            margin="dense"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {questionFields.map((question, qIndex) => (
            <Box
              key={question.id}
              mt={3}
              p={2}
              border="1px solid #ccc"
              borderRadius={2}
              position="relative"
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Question {qIndex + 1}
                </Typography>
                {questionFields.length > 1 && (
                  <Button
                    color="error"
                    size="small"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    Delete Question
                  </Button>
                )}
              </Box>

              <TextField
                label="Question Text"
                fullWidth
                margin="dense"
                {...register(`questions.${qIndex}.question` as const)}
                error={!!errors.questions?.[qIndex]?.question}
                helperText={errors.questions?.[qIndex]?.question?.message}
              />

              <TextField
                label="Correct Answer"
                fullWidth
                margin="dense"
                {...register(`questions.${qIndex}.correctAnswer` as const)}
                error={!!errors.questions?.[qIndex]?.correctAnswer}
                helperText={errors.questions?.[qIndex]?.correctAnswer?.message}
              />

              <Controller
                control={control}
                name={`questions.${qIndex}.options`}
                render={({ field }) => (
                  <>
                    {field.value.map((opt, optIndex) => (
                      <Box
                        key={optIndex}
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <TextField
                          fullWidth
                          label={`Option ${optIndex + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const updated = [...field.value];
                            updated[optIndex] = e.target.value;
                            field.onChange(updated);
                          }}
                          margin="dense"
                          error={
                            !!errors.questions?.[qIndex]?.options?.[optIndex]
                          }
                          helperText={
                            errors.questions?.[qIndex]?.options?.[optIndex]
                              ?.message
                          }
                        />
                        {field.value.length > 3 && (
                          <IconButton
                            color="error"
                            onClick={() => {
                              const updated = [...field.value];
                              updated.splice(optIndex, 1);
                              field.onChange(updated);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <Box textAlign="right" mt={1}>
                      <Button
                        onClick={() => field.onChange([...field.value, ""])}
                      >
                        ➕ Add Option
                      </Button>
                    </Box>
                  </>
                )}
              />
            </Box>
          ))}

          <Box textAlign="left" mt={2}>
            <Button onClick={() => appendQuestion(defaultQuestion)}>
              ➕ Add New Question
            </Button>
          </Box>
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
