import { Route, Routes } from "react-router";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import ProductPage from "../product-page/product-page.component";
import { useEffect } from "react";
import { fetchCategoriesStart } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
      <Route path=":category/:productId" element={<ProductPage />} />
    </Routes>
  );
};

export default Shop;
