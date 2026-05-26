import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import ComicStrip from "@/pages/ComicStrip";
import Favorites from "@/pages/Favorites.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout.jsx";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Routes>
              <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/comicstrips/random" element={<ComicStrip />} />
                  <Route path="/comicstrips/:id" element={<ComicStrip />} />
                  <Route path="/favorites/" element={<Favorites />} />
              </Route>
          </Routes>
      </QueryClientProvider>
  );
}

export default App;
