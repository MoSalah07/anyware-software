import { Avatar, Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function AnnouncementCard() {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexBasis: { xs: "100%", md: "25%" },
          borderRight: { xs: "none", md: "2px solid #397B94" },
          borderBottom: { xs: "2px solid #397B94", md: "none" },
          width: "100%",
          pb: { xs: 2, md: 0 },
        }}
      >
        <Avatar alt="Remy Sharp" />
        <Stack>
          <Typography
            variant="body2"
            fontWeight={"bold"}
            color={grey[600]}
            fontSize={{ xs: ".8rem", md: "1rem" }}
          >
            Remy Sharp
          </Typography>
          <Typography
            variant="body2"
            fontWeight={"bold"}
            fontSize={{ xs: ".6rem", md: ".8rem" }}
            color={grey[500]}
          >
            Remy Sharp
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ flexBasis: { xs: "100%", md: "75%" } }}>
        <Typography
          variant="body1"
          component={"p"}
          color={grey[500]}
          fontSize={{ xs: ".75rem", md: "1rem" }}
          fontWeight={500}
          lineHeight={1.5}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel nisi
          expedita placeat consectetur, quae nobis, suscipit numquam assumenda
          similique mollitia quas ut provident aperiam iste quaerat, repudiandae
          labore incidunt id. Sint itaque architecto sequi,
        </Typography>
      </Box>
    </Stack>
  );
}
