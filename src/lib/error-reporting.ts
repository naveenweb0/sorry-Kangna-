export type ErrorReportOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

export function reportError(error: unknown, context: Record<string, unknown> = {}, options?: ErrorReportOptions) {
  if (typeof window === "undefined") {
    console.error("[ServerError]", error, context);
    return;
  }

  const message = describeThrown(error);
  const severity = options?.severity ?? "error";

  if (process.env.NODE_ENV !== "production") {
    console[severity === "error" ? "error" : severity === "warning" ? "warn" : "info"](
      `[ClientError:${severity}]`,
      message,
      {
        ...context,
        route: window.location.pathname,
      },
      error,
    );
  }
}

const MAX_SERIALIZED_LENGTH = 2000;

export function describeThrown(error: unknown): string {
  if (error instanceof Response) {
    return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const { message } = (error ?? {}) as { message?: unknown };
  if (typeof message === "string" && message.length > 0) return message;
  try {
    return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
  } catch {
    return String(error);
  }
}
