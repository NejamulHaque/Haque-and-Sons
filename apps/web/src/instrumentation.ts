import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "haque-and-sons-web",
    // Grafana Cloud OTLP endpoint (free tier)
    // Replace with your actual endpoint after signing up at grafana.com
    exporter: process.env.OTEL_EXPORTER_OTLP_ENDPOINT
      ? undefined  // Uses env var automatically
      : undefined, // Falls back to console in dev
  });
}
