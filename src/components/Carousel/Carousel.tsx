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

const CarouselItemContainer = styled.div<{ iscenter: boolean }>`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  max-width: ${(props) => (props.iscenter ? "100%" : "80%")};
  opacity: ${(props) => (props.iscenter ? "1" : "0.7")};

  // &:hover {
  //   transform: scale(1.1);
  //   cursor: pointer;
  //   opacity: 1;
  // }

  @media (max-width: 1366px) {
    max-width: ${(props) => (props.iscenter ? "100%" : "70%")};
  }

  @media (max-width: 1024px) {
    max-width: ${(props) => (props.iscenter ? "100%" : "60%")};
  }

  @media (max-width: 720px) {
    max-width: ${(props) => (props.iscenter ? "100%" : "50%")};
  }
`;

const CarouselImage = styled.img<{ iscenter: boolean }>`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 4px;
  padding: 4px;
  border: ${(props) => (props.iscenter ? "2px solid blue" : "none")};
`;

interface CarouselProps {
  programs: Program[];
}

const Carousel: React.FC<CarouselProps> = ({ programs }) => {
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
        navigate(`/program/${programs[selectedIndex].id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [programs]);

  const visibleItems = programs?.reduce((acc, program, index) => {
    if (index >= selectedIndex - 2 && index <= selectedIndex + 2) {
      acc.push(program);
    }
    return acc;
  }, [] as Program[]);

  return (
    <CarouselContainer>
      {visibleItems.map((program, index) => (
        <CarouselItemContainer
          key={program.id}
          iscenter={index === 2}
          onClick={() => navigate(`/program/${program.id}`)}
        >
          <CarouselImage src={program.image} alt={program.title} iscenter={index === 2} />
        </CarouselItemContainer>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;
