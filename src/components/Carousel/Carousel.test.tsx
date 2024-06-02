import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Carousel from "./Carousel";
import sampleData from "../../../public/sampleData.json";
import { Program } from "../../types/Program";
import {
  BrowserRouter,
  useLocation,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";

afterEach(cleanup);

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

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
    expect(carouselImages.length).toBe(7);
  });

  it("updates selected index on right arrow key press", () => {
    const { getAllByAltText, getByTestId } = render(
      <Carousel programs={programs} />,
      {
        wrapper: BrowserRouter,
      }
    );
    const carouselContainer = getByTestId("carousel-container");
    const carouselImages = getAllByAltText("Dr. Death");
    expect(carouselImages[0].getAttribute("alt")).toBe("Dr. Death");
    expect(carouselImages[0].getAttribute("center")).toBe("true");
    fireEvent.keyDown(carouselContainer, { key: "ArrowRight" });
    const updatedCarouselImages = getAllByAltText("This Way Up");
    expect(updatedCarouselImages[0].getAttribute("alt")).toBe("This Way Up");
    expect(updatedCarouselImages[0].getAttribute("center")).toBe("true");
  });

  it("updates selected index on left arrow key press", () => {
    const { getAllByAltText, getByTestId } = render(
      <Carousel programs={programs} />,
      {
        wrapper: BrowserRouter,
      }
    );
    const carouselContainer = getByTestId("carousel-container");
    fireEvent.keyDown(carouselContainer, { key: "ArrowLeft" });
    const updatedCarouselImages = getAllByAltText("Persepolis");
    expect(updatedCarouselImages[0].getAttribute("alt")).toBe("Persepolis");
    expect(updatedCarouselImages[0].getAttribute("center")).toBe("true");
  });

  it("navigates to detail page on enter key press", () => {
    const { container, getAllByAltText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Carousel programs={programs} />} />
          <Route path="/details/:id" element={<div>Detail Page</div>} />
          <Route path="*" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const carouselContainer = container.querySelector(
      '[data-testid="carousel-container"]'
    );
    const carouselImages = getAllByAltText("Dr. Death");
    carouselImages[0].getAttribute("key");
    const defaultId = carouselImages[0].getAttribute("id");

    if (carouselContainer) {
      fireEvent.keyDown(carouselContainer, { key: "Enter" });
      const locationDisplay = container.querySelector(
        '[data-testid="location-display"]'
      );
      expect(locationDisplay?.textContent).toBe(`/program/${defaultId}`);
    }
  });
});
