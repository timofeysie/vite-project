import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Program } from "../../types/Program";
import { useNavigate } from "react-router-dom";

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  height: 70vh;
  &[data-testid="carousel-container"]
`;

const CarouselItemContainer = styled.div<{ center: string }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  max-width: ${(props) => (props.center ? "100%" : "80%")};
  opacity: ${(props) => (props.center ? "1" : "0.7")};

  @media (max-width: 1080px) {
    max-width: ${(props) => (props.center ? "100%" : "60%")};
  }

  @media (max-width: 720px) {
    max-width: ${(props) => (props.center ? "100%" : "50%")};
  }
`;

const CarouselImage = styled.img<{ center: string }>`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 4px;
  padding: 4px;
  border: ${(props) => (props.center === "true" ? "2px solid blue" : "none")};
`;

export interface CarouselProps {
  programs: Program[];
}

const Carousel: React.FC<CarouselProps> = ({ programs }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [arrowButtonPressed, setArrowButtonPressed] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % programs.length);
        setArrowButtonPressed("ArrowRight");
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex - 1 + programs.length) % programs.length;
          setArrowButtonPressed("ArrowLeft");
          return newIndex;
        });
      } else if (event.key === "Enter") {
        setArrowButtonPressed("");
        navigate(`/program/${programs[selectedIndex + 2].id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programs, selectedIndex]);

  const visibleItems = programs?.reduce((accumulator, program, index) => {
    const relativeIndex =
      (index - selectedIndex + programs.length) % programs.length;

    if (relativeIndex >= -2 && relativeIndex <= 5) {
      if (arrowButtonPressed === "ArrowLeft") {
        // TODO: This is the problem with the left arrow key
        // We need to add the last item in the programs list to the
        // beginning on the visible items.
        accumulator.push(program);
      } else {
        accumulator.push(program);
      }
    }
    return accumulator;
  }, [] as Program[]);

  return (
    <CarouselContainer data-testid="carousel-container">
      {visibleItems?.map((program, index) => (
        <CarouselItemContainer
          key={program.id}
          center={index === 2 ? "true" : "false"}
          onClick={() => navigate(`/program/${program.id}`)}
        >
          <CarouselImage
            src={program.image}
            alt={program.title}
            center={index === 2 ? "true" : "false"}
          />
        </CarouselItemContainer>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;
