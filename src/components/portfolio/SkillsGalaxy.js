import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/skills";
import SceneCanvas from "./SceneCanvas";
import useSceneTransition from "./SceneTransition";

export default function SkillsGalaxy() {
  const [selected, setSelected] = useState(skills[0]);
  const sectionRef = useSceneTransition();

  return (
    <section className="skills section-shell scene-world scene-world-galaxy" id="skills" ref={sectionRef}>
      <div className="section-heading" data-scene-reveal>
        <p className="eyebrow"><span>03</span> TOOLS, NOT TROPHIES</p>
        <h2>My kind of <span>universe.</span></h2>
      </div>
      <div className="skills-intro" data-scene-reveal>
        <p>Every tool is a different way to turn an idea into something real.</p>
        <span>SELECT A SIGNAL TO TUNE IN <b>↘</b></span>
      </div>
      <div className="skill-universe" data-scene-reveal>
        <SceneCanvas
          scene="galaxy"
          className="galaxy-scene"
          skills={skills}
          selectedSkill={selected.name}
          onSelectSkill={setSelected}
        />
        <div className="skill-core" aria-hidden="true">
          <span className="core-ring" />
          <span className="core-label">CREATIVE<br />ENGINE</span>
          <span className="core-spark">✳</span>
        </div>
        {skills.map((skill, index) => (
          <button
            type="button"
            className={`skill-node skill-node-${index + 1}${selected.name === skill.name ? " is-selected" : ""}`}
            key={skill.name}
            onMouseEnter={() => setSelected(skill)}
            onFocus={() => setSelected(skill)}
            onClick={() => setSelected(skill)}
            aria-pressed={selected.name === skill.name}
          >
            <span className="skill-symbol">{skill.symbol}</span>
            <span>{skill.name}</span>
          </button>
        ))}
        <motion.div
          className="skill-detail"
          key={selected.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          aria-live="polite"
        >
          <span className="detail-label">SIGNAL / {selected.category}</span>
          <strong>{selected.name}</strong>
          <p>{selected.description}</p>
        </motion.div>
      </div>
      <p className="skills-footnote">A living toolkit — always room for one more signal.</p>
    </section>
  );
}
