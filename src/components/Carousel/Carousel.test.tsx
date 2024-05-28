import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Carousel from "./Carousel";
import sampleData from "../../../public/sampleData.json";
import { Program } from "../../types/Program";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

describe("Carousel Component", () => {
  const programs: Program[] = sampleData;

  it("renders correctly", () => {
    const { container } = render(<Carousel programs={programs} />, {
      wrapper: BrowserRouter,
    });
    expect(container).toBeTruthy();
  });

  it("contains the right number of img tags", () => {
    const { container } = render(<Carousel programs={programs} />, {
      wrapper: BrowserRouter,
    });

    const carouselImages = container.querySelectorAll("img");

    expect(carouselImages.length).toBe(5);
  });

  it("updates selected index on arrow key press", () => {
    const { getAllByAltText, getByTestId } = render(
      <Carousel programs={programs} />,
      {
        wrapper: BrowserRouter,
      }
    );

    const carouselContainer = getByTestId("carousel-container");
    const carouselImages = getAllByAltText("Power Book III: Raising Kanan");

    // Verify the currently selected image
    expect(carouselImages[0].getAttribute("alt")).toBe(
      "Power Book III: Raising Kanan"
    );
    
    expect(carouselImages[0].getAttribute("center")).toBe("true");

    // fire the right arrow key press
    fireEvent.keyDown(carouselContainer, { key: "ArrowRight" });
    fireEvent.keyDown(carouselContainer, { key: "ArrowRight" });
    fireEvent.keyDown(carouselContainer, { key: "ArrowRight" });

    // Get the updated carousel images after the arrow key press
    const updatedCarouselImages = getAllByAltText("First Wives Club");

    // Verify the next focused image
    expect(updatedCarouselImages[0].getAttribute("alt")).toBe(
      "First Wives Club"
    );
    expect(updatedCarouselImages[0].getAttribute("center")).toBe("true");
  });
});
