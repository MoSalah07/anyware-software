import { Box, Skeleton, Stack } from "@mui/material";

export default function AnnouncementSkeletonCard() {
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
          flexBasis: { xs: "100%", md: "25%" },
          borderRight: { xs: "none", md: "2px solid #397B94" },
          width: "100%",
          pb: { xs: 2, md: 0 },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "1px",
            backgroundColor: "#397B94",
            display: { xs: "block", md: "none" },
          },
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Stack spacing={0.5}>
          <Skeleton width={80} height={14} />
          <Skeleton width={60} height={12} />
        </Stack>
      </Box>

      <Box sx={{ flexBasis: { xs: "100%", md: "75%" } }}>
        <Skeleton height={20} width="90%" />
        <Skeleton height={20} width="80%" />
      </Box>
    </Stack>
  );
}
