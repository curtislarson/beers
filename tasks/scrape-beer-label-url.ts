import { createPolicy } from "./helpers/policy.ts";

const re = /<meta property="og:image" content="(.*)" \/>/g;

export async function scrapeBeerLabelUrl(beerId: string | number) {
  const url = `https://untappd.com/beer/${beerId}`;

  const retryWithBreaker = createPolicy();
  const body = await retryWithBreaker.execute(() =>
    fetch(url, { redirect: "follow" }).then((r) => {
      if (!r.ok || r.body == null) {
        throw new Error("Failed to get body");
      }
      return r.body;
    })
  );

  const reader = body.pipeThrough(new TextDecoderStream()).getReader();

  let data = "";
  let imageUrl: string | null = null;
  while (true) {
    const read = await reader.read();
    if (read.done || !read.value) {
      break;
    }
    data += read.value;
    const match = re.exec(data);
    if (match != null) {
      imageUrl = match[1];
    }
  }

  try {
    reader.releaseLock();
    await reader.cancel();
  } catch {
    // empty
  }

  return imageUrl;
}
