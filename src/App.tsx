import { useState, useEffect } from 'react';
import "./App.css";
import Button from "./components/Button";
import SmallShowcase from "./components/SmallShowcase";
import { Wrapper } from "./components/Wrapper";
import { Program } from "./types/Program";
import sampleData from './data/sampleData.json';

function App() {
  const [programs, setPrograms] = useState<Program[]>(sampleData);

  useEffect(() => {
    const fetchData = async () => {
      setPrograms(sampleData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Wrapper>
        <SmallShowcase programs={programs} />
      </Wrapper>
      <Button>Stan.com.au</Button>
      {programs.map((program) => (
        <div key={program.id}>
          <h2>{program.title}</h2>
          <p>{program.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;