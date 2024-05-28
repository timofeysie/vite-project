import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "./Carousel";
import sampleData from "../../../public/sampleData.json";
import { Program } from "../../types/Program";
import { BrowserRouter } from "react-router-dom";

describe("Carousel Component", () => {
  const programs: Program[] = sampleData;

  it("renders correctly", () => {
    const { container } = render(<Carousel programs={programs} />, {
      wrapper: BrowserRouter,
    });
    expect(container).toBeTruthy();
  });

});