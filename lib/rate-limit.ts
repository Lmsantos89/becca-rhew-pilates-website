// CAVEMAN: one node process serves the site, memory map is enough
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SENDS_PER_WINDOW = 3;
// CAVEMAN: cap the map so spoofed clients cannot grow it forever
const MAX_TRACKED_CLIENTS = 1000;

const sendTimesByClient = new Map<string, number[]>();

function dropExpired(now: number) {
  for (const [client, times] of sendTimesByClient) {
    const fresh = times.filter((time) => now - time < WINDOW_MS);
    if (fresh.length === 0) sendTimesByClient.delete(client);
    else sendTimesByClient.set(client, fresh);
  }
}

function dropOldestWhileFull() {
  while (sendTimesByClient.size >= MAX_TRACKED_CLIENTS) {
    const oldest = sendTimesByClient.keys().next().value;
    if (oldest === undefined) return;
    sendTimesByClient.delete(oldest);
  }
}

// CAVEMAN: counts the call, so only ask once per send attempt
export function isRateLimited(client: string): boolean {
  const now = Date.now();
  dropExpired(now);
  const times = sendTimesByClient.get(client) ?? [];
  if (times.length >= MAX_SENDS_PER_WINDOW) return true;
  dropOldestWhileFull();
  sendTimesByClient.set(client, [...times, now]);
  return false;
}
