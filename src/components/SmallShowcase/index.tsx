import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Program } from "../../types/Program";
import { useNavigate } from "react-router-dom";

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  height: 70vh;
`;

const CarouselItemContainer = styled.div<{ isCenter: boolean }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  max-width: ${(props) => (props.isCenter ? "100%" : "80%")};
  opacity: ${(props) => (props.isCenter ? "1" : "0.7")};
  border: ${(props) => (props.isCenter ? "2px solid blue" : "none")};

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    opacity: 1;
  }

  @media (max-width: 1366px) {
    max-width: ${(props) => (props.isCenter ? "100%" : "70%")};
  }

  @media (max-width: 1024px) {
    max-width: ${(props) => (props.isCenter ? "100%" : "60%")};
  }

  @media (max-width: 720px) {
    max-width: ${(props) => (props.isCenter ? "100%" : "50%")};
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 4px;
`;

interface CarouselProps {
  programs: Program[];
}

const Carousel: React.FC<CarouselProps> = ({ programs }) => {
  console.log('programs', programs)
  const navigate = useNavigate();
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
  }, [programs]);

  const visibleItems = programs?.slice(selectedIndex - 2, selectedIndex + 3);

  return (
    <CarouselContainer>
      {visibleItems &&
        visibleItems.map((program, index) => (
          <CarouselItemContainer
            key={program.id}
            isCenter={index === 2}
            onClick={() => navigate(`/program/${program.id}`)}
          >
            <CarouselImage src={program.image} alt={program.title} />
          </CarouselItemContainer>
        ))}
    </CarouselContainer>
  );
};

export default Carousel;
