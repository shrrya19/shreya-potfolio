import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
const fs = require("fs");
const path = require("path");
import App from "./App";

function renderPortfolio() {
  const result = render(<App />);
  const skipButton = screen.queryByRole("button", { name: /skip intro/i });
  if (skipButton) fireEvent.click(skipButton);
  return result;
}

test("renders the portfolio and its main sections", () => {
  renderPortfolio();

  expect(screen.getByRole("heading", { name: /shreya h l/i })).toBeInTheDocument();
  expect(screen.getAllByText("MCA Student | Aspiring Full Stack Developer")).toHaveLength(2);
  expect(screen.getByRole("heading", { name: /student job portal/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /health talk/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /market regime/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /certifications & achievements/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /let's build something that matters/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /aishushreya1@gmail.com/i })).toHaveAttribute(
    "href",
    "mailto:aishushreya1@gmail.com",
  );
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
    "href",
    "https://github.com/shrrya19",
  );
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/shreya-hl-b61bb931a",
  );
});

test("lets visitors choose a technology to read more about", () => {
  renderPortfolio();

  fireEvent.click(screen.getByRole("button", { name: /react/i }));

  expect(screen.getByText("Composable UI building blocks for dynamic web experiences.")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /python/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /machine learning/i })).toBeInTheDocument();
});

test("opens and closes project detail views without inventing project links", async () => {
  renderPortfolio();

  fireEvent.click(screen.getByRole("button", { name: /view details for student job portal/i }));

  expect(screen.getByRole("dialog", { name: /student job portal/i })).toBeInTheDocument();
  expect(screen.getByText(/description, screenshots, technology details, and links have not been provided yet/i)).toBeInTheDocument();
  expect(screen.getByText(/repository and live-project links not provided/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /close/i }));
  await waitFor(() => {
    expect(screen.queryByRole("dialog", { name: /student job portal/i })).not.toBeInTheDocument();
  });
});

test("previews, opens, and downloads the exact uploaded resume PDF", () => {
  renderPortfolio();

  const resumeFile = path.join(process.cwd(), "public", "resume", "Shreya_HL_Resume.pdf");
  const resumeSectionElement = document.getElementById("resume");
  const resumeSection = within(resumeSectionElement);
  expect(fs.existsSync(resumeFile)).toBe(true);
  expect(fs.statSync(resumeFile).size).toBeGreaterThan(0);
  expect(resumeSectionElement.querySelector('input[type="file"]')).toBeNull();
  expect(screen.getByTitle(/shreya h l resume pdf preview/i)).toHaveAttribute(
    "src",
    "/resume/Shreya_HL_Resume.pdf",
  );
  expect(resumeSection.getByRole("link", { name: /view my resume/i })).toHaveAttribute(
    "href",
    "/resume/Shreya_HL_Resume.pdf",
  );
  expect(resumeSection.getByRole("link", { name: /view my resume/i })).toHaveAttribute(
    "target",
    "_blank",
  );
  expect(resumeSection.getByRole("link", { name: /download resume/i })).toHaveAttribute(
    "href",
    "/resume/Shreya_HL_Resume.pdf",
  );
  expect(resumeSection.getByRole("link", { name: /download resume/i })).toHaveAttribute(
    "download",
    "Shreya_HL_Resume.pdf",
  );
});

test("shows the real NPTEL certificate and its view and download actions", () => {
  renderPortfolio();

  const certificateFile = path.join(
    process.cwd(),
    "public",
    "certificates",
    "NPTEL_AI_for_Management.pdf",
  );
  const certificateSection = within(document.getElementById("certificates"));
  const viewLink = certificateSection.getByRole("link", { name: /view certificate/i });
  const downloadLink = certificateSection.getByRole("link", { name: /download certificate/i });

  expect(fs.existsSync(certificateFile)).toBe(true);
  expect(fs.statSync(certificateFile).size).toBeGreaterThan(0);
  expect(certificateSection.getByRole("heading", {
    name: "Certifications & Achievements.",
  })).toBeInTheDocument();
  expect(certificateSection.getByRole("heading", {
    name: "Artificial Intelligence (AI) for Management",
  })).toBeInTheDocument();
  expect(certificateSection.getByText("Issued by NPTEL (IIT)")).toBeInTheDocument();
  expect(certificateSection.getByText("Completed Jan-Apr 2026 (12 week course)")).toBeInTheDocument();
  expect(certificateSection.getByText("Score / Grade · 56% · 30.75/75")).toBeInTheDocument();
  expect(certificateSection.getByTitle(/artificial intelligence \(ai\) for management pdf preview/i))
    .toHaveAttribute("src", "/certificates/NPTEL_AI_for_Management.pdf#page=1&toolbar=0");
  expect(viewLink).toHaveAttribute("href", "/certificates/NPTEL_AI_for_Management.pdf");
  expect(viewLink).toHaveAttribute("target", "_blank");
  expect(downloadLink).toHaveAttribute("href", "/certificates/NPTEL_AI_for_Management.pdf");
  expect(downloadLink).toHaveAttribute("download");
});

test("copies the supplied email address", async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  renderPortfolio();

  fireEvent.click(screen.getByRole("button", { name: /copy email/i }));

  await waitFor(() => expect(writeText).toHaveBeenCalledWith("aishushreya1@gmail.com"));
  expect(screen.getByText("Email address copied.")).toBeInTheDocument();
});

test("opens and closes the mobile navigation", () => {
  renderPortfolio();
  const menuButton = screen.getByRole("button", { name: /menu/i });

  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("navigation", { name: /main navigation/i })).toHaveClass("is-open");

  fireEvent.click(screen.getByRole("link", { name: /about/i }));
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
});
