import Side from "@src/components/SideBar";
import EventCard from "@src/components/EventCard";
import { Box, List, ListItem, Typography } from "@mui/material";

const Account = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Side style={{ flex: "0 0 200px" }} />
      <div style={{ flex: 1, padding: "20px" }}>
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
                  <Typography variant="h4">Victorienne Tiu</Typography>
                </ListItem>
                <Box display="flex" flexDirection="column" border="2px solid gray" width={200} padding={1}>
                  <Typography variant="p">100 Tokens</Typography>
                </Box>
              </List>
            </Box>
          </Box>

          <Typography variant="h4">Events Joined</Typography>
          {/* Container for EventCard components */}
          <Box width="100vw" display="flex" overflowX="scroll" flexWrap="nowrap" padding={1}>
            {/* Render EventCard components side by side */}
            <Box display="flex" gap={2}>
              <EventCard EventName="Event 1" desc="Description" loc="Cebu City" points="100 Points" />
              {/* Add more EventCard components as needed */}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Account;
