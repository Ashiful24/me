import {
  API_URL,
  clearSession,
  getAccessToken,
  getRefreshToken,
  setSession,
  type LoginResponse,
} from "./auth-storage";

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  headers?: Record<string, string>;
};

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      clearSession();
      return false;
    }
    const data = (await res.json()) as LoginResponse;
    setSession(data);
    return true;
  } catch {
    clearSession();
    return false;
  }
}

async function ensureRefreshed(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, auth = true, headers = {} } = options;

  const buildHeaders = (): Record<string, string> => {
    const next: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };
    if (auth) {
      const token = getAccessToken();
      if (token) next.Authorization = `Bearer ${token}`;
    }
    return next;
  };

  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      method,
      headers: buildHeaders(),
      body: body === undefined ? undefined : JSON.stringify(body),
    });

  let res = await doFetch();

  if (res.status === 401 && auth) {
    const ok = await ensureRefreshed();
    if (ok) {
      res = await doFetch();
    }
  }

  if (!res.ok) {
    let details: unknown;
    try {
      details = await res.json();
    } catch {
      details = await res.text();
    }
    const message =
      typeof details === "object" &&
      details &&
      "message" in details &&
      details.message
        ? Array.isArray(details.message)
          ? details.message.join(", ")
          : String(details.message)
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status, details);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function loginRequest(
  emailOrPhone: string,
  password: string,
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    auth: false,
    body: { emailOrPhone, password },
  });
}
