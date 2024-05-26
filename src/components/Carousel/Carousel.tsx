import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CarouselItem from "./CarouselItem";
import { Program } from "../../types/Program";

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

interface CarouselProps {
  programs: Program[];
}

const Carousel: React.FC<CarouselProps> = ({ programs }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % programs.length);
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex(
          (prevIndex) => (prevIndex - 1 + programs.length) % programs.length
        );
      } else if (event.key === "Enter") {
        // Handle enter key press (e.g., navigate to program page)
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [programs.length]);

  const visibleItems = programs.slice(selectedIndex, selectedIndex + 6);

  return (
    <CarouselContainer>
      {visibleItems.map((program) => (
        <CarouselItem key={program.id} program={program} />
      ))}
    </CarouselContainer>
  );
};

export default Carousel;
