import React, { useState } from "react";

const navigation = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Journey", "journey"],
  ["My Resume", "resume"],
  ["Certificates", "certificates"],
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Shreya, home">
        SHREYA<span>.exe</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "CLOSE" : "MENU"}
        <span className="menu-toggle-icon" aria-hidden="true">
          {menuOpen ? "−" : "+"}
        </span>
      </button>
      <nav
        className={`primary-navigation${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navigation.map(([label, id], index) => (
          <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>
            <span className="nav-index">0{index + 1}</span>
            {label}
          </a>
        ))}
        <a
          className="nav-contact"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
