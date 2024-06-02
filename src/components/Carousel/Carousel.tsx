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
  const [visibleItems, setVisibleItems] = useState<Program[]>([]);
  console.log('programs', programs.length)

  /**
   * Take the current index and create a visible array of program objects to display
   * @param currentIndex default 0
   * @returns array of visible programs to show.
   */
  function createVisibleList(currentIndex: number): Program[] {
    const result: Program[] = [];

    // calculate the first two object pseudo indices
    const pseudoIndex1 = (currentIndex - 2 + programs.length) % programs.length;
    const pseudoIndex2 = (currentIndex - 1 + programs.length) % programs.length;

    // add the pseudo objects to the result array
    result.push(programs[pseudoIndex1]);
    result.push(programs[pseudoIndex2]);

    // add the main currently selected object
    const mainObject = { ...programs[currentIndex], center: true };
    result.push(mainObject);

    // add the remaining objects to the result array
    for (let i = 1; i <= 4; i++) {
      const mainIndex = (currentIndex + i) % programs.length;
      result.push(programs[mainIndex]);
    }

    return result;
  }

  useEffect(() => {
    if (programs) {
      const visibleList = createVisibleList(selectedIndex);
      setVisibleItems(visibleList);
    }
  }, [programs]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % programs.length);
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex - 1 + programs.length) % programs.length;
          return newIndex;
        });
      } else if (event.key === "Enter") {
        navigate(`/program/${programs[selectedIndex + 2].id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programs, selectedIndex]);

  useEffect(() => {
    const visibleList = createVisibleList(selectedIndex);
    setVisibleItems(visibleList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <CarouselContainer data-testid="carousel-container">
      {visibleItems?.map(
        (program, index) =>
          program?.id && (
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
          )
      )}
    </CarouselContainer>
  );
};

export default Carousel;
