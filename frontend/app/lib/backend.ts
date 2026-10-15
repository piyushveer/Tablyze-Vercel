const DEVELOPMENT_BACKEND_URL = "http://127.0.0.1:8000";

export class BackendConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BackendConfigurationError";
  }
}

export function getBackendUrl(): string {
  const configuredUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new BackendConfigurationError(
        "BACKEND_URL must be set to the deployed backend URL."
      );
    }
    return DEVELOPMENT_BACKEND_URL;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(configuredUrl);
  } catch {
    throw new BackendConfigurationError(
      "BACKEND_URL must be a valid absolute HTTP or HTTPS URL."
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new BackendConfigurationError(
      "BACKEND_URL must use HTTP or HTTPS."
    );
  }

  return configuredUrl.replace(/\/+$/, "");
}
