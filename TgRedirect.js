const SCHEME = {
  Telegram: "tg",
  Swiftgram: "sg",
  Turrit: "turrit",
  iMe: "ime",
  Nicegram: "ng",
  Lingogram: "lingo",
};

function qval(qs, key) {
  if (!qs) return "";
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = qs.match(new RegExp("(?:^|&)" + escaped + "=([^&]*)"));
  return match ? decodeURIComponent(match[1]) : "";
}

function deeplink(scheme, path, qs) {
  const parts = path.split("/").filter(Boolean);
  if (!parts[0]) return "";
  if (parts[0][0] === "+") {
    return `${scheme}://join?invite=${encodeURIComponent(parts[0].slice(1))}`;
  }
  if (parts[0] === "joinchat" && parts[1]) {
    return `${scheme}://join?invite=${encodeURIComponent(parts[1])}`;
  }
  if (parts[0] === "addstickers" && parts[1]) {
    return `${scheme}://addstickers?set=${encodeURIComponent(parts[1])}`;
  }
  if (parts[0] === "share" && parts[1] === "url") {
    return `${scheme}://msg_url?url=${encodeURIComponent(qval(qs, "url"))}&text=${encodeURIComponent(qval(qs, "text"))}`;
  }
  if (parts[1] && /^\d+$/.test(parts[1])) {
    return `${scheme}://resolve?domain=${encodeURIComponent(parts[0])}&post=${encodeURIComponent(parts[1])}`;
  }
  return `${scheme}://resolve?domain=${encodeURIComponent(parts[0])}`;
}

function main() {
  try {
    const url = typeof $request === "object" ? $request.url : "";
    const match = typeof url === "string" && url.match(/^https?:\/\/t\.me\/(.+)$/i);
    if (!match) return $done({});

    const argument = typeof $argument === "object" && $argument ? $argument : {};
    const requested = typeof argument.CLIENT === "string" ? argument.CLIENT.trim() : "Telegram";
    const scheme = Object.prototype.hasOwnProperty.call(SCHEME, requested) ? SCHEME[requested] : "tg";

    let tail = match[1];
    if (tail.startsWith("s/")) tail = tail.slice(2);
    const queryIndex = tail.indexOf("?");
    const path = queryIndex < 0 ? tail : tail.slice(0, queryIndex);
    const qs = queryIndex < 0 ? "" : tail.slice(queryIndex + 1);
    const location = deeplink(scheme, path, qs);
    if (!location) return $done({});

    return $done({
      response: {
        status: 302,
        headers: {
          Location: location,
          "Cache-Control": "no-store, no-cache",
        },
        body: "",
      },
    });
  } catch (_) {
    return $done({});
  }
}

main();
