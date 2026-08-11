import Link from "next/link";
import type { IconType } from "react-icons";
import AnimatedSection from "@/components/AnimatedSection";
import DeveloperProfile from "@/components/DeveloperProfile";
import DevSectionLabel from "@/components/DevSectionLabel";
import Footer from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";
import Navbar from "@/components/Navbar";
import ProjectCard, { type Project } from "@/components/ProjectCard";
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
  { value: "500+", label: "APIs developed" },
  { value: "6", label: "Production-grade projects" },
  { value: "200+", label: "Problems solved on Beecrowd" },
];

const buildMetric = {
  value: "40%",
  label: "search latency improvement",
};

const linkedInUrl = "https://www.linkedin.com/in/Ashiful-Islam-Istiuk/";

const projects: Project[] = [
  {
    file: "hotel_ticketing.service.ts",
    title: "Hotel Ticketing System",
    description:
      "Engineered a robust NestJS backend with Prisma ORM, modular architecture, custom guards, interceptors, decorators, JWT based RBAC, 30+ documented APIs, advanced filtering, pagination, and Jest unit testing.",
    tags: ["NestJS", "Prisma", "JWT", "Jest"],
    github: "https://github.com/Ashiful24/hotel-ticketing-system",
  },
  {
    file: "ecommerce_api.module.ts",
    title: "E-commerce REST API",
    description:
      "Developed an e-commerce backend focused on relational data integrity, order processing, and maintainable NestJS modules for users, products, categories, and orders.",
    tags: ["NestJS", "Prisma", "REST API"],
    github: "https://github.com/Ashiful24/E-commers-backend",
  },
  {
    file: "g_salon.page.tsx",
    title: "G-Salon",
    description:
      "Built and deployed a production-ready salon website with responsive UI, service listings, appointment booking, and performance optimization.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    github: "https://github.com/Ashiful24/G-Salon",
    live: "https://g-saloon.vercel.app",
  },
  {
    file: "eventify.cs",
    title: "Eventify",
    description:
      "Created an event management platform as a C# console application using OOP principles for venue exploration, organizer management, event creation, ticket issuing, and bookings.",
    tags: ["C#", "OOP", "Console App"],
    github: "https://github.com/Ashiful24/Eventify",
  },
  {
    file: "todo_app.dart",
    title: "To Do App",
    description:
      "Implemented a mobile task app with add, complete, and delete flows using Flutter and Hive, focusing on practical productivity and simple UI interactions.",
    tags: ["Flutter", "Hive", "Mobile"],
    github: "https://github.com/Ashiful24/ToDoApp",
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

const testimonials = [
  {
    quote:
      "Ashiful has been my client for the last 12 years at my salon. Recently, I requested him to create a website for my salon, and he did an amazing job. I'm really happy with the result and truly appreciate his work. Highly recommended!",
    name: "Gaoranggo Chandra Sill",
    role: "G-Salon",
  },
  {
    quote:
      "Add a testimonial about a specific project or strength — reliability, code quality, or problem solving.",
    name: "Add Name",
    role: "Add Role, Company",
  },
  {
    quote:
      "Add feedback from a client or collaborator on a freelance or academic project.",
    name: "Add Name",
    role: "Add Role, Company",
  },
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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <section className="relative z-10 px-6 py-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(0,122,204,0.24),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(197,134,192,0.14),transparent_30%),linear-gradient(180deg,#252526_0%,#1e1e1e_65%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#007acc]/20 blur-3xl" />

        {/* Hero code watermarks */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <div className="absolute -left-6 top-[8%] rotate-[-12deg] font-mono text-[10rem] font-black leading-none text-[#007acc]/[0.06] sm:text-[14rem]">
            {"{ }"}
          </div>
          <div className="absolute -right-4 top-[5%] rotate-[8deg] font-mono text-[8rem] font-black leading-none text-[#c586c0]/[0.06] sm:text-[11rem]">
            {"</>"}
          </div>
          <div className="absolute left-[5%] top-[55%] space-y-3 font-mono text-[11px] text-[#569cd6]/[0.1] sm:text-xs">
            <p>const app = createServer();</p>
            <p>app.use(cors());</p>
            <p>app.listen(3000);</p>
          </div>
          <div className="absolute right-[6%] top-[40%] space-y-3 text-right font-mono text-[11px] text-[#4ec9b0]/[0.09] sm:text-xs">
            <p>@Controller(&apos;/api&apos;)</p>
            <p>@Injectable()</p>
            <p>export class AppService {"{}"}</p>
          </div>
          <div className="absolute left-[30%] top-[25%] font-mono text-[5rem] font-black text-[#c586c0]/[0.05]">
            {"=>"}
          </div>
          <div className="absolute right-[20%] top-[70%] font-mono text-[6rem] font-bold text-[#d4d4d4]/[0.04]">;</div>
          <div className="absolute bottom-[8%] left-[15%] font-mono text-[11px] text-[#ce9178]/[0.08] sm:text-xs">
            async function deploy(config: Config): Promise&lt;void&gt;
          </div>
          <div className="absolute bottom-[20%] right-[10%] font-mono text-[5rem] font-black text-[#569cd6]/[0.05]">
            {"|>"}
          </div>
        </div>

        <Navbar />

        <div
          id="home"
          className="mx-auto grid max-w-7xl items-start gap-10 pb-20 pt-12 lg:grid-cols-[minmax(0,1fr)_36rem] lg:gap-x-5 lg:pb-28 lg:pt-16"
        >
          <div className="min-w-0">
            <p className="mb-2 inline-flex items-center gap-2 rounded-lg border border-[#3c3c3c] bg-[#252526] px-4 py-2 font-mono text-sm text-[#9cdcfe]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#28c840]" />
              open_to_work · ~/dhaka/bd
            </p>

            <h1 className="mt-1 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Junior
              <span className="block bg-gradient-to-r from-[#569cd6] via-[#d4d4d4] to-[#c586c0] bg-clip-text text-transparent">
                Software Engineer
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#cccccc]">
              I am K. M. Ashiful Islam Istiuk, a software engineer building
              scalable full-stack applications with TypeScript, Node.js, NestJS,
              React, and Next.js. I work on REST APIs, microservices, realtime
              systems, and reliable database driven applications.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/resume"
                className="rounded-full bg-[#007acc] px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-[#3794ff]"
              >
                View Resume
              </Link>
              <a
                href="#experience"
                className="rounded-full border border-[#3c3c3c] px-7 py-4 text-center text-sm font-bold text-white transition hover:border-[#007acc] hover:bg-[#2d2d30]"
              >
                View Experience
              </a>
            </div>
          </div>

          <DeveloperProfile
            stats={stats}
            buildMetric={buildMetric}
            linkedInUrl={linkedInUrl}
          />
        </div>
      </section>

      <AnimatedSection id="skills" className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <DevSectionLabel
                label="Technical stack for full-stack engineering."
                comment="// skills.ts"
              />
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
                <h3 className="font-mono text-sm text-[#569cd6]">
                  import {"{"} {group.title.toLowerCase().replace(/\s+/g, "_")}{" "}
                  {"}"} from &apos;./stack&apos;;
                </h3>
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
      </AnimatedSection>

      <AnimatedSection id="experience" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <DevSectionLabel
              label="Building internal products at Bengal Mobile QA Solution."
              comment="// experience.log"
            />
            <p className="mt-5 leading-8 text-[#cccccc]">
              I contributed to Hope, Shohay, and Otithi by taking end-to-end
              ownership of backend and frontend features in a microservices
              architecture.
            </p>
          </div>
          <div className="grid gap-4">
            {highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="rounded-[1.5rem] border border-[#3c3c3c] bg-[#252526] p-5 font-mono text-sm text-[#d4d4d4]"
              >
                <span className="text-[#6a9955]">
                  [{String(index + 1).padStart(2, "0")}]
                </span>{" "}
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="work" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel
            label="Selected Work"
            comment="// projects/"
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#007acc]/60 bg-[#007acc] p-8 text-white">
            <p className="font-mono text-sm text-white/70">{"// services.ts"}</p>
            <h2 className="mt-3 text-4xl font-black">
              From API design to realtime user experiences.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={service}
                className="rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6 font-mono text-sm text-[#d4d4d4]"
              >
                <span className="text-[#c586c0]">export const</span> service_
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-[#6a9955]">=</span>{" "}
                <span className="text-[#ce9178]">&quot;{service}&quot;</span>;
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel label="Journey" comment="// git log --oneline" />
          <div className="relative mt-10 space-y-10 border-l border-[#3c3c3c] pl-8 sm:pl-10">
            {timeline.map((item) => (
              <div key={item.title} className="relative">
                <span className="absolute -left-[2.55rem] top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-[#007acc] bg-[#1e1e1e] sm:-left-[3.05rem]">
                  <span className="h-2 w-2 rounded-full bg-[#007acc]" />
                </span>
                <p className="font-mono text-xs font-bold text-[#6a9955]">
                  commit {item.year}
                </p>
                <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-3xl leading-7 text-white/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel
            label="What people say about working with me."
            comment="// testimonials.json"
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name + testimonial.quote}
                className="flex h-full flex-col rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6"
              >
                <p className="font-mono text-xs text-[#6a9955]">
                  {"/* review */"}
                </p>
                <p className="mt-3 flex-1 leading-7 text-[#cccccc]">
                  {testimonial.quote}
                </p>
                <div className="mt-5 border-t border-[#3c3c3c] pt-4 font-mono text-xs">
                  <p className="font-bold text-[#9cdcfe]">
                    — {testimonial.name}
                  </p>
                  <p className="text-[#858585]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#3c3c3c] bg-[#252526] p-8 text-center sm:p-12">
          <div className="flex justify-center">
            <DevSectionLabel
              label="Let's build something great."
              comment="// contact.ts → send()"
            />
          </div>
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
      </AnimatedSection>

      <Footer />
      <FloatingMenu />
    </main>
  );
}
