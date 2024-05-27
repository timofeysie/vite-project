import { useParams } from "react-router-dom";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Program } from "../../types/Program";
import { useSelector } from "react-redux";
import { selectProgramById } from "../../appSlice";
import { RootState } from "../../store/reducer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 300px;
`;

const ProgramDetails = styled.div`
  margin-left: 20px;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Property = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
`;

const ProgramDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const program = useSelector((state: RootState) =>
    selectProgramById(state, parseInt(id ?? "", 10))
  ) as Program;

  console.log(";program", program);
  return (
    <div>
      {
        <Container>
          <Image src={program.image} alt={program.title} />
          <ProgramDetails>
            <Title>{program.title}</Title>

            <PropertiesContainer>
              <Property>{program.rating} |&nbsp;</Property>
              <Property>{program.year} |&nbsp;</Property>
              <Property>{program.type} |&nbsp;</Property>
              <Property>{program.genre} |&nbsp;</Property>
              <Property>{program.language}</Property>
            </PropertiesContainer>

            <Property>{program.description}</Property>
          </ProgramDetails>
        </Container>
      }
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
};

export default ProgramDetailPage;
