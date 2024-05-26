import styled from "styled-components";
import { headerFont } from "../../utils/fonts";
import { Program } from "../../types/Program";

export interface SmallShowcaseProps {
  programs: Program[];
}

export default function SmallShowcase({ programs }: SmallShowcaseProps) {
  return (
    <Wrapper>
      {programs && 
      Object.values(programs)
        .slice(0, 6)
        .map((project, index) => (
          <div key={project.title} id={`/showcase?item=${project.id}`}>
            <Website as="a" $position={index}>
              <RatioBox>
                <Screenshot
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <Label>{project.title}</Label>
              </RatioBox>
            </Website>
          </div>
        ))}
    </Wrapper>
  );
}

const scaleFactor = [1.8, 1.4, 1];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin-top: -96px;

  @media (min-width: 640px) {
    padding: 32px;
  }

  @media (min-width: 800px) {
    width: 120%;
    padding: 0;
    max-width: 1280px;
    margin-top: 0px;
    transform: translateY(50%);
  }
`;

const Label = styled.label`
  position: absolute;
  bottom: 0;
  left: 50%;
  max-width: 100%;
  transform: translate(-50%, 50%);
  background-color: white;
  color: #333;
  font-family: ${headerFont};
  padding: 2px 12px;
  white-space: nowrap;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.2s ease-out;

  @media (min-width: 800px) {
    font-size: 0.65rem;
  }
`;

const Website = styled.div<{ $position: number }>`
  display: block;
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;

    ${Label} {
      opacity: 1;
    }
  }

  @media (min-width: 800px) {
    padding: 12px;
    z-index: ${(props: { $position: number }) =>
      2 - Math.abs(props.$position - 2)};
    display: ${(props: { $position: number }) =>
      props.$position > 4 ? "none" : "block"};
    transform: scale(
      ${(props: { $position: number }) =>
        scaleFactor[Math.abs(props.$position - 2)]}
    );

    &:hover {
      transform: scale(
        ${(props: { $position: number }) =>
          scaleFactor[Math.abs(props.$position - 2)] + 0.2}
      );

      &:nth-of-type(-n + 2) {
        ${Label} {
          left: 0;
          transform: translate(0, 50%);
        }
      }

      &:nth-of-type(4),
      &:nth-of-type(5) {
        ${Label} {
          right: 0;
          transform: translate(0, 50%);
        }
      }
    }
  }
`;

const RatioBox = styled.div`
  padding-top: 56.25%;
  position: relative;
  width: 100%;
`;

const Screenshot = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 800px) {
    width: 100%;
    max-width: 300px;
    padding-bottom: 150%; /* Set the aspect ratio as a percentage */
  }
`;