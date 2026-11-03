import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SceneCanvas from "./SceneCanvas";

export default function Intro({ onEnter }) {
  const reduceMotion = useReducedMotion();
  const skipRef = useRef(null);

  useEffect(() => {
    if (skipRef.current) skipRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onEnter();
      return;
    }
    if (event.key !== "Tab") return;

    const buttons = event.currentTarget.querySelectorAll("button:not([disabled])");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      className="cinematic-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: "easeInOut" }}
      role="dialog"
      aria-modal="true"
      aria-label="SHREYA.exe introduction"
      onKeyDown={handleKeyDown}
    >
      <SceneCanvas scene="portal" className="intro-scene" />
      <div className="intro-vignette" aria-hidden="true" />
      <div className="intro-content">
        <motion.p
          className="intro-kicker"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.28em" }}
          transition={{ delay: reduceMotion ? 0 : 0.55, duration: 1.1 }}
        >
          A SIGNAL FROM ANOTHER WORLD
        </motion.p>
        <motion.p
          className="intro-wordmark"
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: reduceMotion ? 0 : 1.05, duration: 1 }}
        >
          SHREYA<span>.exe</span>
        </motion.p>
        <motion.p
          className="intro-person-name"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.65, duration: 0.8 }}
        >
          SHREYA H L
        </motion.p>
        <motion.p
          className="intro-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 2.05, duration: 0.7 }}
        >
          MCA STUDENT <span>|</span> ASPIRING FULL STACK DEVELOPER
        </motion.p>
        <motion.button
          className="intro-enter"
          type="button"
          onClick={onEnter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 2.35, duration: 0.6 }}
        >
          ENTER MY UNIVERSE <span aria-hidden="true">↗</span>
        </motion.button>
      </div>
      <button className="intro-skip" type="button" onClick={onEnter} ref={skipRef}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
      <span className="intro-progress" aria-hidden="true" />
    </motion.div>
  );
}
