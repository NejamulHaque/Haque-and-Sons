export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge") {
    try {
      const { neonConfig } = await import("@neondatabase/serverless");
      neonConfig.fetchEndpoint = (host: string) => `https://${host}/sql`;
    } catch (e) {
      console.warn("Instrumentation notice:", e);
    }
  }
}
