/** Default visual when label/href does not match a known contact type. */
export const DEFAULT_CONTACT_ICON = 'FaLink';
export const DEFAULT_CONTACT_COLOR = 'text-[#9cdcfe]';

type ContactVisual = { iconKey: string; color: string };

const LABEL_VISUALS: Record<string, ContactVisual> = {
  email: { iconKey: 'SiGmail', color: 'text-[#ea4335]' },
  gmail: { iconKey: 'SiGmail', color: 'text-[#ea4335]' },
  mail: { iconKey: 'SiGmail', color: 'text-[#ea4335]' },
  phone: { iconKey: 'FaPhoneAlt', color: 'text-[#9cdcfe]' },
  mobile: { iconKey: 'FaPhoneAlt', color: 'text-[#9cdcfe]' },
  tel: { iconKey: 'FaPhoneAlt', color: 'text-[#9cdcfe]' },
  whatsapp: { iconKey: 'SiWhatsapp', color: 'text-[#25d366]' },
  wa: { iconKey: 'SiWhatsapp', color: 'text-[#25d366]' },
  linkedin: { iconKey: 'FaLinkedinIn', color: 'text-[#0a66c2]' },
  github: { iconKey: 'SiGithub', color: 'text-white' },
  facebook: { iconKey: 'FaFacebook', color: 'text-[#1877f2]' },
  fb: { iconKey: 'FaFacebook', color: 'text-[#1877f2]' },
  instagram: { iconKey: 'FaInstagram', color: 'text-[#e4405f]' },
  twitter: { iconKey: 'FaTwitter', color: 'text-[#1da1f2]' },
  x: { iconKey: 'FaXTwitter', color: 'text-white' },
  youtube: { iconKey: 'FaYoutube', color: 'text-[#ff0000]' },
  discord: { iconKey: 'FaDiscord', color: 'text-[#5865f2]' },
  telegram: { iconKey: 'FaTelegram', color: 'text-[#26a5e4]' },
  beecrowd: { iconKey: 'FaCode', color: 'text-[#c586c0]' },
  leetcode: { iconKey: 'SiLeetcode', color: 'text-[#ffa116]' },
  codeforces: { iconKey: 'SiCodeforces', color: 'text-[#1f8acb]' },
  hackerrank: { iconKey: 'SiHackerrank', color: 'text-[#00ea64]' },
  website: { iconKey: 'FaGlobe', color: 'text-[#9cdcfe]' },
  portfolio: { iconKey: 'FaGlobe', color: 'text-[#9cdcfe]' },
  link: { iconKey: 'FaLink', color: 'text-[#9cdcfe]' },
};

function normalizeLabel(label: string): string {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

/** Prefer longest matching alias contained in the label (e.g. "My Facebook"). */
function visualsFromLabel(label: string): ContactVisual | null {
  const key = normalizeLabel(label);
  if (!key) return null;
  if (LABEL_VISUALS[key]) return LABEL_VISUALS[key];

  const aliases = Object.keys(LABEL_VISUALS).sort((a, b) => b.length - a.length);
  for (const alias of aliases) {
    if (key.includes(alias)) return LABEL_VISUALS[alias];
  }
  return null;
}

function visualsFromHref(href: string): ContactVisual | null {
  const h = href.trim().toLowerCase();
  if (!h) return null;

  if (h.startsWith('mailto:') || h.includes('mail.google.com') || h.includes('gmail.com')) {
    return LABEL_VISUALS.email;
  }
  if (h.startsWith('tel:') || h.startsWith('sms:')) {
    return LABEL_VISUALS.phone;
  }
  if (h.includes('wa.me') || h.includes('whatsapp.com')) {
    return LABEL_VISUALS.whatsapp;
  }
  if (h.includes('linkedin.com')) {
    return LABEL_VISUALS.linkedin;
  }
  if (h.includes('github.com')) {
    return LABEL_VISUALS.github;
  }
  if (h.includes('facebook.com') || h.includes('fb.com')) {
    return LABEL_VISUALS.facebook;
  }
  if (h.includes('instagram.com')) {
    return LABEL_VISUALS.instagram;
  }
  if (h.includes('twitter.com')) {
    return LABEL_VISUALS.twitter;
  }
  if (/(^|\.)x\.com(\/|$)/.test(h.replace(/^https?:\/\//, ''))) {
    return LABEL_VISUALS.x;
  }
  if (h.includes('youtube.com') || h.includes('youtu.be')) {
    return LABEL_VISUALS.youtube;
  }
  if (h.includes('discord.com') || h.includes('discord.gg')) {
    return LABEL_VISUALS.discord;
  }
  if (h.includes('t.me') || h.includes('telegram.me') || h.includes('telegram.org')) {
    return LABEL_VISUALS.telegram;
  }
  if (h.includes('beecrowd.com')) {
    return LABEL_VISUALS.beecrowd;
  }
  if (h.includes('leetcode.com')) {
    return LABEL_VISUALS.leetcode;
  }
  if (h.includes('codeforces.com')) {
    return LABEL_VISUALS.codeforces;
  }
  if (h.includes('hackerrank.com')) {
    return LABEL_VISUALS.hackerrank;
  }

  return null;
}

/**
 * Resolve icon + color from contact label and href.
 * Label aliases first (incl. partial), then href host patterns.
 */
export function resolveContactVisuals(
  label: string,
  href = '',
): ContactVisual {
  return (
    visualsFromLabel(label) ??
    visualsFromHref(href) ?? {
      iconKey: DEFAULT_CONTACT_ICON,
      color: DEFAULT_CONTACT_COLOR,
    }
  );
}
