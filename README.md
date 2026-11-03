# SHREYA.exe — Enter My Universe

A cinematic portfolio for Shreya H L, built in this existing React 17 / Create React App project with React Three Fiber, Three.js, GSAP ScrollTrigger, Framer Motion and custom CSS. WebGL scenes fall back to lightweight CSS artwork when WebGL is unavailable. The intro is shown once per browser and can be skipped; to replay it, clear `shreya-exe-intro-seen` from local storage.

## Run locally

Open a terminal in the project directory (the folder containing `package.json`):

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Create a production build with `npm run build`, or run the tests once with `npm test -- --watchAll=false`.

## Add your personal photo

Copy your image to `public/images/shreya-profile.jpg`, then set `profileImage` in `src/data/assets.js` to `/images/shreya-profile.jpg`. Until a photo is added, the portfolio uses abstract artwork instead. The image is displayed as supplied; no face edits or filters are applied.

## Update your resume

Replace `public/resume/Shreya_HL_Resume.pdf` with your new original PDF, keeping that filename. The MY RESUME section previews, opens, and downloads this same file. Update `resumePath` in `src/data/assets.js` if you choose a different filename.

## Add certificates

The NPTEL certificate is stored at `public/certificates/NPTEL_AI_for_Management.pdf` and configured in `src/data/certificates.js`. To update its details, edit its `title`, `issuer`, `date`, `score`, and `file` values there. Replace the PDF at the same path to update the document without changing the links.

For additional certificates, copy actual certificate PDFs or images into `public/certificates/` and add one object for each real credential in `src/data/certificates.js`, for example:

```js
{
  title: "Certificate title",
  issuer: "Issuing organization",
  date: "Completion date",
  score: "",
  category: "Course",
  credentialId: "",
  file: "/certificates/your-certificate.pdf",
  verificationUrl: ""
}
```

Only `title` and `file` are needed. Leave any unprovided issuer, date, category, credential ID or verification URL blank or omit it. The gallery filters by category when more than one category is present.

## Update portfolio content

Personal content and contact links are in `src/data/personal.js`; technologies are in `src/data/skills.js`; education milestones are in `src/data/journey.js`; project titles and any verified descriptions, technology names, screenshots (`/images/...`) and links are in `src/data/projects.js`. Publish only details that have been verified. The current project visuals are abstract scenes, not screenshots, and the project detail views do not imply unprovided functionality or deployment.

The active sections live in `src/components/portfolio/`. The older starter-template components and assets remain in the project but are not used by the current app.
