import React, { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { personal } from "../../data/personal";
import useSceneTransition from "./SceneTransition";

function ContactLink({ label, href }) {
  if (!href) return null;
  const Icon = label === "GitHub" ? FaGithub : FaLinkedinIn;

  return (
    <a className="contact-social" href={href} target="_blank" rel="noreferrer">
      <span className="social-icon" aria-hidden="true"><Icon /></span>
      {label}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Contact() {
  const [copyMessage, setCopyMessage] = useState("");
  const sectionRef = useSceneTransition();
  const socialLinks = [
    ["GitHub", personal.github],
    ["LinkedIn", personal.linkedin],
  ];

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        throw new Error("Clipboard access is unavailable.");
      }
      await navigator.clipboard.writeText(personal.email);
      setCopyMessage("Email address copied.");
    } catch (error) {
      setCopyMessage("Copy is unavailable here. You can select the email address to copy it.");
    }
  };

  return (
    <section className="contact section-shell contact-finale" id="contact" ref={sectionRef}>
      <div className="contact-tunnel" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="contact-glow" aria-hidden="true" />
      <div data-scene-reveal>
        <p className="eyebrow"><span>08</span> THE NEXT GOOD THING</p>
        <h2>LET&apos;S BUILD<br />SOMETHING THAT<br /><span>MATTERS.</span></h2>
        <p className="contact-thanks">Thank you for entering my universe.</p>
      </div>
      <div className="contact-bottom">
        <div className="contact-cta" data-scene-reveal>
          <a className="button button-lime contact-button" href={`mailto:${personal.email}`}>
            Say hello <span aria-hidden="true">↗</span>
          </a>
          <a className="contact-email" href={`mailto:${personal.email}`}>{personal.email}</a>
          <button className="copy-email" type="button" onClick={copyEmail}>
            Copy email <span aria-hidden="true">⧉</span>
          </button>
          <span className="copy-status" aria-live="polite">{copyMessage}</span>
        </div>
        <div className="contact-links" data-scene-reveal>
          <span>FIND ME ELSEWHERE</span>
          {socialLinks.map(([label, href]) => (
            <ContactLink label={label} href={href} key={label} />
          ))}
        </div>
      </div>
      <div className="contact-footer">
        <a className="wordmark" href="#home">SHREYA<span>.exe</span></a>
        <span>MADE WITH CURIOSITY, NOT A TEMPLATE.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </section>
  );
}
