import { Box, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import PageHead from "../components/shared/PageHead";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHead title="404 - Page Not Found" description="Page Not Found" />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f9f9f9",
          p: 4,
        }}
      >
        <Box textAlign="center" maxWidth="500px">
          <ErrorOutlineIcon sx={{ fontSize: 80, color: "#d32f2f", mb: 2 }} />
          <Typography variant="h3" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            The page you are looking for doesn’t exist or has been moved.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
