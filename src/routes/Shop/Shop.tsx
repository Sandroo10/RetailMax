import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../Categories-preview/Categories-preview";
import Category from "../Category/Category";

export const Shop = () => {
  return (
    <div className="">
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    </div>
  );
};

export default Shop;
