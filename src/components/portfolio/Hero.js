import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personal } from "../../data/personal";
import { assets } from "../../data/assets";
import SceneCanvas from "./SceneCanvas";
import useSceneTransition from "./SceneTransition";

function isCoarsePointer() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

function Portrait() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="portrait-frame">
      {assets.profileImage && !imageFailed ? (
        <img
          className="portrait-image"
          src={assets.profileImage}
          alt={`Portrait of ${personal.name}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="portrait-placeholder"
          role="img"
          aria-label="Profile photo has not been supplied"
        >
          <span className="portrait-sun" />
          <span className="portrait-figure">
            <i className="portrait-head" />
            <i className="portrait-shoulders" />
          </span>
          <span className="portrait-initial">S</span>
          <span className="portrait-note">YOUR PHOTO, YOUR STORY</span>
        </div>
      )}
      <span className="portrait-index">FIG. 01 — THE HUMAN BEHIND THE PIXELS</span>
      <span className="portrait-caption">A work in progress. Always.</span>
      <span className="frame-corner frame-corner-one" />
      <span className="frame-corner frame-corner-two" />
    </div>
  );
}

export default function Hero({ active = true }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const sectionRef = useSceneTransition();

  const handlePointerMove = (event) => {
    if (reduceMotion || isCoarsePointer()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    });
  };

  return (
    <section
      className="hero section-shell"
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
    >
      <SceneCanvas scene="portal" className="hero-portal-scene" enabled={active} />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline" data-scene-reveal>
        <span>MCA STUDENT · ASPIRING FULL STACK DEVELOPER</span>
        <span className="availability"><i /> ENTER MY UNIVERSE</span>
      </div>
      <div className="hero-copy">
        <div data-scene-reveal>
          <p className="eyebrow"><span>01</span> {personal.title.toUpperCase()}</p>
          <h1 aria-label={personal.name}>
            SHREYA
            <br />
            <span className="hero-indent">H L</span>
            <span className="lime-period">.</span>
          </h1>
          <p className="hero-title">{personal.title}</p>
        </div>
        <div className="hero-bottom" data-scene-reveal>
          <p className="hero-description">{personal.introduction}</p>
          <div className="hero-actions">
            <a className="button button-lime" href="#about">
              Explore My World <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-quiet" href="#resume">
            View My Resume <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
      <motion.div
        className="hero-art"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: pointer.x * -12, y: pointer.y * -10 }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
      >
        <span className="orb-label">IDEAS IN ORBIT</span>
        <span className="orb-coordinates">MCA / FULL STACK<br />DESIGN / CODE / CURIOSITY</span>
      </motion.div>
      <a className="scroll-cue" href="#about">
        <span className="scroll-line" /> SCROLL TO EXPLORE
      </a>
      <span className="hero-edition">PORTFOLIO — 001 / 2026</span>
      <span className="hero-portrait" data-scene-reveal><Portrait /></span>
    </section>
  );
}
