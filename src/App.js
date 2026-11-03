import React, { useCallback, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import About from "./components/portfolio/About";
import CertificateArchive from "./components/portfolio/CertificateArchive";
import Contact from "./components/portfolio/Contact";
import Hero from "./components/portfolio/Hero";
import Intro from "./components/portfolio/Intro";
import Journey from "./components/portfolio/Journey";
import Navigation from "./components/portfolio/Navigation";
import ProjectCity from "./components/portfolio/ProjectCity";
import ResumeViewer from "./components/portfolio/ResumeViewer";
import SkillsGalaxy from "./components/portfolio/SkillsGalaxy";
import "./App.css";
import "./cinematic.css";
import "./resume.css";

function hasSeenIntro() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("shreya-exe-intro-seen") === "true";
  } catch (error) {
    return true;
  }
}

function PointerLight() {
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    if (
      reduceMotion ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return undefined;
    }

    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduceMotion]);

  return (
    <span
      className={`custom-cursor${visible ? " is-visible" : ""}`}
      style={{ left: position.x, top: position.y }}
      aria-hidden="true"
    />
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  const completeIntro = useCallback(() => {
    try {
      window.localStorage.setItem("shreya-exe-intro-seen", "true");
    } catch (error) {
      // The current page still proceeds when browser storage is unavailable.
    }
    setShowIntro(false);
  }, []);

  return (
    <div className="portfolio-app">
      <AnimatePresence>{showIntro && <Intro onEnter={completeIntro} />}</AnimatePresence>
      <PointerLight />
      <div aria-hidden={showIntro} inert={showIntro ? "" : undefined}>
        <Navigation />
        <main>
          <Hero active={!showIntro} />
          <About />
          <SkillsGalaxy />
          <ProjectCity />
          <Journey />
          <ResumeViewer />
          <CertificateArchive />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
