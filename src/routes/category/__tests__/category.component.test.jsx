import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Category from "../category.component";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: () => ({ category: "mens" }),
  };
});

describe("Category tests", () => {
  test("it should render a spinner if isLoading is true", () => {
    renderWithProviders(<Category />, {
      preloadedState: { categories: { isLoading: true, categories: [] } },
    });
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("it should render no spinner if isLoading is false", () => {
    renderWithProviders(<Category />, {
      preloadedState: { categories: { isLoading: false, categories: [] } },
    });
    const spinnerElement = screen.queryByTestId("spinner");
    expect(spinnerElement).not.toBeInTheDocument();
  })

  test("it should render products if isLoading is false and there are products present", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: "mens",
              items: [
                { id: 1, name: "Product 1" },
                { id: 2, name: "Product 2" },
              ],
            },
          ],
        },
      },
    });

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();
  });
});
