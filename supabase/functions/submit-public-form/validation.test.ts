import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isHoneypotFilled,
  isValidEmail,
  parseRequestBody,
  validateContactPayload,
  validateDesignPartnerPayload,
} from "./validation.ts";

test("isHoneypotFilled", async (t) => {
  await t.test("is false for empty, whitespace, or missing values", () => {
    assert.equal(isHoneypotFilled(undefined), false);
    assert.equal(isHoneypotFilled(""), false);
    assert.equal(isHoneypotFilled("   "), false);
  });

  await t.test("is true when a bot fills the field", () => {
    assert.equal(isHoneypotFilled("http://spam.example"), true);
  });
});

test("isValidEmail", async (t) => {
  await t.test("accepts well-formed addresses", () => {
    assert.equal(isValidEmail("person@example.com"), true);
  });

  await t.test("rejects malformed addresses", () => {
    assert.equal(isValidEmail("not-an-email"), false);
    assert.equal(isValidEmail("missing@domain"), false);
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail(undefined), false);
  });

  await t.test("rejects addresses over 254 characters", () => {
    const long = `${"a".repeat(250)}@b.com`;
    assert.equal(isValidEmail(long), false);
  });
});

test("parseRequestBody", async (t) => {
  await t.test("rejects non-object bodies", () => {
    const result = parseRequestBody(null);
    assert.equal(result.ok, false);
  });

  await t.test("rejects an unsupported formType", () => {
    const result = parseRequestBody({ formType: "carrier_pigeon", turnstileToken: "x", payload: {} });
    assert.equal(result.ok, false);
  });

  await t.test("rejects a missing turnstileToken", () => {
    const result = parseRequestBody({ formType: "contact", payload: {} });
    assert.equal(result.ok, false);
  });

  await t.test("rejects a non-object payload", () => {
    const result = parseRequestBody({ formType: "contact", turnstileToken: "tok", payload: "oops" });
    assert.equal(result.ok, false);
  });

  await t.test("accepts a well-formed contact request", () => {
    const result = parseRequestBody({
      formType: "contact",
      turnstileToken: "tok",
      payload: { name: "Ana", email: "ana@example.com", message: "Hello there, testing." },
    });
    assert.equal(result.ok, true);
  });
});

test("validateContactPayload", async (t) => {
  const valid = {
    name: "Ana Diver",
    email: "ana@example.com",
    message: "I would like to know more about AquaRosters.",
  };

  await t.test("passes for a valid payload", () => {
    assert.equal(validateContactPayload(valid), null);
  });

  await t.test("rejects a name that is too short", () => {
    assert.notEqual(validateContactPayload({ ...valid, name: "A" }), null);
  });

  await t.test("rejects an invalid email", () => {
    assert.notEqual(validateContactPayload({ ...valid, email: "not-an-email" }), null);
  });

  await t.test("rejects a message shorter than 10 characters", () => {
    assert.notEqual(validateContactPayload({ ...valid, message: "short" }), null);
  });

  await t.test("rejects a message longer than 5000 characters", () => {
    assert.notEqual(validateContactPayload({ ...valid, message: "a".repeat(5001) }), null);
  });

  await t.test("rejects an over-length optional field", () => {
    assert.notEqual(validateContactPayload({ ...valid, business_name: "a".repeat(161) }), null);
  });

  await t.test("allows optional fields to be omitted", () => {
    assert.equal(validateContactPayload(valid), null);
  });
});

test("validateDesignPartnerPayload", async (t) => {
  const valid = {
    name: "Ana Diver",
    business_name: "Blue Reef Dive Center",
    email: "ana@example.com",
    biggest_operational_problem: "Scheduling instructors across three locations is chaotic.",
  };

  await t.test("passes for a valid payload", () => {
    assert.equal(validateDesignPartnerPayload(valid), null);
  });

  await t.test("rejects a missing business name", () => {
    assert.notEqual(validateDesignPartnerPayload({ ...valid, business_name: "" }), null);
  });

  await t.test("rejects a business name over 160 characters", () => {
    assert.notEqual(validateDesignPartnerPayload({ ...valid, business_name: "a".repeat(161) }), null);
  });

  await t.test("rejects a problem description shorter than 10 characters", () => {
    assert.notEqual(validateDesignPartnerPayload({ ...valid, biggest_operational_problem: "too short" }), null);
  });

  await t.test("rejects an invalid email", () => {
    assert.notEqual(validateDesignPartnerPayload({ ...valid, email: "nope" }), null);
  });
});
