import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSubmitPublicFormRequest, parseSubmitResponse } from "./submit-public-form.ts";

test("buildSubmitPublicFormRequest", async (t) => {
  await t.test("builds the Edge Function URL from the Supabase project URL", () => {
    const { url } = buildSubmitPublicFormRequest({
      supabaseUrl: "https://kocqprhhqrrfirwpxbtn.supabase.co",
      anonKey: "anon-key",
      formType: "contact",
      turnstileToken: "token-123",
      payload: { name: "Ana", email: "ana@example.com", message: "Hello there, testing." },
    });
    assert.equal(url, "https://kocqprhhqrrfirwpxbtn.supabase.co/functions/v1/submit-public-form");
  });

  await t.test("strips a trailing slash from the Supabase URL", () => {
    const { url } = buildSubmitPublicFormRequest({
      supabaseUrl: "https://kocqprhhqrrfirwpxbtn.supabase.co/",
      anonKey: "anon-key",
      formType: "contact",
      turnstileToken: "token-123",
      payload: { name: "Ana", email: "ana@example.com", message: "Hello there, testing." },
    });
    assert.equal(url, "https://kocqprhhqrrfirwpxbtn.supabase.co/functions/v1/submit-public-form");
  });

  await t.test("sends the anon key as both apikey and bearer token, never a secret", () => {
    const { init } = buildSubmitPublicFormRequest({
      supabaseUrl: "https://kocqprhhqrrfirwpxbtn.supabase.co",
      anonKey: "anon-key",
      formType: "contact",
      turnstileToken: "token-123",
      payload: { name: "Ana", email: "ana@example.com", message: "Hello there, testing." },
    });
    const headers = init.headers as Record<string, string>;
    assert.equal(headers.apikey, "anon-key");
    assert.equal(headers.Authorization, "Bearer anon-key");
    assert.equal(headers["Content-Type"], "application/json");
  });

  await t.test("serializes formType, turnstileToken, and payload in the body", () => {
    const { init } = buildSubmitPublicFormRequest({
      supabaseUrl: "https://kocqprhhqrrfirwpxbtn.supabase.co",
      anonKey: "anon-key",
      formType: "design_partner",
      turnstileToken: "token-456",
      payload: {
        name: "Ana",
        business_name: "Blue Reef",
        email: "ana@example.com",
        biggest_operational_problem: "Scheduling is chaotic across locations.",
      },
    });
    const body = JSON.parse(init.body as string);
    assert.equal(body.formType, "design_partner");
    assert.equal(body.turnstileToken, "token-456");
    assert.equal(body.payload.business_name, "Blue Reef");
  });
});

test("parseSubmitResponse", async (t) => {
  await t.test("returns ok:true for a 200 with ok:true", () => {
    assert.deepEqual(parseSubmitResponse(200, { ok: true }), { ok: true });
  });

  await t.test("surfaces a server-provided message on failure", () => {
    assert.deepEqual(parseSubmitResponse(400, { ok: false, message: "Verification failed. Please try again." }), {
      ok: false,
      message: "Verification failed. Please try again.",
    });
  });

  await t.test("falls back to a generic message when the server sends no message", () => {
    const result = parseSubmitResponse(500, {});
    assert.equal(result.ok, false);
    assert.ok(!result.ok && result.message.length > 0);
  });

  await t.test("falls back to a generic message for a non-object body", () => {
    const result = parseSubmitResponse(500, null);
    assert.equal(result.ok, false);
  });
});
