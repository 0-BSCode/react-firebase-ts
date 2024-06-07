import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx" label="Search" variant="standard" sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default SearchBar;
