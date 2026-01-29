import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("Button tests", () => {
  test("should render base button when nothing is passed", () => {
    render(<Button>Test</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: rgb(0,0,0)");
  });

  test("should render google button when buttonType google is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: rgb(67,135,244)");
  });

  test("should render inverted button when buttonType inverted is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: rgb(255,255,255)");
  });

  test("should render disabled button if isLoading is true", () => {
    render(<Button isLoading={true}>Test</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
