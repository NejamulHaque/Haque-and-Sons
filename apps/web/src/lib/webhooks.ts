/**
 * Webhook & Notification Engine for Haque & Sons Studio OS
 * Dispatches real-time alerts to Discord / Slack / Custom Webhook endpoints.
 */

interface WebhookPayload {
  event:
    | "application.created"
    | "payment.submitted"
    | "payment.approved"
    | "certificate.issued"
    | "project.submitted"
    | "lor.applied"
    | "lor.approved"
    | "lor.rejected";
  title: string;
  description: string;
  data: Record<string, any>;
}

export async function dispatchWebhook(payload: WebhookPayload) {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;
  const slackUrl = process.env.SLACK_WEBHOOK_URL;

  const promises: Promise<any>[] = [];

  if (discordUrl) {
    const discordBody = {
      embeds: [
        {
          title: `⚡ [Haque & Sons OS] ${payload.title}`,
          description: payload.description,
          color: payload.event.includes("approved") || payload.event.includes("issued") ? 0x10b981 : 0x06b6d4,
          fields: Object.entries(payload.data).map(([key, value]) => ({
            name: key.replace(/_/g, " ").toUpperCase(),
            value: String(value || "N/A"),
            inline: true,
          })),
          footer: {
            text: "Haque & Sons Studio OS • Automated Webhook Pipeline",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    promises.push(
      fetch(discordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordBody),
      }).catch((err) => console.error("Discord webhook dispatch error:", err))
    );
  }

  if (slackUrl) {
    const slackBody = {
      text: `*${payload.title}*\n${payload.description}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*⚡ Haque & Sons OS Alert: ${payload.title}*\n${payload.description}`,
          },
        },
        {
          type: "section",
          fields: Object.entries(payload.data).map(([key, value]) => ({
            type: "mrkdwn",
            text: `*${key.replace(/_/g, " ").toUpperCase()}:*\n${String(value || "N/A")}`,
          })),
        },
      ],
    };

    promises.push(
      fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackBody),
      }).catch((err) => console.error("Slack webhook dispatch error:", err))
    );
  }

  if (promises.length > 0) {
    await Promise.allSettled(promises);
  }
}
