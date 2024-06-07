import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Typography, List, ListItem, Button, Divider } from "@mui/material";
import EventCard from "../EventCard";

function OrgPage({ orgName, desc, loc }) {
  return (
    <Box
      height={200}
      width={600}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={2}
      padding={2}
      position="relative"
    >
      {/* Blue box as placeholder for image */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={100}
        width={100}
        padding={10}
        sx={{ bgcolor: "#4254f5" }}
      />

      <Box display="flex" flexDirection="column" flexGrow={1}>
        <List>
          <ListItem>
            <Typography variant="h4">{orgName}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">{desc}</Typography>
          </ListItem>
          <ListItem>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnOutlined />
              <Typography variant="body1">{loc}</Typography>
            </Box>
          </ListItem>
        </List>
      </Box>

      <Divider variant="middle" />

      {/* Container for EventCard components */}
      <Box width="100%" display="flex" overflowX="auto">
        {/* Render EventCard components side by side */}
        <Box display="flex" gap={2}>
          <EventCard EventName="Event 1" desc="Description" loc="Cebu City" points="100 Points" />
          <EventCard EventName="Event 2" desc="Description" loc="Cebu City" points="100 Points" />
          <EventCard EventName="Event 3" desc="Description" loc="Cebu City" points="100 Points" />
          {/* Add more EventCard components as needed */}
        </Box>
      </Box>

      <Button variant="outlined" sx={{ position: "absolute", bottom: 16, right: 16 }}>
        Join Organization
      </Button>
    </Box>
  );
}

export default OrgPage;
