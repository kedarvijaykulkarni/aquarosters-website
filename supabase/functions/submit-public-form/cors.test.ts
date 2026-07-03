import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCorsHeaders, parseAllowedOrigins, resolveAllowedOrigin } from "./cors.ts";

test("parseAllowedOrigins", async (t) => {
  await t.test("splits and trims a comma-separated list", () => {
    assert.deepEqual(
      parseAllowedOrigins("http://localhost:3000, https://aquarosters.com"),
      ["http://localhost:3000", "https://aquarosters.com"]
    );
  });

  await t.test("returns an empty list for undefined or blank input", () => {
    assert.deepEqual(parseAllowedOrigins(undefined), []);
    assert.deepEqual(parseAllowedOrigins(""), []);
  });

  await t.test("drops empty entries from trailing commas", () => {
    assert.deepEqual(parseAllowedOrigins("http://localhost:3000,,"), ["http://localhost:3000"]);
  });
});

test("resolveAllowedOrigin", async (t) => {
  const allowed = ["http://localhost:3000", "https://aquarosters.com"];

  await t.test("returns the origin when it is allowed", () => {
    assert.equal(resolveAllowedOrigin("https://aquarosters.com", allowed), "https://aquarosters.com");
  });

  await t.test("returns null when the origin is not allowed", () => {
    assert.equal(resolveAllowedOrigin("https://evil.example", allowed), null);
  });

  await t.test("returns null when there is no origin header", () => {
    assert.equal(resolveAllowedOrigin(null, allowed), null);
  });
});

test("buildCorsHeaders", async (t) => {
  await t.test("includes the resolved origin when present", () => {
    const headers = buildCorsHeaders("https://aquarosters.com");
    assert.equal(headers["Access-Control-Allow-Origin"], "https://aquarosters.com");
    assert.equal(headers["Access-Control-Allow-Methods"], "POST, OPTIONS");
    assert.ok(headers["Access-Control-Allow-Headers"].includes("apikey"));
  });

  await t.test("omits the origin header when the origin was not allowed", () => {
    const headers = buildCorsHeaders(null);
    assert.equal("Access-Control-Allow-Origin" in headers, false);
  });
});
