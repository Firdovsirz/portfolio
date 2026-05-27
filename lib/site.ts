export const site = {
  name: "Firdovsi Rzaev",
  shortName: "Firdovsi Rzaev",
  title: "Firdovsi Rzaev — Software Engineer & Research Software Engineer",
  description:
    "Firdovsi Rzaev is a software engineer and team lead building production institutional systems at Azerbaijan Technical University and Dithari Innovation Centre. Focused on distributed systems, education technology, and research infrastructure.",
  url: "https://firdovsirzaev.online",
  email: "firdovsirz@gmail.com",
  location: "Baku, Azerbaijan",
  role: "Software Engineer · Research Software Engineer",
  social: {
    github: "https://github.com/Firdovsirz",
    linkedin: "https://www.linkedin.com/in/firdovsi-rzaev/",
    email: "mailto:firdovsirz@gmail.com",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/research", label: "Research" },
    { href: "/experience", label: "Experience" },
    { href: "/education", label: "Education" },
    { href: "/publications", label: "Publications" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type Site = typeof site;
