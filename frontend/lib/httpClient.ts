const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

type RequestOptions = RequestInit & { skipJson?: boolean };

async function parseError(response: Response) {
  try {
    const data = await response.json();
    if (typeof data === "string") return data;
    if (data?.message) return data.message as string;
  } catch {
    // fallback to text parsing below
  }

  const text = await response.text();
  return text || "Request failed";
}

export async function request<T>(path: string, options: RequestOptions = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  if (options.skipJson || response.status === 204) {
    return null as T;
  }

  try {
    return await response.json();
  } catch {
    return null as T;
  }
}
