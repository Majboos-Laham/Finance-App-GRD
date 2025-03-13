import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  transition: "all 0.2s ease-in-out",
}));

export default DashboardBox;