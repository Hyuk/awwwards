import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
