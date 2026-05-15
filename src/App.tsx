import Layout from "./components/common/Layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Achievements from "./components/sections/Achievements";

function App() {
  return (
    <Layout>
      {/* Each section is separated by a large vertical gap (space-y-32) 
          to give the animations room to breathe as you scroll.
      */}
      <div className="flex flex-col gap-32">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </Layout>
  );
}

export default App;
