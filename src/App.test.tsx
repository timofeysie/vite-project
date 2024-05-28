import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { store } from "./store/store";
import App from "./App";

describe("App", () => {
  it("full app rendering/navigating", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Home/i)).toBeTruthy();
  });
});
