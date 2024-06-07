import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate, Link } from "react-router-dom";
import { AccountBoxRounded, DashboardCustomizeRounded, StoreRounded } from "@mui/icons-material";

const Side = () => {
  const navigate = useNavigate();

  const handleMarketplaceClick = () => {
    navigate("/marketplace");
  };

  const handleDashboard = () => {
    navigate("/");
  };

  const handleAcc = () => {
    navigate("/Account");
  };

  return (
    <Box
      width={300}
      sx={{
        height: "100vh",
        paddingTop: "2%",
        paddingLeft: "1%",
        bgcolor: "#eeeeee"
      }}
    >
      <List>
        <Box display="flex" alignItems="center" padding={2}>
          <Box
            display="flex"
            width={50}
            height={50}
            sx={{
              bgcolor: "#4254f5"
            }}
          />
          <Typography variant="h5" padding={2}>
            Logo
          </Typography>
        </Box>

        <ListItem button onClick={handleAcc}>
          <AccountBoxRounded />
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button onClick={handleDashboard}>
          <DashboardCustomizeRounded />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={handleMarketplaceClick}>
          <StoreRounded />
          <ListItemText primary="Marketplace" />
        </ListItem>
        <Divider variant="middle" component="li" />
        <Divider variant="middle" component="li" />
        <Typography variant="h6" sx={{ padding: "5%" }}>
          Organizations
        </Typography>
        <ListItem button component={Link} to="/org/1">
          <ListItemText primary="Org 1" />
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText primary="Org 2" />
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText primary="Org 3" />
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText primary="Org 4" />
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText primary="Org 5" />
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText primary="Org 6" />
        </ListItem>
        <Divider variant="middle" component="li" />
      </List>
    </Box>
  );
};

export default Side;
