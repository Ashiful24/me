import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, Role, UserStatus } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { title: "TypeScript", iconKey: "SiTypescript", color: "text-[#3178c6]" },
      { title: "JavaScript", iconKey: "SiJavascript", color: "text-[#f7df1e]" },
      { title: "C", iconKey: "SiC", color: "text-[#a8b9cc]" },
      { title: "C#", iconKey: "SiSharp", color: "text-[#9b4f96]" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { title: "React.js", iconKey: "SiReact", color: "text-[#61dafb]" },
      { title: "Next.js", iconKey: "SiNextdotjs", color: "text-white" },
      { title: "Angular", iconKey: "SiAngular", color: "text-[#dd0031]" },
      { title: "RxJS", iconKey: "SiReactivex", color: "text-[#b7178c]" },
      { title: "Material UI", iconKey: "SiMui", color: "text-[#007fff]" },
      { title: "DevExtreme", iconKey: "SiDevexpress", color: "text-[#ff7200]" },
      { title: "PrimeNG", iconKey: "SiPrimeng", color: "text-[#dd0031]" },
      { title: "HTML5", iconKey: "SiHtml5", color: "text-[#e34f26]" },
      { title: "CSS3", iconKey: "SiCss", color: "text-[#663399]" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { title: "Node.js", iconKey: "SiNodedotjs", color: "text-[#5fa04e]" },
      { title: "NestJS", iconKey: "SiNestjs", color: "text-[#e0234e]" },
      { title: "Express.js", iconKey: "SiExpress", color: "text-white" },
      { title: "REST APIs", iconKey: "FaPlug", color: "text-[#9cdcfe]" },
      { title: "Prisma ORM", iconKey: "SiPrisma", color: "text-[#2d3748]" },
      { title: "Drizzle ORM", iconKey: "SiDrizzle", color: "text-[#c5f74f]" },
    ],
  },
  {
    title: "Realtime & Database",
    skills: [
      { title: "Redis", iconKey: "SiRedis", color: "text-[#ff4438]" },
      { title: "WebSocket", iconKey: "FaNetworkWired", color: "text-[#9cdcfe]" },
      { title: "Socket.IO", iconKey: "SiSocketdotio", color: "text-white" },
      {
        title: "Cassandra",
        iconKey: "SiApachecassandra",
        color: "text-[#1287b1]",
      },
      { title: "PostgreSQL", iconKey: "SiPostgresql", color: "text-[#4169e1]" },
      {
        title: "Session Management",
        iconKey: "FaUsersCog",
        color: "text-[#c586c0]",
      },
    ],
  },
  {
    title: "Tools & Practices",
    skills: [
      { title: "Git", iconKey: "SiGit", color: "text-[#f05032]" },
      { title: "GitHub", iconKey: "SiGithub", color: "text-white" },
      { title: "Bitbucket", iconKey: "SiBitbucket", color: "text-[#0052cc]" },
      { title: "Docker", iconKey: "SiDocker", color: "text-[#2496ed]" },
      { title: "Postman", iconKey: "SiPostman", color: "text-[#ff6c37]" },
      { title: "Swagger", iconKey: "SiSwagger", color: "text-[#85ea2d]" },
      { title: "TablePlus", iconKey: "FaDatabase", color: "text-amber-200" },
      {
        title: "Agile/Scrum",
        iconKey: "FaProjectDiagram",
        color: "text-[#9cdcfe]",
      },
      {
        title: "Microservices",
        iconKey: "FaLayerGroup",
        color: "text-[#c586c0]",
      },
      { title: "SOLID", iconKey: "FaCogs", color: "text-[#9cdcfe]" },
    ],
  },
] as const;

const skillDetails: Record<
  string,
  { knowledge: string; experience: string; stats: string }
> = {
  TypeScript: {
    knowledge:
      "Advanced type system, generics, utility types, discriminated unions, type guards, declaration files, and strict mode configuration.",
    experience:
      "Primary language at Bengal Mobile QA Solution for all backend (NestJS) and frontend (Angular, Next.js) services. Used in every production project.",
    stats:
      "2+ years daily usage · 500+ APIs written in TS · Used in 6 production projects",
  },
  JavaScript: {
    knowledge:
      "ES6+ features, closures, prototypal inheritance, async/await, event loop, DOM manipulation, module systems (CommonJS, ESM).",
    experience:
      "Foundation language before TypeScript adoption. Used in scripting, Node.js backend prototyping, and frontend tasks.",
    stats: "3+ years experience · Pre-TypeScript foundation language",
  },
  C: {
    knowledge:
      "Pointers, memory management, data structures implementation, file I/O, and algorithmic problem solving.",
    experience:
      "Used during BSc coursework at Daffodil International University for data structures and algorithm courses.",
    stats: "University coursework · Problem solving on Beecrowd",
  },
  "C#": {
    knowledge:
      "OOP principles, classes, interfaces, inheritance, LINQ, console application architecture, and event-driven programming.",
    experience:
      "Built Eventify — a C# console application for event management with OOP patterns including venue exploration and ticket issuing.",
    stats: "1 production project (Eventify) · OOP-focused development",
  },
  "React.js": {
    knowledge:
      "Hooks, context API, custom hooks, component composition, state management, React Router, performance optimization with memo/useMemo/useCallback.",
    experience:
      "Used for frontend development at Bengal Mobile QA Solution (Hope, Shohay). Built G-Salon website and this portfolio with React.",
    stats: "2+ years · 3 production projects · Component-driven architecture",
  },
  "Next.js": {
    knowledge:
      "App Router, Server Components, SSR/SSG/ISR, API routes, middleware, image optimization, font loading, and deployment on Vercel.",
    experience:
      "Built G-Salon production website and this portfolio. Used for server-rendered React applications with optimized performance.",
    stats: "2 deployed projects · Vercel deployment · SEO optimized builds",
  },
  Angular: {
    knowledge:
      "Components, services, dependency injection, RxJS observables, reactive forms, routing, modules, pipes, and lifecycle hooks.",
    experience:
      "Used at Bengal Mobile QA Solution for Shohay and Hope dashboard frontends with PrimeNG and DevExtreme UI libraries.",
    stats: "Production dashboards at BMQS · RxJS-heavy data flows",
  },
  RxJS: {
    knowledge:
      "Observables, subjects, operators (map, filter, switchMap, mergeMap, combineLatest), error handling, and subscription management.",
    experience:
      "Heavily used with Angular at BMQS for handling async data streams, API responses, and real-time state management.",
    stats: "Daily usage with Angular · Complex operator chains in production",
  },
  "Material UI": {
    knowledge:
      "Component library, theming, styled components, responsive grid, form controls, dialogs, and data display components.",
    experience:
      "Used for React-based admin panels and dashboard interfaces requiring consistent Material Design components.",
    stats: "Used in React dashboard projects",
  },
  DevExtreme: {
    knowledge:
      "Data grids, charts, form components, scheduling, and complex data visualization widgets for enterprise applications.",
    experience:
      "Used at Bengal Mobile QA Solution for enterprise dashboard features in Shohay and Hope platforms.",
    stats:
      "Production enterprise dashboards · Complex data grid implementations",
  },
  PrimeNG: {
    knowledge:
      "Rich UI component library for Angular — tables, forms, dialogs, menus, charts, and responsive layouts.",
    experience:
      "Primary UI library for Angular projects at BMQS. Built data-heavy dashboards with PrimeNG DataTable and forms.",
    stats: "Primary Angular UI library at BMQS · Data-heavy interfaces",
  },
  HTML5: {
    knowledge:
      "Semantic elements, accessibility (ARIA), forms, canvas, local storage, and responsive meta tags.",
    experience:
      "Used across all frontend projects for semantic markup, SEO-friendly structure, and accessible interfaces.",
    stats: "Foundation of all frontend work · Semantic + accessible markup",
  },
  CSS3: {
    knowledge:
      "Flexbox, Grid, animations, transitions, custom properties, media queries, pseudo-elements, and responsive design patterns.",
    experience:
      "Used with Tailwind CSS, custom styles, and component libraries across all frontend projects.",
    stats: "All projects · Tailwind CSS + custom styling",
  },
  "Node.js": {
    knowledge:
      "Event-driven architecture, streams, file system operations, child processes, clustering, and npm ecosystem.",
    experience:
      "Runtime for all backend services at Bengal Mobile QA Solution. Foundation for NestJS and Express.js applications.",
    stats: "2+ years · Runtime for all backend services · 500+ APIs",
  },
  NestJS: {
    knowledge:
      "Modules, controllers, services, guards, interceptors, pipes, decorators, middleware, microservices, WebSocket gateways, and testing with Jest.",
    experience:
      "Primary backend framework at BMQS. Built Hotel Ticketing System, E-commerce API, and production services for Hope/Shohay/Otithi.",
    stats:
      "Primary framework · 500+ APIs · 4+ production projects · Custom decorators & guards",
  },
  "Express.js": {
    knowledge:
      "Middleware pattern, routing, error handling, request/response cycle, and REST API design.",
    experience:
      "Used for lightweight API services and prototyping before NestJS adoption.",
    stats: "Used in early projects · Foundation before NestJS",
  },
  "REST APIs": {
    knowledge:
      "RESTful design principles, HTTP methods, status codes, pagination, filtering, sorting, rate limiting, and API versioning.",
    experience:
      "Designed and built 500+ REST API endpoints across multiple production projects with Swagger documentation.",
    stats: "500+ endpoints · Swagger documented · Production-grade",
  },
  "Prisma ORM": {
    knowledge:
      "Schema design, migrations, relations, raw queries, transactions, seeding, and Prisma Client for type-safe database access.",
    experience:
      "Primary ORM for all NestJS projects. Used in Hotel Ticketing System, E-commerce API, and BMQS production services.",
    stats: "Primary ORM · Used in 4+ projects · Type-safe DB access",
  },
  "Drizzle ORM": {
    knowledge:
      "Schema definition, query builder, migrations, joins, and lightweight SQL-first approach.",
    experience:
      "Explored as an alternative ORM for lightweight TypeScript projects requiring closer SQL control.",
    stats: "Explored for specific use cases · SQL-first approach",
  },
  Redis: {
    knowledge:
      "Key-value storage, pub/sub messaging, caching strategies, TTL, session storage, and distributed state management.",
    experience:
      "Used at BMQS for session management, caching, real-time presence systems, and WebSocket state synchronization.",
    stats: "Production caching · Session management · Real-time state sync",
  },
  WebSocket: {
    knowledge:
      "Full-duplex communication, connection lifecycle, message framing, heartbeats, and reconnection strategies.",
    experience:
      "Built real-time communication features at BMQS for presence systems, live notifications, and dashboard updates.",
    stats: "Real-time features in production · Presence systems",
  },
  "Socket.IO": {
    knowledge:
      "Event-based communication, rooms, namespaces, acknowledgments, middleware, and fallback transports.",
    experience:
      "Used with NestJS WebSocket gateways at BMQS for real-time dashboard features and live state synchronization.",
    stats: "Production real-time features · NestJS gateway integration",
  },
  Cassandra: {
    knowledge:
      "Wide-column store, CQL, partition keys, clustering columns, data modeling for distributed systems, and replication.",
    experience:
      "Used at BMQS for high-throughput data storage requirements in distributed microservices architecture.",
    stats: "Production distributed data · High-throughput storage",
  },
  PostgreSQL: {
    knowledge:
      "Relational design, indexes, joins, transactions, views, CTEs, JSON columns, and performance optimization.",
    experience:
      "Primary database for all NestJS projects via Prisma ORM. Used in Hotel Ticketing, E-commerce, and BMQS services.",
    stats:
      "Primary database · All NestJS projects · Complex relational schemas",
  },
  "Session Management": {
    knowledge:
      "Server-side sessions, JWT tokens, refresh tokens, Redis-backed sessions, cookie security, and RBAC patterns.",
    experience:
      "Implemented JWT-based RBAC in Hotel Ticketing System. Built Redis-backed session management at BMQS.",
    stats: "JWT + Redis sessions · RBAC implementation · Production auth flows",
  },
  Git: {
    knowledge:
      "Branching strategies, merge/rebase, conflict resolution, cherry-pick, stash, bisect, and Git hooks.",
    experience:
      "Daily version control tool. Used with GitHub and Bitbucket for team collaboration at BMQS.",
    stats: "Daily usage · Team collaboration · Branch-based workflows",
  },
  GitHub: {
    knowledge:
      "Pull requests, code reviews, issues, actions, project boards, and repository management.",
    experience:
      "Personal projects hosted on GitHub. Code collaboration, PR reviews, and project management.",
    stats: "12+ public repositories · All personal projects",
  },
  Bitbucket: {
    knowledge:
      "Pull requests, pipelines, branch permissions, and Jira integration for enterprise workflows.",
    experience:
      "Used at Bengal Mobile QA Solution for enterprise code management with team branch workflows.",
    stats: "Enterprise usage at BMQS · Team collaboration",
  },
  Docker: {
    knowledge:
      "Dockerfiles, multi-stage builds, docker-compose, volumes, networking, and container orchestration basics.",
    experience:
      "Used for containerizing NestJS backends, PostgreSQL databases, and Redis instances in development and production.",
    stats: "Backend containerization · docker-compose for dev environments",
  },
  Postman: {
    knowledge:
      "API testing, collections, environments, pre-request scripts, test assertions, and API documentation generation.",
    experience:
      "Primary API testing tool for all REST API development. Used to test and document 500+ endpoints.",
    stats: "500+ endpoints tested · Collection-based API workflows",
  },
  Swagger: {
    knowledge:
      "OpenAPI specification, decorator-based documentation, schema generation, and interactive API exploration.",
    experience:
      "Integrated with NestJS using @nestjs/swagger for auto-generated API documentation across all backend projects.",
    stats: "All NestJS projects documented · Auto-generated from decorators",
  },
  TablePlus: {
    knowledge:
      "Database GUI for PostgreSQL, MySQL, Redis — query editor, data browsing, import/export, and SSH tunneling.",
    experience:
      "Primary database management tool for inspecting, querying, and managing PostgreSQL databases in development.",
    stats: "Daily database management tool",
  },
  "Agile/Scrum": {
    knowledge:
      "Sprint planning, daily standups, retrospectives, user stories, story points, and iterative delivery.",
    experience:
      "Followed Agile/Scrum methodology at Bengal Mobile QA Solution with 2-week sprint cycles and daily standups.",
    stats: "Daily practice at BMQS · 2-week sprint cycles",
  },
  Microservices: {
    knowledge:
      "Service decomposition, API gateways, inter-service communication, event-driven architecture, and distributed systems patterns.",
    experience:
      "Worked on microservices architecture at BMQS for Hope, Shohay, and Otithi — separate services for different domains.",
    stats: "3 production microservice systems · Multi-service architecture",
  },
  SOLID: {
    knowledge:
      "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.",
    experience:
      "Applied SOLID principles across all NestJS backend projects for maintainable, testable, and scalable code architecture.",
    stats: "Applied in all backend projects · Clean architecture patterns",
  },
};

async function clearDatabase() {
  await prisma.skillDetail.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillGroup.deleteMany();
  await prisma.projectCredential.deleteMany();
  await prisma.projectTag.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experienceHighlight.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.service.deleteMany();
  await prisma.timelineEntry.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.contactLink.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  console.log("Seeding portfolio data from website...");
  await clearDatabase();

  const passwordHash = await hash("Admin@123", 10);

  const user = await prisma.user.create({
    data: {
      email: "angkon199@gmail.com",
      password: passwordHash,
      username: "ashiful_islam_istiuk",
      phoneNumber: "+8801609884769",
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  const userId = user.id;

  await prisma.user.update({
    where: { id: userId },
    data: { createdBy: userId, updatedBy: userId },
  });

  await prisma.profile.create({
    data: {
      userId,
      name: "K. M. Ashiful Islam Istiuk",
      title: "Junior Software Engineer",
      bio: "I am K. M. Ashiful Islam Istiuk, a software engineer building scalable full-stack applications with TypeScript, Node.js, NestJS, React, and Next.js. I work on REST APIs, microservices, realtime systems, and reliable database driven applications.",
      location: "Dhaka, BD",
      status: "open_to_work",
      avatarUrl: "/profile.png",
      linkedInUrl: "https://www.linkedin.com/in/Ashiful-Islam-Istiuk/",
      resumeUrl: "/resume.pdf",
      siteUrl: "https://ashiful-portfolio.vercel.app",
      siteTitle: "K. M. Ashiful Islam Istiuk | Junior Software Engineer",
      siteDescription:
        "Portfolio of K. M. Ashiful Islam Istiuk, a junior software engineer experienced with TypeScript, Node.js, NestJS, React, Next.js, REST APIs, microservices, and realtime systems.",
      roles: [
        "Junior Software Engineer",
        "Full-Stack Developer",
        "NestJS & API Builder",
      ],
      createdBy: userId,
      updatedBy: userId,
    },
  });

  await prisma.stat.createMany({
    data: [
      {
        userId,
        value: "500+",
        label: "APIs developed",
        sortOrder: 0,
        createdBy: userId,
        updatedBy: userId,
      },
      {
        userId,
        value: "6",
        label: "Production-grade projects",
        sortOrder: 1,
        createdBy: userId,
        updatedBy: userId,
      },
      {
        userId,
        value: "200+",
        label: "Problems solved on Beecrowd",
        sortOrder: 2,
        createdBy: userId,
        updatedBy: userId,
      },
      {
        userId,
        value: "40%",
        label: "search latency improvement",
        sortOrder: 3,
        createdBy: userId,
        updatedBy: userId,
      },
    ],
  });

  const projects = [
    {
      file: "hotel_ticketing.service.ts",
      title: "Hotel Ticketing System",
      description:
        "Engineered a robust NestJS backend with Prisma ORM, modular architecture, custom guards, interceptors, decorators, JWT based RBAC, 30+ documented APIs, advanced filtering, pagination, and Jest unit testing.",
      tags: ["NestJS", "Prisma", "JWT", "Jest"],
      github: "https://github.com/Ashiful24/hotel-ticketing-system",
      live: null as string | null,
    },
    {
      file: "ecommerce_api.module.ts",
      title: "E-commerce REST API",
      description:
        "Developed an e-commerce backend focused on relational data integrity, order processing, and maintainable NestJS modules for users, products, categories, and orders.",
      tags: ["NestJS", "Prisma", "REST API"],
      github: "https://github.com/Ashiful24/E-commers-backend",
      live: null,
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
      live: null,
    },
    {
      file: "todo_app.dart",
      title: "To Do App",
      description:
        "Implemented a mobile task app with add, complete, and delete flows using Flutter and Hive, focusing on practical productivity and simple UI interactions.",
      tags: ["Flutter", "Hive", "Mobile"],
      github: "https://github.com/Ashiful24/ToDoApp",
      live: null,
    },
  ];

  for (const [index, project] of projects.entries()) {
    const created = await prisma.project.create({
      data: {
        userId,
        file: project.file,
        title: project.title,
        description: project.description,
        github: project.github,
        live: project.live,
        sortOrder: index,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    await prisma.projectTag.createMany({
      data: project.tags.map((name) => ({
        userId,
        projectId: created.id,
        name,
        createdBy: userId,
        updatedBy: userId,
      })),
    });
  }

  const juniorExperience = await prisma.experience.create({
    data: {
      userId,
      title: "Junior Software Engineer",
      subtitle: "Bengal Mobile QA Solution · Jul 2025 - Present",
      sortOrder: 0,
      createdBy: userId,
      updatedBy: userId,
    },
  });

  await prisma.experience.create({
    data: {
      userId,
      title: "Associate Software Engineer",
      subtitle: "Bengal Mobile QA Solution · Mar 2025 - Jun 2025",
      sortOrder: 1,
      createdBy: userId,
      updatedBy: userId,
    },
  });

  const highlights = [
    "Architected multi-tenancy features for Shohay Enterprise to support scalable corporate client onboarding.",
    "Integrated Elasticsearch into the Corporate Pledging Flow, improving data retrieval latency by 40%.",
    "Delivered NGO Profile and Hotel/Property modules from database design to frontend implementation.",
    "Built realtime backend communication with WebSocket, Socket.IO, and Redis based session/state management.",
    "Resolved critical dashboard issues and helped maintain 99.9% system uptime.",
  ];

  await prisma.experienceHighlight.createMany({
    data: highlights.map((text, index) => ({
      userId,
      experienceId: juniorExperience.id,
      text,
      sortOrder: index,
      createdBy: userId,
      updatedBy: userId,
    })),
  });

  await prisma.service.createMany({
    data: [
      "Full-stack application development with Next.js, React, Node.js, and NestJS",
      "REST API design, Swagger documentation, and scalable backend modules",
      "Realtime features using WebSocket, Socket.IO, Redis, and presence systems",
      "Responsive dashboards and frontend interfaces with Angular, React, and PrimeNG",
    ].map((description, index) => ({
      userId,
      description,
      sortOrder: index,
      createdBy: userId,
      updatedBy: userId,
    })),
  });

  await prisma.timelineEntry.createMany({
    data: [
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
    ].map((entry, index) => ({
      userId,
      ...entry,
      sortOrder: index,
      createdBy: userId,
      updatedBy: userId,
    })),
  });

  await prisma.testimonial.createMany({
    data: [
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
    ].map((item, index) => ({
      userId,
      ...item,
      sortOrder: index,
      createdBy: userId,
      updatedBy: userId,
    })),
  });

  await prisma.contactLink.createMany({
    data: [
      {
        label: "Email",
        value: "angkon199@gmail.com\nashiful35-3017@diu.edu.bd",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=angkon199@gmail.com,ashiful35-3017@diu.edu.bd",
        iconKey: "SiGmail",
        color: "text-[#ea4335]",
      },
      {
        label: "Phone",
        value: "+8801609884769",
        href: "tel:+8801609884769",
        iconKey: "FaPhoneAlt",
        color: "text-[#9cdcfe]",
      },
      {
        label: "LinkedIn",
        value: "Ashiful Islam Istiuk",
        href: "https://www.linkedin.com/in/Ashiful-Islam-Istiuk/",
        iconKey: "FaLinkedinIn",
        color: "text-[#0a66c2]",
      },
      {
        label: "GitHub",
        value: "Ashiful24",
        href: "https://github.com/Ashiful24",
        iconKey: "SiGithub",
        color: "text-white",
      },
      {
        label: "Beecrowd",
        value: "Profile 463413",
        href: "https://www.beecrowd.com.br/judge/en/profile/463413",
        iconKey: "FaCode",
        color: "text-[#c586c0]",
      },
    ].map((item, index) => ({
      userId,
      ...item,
      sortOrder: index,
      createdBy: userId,
      updatedBy: userId,
    })),
  });

  for (const [groupIndex, group] of skillGroups.entries()) {
    const createdGroup = await prisma.skillGroup.create({
      data: {
        userId,
        title: group.title,
        sortOrder: groupIndex,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    for (const [skillIndex, skill] of group.skills.entries()) {
      const createdSkill = await prisma.skill.create({
        data: {
          userId,
          parentId: createdGroup.id,
          title: skill.title,
          iconKey: skill.iconKey,
          color: skill.color,
          sortOrder: skillIndex,
          createdBy: userId,
          updatedBy: userId,
        },
      });

      const detail = skillDetails[skill.title];
      if (detail) {
        await prisma.skillDetail.create({
          data: {
            userId,
            skillId: createdSkill.id,
            knowledge: detail.knowledge,
            experience: detail.experience,
            stats: detail.stats,
            createdBy: userId,
            updatedBy: userId,
          },
        });
      }
    }
  }

  console.log("Seed completed.");
  console.log(`Admin user: ${user.email}`);
  console.log("Password: Admin@123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
