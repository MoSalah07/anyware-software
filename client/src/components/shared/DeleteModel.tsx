import { memo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IProps {
  open: boolean;
  handleClose: () => void;
  onDelete: (id: string) => void;
  defaultValue: {
    _id: string;
    content: string;
    postedby: string;
  };
}

const DeleteModel = memo(function DeleteModel({
  handleClose,
  open,
  onDelete,
  defaultValue,
}: IProps) {
  const handleDelete = useCallback(() => {
    onDelete(defaultValue._id);
    handleClose();
  }, [onDelete, defaultValue._id, handleClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this announcement?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Posted By:</strong> {defaultValue.postedby}
        </DialogContentText>
        <DialogContentText sx={{ mt: 1 }}>
          <strong>Content:</strong> {defaultValue.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleDelete}
          autoFocus
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DeleteModel;
