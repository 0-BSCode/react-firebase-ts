import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Typography, List, ListItem, Button, Divider } from "@mui/material";
import EventCard from "@src/components/EventCard";

const OrgPage1 = () => {
  return (
    <Box
      width={600}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={2}
      padding={2}
      position="relative"
    >
      {/* Container for image and org details */}
      <Box display="flex" flexDirection="row" alignItems="flex-start" gap={2}>
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

        {/* Org details */}
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <List>
            <ListItem>
              <Typography variant="h4">Org 1</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">Desc</Typography>
            </ListItem>
            <ListItem>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnOutlined />
                <Typography variant="body1">Cebu City</Typography>
              </Box>
            </ListItem>
          </List>
        </Box>

        <Button variant="outlined">Join Organization</Button>
      </Box>

      <Divider variant="middle" />

      {/* Container for EventCard components */}
      <Box width="100vw" display="flex" overflowX="scroll" flexWrap="nowrap" padding={1}>
        {/* Render EventCard components side by side */}
        <Box display="flex" gap={2}>
          <EventCard EventName="Event 1" desc="Description" loc="Cebu City" points="100 Points" />
          <EventCard EventName="Event 2" desc="Description" loc="Cebu City" points="200 Points" />
          <EventCard EventName="Event 3" desc="Description" loc="Cebu City" points="300 Points" />
          {/* Add more EventCard components as needed */}
        </Box>
      </Box>
    </Box>
  );
};

export default OrgPage1;
