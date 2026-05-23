import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import ComicStrip from "@/pages/ComicStrip";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comicstrips/random" element={<ComicStrip />} />
      <Route path="/comicstrips/:id" element={<ComicStrip />} />
    </Routes>
  );
}

export default App;
