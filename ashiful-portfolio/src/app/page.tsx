import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import DeveloperProfile from "@/components/DeveloperProfile";
import DevSectionLabel from "@/components/DevSectionLabel";
import Footer from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";
import Navbar from "@/components/Navbar";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsGrid from "@/components/SkillsGrid";
import ExperiencesSection from "@/components/ExperiencesSection";
import EducationTimeline from "@/components/EducationTimeline";
import ContactTerminal from "@/components/ContactTerminal";
import ServicesBoard from "@/components/ServicesBoard";
import {
  fetchPortfolio,
  hireHrefFromContacts,
  mapProjects,
  splitContactLinks,
} from "@/lib/portfolio";
import { resolveAssetUrl } from "@/lib/auth-storage";

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
            Set NEXT_PUBLIC_PORTFOLIO_USERNAME and start the backend, then
            refresh. All site content is loaded from the API.
          </p>
        </div>
      </main>
    );
  }

  const { profile, user } = portfolio;
  const stats = portfolio.stats.slice(0, 3);
  const metricStats = portfolio.stats.slice(3);
  const projects = mapProjects(portfolio.projects);
  const hireHref = hireHrefFromContacts(portfolio.contactLinks, user.email);
  const resumeUrl = resolveAssetUrl(profile?.resumeUrl);
  const { contactLinks, footerLinks } = splitContactLinks(
    portfolio.contactLinks,
  );
  const titleWords = (profile?.title ?? "").trim().split(/\s+/).filter(Boolean);
  const titleLead = titleWords[0] ?? profile?.name ?? user.username;
  const titleRest = titleWords.slice(1).join(" ");
  const avatarUrl = resolveAssetUrl(profile?.avatarUrl);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#1e1e1e] text-[#d4d4d4]">
      <section className="relative z-10 px-4 py-4 sm:px-10 sm:py-6 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(0,122,204,0.24),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(197,134,192,0.14),transparent_30%),linear-gradient(180deg,#252526_0%,#1e1e1e_65%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#007acc]/20 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -left-6 top-[8%] rotate-[-12deg] font-mono text-[7rem] font-black leading-none text-[#007acc]/[0.06] sm:text-[10rem] lg:text-[14rem]">
            {"{ }"}
          </div>
          <div className="absolute -right-4 top-[5%] rotate-[8deg] font-mono text-[6rem] font-black leading-none text-[#c586c0]/[0.06] sm:text-[8rem] lg:text-[11rem]">
            {"</>"}
          </div>
        </div>

        <Navbar
          username={user.username}
          hireHref={hireHref}
          hasResume={Boolean(resumeUrl)}
        />

        <div
          id="home"
          className="mx-auto grid max-w-7xl items-start gap-8 pb-14 pt-8 sm:gap-10 sm:pb-20 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_36rem] lg:gap-x-5 lg:pb-28 lg:pt-16"
        >
          <div className="min-w-0">
            {(profile?.status || profile?.location) && (
              <p className="mb-2 inline-flex max-w-full items-center gap-2 rounded-lg border border-[#3c3c3c] bg-[#252526] px-3 py-2 font-mono text-xs text-[#9cdcfe] sm:px-4 sm:text-sm">
                <span className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#28c840]" />
                <span className="min-w-0 break-words">
                  {[profile?.status, profile?.location]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </p>
            )}

            <h1 className="mt-1 max-w-4xl break-words text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {titleLead}
              {titleRest ? (
                <span className="block bg-gradient-to-r from-[#569cd6] via-[#d4d4d4] to-[#c586c0] bg-clip-text text-transparent">
                  {titleRest}
                </span>
              ) : null}
            </h1>
            {profile?.bio && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#cccccc] sm:mt-7 sm:text-lg sm:leading-8">
                {profile.bio}
              </p>
            )}
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
              {resumeUrl ? (
                <Link
                  href="/resume"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#007acc] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#3794ff] sm:px-7 sm:py-4"
                >
                  View Resume
                </Link>
              ) : null}
              <a
                href="#experience"
                className="rounded-full border border-[#3c3c3c] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:border-[#007acc] hover:bg-[#2d2d30] sm:px-7 sm:py-4"
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
              avatarUrl={avatarUrl}
              username={user.username}
              stats={stats}
              metricStats={metricStats}
            />
          )}
        </div>
      </section>

      <AnimatedSection id="skills" className="px-4 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel
            label="Technical skills"
            comment="// skills.ts"
            singleLine
          />
          <SkillsGrid groups={portfolio.skillGroups} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="experience" className="px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel label="Experience" comment="// experience.log" />
          <ExperiencesSection experiences={portfolio.experiences} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="work" className="px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel label="Selected Work" comment="// projects/" />
          <ProjectsGrid projects={projects} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="services" className="px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel
            label="Services"
            comment="// notice_board → pin your requests"
          />
          <ServicesBoard services={portfolio.services} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel label="Education" comment="// git log --graph --oneline" />
          <EducationTimeline entries={portfolio.timelineEntries} />
        </div>
      </AnimatedSection>

      {profile?.showTestimonials && (
        <AnimatedSection className="px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <DevSectionLabel
              label="What people say about working with me."
              comment="// testimonials.json"
            />
            {portfolio.testimonials.length === 0 ? (
              <EmptyNote text="No testimonials yet." />
            ) : (
              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {portfolio.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.name + testimonial.quote}
                    className="flex h-full flex-col rounded-2xl border border-[#3c3c3c] bg-[#252526] p-5 sm:rounded-[2rem] sm:p-6"
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
      )}

      <AnimatedSection id="contact" className="px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <DevSectionLabel
            label="Contact"
            comment="// terminal → contact.sh"
          />
          <div className="mt-8 sm:mt-10">
            <ContactTerminal
              username={user.username}
              title={profile?.title}
              links={contactLinks}
            />
          </div>
        </div>
      </AnimatedSection>

      <Footer
        name={profile?.name}
        title={profile?.title}
        location={profile?.location}
        username={user.username}
        socialLinks={footerLinks.map((link) => ({
          label: link.label,
          href: link.href,
          iconKey: link.iconKey,
          color: link.color,
        }))}
      />
      <FloatingMenu hasResume={Boolean(resumeUrl)} />
    </main>
  );
}
