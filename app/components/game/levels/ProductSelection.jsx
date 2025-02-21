import { motion } from "framer-motion";
import { useState } from "react";
import { products } from "../../../data/products";
import { Product } from "../../../types/game";

const ProductSelection = ({ onSelect }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  // ... остальной код остается тем же
};

export default ProductSelection;