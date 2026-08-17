import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import DeveloperProfile from "@/components/DeveloperProfile";
import DevSectionLabel from "@/components/DevSectionLabel";
import Footer from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SkillsGrid from "@/components/SkillsGrid";
import { getIcon } from "@/lib/icons";
import {
  fetchPortfolio,
  hireHrefFromContacts,
  mapProjects,
} from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await fetchPortfolio();
  const profile = portfolio?.profile;
  if (!profile) return {};

  return {
    title: profile.siteTitle || profile.name,
    description: profile.siteDescription || profile.bio,
    openGraph: {
      title: profile.siteTitle || profile.name,
      description: profile.siteDescription || profile.bio,
      url: profile.siteUrl || undefined,
    },
  };
}

function EmptyNote({ text }: { text: string }) {
  return <p className="mt-6 font-mono text-sm text-[#858585]">{text}</p>;
}

export default async function Home() {
  const portfolio = await fetchPortfolio();

  if (!portfolio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-6 text-center text-[#d4d4d4]">
        <div>
          <p className="font-mono text-sm text-[#f14c4c]">
            GET /api/portfolio failed
          </p>
          <p className="mt-3 max-w-md text-[#858585]">
            Start the backend on port 4000, then refresh. All site content is
            loaded from the API.
          </p>
        </div>
      </main>
    );
  }

  const { profile, user } = portfolio;
  const stats = portfolio.stats.slice(0, 3);
  const buildMetric =
    portfolio.stats.length > 3
      ? {
          value: portfolio.stats[3].value,
          label: portfolio.stats[3].label,
        }
      : undefined;
  const projects = mapProjects(portfolio.projects);
  const featuredExperience = portfolio.experiences[0];
  const highlights =
    portfolio.experiences.flatMap((exp) =>
      exp.highlights.map((h) => h.text),
    );
  const hireHref = hireHrefFromContacts(portfolio.contactLinks, user.email);
  const titleWords = (profile?.title ?? "").trim().split(/\s+/).filter(Boolean);
  const titleLead = titleWords[0] ?? profile?.name ?? user.username;
  const titleRest = titleWords.slice(1).join(" ");

  return (
    <main className="relative min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <section className="relative z-10 px-6 py-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(0,122,204,0.24),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(197,134,192,0.14),transparent_30%),linear-gradient(180deg,#252526_0%,#1e1e1e_65%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#007acc]/20 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -left-6 top-[8%] rotate-[-12deg] font-mono text-[10rem] font-black leading-none text-[#007acc]/[0.06] sm:text-[14rem]">
            {"{ }"}
          </div>
          <div className="absolute -right-4 top-[5%] rotate-[8deg] font-mono text-[8rem] font-black leading-none text-[#c586c0]/[0.06] sm:text-[11rem]">
            {"</>"}
          </div>
        </div>

        <Navbar username={user.username} hireHref={hireHref} />

        <div
          id="home"
          className="mx-auto grid max-w-7xl items-start gap-10 pb-20 pt-12 lg:grid-cols-[minmax(0,1fr)_36rem] lg:gap-x-5 lg:pb-28 lg:pt-16"
        >
          <div className="min-w-0">
            {(profile?.status || profile?.location) && (
              <p className="mb-2 inline-flex items-center gap-2 rounded-lg border border-[#3c3c3c] bg-[#252526] px-4 py-2 font-mono text-sm text-[#9cdcfe]">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#28c840]" />
                {[profile?.status, profile?.location]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            <h1 className="mt-1 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {titleLead}
              {titleRest ? (
                <span className="block bg-gradient-to-r from-[#569cd6] via-[#d4d4d4] to-[#c586c0] bg-clip-text text-transparent">
                  {titleRest}
                </span>
              ) : null}
            </h1>
            {profile?.bio && (
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#cccccc]">
                {profile.bio}
              </p>
            )}
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

          {profile && (
            <DeveloperProfile
              name={profile.name}
              roles={profile.roles}
              location={profile.location}
              status={profile.status}
              linkedInUrl={profile.linkedInUrl}
              avatarUrl={profile.avatarUrl}
              stats={stats}
              buildMetric={buildMetric}
            />
          )}
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
            {profile?.siteDescription && (
              <p className="max-w-xl text-[#cccccc]">
                {profile.siteDescription}
              </p>
            )}
          </div>
          <SkillsGrid groups={portfolio.skillGroups} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="experience" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <DevSectionLabel
              label={featuredExperience?.title || "Experience"}
              comment="// experience.log"
            />
            {featuredExperience?.subtitle && (
              <p className="mt-5 leading-8 text-[#cccccc]">
                {featuredExperience.subtitle}
              </p>
            )}
          </div>
          <div className="grid gap-4">
            {highlights.length === 0 ? (
              <EmptyNote text="No experience highlights yet." />
            ) : (
              highlights.map((highlight, index) => (
                <div
                  key={`${index}-${highlight.slice(0, 24)}`}
                  className="rounded-[1.5rem] border border-[#3c3c3c] bg-[#252526] p-5 font-mono text-sm text-[#d4d4d4]"
                >
                  <span className="text-[#6a9955]">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>{" "}
                  {highlight}
                </div>
              ))
            )}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="work" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel label="Selected Work" comment="// projects/" />
          {projects.length === 0 ? (
            <EmptyNote text="No projects published yet." />
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#007acc]/60 bg-[#007acc] p-8 text-white">
            <p className="font-mono text-sm text-white/70">{"// services.ts"}</p>
            <h2 className="mt-3 text-4xl font-black">
              {profile?.title || "Services"}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {portfolio.services.length === 0 ? (
              <EmptyNote text="No services published yet." />
            ) : (
              portfolio.services.map((service, index) => (
                <div
                  key={`${index}-${service.description.slice(0, 24)}`}
                  className="rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6 font-mono text-sm text-[#d4d4d4]"
                >
                  <span className="text-[#c586c0]">export const</span> service_
                  {String(index + 1).padStart(2, "0")}{" "}
                  <span className="text-[#6a9955]">=</span>{" "}
                  <span className="text-[#ce9178]">
                    &quot;{service.description}&quot;
                  </span>
                  ;
                </div>
              ))
            )}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel label="Journey" comment="// git log --oneline" />
          {portfolio.timelineEntries.length === 0 ? (
            <EmptyNote text="No timeline entries yet." />
          ) : (
            <div className="relative mt-10 space-y-10 border-l border-[#3c3c3c] pl-8 sm:pl-10">
              {portfolio.timelineEntries.map((item) => (
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
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel
            label="What people say about working with me."
            comment="// testimonials.json"
          />
          {portfolio.testimonials.length === 0 ? (
            <EmptyNote text="No testimonials yet." />
          ) : (
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {portfolio.testimonials.map((testimonial) => (
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
          )}
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
          {profile?.bio && (
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#cccccc]">
              {profile.bio}
            </p>
          )}
          {portfolio.contactLinks.length === 0 ? (
            <EmptyNote text="No contact links yet." />
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {portfolio.contactLinks.map((link) => {
                const Icon = getIcon(link.iconKey);

                return (
                  <a
                    key={link.label}
                    aria-label={link.label}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-[#3c3c3c] bg-[#1e1e1e] p-5 text-left transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30]"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#3c3c3c] bg-[#252526]">
                      <Icon
                        aria-hidden="true"
                        className={`h-6 w-6 ${link.color}`}
                      />
                    </span>
                    <span className="sr-only">{link.label}</span>
                    <span className="block min-w-0 whitespace-pre-line break-words text-sm font-semibold text-white">
                      {link.value}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </AnimatedSection>

      <Footer
        name={profile?.name}
        title={profile?.title}
        location={profile?.location}
        socialLinks={portfolio.contactLinks
          .filter((link) =>
            ["SiGithub", "FaLinkedinIn", "SiGmail"].includes(link.iconKey),
          )
          .map((link) => ({
            label: link.label,
            href: link.href,
            iconKey: link.iconKey,
          }))}
      />
      <FloatingMenu />
    </main>
  );
}
