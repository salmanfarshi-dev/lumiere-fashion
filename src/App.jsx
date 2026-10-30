import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./pages/Home/Home";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex min-h-[70vh] items-center justify-center">
                <h1 className="font-serif text-5xl tracking-widest">
                  LUMIÈRE
                </h1>
              </div>
            }
          />

           <Route path="/" element={<Hero />} />
        </Routes>
      </main>
    </>
  );
}

export default App;