import React from "react";
import { personal } from "../../data/personal";
import SceneCanvas from "./SceneCanvas";
import useSceneTransition from "./SceneTransition";

function SectionHeading({ number, eyebrow, title, accent }) {
  return (
    <div className="section-heading" data-scene-reveal>
      <p className="eyebrow"><span>{number}</span> {eyebrow}</p>
      <h2>{title} <span>{accent}</span></h2>
    </div>
  );
}

export default function About() {
  const sectionRef = useSceneTransition();

  return (
    <section className="about section-shell scene-world scene-world-about" id="about" ref={sectionRef}>
      <SceneCanvas scene="island" className="about-island-scene" />
      <SectionHeading number="02" eyebrow="A LITTLE CONTEXT" title="More than" accent="a job title." />
      <div className="about-layout">
        <div className="about-visual" data-scene-reveal>
          <div className="about-island-caption" aria-hidden="true">
            <span>WORLD 02</span>
            <span>AN ISLAND BETWEEN IDEAS</span>
          </div>
          <div className="about-orbit-art" aria-hidden="true">
            <span />
            <span />
            <b>SHREYA</b>
          </div>
          <p className="visual-footnote">LEARNING, EXPLORING, BECOMING.</p>
        </div>
        <div className="about-copy" data-scene-reveal>
          <p className="about-lede">{personal.introduction}</p>
          <p className="about-body">{personal.about}</p>
          <p className="about-body">{personal.projectExperience}</p>
          <div className="about-note">
            <span className="note-symbol" aria-hidden="true">✳</span>
            <div>
              <span className="note-label">EDUCATION · STRENGTHS · GOAL</span>
              <p>{personal.education}</p>
              <p>{personal.strengths}</p>
              <p>{personal.goal}</p>
            </div>
          </div>
          <p className="about-thanks">Thank you!</p>
        </div>
      </div>
    </section>
  );
}
