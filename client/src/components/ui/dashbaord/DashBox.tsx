import { Box, Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DashBox() {
  return (
    <Box
      component={"div"}
      sx={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
        backgroundColor: "white",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Grid container>
        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1rem",
                md: "2rem",
              },
              background: "linear-gradient(45deg, #00C9FF, #92FE9D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Time Quiz
          </Typography>

          <Typography
            variant="body1"
            component={"p"}
            my={2}
            fontWeight={"550"}
            fontSize={{ xs: ".75rem", md: ".95rem" }}
            sx={{ color: grey[500] }}
          >
            Here we are, Are you ready to fight? Don't worry, we prepared some
            tips to be ready for your quizs
          </Typography>

          <Button variant="contained" color="secondary" size="large">
            View exams tips
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
