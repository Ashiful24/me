"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import SkillPopup, { type SkillDetail } from "./SkillPopup";
import {
  FaCogs,
  FaDatabase,
  FaLayerGroup,
  FaNetworkWired,
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

type SkillGroup = {
  title: string;
  items: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178c6]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#f7df1e]" },
      { name: "C", icon: SiC, color: "text-[#a8b9cc]" },
      { name: "C#", icon: SiSharp, color: "text-[#9b4f96]" },
    ],
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
    ],
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
    ],
  },
  {
    title: "Realtime & Database",
    items: [
      { name: "Redis", icon: SiRedis, color: "text-[#ff4438]" },
      { name: "WebSocket", icon: FaNetworkWired, color: "text-[#9cdcfe]" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "text-white" },
      { name: "Cassandra", icon: SiApachecassandra, color: "text-[#1287b1]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169e1]" },
      { name: "Session Management", icon: FaUsersCog, color: "text-[#c586c0]" },
    ],
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
      { name: "Agile/Scrum", icon: FaProjectDiagram, color: "text-[#9cdcfe]" },
      { name: "Microservices", icon: FaLayerGroup, color: "text-[#c586c0]" },
      { name: "SOLID", icon: FaCogs, color: "text-[#9cdcfe]" },
    ],
  },
];

const skillDetails: Record<string, Omit<SkillDetail, "name" | "icon" | "color">> = {
  TypeScript: {
    knowledge: "Advanced type system, generics, utility types, discriminated unions, type guards, declaration files, and strict mode configuration.",
    experience: "Primary language at Bengal Mobile QA Solution for all backend (NestJS) and frontend (Angular, Next.js) services. Used in every production project.",
    stats: "2+ years daily usage · 500+ APIs written in TS · Used in 6 production projects",
  },
  JavaScript: {
    knowledge: "ES6+ features, closures, prototypal inheritance, async/await, event loop, DOM manipulation, module systems (CommonJS, ESM).",
    experience: "Foundation language before TypeScript adoption. Used in scripting, Node.js backend prototyping, and frontend tasks.",
    stats: "3+ years experience · Pre-TypeScript foundation language",
  },
  C: {
    knowledge: "Pointers, memory management, data structures implementation, file I/O, and algorithmic problem solving.",
    experience: "Used during BSc coursework at Daffodil International University for data structures and algorithm courses.",
    stats: "University coursework · Problem solving on Beecrowd",
  },
  "C#": {
    knowledge: "OOP principles, classes, interfaces, inheritance, LINQ, console application architecture, and event-driven programming.",
    experience: "Built Eventify — a C# console application for event management with OOP patterns including venue exploration and ticket issuing.",
    stats: "1 production project (Eventify) · OOP-focused development",
  },
  "React.js": {
    knowledge: "Hooks, context API, custom hooks, component composition, state management, React Router, performance optimization with memo/useMemo/useCallback.",
    experience: "Used for frontend development at Bengal Mobile QA Solution (Hope, Shohay). Built G-Salon website and this portfolio with React.",
    stats: "2+ years · 3 production projects · Component-driven architecture",
  },
  "Next.js": {
    knowledge: "App Router, Server Components, SSR/SSG/ISR, API routes, middleware, image optimization, font loading, and deployment on Vercel.",
    experience: "Built G-Salon production website and this portfolio. Used for server-rendered React applications with optimized performance.",
    stats: "2 deployed projects · Vercel deployment · SEO optimized builds",
  },
  Angular: {
    knowledge: "Components, services, dependency injection, RxJS observables, reactive forms, routing, modules, pipes, and lifecycle hooks.",
    experience: "Used at Bengal Mobile QA Solution for Shohay and Hope dashboard frontends with PrimeNG and DevExtreme UI libraries.",
    stats: "Production dashboards at BMQS · RxJS-heavy data flows",
  },
  RxJS: {
    knowledge: "Observables, subjects, operators (map, filter, switchMap, mergeMap, combineLatest), error handling, and subscription management.",
    experience: "Heavily used with Angular at BMQS for handling async data streams, API responses, and real-time state management.",
    stats: "Daily usage with Angular · Complex operator chains in production",
  },
  "Material UI": {
    knowledge: "Component library, theming, styled components, responsive grid, form controls, dialogs, and data display components.",
    experience: "Used for React-based admin panels and dashboard interfaces requiring consistent Material Design components.",
    stats: "Used in React dashboard projects",
  },
  DevExtreme: {
    knowledge: "Data grids, charts, form components, scheduling, and complex data visualization widgets for enterprise applications.",
    experience: "Used at Bengal Mobile QA Solution for enterprise dashboard features in Shohay and Hope platforms.",
    stats: "Production enterprise dashboards · Complex data grid implementations",
  },
  PrimeNG: {
    knowledge: "Rich UI component library for Angular — tables, forms, dialogs, menus, charts, and responsive layouts.",
    experience: "Primary UI library for Angular projects at BMQS. Built data-heavy dashboards with PrimeNG DataTable and forms.",
    stats: "Primary Angular UI library at BMQS · Data-heavy interfaces",
  },
  HTML5: {
    knowledge: "Semantic elements, accessibility (ARIA), forms, canvas, local storage, and responsive meta tags.",
    experience: "Used across all frontend projects for semantic markup, SEO-friendly structure, and accessible interfaces.",
    stats: "Foundation of all frontend work · Semantic + accessible markup",
  },
  CSS3: {
    knowledge: "Flexbox, Grid, animations, transitions, custom properties, media queries, pseudo-elements, and responsive design patterns.",
    experience: "Used with Tailwind CSS, custom styles, and component libraries across all frontend projects.",
    stats: "All projects · Tailwind CSS + custom styling",
  },
  "Node.js": {
    knowledge: "Event-driven architecture, streams, file system operations, child processes, clustering, and npm ecosystem.",
    experience: "Runtime for all backend services at Bengal Mobile QA Solution. Foundation for NestJS and Express.js applications.",
    stats: "2+ years · Runtime for all backend services · 500+ APIs",
  },
  NestJS: {
    knowledge: "Modules, controllers, services, guards, interceptors, pipes, decorators, middleware, microservices, WebSocket gateways, and testing with Jest.",
    experience: "Primary backend framework at BMQS. Built Hotel Ticketing System, E-commerce API, and production services for Hope/Shohay/Otithi.",
    stats: "Primary framework · 500+ APIs · 4+ production projects · Custom decorators & guards",
  },
  "Express.js": {
    knowledge: "Middleware pattern, routing, error handling, request/response cycle, and REST API design.",
    experience: "Used for lightweight API services and prototyping before NestJS adoption.",
    stats: "Used in early projects · Foundation before NestJS",
  },
  "REST APIs": {
    knowledge: "RESTful design principles, HTTP methods, status codes, pagination, filtering, sorting, rate limiting, and API versioning.",
    experience: "Designed and built 500+ REST API endpoints across multiple production projects with Swagger documentation.",
    stats: "500+ endpoints · Swagger documented · Production-grade",
  },
  "Prisma ORM": {
    knowledge: "Schema design, migrations, relations, raw queries, transactions, seeding, and Prisma Client for type-safe database access.",
    experience: "Primary ORM for all NestJS projects. Used in Hotel Ticketing System, E-commerce API, and BMQS production services.",
    stats: "Primary ORM · Used in 4+ projects · Type-safe DB access",
  },
  "Drizzle ORM": {
    knowledge: "Schema definition, query builder, migrations, joins, and lightweight SQL-first approach.",
    experience: "Explored as an alternative ORM for lightweight TypeScript projects requiring closer SQL control.",
    stats: "Explored for specific use cases · SQL-first approach",
  },
  Redis: {
    knowledge: "Key-value storage, pub/sub messaging, caching strategies, TTL, session storage, and distributed state management.",
    experience: "Used at BMQS for session management, caching, real-time presence systems, and WebSocket state synchronization.",
    stats: "Production caching · Session management · Real-time state sync",
  },
  WebSocket: {
    knowledge: "Full-duplex communication, connection lifecycle, message framing, heartbeats, and reconnection strategies.",
    experience: "Built real-time communication features at BMQS for presence systems, live notifications, and dashboard updates.",
    stats: "Real-time features in production · Presence systems",
  },
  "Socket.IO": {
    knowledge: "Event-based communication, rooms, namespaces, acknowledgments, middleware, and fallback transports.",
    experience: "Used with NestJS WebSocket gateways at BMQS for real-time dashboard features and live state synchronization.",
    stats: "Production real-time features · NestJS gateway integration",
  },
  Cassandra: {
    knowledge: "Wide-column store, CQL, partition keys, clustering columns, data modeling for distributed systems, and replication.",
    experience: "Used at BMQS for high-throughput data storage requirements in distributed microservices architecture.",
    stats: "Production distributed data · High-throughput storage",
  },
  PostgreSQL: {
    knowledge: "Relational design, indexes, joins, transactions, views, CTEs, JSON columns, and performance optimization.",
    experience: "Primary database for all NestJS projects via Prisma ORM. Used in Hotel Ticketing, E-commerce, and BMQS services.",
    stats: "Primary database · All NestJS projects · Complex relational schemas",
  },
  "Session Management": {
    knowledge: "Server-side sessions, JWT tokens, refresh tokens, Redis-backed sessions, cookie security, and RBAC patterns.",
    experience: "Implemented JWT-based RBAC in Hotel Ticketing System. Built Redis-backed session management at BMQS.",
    stats: "JWT + Redis sessions · RBAC implementation · Production auth flows",
  },
  Git: {
    knowledge: "Branching strategies, merge/rebase, conflict resolution, cherry-pick, stash, bisect, and Git hooks.",
    experience: "Daily version control tool. Used with GitHub and Bitbucket for team collaboration at BMQS.",
    stats: "Daily usage · Team collaboration · Branch-based workflows",
  },
  GitHub: {
    knowledge: "Pull requests, code reviews, issues, actions, project boards, and repository management.",
    experience: "Personal projects hosted on GitHub. Code collaboration, PR reviews, and project management.",
    stats: "12+ public repositories · All personal projects",
  },
  Bitbucket: {
    knowledge: "Pull requests, pipelines, branch permissions, and Jira integration for enterprise workflows.",
    experience: "Used at Bengal Mobile QA Solution for enterprise code management with team branch workflows.",
    stats: "Enterprise usage at BMQS · Team collaboration",
  },
  Docker: {
    knowledge: "Dockerfiles, multi-stage builds, docker-compose, volumes, networking, and container orchestration basics.",
    experience: "Used for containerizing NestJS backends, PostgreSQL databases, and Redis instances in development and production.",
    stats: "Backend containerization · docker-compose for dev environments",
  },
  Postman: {
    knowledge: "API testing, collections, environments, pre-request scripts, test assertions, and API documentation generation.",
    experience: "Primary API testing tool for all REST API development. Used to test and document 500+ endpoints.",
    stats: "500+ endpoints tested · Collection-based API workflows",
  },
  Swagger: {
    knowledge: "OpenAPI specification, decorator-based documentation, schema generation, and interactive API exploration.",
    experience: "Integrated with NestJS using @nestjs/swagger for auto-generated API documentation across all backend projects.",
    stats: "All NestJS projects documented · Auto-generated from decorators",
  },
  TablePlus: {
    knowledge: "Database GUI for PostgreSQL, MySQL, Redis — query editor, data browsing, import/export, and SSH tunneling.",
    experience: "Primary database management tool for inspecting, querying, and managing PostgreSQL databases in development.",
    stats: "Daily database management tool",
  },
  "Agile/Scrum": {
    knowledge: "Sprint planning, daily standups, retrospectives, user stories, story points, and iterative delivery.",
    experience: "Followed Agile/Scrum methodology at Bengal Mobile QA Solution with 2-week sprint cycles and daily standups.",
    stats: "Daily practice at BMQS · 2-week sprint cycles",
  },
  Microservices: {
    knowledge: "Service decomposition, API gateways, inter-service communication, event-driven architecture, and distributed systems patterns.",
    experience: "Worked on microservices architecture at BMQS for Hope, Shohay, and Otithi — separate services for different domains.",
    stats: "3 production microservice systems · Multi-service architecture",
  },
  SOLID: {
    knowledge: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.",
    experience: "Applied SOLID principles across all NestJS backend projects for maintainable, testable, and scalable code architecture.",
    stats: "Applied in all backend projects · Clean architecture patterns",
  },
};

export default function SkillsGrid() {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);

  const handleSkillClick = (skill: Skill) => {
    const detail = skillDetails[skill.name];
    if (detail) {
      setActiveSkill({
        name: skill.name,
        icon: skill.icon,
        color: skill.color,
        ...detail,
      });
    }
  };

  return (
    <>
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
                  <button
                    type="button"
                    key={skill.name}
                    onClick={() => handleSkillClick(skill)}
                    className="group flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#3c3c3c] bg-[#1e1e1e] p-4 text-center transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30] active:scale-95"
                  >
                    <Icon
                      aria-hidden="true"
                      className={`h-9 w-9 transition group-hover:scale-110 ${skill.color}`}
                    />
                    <span className="mt-4 text-sm font-semibold text-white/80">
                      {skill.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {activeSkill && (
        <SkillPopup skill={activeSkill} onClose={() => setActiveSkill(null)} />
      )}
    </>
  );
}
