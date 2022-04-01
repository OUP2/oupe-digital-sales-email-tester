import { screen, render } from "@testing-library/react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { Navbar } from "./navbar/Navbar";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

jest.mock("./navbar/Navbar");
jest.mock("./pages/HomePage");
jest.mock("./pages/NotFoundPage");

let container;
container = document.createElement("div");
document.body.appendChild(container);
const root = ReactDOMClient.createRoot(container);

afterAll(() => {
  root.unmount();
  document.body.innerHTML = "";
});

afterAll(() => {
  jest.unmock("./navbar/Navbar");
  jest.unmock("./pages/HomePage");
  jest.unmock("./pages/NotFoundPage");
});

describe("App Tests", () => {
  it("should render the Navbar and the home page when no route is provided", () => {
    HomePage.mockImplementation(() => <div>HomePageMock</div>);
    Navbar.mockImplementation(() => <div>NavbarMock</div>);
    NotFoundPage.mockImplementation(() => <div>NotFoundPageMock</div>);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    render(<App />);

    expect(screen.getByText("NavbarMock")).toBeInTheDocument();
    expect(screen.getByText("HomePageMock")).toBeInTheDocument();
    expect(screen.queryByText("NotFoundPageMock")).not.toBeInTheDocument();
  });

  // TODO: add test for empty and wrong categories when they are implemented through the backend
});
