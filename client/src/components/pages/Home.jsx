import "./Home.css";
import { useEffect, useState } from "react";

const developers = [
  {
    name: "Mushaf Ali Mir",
    role: "Frontend Developer",
    note: "A Free Open Source World!!",
    github: "https://github.com/RED-Mushaf-Ali-Mir",
    linkedin: "https://www.linkedin.com/in/mushaf-ali-mir-6a32b6295",
  },
  {
    name: "Adnan Bin Osama",
    role: "Database Manager",
    note: "Every Contribution Is A Charity",
    github: "https://github.com/adnanosama",
    linkedin:
      "https://www.linkedin.com/in/adnan-osama-344634352?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Zaid",
    role: "Database Engineer",
    note: "Helping Others Is Like A Wheel, Which Always Comes Around",
    github: "https://github.com/ayyy13579",
    linkedin: "Zaid Bin Zubair ",
  },
];

const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: "Past Papers",
    desc: "Access past exam papers across all courses — organized by subject and year.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Teacher Reviews",
    desc: "Read and submit honest reviews to help students choose their courses wisely.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "GPA Calculator",
    desc: "Calculate your semester GPA instantly with our built-in FAST NUCES grade calculator.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Open Source",
    desc: "Built by students, for students. Every contribution that helps the community is welcomed.",
  },
];

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function Home() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // NOTE: localStorage only tracks per-browser visits.
    // For real cross-user counts, replace this with a backend call
    // e.g. to Firebase, Supabase, or a simple API counter service.
    const count = parseInt(localStorage.getItem("red-track-visits") || "0") + 1;
    localStorage.setItem("red-track-visits", count);
    setVisitCount(count);
  }, []);

  return (
    <div className="home-page-wrapper">
      <div className="home-root">
        {/* Hero */}
        <section className="home-hero">
          <div className="home-hero__badge">FAST NUCES · Open Source</div>
          <h1 className="home-hero__title">
            Student resources,
            <br />
            <span className="home-hero__accent">built by students.</span>
          </h1>
          <p className="home-hero__sub">
            RED-Track is a free, open-source hub where FAST NUCES students
            access past papers, review teachers, and calculate GPA — all in one
            place.
          </p>

          {/* Visitor counter */}
          <div className="home-visitor-counter">
            <span className="home-visitor-counter__dot" />
            <span className="home-visitor-counter__count">
              {visitCount.toLocaleString()}
            </span>
            <span>visits tracked</span>
          </div>

          <div className="home-hero__actions">
            <a href="/Pastpapers" className="home-btn home-btn--primary">
              Browse Past Papers
            </a>
            <a
              href="zannalikhan1234567@gmail.com"
              className="home-btn home-btn--outline"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Contribute a Paper
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="home-section">
          <h2 className="home-section__title">What's inside</h2>
          <div className="home-features">
            {features.map((f, i) => (
              <div className="home-feature-card" key={i}>
                <div className="home-feature-card__icon">{f.icon}</div>
                <h3 className="home-feature-card__title">{f.title}</h3>
                <p className="home-feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Source Banner */}
        <section className="home-oss-banner">
          <div className="home-oss-banner__inner">
            <div className="home-oss-banner__icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <div>
              <h3 className="home-oss-banner__title">
                Open to everyone who wants to build
              </h3>
              <p className="home-oss-banner__text">
                RED-Track started as a student project and will always be open
                source. If you have an idea, a fix, or a feature that benefits
                your fellow students — your pull request is welcome. Good
                contributions are reviewed and shipped.
              </p>
            </div>
            <a
              href="https://github.com/RED-Mushaf-Ali-Mir/RED-Track-StudentHub"
              target="_blank"
              rel="noopener noreferrer"
              className="home-btn home-btn--ghost"
            >
              <GitHubIcon />
              <span style={{ marginLeft: "6px" }}>View on GitHub</span>
            </a>
          </div>
        </section>

        {/* Contribute Papers */}
        <section className="home-section">
          <div className="home-contribute">
            <div className="home-contribute__text">
              <h2 className="home-contribute__title">
                Have extra past papers?
              </h2>
              <p className="home-contribute__desc">
                If you have papers we're missing — any course, any year — send
                them over. Every paper you share helps a student prepare better.
                Suggestions for new features or courses are just as welcome.
              </p>
            </div>
            <a
              href="zannalikhan1234567@gmail.com"
              className="home-btn home-btn--primary"
            >
              Send via Email
            </a>
          </div>
        </section>

        {/* Team */}
        <section className="home-section">
          <h2 className="home-section__title">The team</h2>
          <p className="home-section__sub">
            RED-Track is built and maintained by three FAST NUCES students.
          </p>
          <div className="home-team">
            {developers.map((dev, i) => (
              <div className="home-dev-card" key={i}>
                <div className="home-dev-card__avatar">
                  {dev.name.charAt(0)}
                </div>
                <div>
                  <h3 className="home-dev-card__name">{dev.name}</h3>
                  <span className="home-dev-card__role">{dev.role}</span>
                  <p className="home-dev-card__note">{dev.note}</p>
                </div>
                <div className="home-dev-card__links">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-dev-link"
                  >
                    <GitHubIcon /> GitHub
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-dev-link"
                  >
                    <LinkedInIcon /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <span className="home-footer__brand">RED-Track</span>
          <span className="home-footer__sep">·</span>
          <span>Open source · Built for FAST NUCES students</span>
          <span className="home-footer__sep">·</span>
          <a href="mailto:your@email.com" className="home-footer__link">
            Contact
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Home;
