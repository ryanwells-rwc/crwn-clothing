import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../../components/button/button.component';
import {
  ProductPageContainer,
  ImageContainer,
  ProductInfoContainer,
  Name,
  Price,
} from './product-page.styles';

type ProductPageRouteParams = {
  category: string;
  productId: string;
};

const ProductPage = () => {
  const { category, productId } = useParams<keyof ProductPageRouteParams>() as ProductPageRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const products = categoriesMap[category];
  const product = products?.find((p) => p.id === Number(productId));

  const addProductToCart = () => {
    if (product) {
      dispatch(addItemToCart(cartItems, product));
    }
  };

  if (!product) return null;

  const { name, imageUrl, price } = product;

  return (
    <ProductPageContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <ProductInfoContainer>
        <Name>{name}</Name>
        <Price>${price}</Price>
        <Button onClick={addProductToCart}>ADD TO CART</Button>
      </ProductInfoContainer>
    </ProductPageContainer>
  );
};

export default ProductPage;
