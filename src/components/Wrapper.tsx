import styled from "styled-components";

export const Wrapper = styled.div.attrs((/* props */) => ({
  className: "hero-header", // for integration tests
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  box-sizing: border-box;
  min-height: 10vh;
  margin-bottom: 160px;
  margin-left: auto;
  margin-right: auto;
`;