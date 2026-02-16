export async function apiServer<T>(
  api: string,
  isFakeStore = false,
  options: RequestInit & { body?: any; next?: NextFetchRequestConfig } = {},
): Promise<T> {
  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const fullUrl = `${isFakeStore ? process.env.NEXT_PUBLIC_BASE_URL : process.env.NEXT_PUBLIC_PROPERTIES_API_URL}${api}`;

  try {
    const res = await fetch(fullUrl, {
      ...options,
      body,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      // Use the provided cache or next.revalidate if present, otherwise default to no-store for safety
      cache:
        options.cache ||
        (options.next?.revalidate !== undefined ? undefined : "no-store"),
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(
        error.message || `API Error: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error(`API Server Error - URL: ${fullUrl}`, error);
    throw new Error(
      `Failed to fetch from ${fullUrl}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
