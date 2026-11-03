import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import SceneCanvas from "./SceneCanvas";
import useSceneTransition from "./SceneTransition";

function ProjectDetails({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="project-detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="project-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.28 }}
      >
        <button className="project-detail-close" type="button" onClick={onClose} autoFocus>
          Close <span aria-hidden="true">×</span>
        </button>
        <p className="eyebrow"><span>PROJECT FILE</span> / SHREYA.EXE</p>
        <h3 id="project-detail-title">{project.name}</h3>
        <p>
          {project.description ||
            "A project title from Shreya's portfolio. Description, screenshots, technology details, and links have not been provided yet."}
        </p>
        {project.technologies.length > 0 && (
          <ul className="project-technologies" aria-label="Technologies used">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}
        {project.image && (
          <img className="project-detail-image" src={project.image} alt={`${project.name} preview`} />
        )}
        <div className="project-detail-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">Repository ↗</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">Live project ↗</a>
          )}
          {!project.github && !project.demo && (
            <span>Repository and live-project links not provided.</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectCity() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useSceneTransition();

  return (
    <section className="work section-shell project-city" id="work" ref={sectionRef}>
      <SceneCanvas scene="city" className="city-scene" />
      <div className="section-heading" data-scene-reveal>
        <p className="eyebrow"><span>04</span> SELECTED WORK</p>
        <h2>Made with <span>intention.</span></h2>
      </div>
      <div className="work-intro" data-scene-reveal>
        <p>Three projects. Their stories are yours to tell.</p>
        <span>03 PROJECTS <b>·</b> DETAILS TO COME</span>
      </div>
      <div className="project-gallery">
        {projects.map((project, index) => (
          <article
            className={`project-card project-card-${index + 1} project-accent-${project.accent}`}
            key={project.name}
            data-scene-reveal
          >
            <div className={`project-art project-art-${index + 1}`}>
              {project.image ? (
                <img src={project.image} alt={`${project.name} project preview`} />
              ) : (
                <div className="project-artwork" aria-hidden="true">
                  <span className="city-skyline" />
                  <span className="project-art-orbit project-art-orbit-one" />
                  <span className="project-art-orbit project-art-orbit-two" />
                  <span className="project-art-symbol">{["↗", "✳", "⌁"][index % 3]}</span>
                  <span className="project-art-label">PROJECT SCENE / PREVIEW NOT PROVIDED</span>
                </div>
              )}
            </div>
            <div className="project-card-info">
              <span className="project-card-index">PROJECT / 0{index + 1}</span>
              <h3>{project.name}<span>.</span></h3>
              <p>{project.description || "Project details have not been provided yet."}</p>
              {project.technologies.length > 0 && (
                <ul className="project-technologies" aria-label="Technologies used">
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              )}
              <div className="project-card-links">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.name}`}
                >
                  Open project file <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
