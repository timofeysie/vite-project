import React from "react";
import { useNavigate } from "react-router-dom";
import { Program } from "../../types/Program";

interface CarouselItemProps {
  program: Program;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ program }) => {
    const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/program/${program.id}`);
  };

  return <img src={program.image} alt={program.title} onClick={handleItemClick} />;
};

export default CarouselItem;