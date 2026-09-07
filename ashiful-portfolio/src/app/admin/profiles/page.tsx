"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import { ApiError, apiFetch, apiUpload } from "@/lib/api";
import { resolveAssetUrl } from "@/lib/auth-storage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

type Profile = {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  status: string;
  avatarUrl: string;
  linkedInUrl: string;
  resumeUrl: string;
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
  showTestimonials: boolean;
  roles: string[];
};

type GeneralForm = {
  name: string;
  title: string;
  bio: string;
  location: string;
  status: string;
  rolesText: string;
};

type SiteForm = {
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
  showTestimonials: boolean;
};

type SectionKey = "general" | "avatar" | "cv" | "site";

const emptyGeneral: GeneralForm = {
  name: "",
  title: "",
  bio: "",
  location: "",
  status: "",
  rolesText: "",
};

const emptySite: SiteForm = {
  siteUrl: "",
  siteTitle: "",
  siteDescription: "",
  showTestimonials: false,
};

const sectionClass =
  "rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] overflow-hidden";
const labelClass = "block text-sm";
const mutedClass = "mb-1 block text-[var(--admin-muted)]";
const inputClass =
  "w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]";
const btnClass =
  "rounded bg-[var(--admin-btn)] px-4 py-2 text-sm text-white hover:bg-[var(--admin-btn-hover)] disabled:opacity-60";

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[var(--admin-hover)]"
    >
      <h3 className="text-lg font-semibold text-[var(--admin-text)]">{title}</h3>
      <FiChevronRight
        className={`h-5 w-5 shrink-0 text-[var(--admin-muted)] transition-transform duration-200 ${
          open ? "rotate-90" : ""
        }`}
        aria-hidden
      />
    </button>
  );
}

export default function AdminProfilesPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [selected, setSelected] = useState<Profile | null>(null);
  const [general, setGeneral] = useState<GeneralForm>(emptyGeneral);
  const [site, setSite] = useState<SiteForm>(emptySite);
  const [loading, setLoading] = useState(true);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingSite, setSavingSite] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    general: true,
    avatar: false,
    cv: false,
    site: false,
  });
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyProfile = (profile: Profile) => {
    setSelected(profile);
    setGeneral({
      name: profile.name ?? "",
      title: profile.title ?? "",
      bio: profile.bio ?? "",
      location: profile.location ?? "",
      status: profile.status ?? "",
      rolesText: profile.roles?.join(", ") ?? "",
    });
    setSite({
      siteUrl: profile.siteUrl ?? "",
      siteTitle: profile.siteTitle ?? "",
      siteDescription: profile.siteDescription ?? "",
      showTestimonials: Boolean(profile.showTestimonials),
    });
  };

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await apiFetch<Profile[]>(
        `/profiles?userId=${encodeURIComponent(user.id)}`,
      );
      if (data[0]) applyProfile(data[0]);
      else setSelected(null);
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Failed to load profiles",
      );
    } finally {
      setLoading(false);
    }
  }, [user?.id, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const saveGeneral = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSavingGeneral(true);
    try {
      const updated = await apiFetch<Profile>(`/profiles/${selected.id}`, {
        method: "PATCH",
        body: {
          name: general.name.trim(),
          title: general.title.trim(),
          bio: general.bio.trim(),
          location: general.location.trim(),
          status: general.status.trim(),
          roles: general.rolesText
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean),
        },
      });
      applyProfile(updated);
      toast.success("General information saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingGeneral(false);
    }
  };

  const saveSite = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSavingSite(true);
    try {
      const updated = await apiFetch<Profile>(`/profiles/${selected.id}`, {
        method: "PATCH",
        body: {
          siteUrl: site.siteUrl.trim(),
          siteTitle: site.siteTitle.trim(),
          siteDescription: site.siteDescription.trim(),
          showTestimonials: site.showTestimonials,
        },
      });
      applyProfile(updated);
      toast.success("Site settings saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingSite(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!selected) return;
    setUploadingAvatar(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const updated = await apiUpload<Profile>(
        `/profiles/${selected.id}/avatar`,
        body,
      );
      applyProfile(updated);
      toast.success("Avatar uploaded.");
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Avatar upload failed");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const uploadResume = async (file: File) => {
    if (!selected) return;
    setUploadingResume(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const updated = await apiUpload<Profile>(
        `/profiles/${selected.id}/resume`,
        body,
      );
      applyProfile(updated);
      toast.success("CV uploaded.");
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "CV upload failed");
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading) {
    return <p className="text-[var(--admin-muted)]">Loading profiles...</p>;
  }

  const avatarSrc = resolveAssetUrl(selected?.avatarUrl) || "/profile.png";
  const resumeHref = resolveAssetUrl(selected?.resumeUrl);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--admin-accent)]">
          Profile
        </h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Manage general info, avatar, CV, and site metadata.
        </p>
      </div>

      {!selected ? (
        <p className="text-[var(--admin-muted)]">No profile found for this user.</p>
      ) : (
        <div className="space-y-4">
          <form onSubmit={saveGeneral} className={sectionClass}>
            <SectionHeader
              title="General information"
              open={openSections.general}
              onToggle={() => toggleSection("general")}
            />
            {openSections.general && (
              <div className="space-y-3 border-t border-[var(--admin-border)] px-4 pb-4 pt-3">
                <div className="grid gap-3 md:grid-cols-2">
                  {(
                    [
                      ["name", "Name"],
                      ["title", "Title"],
                      ["location", "Location"],
                      ["status", "Status"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className={labelClass}>
                      <span className={mutedClass}>{label}</span>
                      <input
                        value={general[key]}
                        onChange={(e) =>
                          setGeneral((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </label>
                  ))}
                  <label className={`${labelClass} md:col-span-2`}>
                    <span className={mutedClass}>Bio</span>
                    <textarea
                      value={general.bio}
                      onChange={(e) =>
                        setGeneral((prev) => ({ ...prev, bio: e.target.value }))
                      }
                      rows={4}
                      className={inputClass}
                    />
                  </label>
                  <label className={`${labelClass} md:col-span-2`}>
                    <span className={mutedClass}>Roles (comma-separated)</span>
                    <input
                      value={general.rolesText}
                      onChange={(e) =>
                        setGeneral((prev) => ({
                          ...prev,
                          rolesText: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingGeneral}
                    className={btnClass}
                  >
                    {savingGeneral ? "Saving..." : "Save general"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <section className={sectionClass}>
            <SectionHeader
              title="Avatar"
              open={openSections.avatar}
              onToggle={() => toggleSection("avatar")}
            />
            {openSections.avatar && (
              <div className="space-y-3 border-t border-[var(--admin-border)] px-4 pb-4 pt-3">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]">
                    <Image
                      src={avatarSrc}
                      alt="Avatar preview"
                      fill
                      unoptimized={avatarSrc.startsWith("http")}
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate text-xs text-[var(--admin-muted)]">
                      Current: {selected.avatarUrl || "—"}
                    </p>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      disabled={uploadingAvatar}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void uploadAvatar(file);
                      }}
                      className="block w-full text-sm text-[var(--admin-muted)] file:mr-3 file:rounded file:border-0 file:bg-[var(--admin-btn)] file:px-3 file:py-1.5 file:text-sm file:text-white"
                    />
                    <p className="text-xs text-[var(--admin-muted)]">
                      JPEG / PNG / WebP / GIF · max 5MB. New upload replaces the
                      old file.
                    </p>
                    {uploadingAvatar && (
                      <p className="text-sm text-[var(--admin-accent)]">
                        Uploading...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className={sectionClass}>
            <SectionHeader
              title="CV / Resume"
              open={openSections.cv}
              onToggle={() => toggleSection("cv")}
            />
            {openSections.cv && (
              <div className="space-y-2 border-t border-[var(--admin-border)] px-4 pb-4 pt-3">
                {resumeHref ? (
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-sm text-[var(--admin-accent)] underline"
                  >
                    View current CV
                  </a>
                ) : (
                  <p className="text-sm text-[var(--admin-muted)]">
                    No CV uploaded yet.
                  </p>
                )}
                <p className="truncate text-xs text-[var(--admin-muted)]">
                  Current: {selected.resumeUrl || "—"}
                </p>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  disabled={uploadingResume}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadResume(file);
                  }}
                  className="block w-full text-sm text-[var(--admin-muted)] file:mr-3 file:rounded file:border-0 file:bg-[var(--admin-btn)] file:px-3 file:py-1.5 file:text-sm file:text-white"
                />
                <p className="text-xs text-[var(--admin-muted)]">
                  PDF or Word · max 10MB. New upload deletes the previous CV file.
                </p>
                {uploadingResume && (
                  <p className="text-sm text-[var(--admin-accent)]">Uploading...</p>
                )}
              </div>
            )}
          </section>

          <form onSubmit={saveSite} className={sectionClass}>
            <SectionHeader
              title="Site"
              open={openSections.site}
              onToggle={() => toggleSection("site")}
            />
            {openSections.site && (
              <div className="space-y-3 border-t border-[var(--admin-border)] px-4 pb-4 pt-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className={labelClass}>
                    <span className={mutedClass}>Site URL</span>
                    <input
                      value={site.siteUrl}
                      onChange={(e) =>
                        setSite((prev) => ({
                          ...prev,
                          siteUrl: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className={labelClass}>
                    <span className={mutedClass}>Site title</span>
                    <input
                      value={site.siteTitle}
                      onChange={(e) =>
                        setSite((prev) => ({
                          ...prev,
                          siteTitle: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className={`${labelClass} md:col-span-2`}>
                    <span className={mutedClass}>Site description</span>
                    <textarea
                      value={site.siteDescription}
                      onChange={(e) =>
                        setSite((prev) => ({
                          ...prev,
                          siteDescription: e.target.value,
                        }))
                      }
                      rows={4}
                      className={inputClass}
                    />
                  </label>
                  <label className={`${labelClass} md:col-span-2 flex items-center gap-3`}>
                    <input
                      type="checkbox"
                      checked={site.showTestimonials}
                      onChange={(e) =>
                        setSite((prev) => ({
                          ...prev,
                          showTestimonials: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-[var(--admin-border)]"
                    />
                    <span className="text-[var(--admin-text)]">
                      Show testimonials section on website
                    </span>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingSite}
                    className={btnClass}
                  >
                    {savingSite ? "Saving..." : "Save site"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-xs text-[var(--admin-muted)]">
            Profile id: {selected.id}
          </p>
        </div>
      )}
    </div>
  );
}
