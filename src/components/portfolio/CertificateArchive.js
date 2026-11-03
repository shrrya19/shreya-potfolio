import React, { useState } from "react";
import { certificates } from "../../data/certificates";
import useSceneTransition from "./SceneTransition";

function CertificateCard({ certificate, index }) {
  const [imageFailed, setImageFailed] = useState(false);
  const isImage = /\.(png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i.test(certificate.file || "");
  const previewAvailable = certificate.file && (!isImage || !imageFailed);

  return (
    <article className="certificate-card" data-scene-reveal>
      <div className="certificate-preview">
        {previewAvailable && isImage ? (
          <img
            src={certificate.file}
            alt={`${certificate.title} certificate`}
            onError={() => setImageFailed(true)}
          />
        ) : previewAvailable ? (
          <iframe
            src={`${certificate.file}#page=1&toolbar=0`}
            title={`${certificate.title} PDF preview`}
            loading="lazy"
          />
        ) : (
          <div className="certificate-art" aria-hidden="true">
            <span className="certificate-art-ring" />
            <span className="certificate-art-star">✳</span>
            <span className="certificate-art-top">SHREYA.EXE / ARCHIVE</span>
            <span className="certificate-art-bottom">
              CREDENTIAL {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
      <div className="certificate-info">
        <span className="certificate-category">{certificate.category || "CERTIFICATE"}</span>
        <h3>{certificate.title}</h3>
        {certificate.issuer && <p>Issued by {certificate.issuer}</p>}
        {certificate.date && <p>Completed {certificate.date}</p>}
        {certificate.score && <p>Score / Grade · {certificate.score}</p>}
        {certificate.credentialId && <p>Credential ID · {certificate.credentialId}</p>}
        {certificate.file && (!isImage || !imageFailed) && (
          <div className="certificate-actions">
            <a href={certificate.file} target="_blank" rel="noreferrer">View Certificate ↗</a>
            <a href={certificate.file} download>Download Certificate ↓</a>
          </div>
        )}
        {certificate.verificationUrl && (
          <a className="certificate-verify" href={certificate.verificationUrl} target="_blank" rel="noreferrer">
            Verify credential ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function CertificateArchive() {
  const categories = [...new Set(certificates.map(({ category }) => category).filter(Boolean))];
  const [category, setCategory] = useState("ALL");
  const sectionRef = useSceneTransition();
  const visibleCertificates = certificates.filter(
    (certificate) => category === "ALL" || certificate.category === category,
  );

  return (
    <section className="certificates section-shell" id="certificates" ref={sectionRef}>
      <div className="section-heading" data-scene-reveal>
        <p className="eyebrow"><span>07</span> LEARNING, DOCUMENTED</p>
        <h2>Certifications &amp; <span>Achievements.</span></h2>
      </div>
      {categories.length > 1 && (
        <div className="certificate-filters" aria-label="Filter certificates by category">
          {["ALL", ...categories].map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {visibleCertificates.length ? (
        <div className="certificate-grid">
          {visibleCertificates.map((certificate, index) => (
            <CertificateCard certificate={certificate} index={index} key={certificate.title} />
          ))}
        </div>
      ) : (
        <article className="certificate-empty" data-scene-reveal>
          <div className="certificate-preview certificate-empty-art">
            <div className="certificate-art" aria-hidden="true">
              <span className="certificate-art-ring" />
              <span className="certificate-art-star">✳</span>
              <span className="certificate-art-top">SHREYA.EXE / ARCHIVE</span>
              <span className="certificate-art-bottom">EMPTY CREDENTIAL SLOT</span>
            </div>
          </div>
          <div className="certificate-info">
            <span className="certificate-category">NOT YET PROVIDED</span>
            <h3>Your certificates belong here.</h3>
            <p>This is an empty gallery slot, not a certificate or achievement.</p>
            <code>Add real entries in src/data/certificates.js</code>
            <code>Place their files in public/certificates/</code>
          </div>
        </article>
      )}
    </section>
  );
}
