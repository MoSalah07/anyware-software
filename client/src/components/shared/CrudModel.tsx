import { useEffect, memo, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface FormValues {
  content: string;
  postedby: string;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  handlingSubmit: (data: FormValues) => void;
  defaultValues?: FormValues;
}

const CrudModel = memo(function CrudModel({
  open,
  handleClose,
  title,
  handlingSubmit,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => {
      reset(defaultValues || { content: "", postedby: "" });
    }, 0);
    return () => clearTimeout(timeout);
  }, [open, defaultValues, reset]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        handlingSubmit(data);
        reset();
        handleClose();
      } catch (err) {
        console.error(err);
      }
    },
    [handlingSubmit, handleClose, reset]
  );

  return (
    <BootstrapDialog open={open} onClose={handleClose} disableAutoFocus>
      <DialogTitle sx={{ m: 0, p: 2 }} color="secondary">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            color="secondary"
            fullWidth
            margin="normal"
            label="Content"
            {...register("content", { required: "Content is required" })}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <TextField
            fullWidth
            color="secondary"
            margin="normal"
            label="Posted By"
            {...register("postedby", { required: "Posted by is required" })}
            error={!!errors.postedby}
            helperText={errors.postedby?.message}
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" gap={2}>
            <Button color="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="secondary" type="submit">
              Save changes
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
});

export default CrudModel;
