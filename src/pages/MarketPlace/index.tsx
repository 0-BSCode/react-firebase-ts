import Side from "@src/components/SideBar";
import SearchBar from "@src/components/SearchBar";
import ProductCard from "@src/components/ProductCard";
import { Box, Button } from "@mui/material";

const Marketplace = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Side style={{ flex: "0 0 200px" }} />
      <div style={{ flex: 1, padding: "20px" }}>
        <SearchBar />
        <Button variant="contained" sx={{ position: "absolute", top: 16, right: 16 }}>
          View Cart
        </Button>
        <Box display="flex" gap={4} padding={3}>
          <ProductCard prodName={"Product 1"} desc={"This is a product"} price={100} />
          <ProductCard prodName={"Product 1"} desc={"This is a product"} price={100} />
          <ProductCard prodName={"Product 1"} desc={"This is a product"} price={100} />
          <ProductCard prodName={"Product 1"} desc={"This is a product"} price={100} />
        </Box>
      </div>
    </div>
  );
};

export default Marketplace;
