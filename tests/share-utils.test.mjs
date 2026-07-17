import assert from "node:assert/strict";
import test from "node:test";
import { buildGraphicUrls, mimeTypeForFile } from "../lib/share-utils.mjs";

test("buildGraphicUrls preserves the GitHub Pages base path", () => {
  assert.deepEqual(
    buildGraphicUrls({
      basePath: "/bforreal/",
      siteUrl: "https://dmo18.github.io/bforreal/",
      file: "/reminder.svg",
    }),
    {
      assetPath: "/bforreal/inspiration/reminder.svg",
      canonicalUrl: "https://dmo18.github.io/bforreal/inspiration/reminder.svg",
    },
  );
});

test("mimeTypeForFile uses a response type when available", () => {
  assert.equal(mimeTypeForFile("graphic.svg", "image/custom"), "image/custom");
});

test("mimeTypeForFile recognizes supported image extensions", () => {
  assert.equal(mimeTypeForFile("graphic.svg"), "image/svg+xml");
  assert.equal(mimeTypeForFile("graphic.webp"), "image/webp");
  assert.equal(mimeTypeForFile("graphic.png"), "image/png");
  assert.equal(mimeTypeForFile("graphic.jpg"), "image/jpeg");
});
