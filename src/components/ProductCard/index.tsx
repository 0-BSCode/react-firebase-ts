import { TollOutlined } from "@mui/icons-material";
import { Box, Typography, List, ListItem, Button } from "@mui/material";

function ProductCard({ prodName, desc, price }) {
  return (
    <Box
      height={300}
      width="auto"
      display="flex"
      alignItems="flex-start"
      gap={2}
      padding={2}
      sx={{ border: "2px solid grey", bgcolor: "#eeeeee", position: "relative" }}
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
            <Typography variant="h5">{prodName}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">{desc}</Typography>
          </ListItem>
          <ListItem>
            <Box display="flex" alignItems="center" gap={1} ml={2}>
              <TollOutlined />
              <Typography variant="body1">{price}</Typography>
            </Box>
          </ListItem>
        </List>
      </Box>

      <Button variant="outlined" sx={{ position: "absolute", bottom: 16, right: 16 }}>
        Add Cart
      </Button>
    </Box>
  );
}

export default ProductCard;
