import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ActionButtons({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: () => void;
  onDeleteClick: () => void;
}) {
  return (
    <>
      <IconButton
        aria-label="delete announcement"
        onClick={onDeleteClick}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        aria-label="edit announcement"
        onClick={onEditClick}
        color="primary"
      >
        <EditIcon />
      </IconButton>
    </>
  );
}
