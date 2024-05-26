import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import SmallShowcase from "./components/SmallShowcase";
import { Wrapper } from "./components/Wrapper";
import { Program } from "./types/Program";
import { getSampleData } from "./appSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getSampleData())
      .then((result: { payload: Program[] }) => {
        setPrograms(result.payload);
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Wrapper>
        <SmallShowcase programs={programs} />
      </Wrapper>
      <Button>Stan.com.au</Button>
      {programs?.length &&
        programs?.map((program) => (
          <div key={program.id}>
            <h2>{program.title}</h2>
            <p>{program.description}</p>
          </div>
        ))}
    </>
  );
}

export default App;
