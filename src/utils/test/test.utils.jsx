import { rootReducer } from "../../store/root-reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createStore(rootReducer, preloadedState),
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions })}
}
