import { useState } from "react";
import { Product } from "../types";

const paginate = (products: Product[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductList = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = Math.ceil(products?.length / productsPerPage);

  return { setCurrentPage, currentProductList, pageNumbers, currentPage };
};

export default paginate;
