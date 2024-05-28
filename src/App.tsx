import { useState, useEffect } from "react";
import "./App.css";
import { Program } from "./types/Program";
import { getSampleData } from "./appSlice";
import { useDispatch } from "react-redux";
import Carousel from "./components/Carousel/Carousel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProgramDetailPage from "./components/Detail/ProgramDetailPage";
import Nav from "./components/Nav";

function App() {
  const dispatch = useDispatch();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get the sample data on component mount.
   */
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
    <BrowserRouter>
    <Nav></Nav>
      <Routes>
        <Route path="/" element={<Carousel programs={programs} />} />
        <Route path="/program/:id" element={<ProgramDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
