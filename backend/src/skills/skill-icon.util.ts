/** Default Tailwind color class for all auto-assigned skill icons. */
export const DEFAULT_SKILL_COLOR = 'text-[#9cdcfe]';

/** Fallback when title does not match a known library icon. */
export const DEFAULT_SKILL_ICON = 'FaCode';

/**
 * Exact title aliases → react-icons key.
 * Keys must match normalizeSkillTitle() output.
 */
const TITLE_ICON_MAP: Record<string, string> = {
  // Languages
  typescript: 'SiTypescript',
  javascript: 'SiJavascript',
  python: 'SiPython',
  java: 'FaJava',
  c: 'SiC',
  cpp: 'SiCplusplus',
  cplusplus: 'SiCplusplus',
  csharp: 'SiSharp',
  go: 'SiGo',
  golang: 'SiGo',
  rust: 'SiRust',
  php: 'SiPhp',
  ruby: 'SiRuby',
  kotlin: 'SiKotlin',
  swift: 'SiSwift',

  // Frontend
  react: 'SiReact',
  reactjs: 'SiReact',
  next: 'SiNextdotjs',
  nextjs: 'SiNextdotjs',
  nextdotjs: 'SiNextdotjs',
  angular: 'SiAngular',
  vue: 'SiVuedotjs',
  vuejs: 'SiVuedotjs',
  rxjs: 'SiReactivex',
  reactivex: 'SiReactivex',
  materialui: 'SiMui',
  mui: 'SiMui',
  material: 'SiMui',
  devextreme: 'SiDevexpress',
  devexpress: 'SiDevexpress',
  primeng: 'SiPrimeng',
  html: 'SiHtml5',
  html5: 'SiHtml5',
  css: 'SiCss',
  css3: 'SiCss',
  tailwind: 'SiTailwindcss',
  tailwindcss: 'SiTailwindcss',

  // Backend
  node: 'SiNodedotjs',
  nodejs: 'SiNodedotjs',
  nodedotjs: 'SiNodedotjs',
  nest: 'SiNestjs',
  nestjs: 'SiNestjs',
  express: 'SiExpress',
  expressjs: 'SiExpress',
  expressdotjs: 'SiExpress',
  rest: 'FaPlug',
  restapi: 'FaPlug',
  restapis: 'FaPlug',
  prisma: 'SiPrisma',
  prismaorm: 'SiPrisma',
  drizzle: 'SiDrizzle',
  drizzleorm: 'SiDrizzle',

  // Data / realtime
  redis: 'SiRedis',
  websocket: 'FaNetworkWired',
  websockets: 'FaNetworkWired',
  socketio: 'SiSocketdotio',
  socketdotio: 'SiSocketdotio',
  cassandra: 'SiApachecassandra',
  apachecassandra: 'SiApachecassandra',
  postgres: 'SiPostgresql',
  postgresql: 'SiPostgresql',
  mongodb: 'SiMongodb',
  mysql: 'SiMysql',
  sessionmanagement: 'FaUsersCog',
  session: 'FaUsersCog',

  // Tools
  git: 'SiGit',
  github: 'SiGithub',
  bitbucket: 'SiBitbucket',
  docker: 'SiDocker',
  postman: 'SiPostman',
  swagger: 'SiSwagger',
  openapi: 'SiSwagger',
  tableplus: 'FaDatabase',
  agile: 'FaProjectDiagram',
  scrum: 'FaProjectDiagram',
  agilescrum: 'FaProjectDiagram',
  microservice: 'FaLayerGroup',
  microservices: 'FaLayerGroup',
  solid: 'FaCogs',
};

export function normalizeSkillTitle(title: string): string {
  let t = title.trim().toLowerCase();

  // Language / framework shorthand before stripping punctuation
  t = t.replace(/c\+\+/g, 'cplusplus');
  t = t.replace(/c\+/g, 'cplusplus');
  t = t.replace(/c#/g, 'csharp');
  t = t.replace(/\.js\b/g, 'js');
  t = t.replace(/\.ts\b/g, 'ts');

  return t.replace(/[^a-z0-9]+/g, '');
}

/**
 * Resolve icon from skill title.
 * Exact alias match only — avoids "java" → JavaScript false positives.
 */
export function resolveSkillIconKey(title: string): string {
  const key = normalizeSkillTitle(title);
  if (!key) return DEFAULT_SKILL_ICON;
  return TITLE_ICON_MAP[key] ?? DEFAULT_SKILL_ICON;
}

export function resolveSkillVisuals(title: string): {
  iconKey: string;
  color: string;
} {
  return {
    iconKey: resolveSkillIconKey(title),
    color: DEFAULT_SKILL_COLOR,
  };
}
