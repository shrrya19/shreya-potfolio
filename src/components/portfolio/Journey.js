import React from "react";
import { journey } from "../../data/journey";
import useSceneTransition from "./SceneTransition";

export default function Journey() {
  const sectionRef = useSceneTransition();

  return (
    <section className="journey section-shell" id="journey" ref={sectionRef}>
      <div className="section-heading" data-scene-reveal>
        <p className="eyebrow"><span>05</span> STILL BECOMING</p>
        <h2>The story is <span>in progress.</span></h2>
      </div>
      <div className="journey-layout">
        <div className="journey-statement" data-scene-reveal>
          <span className="journey-glyph" aria-hidden="true">↘</span>
          <p>Not a straight line. More like a series of <em>“what if?”</em></p>
          <span className="journey-caption">A TIMELINE, WRITTEN IN MY OWN TIME.</span>
        </div>
        <div className="timeline" aria-label="Academic and development journey">
          {journey.map((item, index) => (
            <article
              className="timeline-entry"
              key={`${item.title}-${index}`}
              data-scene-reveal
            >
              <span className="timeline-point" />
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
