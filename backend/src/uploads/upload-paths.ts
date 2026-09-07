import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

export const UPLOADS_ROOT = join(process.cwd(), 'uploads');
export const AVATARS_DIR = join(UPLOADS_ROOT, 'avatars');
export const RESUMES_DIR = join(UPLOADS_ROOT, 'resumes');

export const AVATAR_URL_PREFIX = '/uploads/avatars';
export const RESUME_URL_PREFIX = '/uploads/resumes';

export function ensureUploadDirs() {
  for (const dir of [AVATARS_DIR, RESUMES_DIR]) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }
}

/** Delete a previously uploaded file if it lives under our uploads folders. */
export function deleteUploadedFile(publicUrl: string | null | undefined) {
  if (!publicUrl) return;
  if (
    !publicUrl.startsWith(AVATAR_URL_PREFIX + '/') &&
    !publicUrl.startsWith(RESUME_URL_PREFIX + '/')
  ) {
    return;
  }
  const relative = publicUrl.replace(/^\//, '');
  const absolute = join(process.cwd(), relative);
  if (existsSync(absolute)) {
    unlinkSync(absolute);
  }
}
