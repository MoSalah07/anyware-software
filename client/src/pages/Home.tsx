import { Box, Button, Container, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{ bgcolor: teal[500], py: 10, color: "#fff", textAlign: "center" }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to MyApp
          </Typography>
          <Typography variant="h6" gutterBottom>
            Build modern apps with React and MUI
          </Typography>
          <Button variant="contained" color="secondary">
            Get Started
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Features
        </Typography>
      </Container>
    </Box>
  );
}
