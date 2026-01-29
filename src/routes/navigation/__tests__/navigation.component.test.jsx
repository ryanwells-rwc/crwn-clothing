import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithProviders } from "../../../utils/test/test.utils";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

import Navigation from "../navigation.component";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../../store/user/user.action";

describe("Navigation tests", () => {
  test("it should render a sign in link and not a sign out link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { user: { currentUser: null } },
    });
    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).not.toBeInTheDocument();
  });

  test("it should render Sign Out and not Sign In link if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { user: { currentUser: {} } },
    });
    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).not.toBeInTheDocument();
  });

  test("it should not render a cart dropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { cart: { isCartOpen: false, cartItems: [] } },
    });

    const dropdownTextElement = screen.queryByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeNull();
  });

  test("it should render a cart dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { cart: { isCartOpen: true, cartItems: [] } },
    });

    const dropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });

  test("it should dispatch signOutStart action when sign out button is clicked", async () => {
    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    renderWithProviders(<Navigation />, {
      preloadedState: { user: { currentUser: {} } },
    });

    const signOutButtonElement = screen.getByText(/sign out/i);
    expect(signOutButtonElement).toBeInTheDocument();
    await fireEvent.click(signOutButtonElement);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
    mockDispatch.mockClear();
  })
});
