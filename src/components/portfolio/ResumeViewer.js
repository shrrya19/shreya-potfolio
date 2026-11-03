import React from "react";
import { assets } from "../../data/assets";
import { personal } from "../../data/personal";
import useSceneTransition from "./SceneTransition";

export default function ResumeViewer() {
  const sectionRef = useSceneTransition();

  return (
    <section
      className="resume-section section-shell resume-experience"
      id="resume"
      ref={sectionRef}
    >
      <div className="resume-heading section-heading" data-scene-reveal>
        <p className="eyebrow"><span>06</span> A DOCUMENT FROM MY UNIVERSE</p>
        <h2>MY <span>RESUME.</span></h2>
        <p className="resume-intro">
          My education, skills and projects — gathered in one place.
        </p>
      </div>
      <div className="resume-showcase has-resume" data-scene-reveal>
        <div className="resume-preview-stage">
          <div className="resume-stage-grid" aria-hidden="true" />
          <span className="resume-stage-orbit resume-stage-orbit-one" aria-hidden="true" />
          <span className="resume-stage-orbit resume-stage-orbit-two" aria-hidden="true" />
          <iframe
            className="resume-pdf-preview"
            src={assets.resumePath}
            title={`${personal.name} resume PDF preview`}
            loading="lazy"
          />
          <span className="resume-stage-coordinate" aria-hidden="true">
            ARCHIVE / 06 — ORIGINAL RESUME PDF
          </span>
        </div>
        <div className="resume-showcase-copy">
          <p className="eyebrow"><span>{personal.name.toUpperCase()}</span> / MY RESUME</p>
          <h3>{personal.title}</h3>
          <p>
            View the original PDF in a new tab or download the exact file supplied.
          </p>
          <span className="resume-file-label is-available">
            ORIGINAL PDF · READY TO VIEW AND DOWNLOAD
          </span>
          <div className="resume-actions">
            <a
              className="button button-lime"
              href={assets.resumePath}
              target="_blank"
              rel="noreferrer"
            >
              View My Resume <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-quiet"
              href={assets.resumePath}
              download="Shreya_HL_Resume.pdf"
            >
              Download Resume <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className="resume-status" role="status" aria-live="polite">
            Your original PDF resume is ready.
          </span>
        </div>
      </div>
    </section>
  );
}
