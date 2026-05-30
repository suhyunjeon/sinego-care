import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await Promise.all([
  cp(path.join(root, "index.html"), path.join(dist, "index.html")),
  cp(path.join(root, "manifest.webmanifest"), path.join(dist, "manifest.webmanifest")),
  cp(path.join(root, "service-worker.js"), path.join(dist, "service-worker.js")),
  cp(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true }),
  cp(path.join(root, "src"), path.join(dist, "src"), { recursive: true })
]);

console.log(`Static files copied to ${dist}`);
