import styled from "styled-components";
import React, { ButtonHTMLAttributes } from "react";

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
