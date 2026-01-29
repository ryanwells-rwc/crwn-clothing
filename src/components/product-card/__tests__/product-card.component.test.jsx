import ProductCard from "../product-card.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { fireEvent, screen } from "@testing-library/react";

describe("Product Card tests", () => {
  test("it should add the product card item when product card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      price: 10.99,
      imageUrl: "test-image-url"
    };

    const {store} = renderWithProviders(<ProductCard product={mockProduct} />, {
      preloadedState: { cart: { cartItems: [] } },
    });

    const addToCartButtonElement = screen.getByText(/add to cart/i);
    await fireEvent.click(addToCartButtonElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});