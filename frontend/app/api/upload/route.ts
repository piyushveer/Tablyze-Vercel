import { NextRequest, NextResponse } from "next/server";
import { BackendConfigurationError, getBackendUrl } from "../../lib/backend";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const uploadedFile = formData.get("file");

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json(
        { error: "No CSV file was provided for upload." },
        { status: 400 }
      );
    }

    const backendUrl = getBackendUrl();

    console.log(`[Upload Proxy] Forwarding to backend: ${backendUrl}/upload`);

    const backendFormData = new FormData();
    backendFormData.append("file", uploadedFile, uploadedFile.name);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: backendFormData,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const responseText = await upstreamResponse.text();

    // Log first 200 chars of response for debugging
    console.log(`[Upload Proxy] Backend responded with status ${upstreamResponse.status}: ${responseText.substring(0, 200)}...`);

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json(data, { status: upstreamResponse.status });
    } catch {
      console.error("[Upload Proxy] Upstream response is not valid JSON:", responseText);
      return NextResponse.json(
        { error: typeof responseText === "string" ? responseText : String(responseText) },
        { status: upstreamResponse.status }
      );
    }
  } catch (error) {
    console.error("[Upload Proxy] Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to proxy the upload request to the backend.";
    const status = error instanceof BackendConfigurationError ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
