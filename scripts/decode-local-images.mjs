import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const imagePath = resolve(process.cwd(), "public/living-yosh.jpg");
const encoded = readFileSync(imagePath, "utf8").replace(/\s+/g, "");

if (!encoded.startsWith("/9j/")) {
  throw new Error("public/living-yosh.jpg does not contain the expected JPEG Base64 data");
}

writeFileSync(imagePath, Buffer.from(encoded, "base64"));
console.log("Decoded public/living-yosh.jpg into a binary JPEG");
