import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaCogs,
  FaCode,
  FaDatabase,
  FaLayerGroup,
  FaLinkedinIn,
  FaNetworkWired,
  FaPhoneAlt,
  FaPlug,
  FaProjectDiagram,
  FaUsersCog,
} from "react-icons/fa";
import {
  SiAngular,
  SiApachecassandra,
  SiBitbucket,
  SiC,
  SiCss,
  SiDevexpress,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiGithub,
  SiGmail,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrimeng,
  SiPrisma,
  SiReactivex,
  SiReact,
  SiRedis,
  SiSharp,
  SiSocketdotio,
  SiSwagger,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178c6]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#f7df1e]" },
      { name: "C", icon: SiC, color: "text-[#a8b9cc]" },
      { name: "C#", icon: SiSharp, color: "text-[#9b4f96]" },
    ] satisfies Skill[],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js", icon: SiReact, color: "text-[#61dafb]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Angular", icon: SiAngular, color: "text-[#dd0031]" },
      { name: "RxJS", icon: SiReactivex, color: "text-[#b7178c]" },
      { name: "Material UI", icon: SiMui, color: "text-[#007fff]" },
      { name: "DevExtreme", icon: SiDevexpress, color: "text-[#ff7200]" },
      { name: "PrimeNG", icon: SiPrimeng, color: "text-[#dd0031]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#e34f26]" },
      { name: "CSS3", icon: SiCss, color: "text-[#663399]" },
    ] satisfies Skill[],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-[#5fa04e]" },
      { name: "NestJS", icon: SiNestjs, color: "text-[#e0234e]" },
      { name: "Express.js", icon: SiExpress, color: "text-white" },
      { name: "REST APIs", icon: FaPlug, color: "text-[#9cdcfe]" },
      { name: "Prisma ORM", icon: SiPrisma, color: "text-[#2d3748]" },
      { name: "Drizzle ORM", icon: SiDrizzle, color: "text-[#c5f74f]" },
    ] satisfies Skill[],
  },
  {
    title: "Realtime & Database",
    items: [
      { name: "Redis", icon: SiRedis, color: "text-[#ff4438]" },
      { name: "WebSocket", icon: FaNetworkWired, color: "text-[#9cdcfe]" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "text-white" },
      {
        name: "Cassandra",
        icon: SiApachecassandra,
        color: "text-[#1287b1]",
      },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169e1]" },
      {
        name: "Session Management",
        icon: FaUsersCog,
        color: "text-[#c586c0]",
      },
    ] satisfies Skill[],
  },
  {
    title: "Tools & Practices",
    items: [
      { name: "Git", icon: SiGit, color: "text-[#f05032]" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Bitbucket", icon: SiBitbucket, color: "text-[#0052cc]" },
      { name: "Docker", icon: SiDocker, color: "text-[#2496ed]" },
      { name: "Postman", icon: SiPostman, color: "text-[#ff6c37]" },
      { name: "Swagger", icon: SiSwagger, color: "text-[#85ea2d]" },
      { name: "TablePlus", icon: FaDatabase, color: "text-amber-200" },
      {
        name: "Agile/Scrum",
        icon: FaProjectDiagram,
        color: "text-[#9cdcfe]",
      },
      {
        name: "Microservices",
        icon: FaLayerGroup,
        color: "text-[#c586c0]",
      },
      { name: "SOLID", icon: FaCogs, color: "text-[#9cdcfe]" },
    ] satisfies Skill[],
  },
];

const stats = [
  { value: "200+", label: "APIs developed" },
  { value: "40%", label: "Search latency improvement" },
  { value: "200+", label: "Problems solved on Beecrowd" },
];

const projects = [
  {
    title: "Hotel Ticketing System",
    description:
      "Engineered a robust NestJS backend with Prisma ORM, modular architecture, custom guards, interceptors, decorators, JWT based RBAC, 30+ documented APIs, advanced filtering, pagination, and Jest unit testing.",
    tags: ["NestJS", "Prisma", "JWT", "Jest"],
  },
  {
    title: "E-commerce REST API",
    description:
      "Developed an e-commerce backend focused on relational data integrity, order processing, and maintainable NestJS modules for users, products, categories, and orders.",
    tags: ["NestJS", "Prisma", "REST API"],
  },
  {
    title: "G-Salon",
    description:
      "Built and deployed a production-ready salon website with responsive UI, service listings, appointment booking, and performance optimization.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    title: "Eventify",
    description:
      "Created an event management platform as a C# console application using OOP principles for venue exploration, organizer management, event creation, ticket issuing, and bookings.",
    tags: ["C#", "OOP", "Console App"],
  },
  {
    title: "To Do App",
    description:
      "Implemented a mobile task app with add, complete, and delete flows using Flutter and Hive, focusing on practical productivity and simple UI interactions.",
    tags: ["Flutter", "Hive", "Mobile"],
  },
];

const services = [
  "Full-stack application development with Next.js, React, Node.js, and NestJS",
  "REST API design, Swagger documentation, and scalable backend modules",
  "Realtime features using WebSocket, Socket.IO, Redis, and presence systems",
  "Responsive dashboards and frontend interfaces with Angular, React, and PrimeNG",
];

const timeline = [
  {
    year: "Jul 2025 - Present",
    title: "Junior Software Engineer, Bengal Mobile QA Solution",
    text: "Contributing to Hope, Shohay, and Otithi with full-stack feature ownership across backend services, frontend modules, APIs, realtime communication, and dashboard improvements.",
  },
  {
    year: "Mar 2025 - Jun 2025",
    title: "Associate Software Engineer, Bengal Mobile QA Solution",
    text: "Developed production features in a microservices architecture, including corporate pledging flow, NGO profile modules, hotel/property modules, provider checklists, and UI bug fixes.",
  },
  {
    year: "2020 - 2023",
    title: "BSc in Software Engineering, Daffodil International University",
    text: "Completed Software Engineering degree with CGPA 3.44 out of 4.00.",
  },
  {
    year: "2020 - 2024",
    title: "Leadership & Community",
    text: "Served as Joint Secretary at Data Sciences Club, DIU and ICT Administrator at Alor Shandhani Blood Foundation.",
  },
];

const highlights = [
  "Architected multi-tenancy features for Shohay Enterprise to support scalable corporate client onboarding.",
  "Integrated Elasticsearch into the Corporate Pledging Flow, improving data retrieval latency by 40%.",
  "Delivered NGO Profile and Hotel/Property modules from database design to frontend implementation.",
  "Built realtime backend communication with WebSocket, Socket.IO, and Redis based session/state management.",
  "Resolved critical dashboard issues and helped maintain 99.9% system uptime.",
];

const contactLinks = [
  {
    label: "Email",
    value: "angkon199@gmail.com\nashiful35-3017@diu.edu.bd",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=angkon199@gmail.com,ashiful35-3017@diu.edu.bd",
    icon: SiGmail,
    color: "text-[#ea4335]",
  },
  {
    label: "Phone",
    value: "+8801609884769",
    href: "tel:+8801609884769",
    icon: FaPhoneAlt,
    color: "text-[#9cdcfe]",
  },
  {
    label: "LinkedIn",
    value: "Ashiful Islam Istiuk",
    href: "https://www.linkedin.com/in/Ashiful-Islam-Istiuk/",
    icon: FaLinkedinIn,
    color: "text-[#0a66c2]",
  },
  {
    label: "GitHub",
    value: "Ashiful24",
    href: "https://github.com/Ashiful24",
    icon: SiGithub,
    color: "text-white",
  },
  {
    label: "Beecrowd",
    value: "Profile 463413",
    href: "https://www.beecrowd.com.br/judge/en/profile/463413",
    icon: FaCode,
    color: "text-[#c586c0]",
  },
];

const marqueeSkills = skillGroups.flatMap((group) => group.items);

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1e1e1e] text-[#d4d4d4]">
      <section className="relative isolate px-6 py-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(0,122,204,0.24),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(197,134,192,0.14),transparent_30%),linear-gradient(180deg,#252526_0%,#1e1e1e_65%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#007acc]/20 blur-3xl" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#3c3c3c] bg-[#252526]/80 px-5 py-4 backdrop-blur">
          <a href="#home" className="text-sm font-semibold tracking-[0.2em]">
            K. M. Ashiful Islam Istiuk
          </a>
          <div className="hidden items-center gap-8 text-sm text-[#cccccc] md:flex">
            <a className="transition hover:text-white" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-white" href="#work">
              Projects
            </a>
            <a className="transition hover:text-white" href="#skills">
              Skills
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </div>
          <a
            className="rounded-full bg-[#007acc] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3794ff]"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=angkon199@gmail.com&su=Portfolio%20Inquiry"
            target="_blank"
            rel="noreferrer"
          >
            Hire Me
          </a>
        </nav>

        <div className="skill-marquee-mask mx-auto mt-5 max-w-7xl overflow-hidden bg-[#252526]/60 py-1.5 backdrop-blur">
          <div className="skill-marquee-track flex w-max items-center gap-4 px-3">
            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => {
              const Icon = skill.icon;

              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#3c3c3c] bg-[#1e1e1e]"
                  title={skill.name}
                >
                  <Icon
                    aria-hidden="true"
                    className={`h-5 w-5 ${skill.color}`}
                  />
                  <span className="sr-only">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          id="home"
          className="mx-auto grid max-w-7xl items-center gap-10 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-16"
        >
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#007acc]/30 bg-[#007acc]/10 px-4 py-2 text-sm font-medium text-[#9cdcfe]">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-5.25 7-11a7 7 0 1 0-14 0c0 5.75 7 11 7 11Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10.5h.01"
                />
              </svg>
              Dhanmondi, Dhaka, Bangladesh
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Junior Software
              <span className="block bg-gradient-to-r from-[#569cd6] via-[#d4d4d4] to-[#c586c0] bg-clip-text text-transparent">
                Engineer
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#cccccc]">
              I am K. M. Ashiful Islam Istiuk, a software engineer building
              scalable full-stack applications with TypeScript, Node.js, NestJS,
              React, and Next.js. I work on REST APIs, microservices, realtime
              systems, and reliable database driven applications.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#experience"
                className="rounded-full bg-[#007acc] px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-[#3794ff]"
              >
                View Experience
              </a>
              <a
                href="https://www.linkedin.com/in/Ashiful-Islam-Istiuk/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#3c3c3c] px-7 py-4 text-center text-sm font-bold text-white transition hover:border-[#007acc] hover:bg-[#2d2d30]"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#007acc]/20 to-[#c586c0]/15 blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-[#3c3c3c] bg-[#252526]/90 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[2rem] border border-[#3c3c3c] bg-[#1e1e1e] p-6">
                <div>
                  <p className="text-sm text-white/50">Profile</p>
                  <h2 className="mt-1 text-2xl font-bold">
                    K. M. Ashiful Islam Istiuk
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    Junior Software Engineer
                  </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#3c3c3c] bg-[#1e1e1e] p-3">
                  <div className="relative h-80 overflow-hidden rounded-[1.5rem] bg-[#1e1e1e] sm:h-96">
                    <Image
                      src="/profile.png"
                      alt="K. M. Ashiful Islam Istiuk"
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 520px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e]/45 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-[#3c3c3c] bg-[#252526] p-4"
                    >
                      <p className="text-2xl font-black text-[#9cdcfe]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-white/55">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9cdcfe]">
                Skills
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                Technical stack for full-stack engineering.
              </h2>
            </div>
            <p className="max-w-xl text-[#cccccc]">
              Experienced across frontend, backend, realtime communication,
              databases, DevOps tools, and clean engineering practices.
            </p>
          </div>
          <div className="mt-10 grid gap-5">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6"
              >
                <h3 className="text-xl font-bold">{group.title}</h3>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {group.items.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className="group flex min-h-28 flex-col items-center justify-center rounded-3xl border border-[#3c3c3c] bg-[#1e1e1e] p-4 text-center transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30]"
                      >
                        <Icon
                          aria-hidden="true"
                          className={`h-9 w-9 transition group-hover:scale-110 ${skill.color}`}
                        />
                        <span className="mt-4 text-sm font-semibold text-white/80">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9cdcfe]">
              Experience
            </p>
            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Building internal products at Bengal Mobile QA Solution.
            </h2>
            <p className="mt-5 leading-8 text-[#cccccc]">
              I contributed to Hope, Shohay, and Otithi by taking end-to-end
              ownership of backend and frontend features in a microservices
              architecture.
            </p>
          </div>
          <div className="grid gap-4">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-[1.5rem] border border-[#3c3c3c] bg-[#252526] p-5 text-[#d4d4d4]"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c586c0]">
            Selected Work
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6 transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30]"
              >
                <div className="mb-10 flex h-44 items-end rounded-[1.5rem] bg-gradient-to-br from-[#3c3c3c] to-[#1e1e1e] p-5">
                  <span className="text-6xl font-black text-white/15">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="mt-3 leading-7 text-white/60">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#007acc]/15 px-3 py-1 text-xs font-semibold text-[#9cdcfe]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#007acc]/60 bg-[#007acc] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em]">
              Services
            </p>
            <h2 className="mt-5 text-4xl font-black">
              From API design to realtime user experiences.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6 text-lg font-semibold text-[#d4d4d4]"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9cdcfe]">
            Journey
          </p>
          <div className="mt-8 grid gap-4">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="grid gap-4 rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6 md:grid-cols-[120px_1fr]"
              >
                <p className="text-xl font-black text-[#9cdcfe]">{item.year}</p>
                <div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#3c3c3c] bg-[#252526] p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c586c0]">
            Contact
          </p>
          <h2 className="mt-5 text-4xl font-black sm:text-6xl">
            Let&apos;s build something great.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#cccccc]">
            Open to junior software engineering roles, full-stack product work,
            backend systems, and modern frontend development.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  aria-label={link.label}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-[#3c3c3c] bg-[#1e1e1e] p-5 text-left transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30]"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#3c3c3c] bg-[#252526]">
                    <Icon aria-hidden="true" className={`h-6 w-6 ${link.color}`} />
                  </span>
                  <span className="sr-only">{link.label}</span>
                  <span className="block min-w-0 whitespace-pre-line break-words text-sm font-semibold text-white">
                    {link.value}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
