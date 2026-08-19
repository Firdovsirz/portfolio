export type FaqEntry = { question: string; answer: string };

/**
 * Site-level question-and-answer content. Rendered on the home page and
 * emitted as FAQPage structured data, so answers are written to stand alone
 * when a search or generative engine quotes one without its surrounding page.
 */
export const siteFaq: FaqEntry[] = [
  {
    question: "Who is Firdovsi Rzaev?",
    answer:
      "Firdovsi Rzaev is a software engineer based in Baku, Azerbaijan. He is a Software Developer at Azerbaijan Technical University and Software Developer Team Lead at Dithari, where he leads the team building the Buyology e-commerce platform. His work is concentrated on production institutional systems — the platforms universities, editorial boards, and commerce operations use every day.",
  },
  {
    question: "What kind of systems does Firdovsi Rzaev build?",
    answer:
      "Production institutional platforms rather than prototypes: academic planning and reporting systems, a grant competition and expert review pipeline, an open-access academic journal and peer-review platform, a researcher profile portal integrating Scopus, Web of Science and Google Scholar, a learning management system, and a multi-surface e-commerce platform spanning web, mobile, and an operations dashboard.",
  },
  {
    question: "What is research software engineering, and why does it matter here?",
    answer:
      "Research software engineering is the practice of applying professional software engineering — version control, testing, deployment, data modelling, reproducibility — to the software that research and academic institutions depend on. It matters because research infrastructure is usually built once, under deadline, and then relied on for years; treating it as engineering rather than scripting is what keeps the results reproducible and the systems maintainable.",
  },
  {
    question: "What technologies does Firdovsi Rzaev work with?",
    answer:
      "On the frontend: React, Next.js, TypeScript, and Tailwind CSS. On the backend: Spring Boot, FastAPI, Django, REST and WebSocket APIs. On the platform side: PostgreSQL, MySQL, Docker, Nginx, Linux, and GitHub Actions for continuous delivery.",
  },
  {
    question: "What has he built for Azerbaijan Technical University?",
    answer:
      "Six production systems: the Machine Science journal and peer-review platform, the Plan-Report Information System for yearly academic planning across faculties and cafedras, the E-Grant Portal for grant submission and expert evaluation, the Researchers Portal that synchronises publication data from major academic indices, the Majors Portal covering programme learning outcomes and syllabi, and the public AzTU institutional website.",
  },
  {
    question: "Where is Firdovsi Rzaev based, and does he work remotely?",
    answer:
      "He is based in Baku, Azerbaijan, and works with institutions and teams both locally and remotely. Correspondence is in English or Azerbaijani.",
  },
  {
    question: "Is he available for engineering work or research collaboration?",
    answer:
      "Yes — he is open to engineering work and research collaborations in distributed systems, research software engineering, education technology, and data infrastructure. The contact page has a message form and links to LinkedIn and GitHub.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Use the form on the contact page, or reach out through LinkedIn or GitHub. His CV is available to preview or download from the header of every page.",
  },
];
