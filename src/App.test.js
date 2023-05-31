import { render, fireEvent } from "@testing-library/react";
import App from "./App";
// const { render, screen } = require("@testing-library/react");
// const chai = require("chai");
// const { expect } = chai;
// const App = require("./App");

describe("Login", () => {
  it("renders learn react link", () => {
    const component = render(<App />);
    const divElement = component.getById("miDiv");
    expect(divElement).toBeInTheDocument();
  });
});
