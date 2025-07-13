import { Avatar, Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";

import type { IAnnouncement, IQuiz } from "../../interfaces/index";

interface IProps {
  type: "announcement" | "quiz";
  data: IAnnouncement | IQuiz;
}

export default function InfoCard({ type, data }: IProps) {
  const createdAt = dayjs(data.createdAt).format("DD MMM YYYY, hh:mm A");

  if (type === "quiz") {
    const quiz = data as IQuiz;

    return (
      <Box
        py={2}
        borderBottom={"2px solid #ccc"}
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Typography
          variant="body2"
          fontWeight="bold"
          color={grey[600]}
          fontSize={{ xs: ".8rem", md: "1rem" }}
        >
          {createdAt}
        </Typography>

        <Typography
          variant="body1"
          fontWeight="bold"
          fontSize={{ xs: ".85rem", md: "1.1rem" }}
          color={grey[800]}
        >
          Question: {quiz.question?.question}
        </Typography>

        <Typography
          variant="body2"
          fontSize={{ xs: ".75rem", md: "1rem" }}
          color="success.main"
        >
          Answer: {quiz.question?.correctAnswer}
        </Typography>
      </Box>
    );
  }

  // Default rendering for announcement
  const announcement = data as IAnnouncement;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent={{ xs: "flex-start", md: "space-between" }}
      gap={2}
      py={1}
      borderBottom={"2px solid #ccc"}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexBasis: { xs: "100%", md: "60%", lg: "40%" },
          borderRight: { xs: "none", md: "2px solid #397B94" },
          width: "100%",
          pb: { xs: 2, md: 0 },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "1px",
            backgroundColor: "#c8c8c8",
            display: { xs: "block", md: "none" },
          },
        }}
      >
        <Avatar alt="User" />
        <Stack>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={grey[600]}
            fontSize={{ xs: ".8rem", md: "1rem" }}
            textTransform="capitalize"
          >
            {announcement.postedby}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            fontSize={{ xs: ".6rem", md: ".8rem" }}
            color={grey[500]}
          >
            {createdAt}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ flexBasis: { xs: "100%", md: "75%" } }}>
        <Typography
          variant="body1"
          component="p"
          color={grey[500]}
          fontSize={{ xs: ".75rem", md: "1rem" }}
          fontWeight={{ xs: "bold", md: "normal" }}
          lineHeight={1.5}
        >
          {announcement.content}
        </Typography>
      </Box>
    </Stack>
  );
}
