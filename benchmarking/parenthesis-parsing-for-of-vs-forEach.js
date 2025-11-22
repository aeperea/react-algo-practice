function isValidForOf(s) {
  const stack = [];
  const openingToClosing = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const validChars = new Set(["(", ")", "[", "]", "{", "}"]);

  for (const ch of s) {
    if (!validChars.has(ch)) {
      return false;
    }

    if (openingToClosing[ch]) {
      stack.push(openingToClosing[ch]);
    } else {
      if (stack.length === 0) return false;
      const expected = stack.pop();
      if (ch !== expected) return false;
    }
  }

  return stack.length === 0;
}

function isValidForEach(s) {
  const stack = [];
  const openingToClosing = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const validChars = new Set(["(", ")", "[", "]", "{", "}"]);

  let isValidString = true;

  s.split("").forEach((ch) => {
    if (!isValidString) return;

    if (!validChars.has(ch)) {
      isValidString = false;
      return;
    }

    if (openingToClosing[ch]) {
      stack.push(openingToClosing[ch]);
      return;
    }

    if (stack.length === 0) {
      isValidString = false;
      return;
    }

    const expected = stack.pop();
    if (ch !== expected) {
      isValidString = false;
      return;
    }
  });

  return isValidString && stack.length === 0;
}

// ---------- Benchmark harness ----------

const {performance} = require("perf_hooks");

function benchmark(fn, label, inputs, iterations = 100_000) {
  // Warm-up
  for (let i = 0; i < 10_000; i++) {
    fn(inputs[i % inputs.length]);
  }

  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    fn(inputs[i % inputs.length]);
  }

  const end = performance.now();
  const totalMs = end - start;
  const avgNsPerCall = (totalMs * 1e6) / iterations;

  console.log(
    `${label}: total ${totalMs.toFixed(2)} ms for ${iterations.toLocaleString()} calls ` +
      `(~${avgNsPerCall.toFixed(1)} ns/call)`
  );
}

// ---------- Generate test inputs ----------

function generateBalancedString(repeat) {
  // Something like "()[]{}()[]{}..." repeated
  const unit = "()[]{}";
  return unit.repeat(repeat);
}

function generateUnbalancedString(repeat) {
  // Lots of opens then closes in weird order
  const opens = "((((([".repeat(repeat);
  const closes = "])))))".repeat(repeat);
  return opens + closes;
}

const inputs = [
  "",
  "()",
  "()[]{}",
  "({[]})",
  "[({})]",
  generateBalancedString(50),
  generateBalancedString(200),
  generateUnbalancedString(50),
  generateUnbalancedString(200),
];

// ---------- Sanity check (both should match) ----------

for (const s of inputs) {
  const a = isValidForOf(s);
  const b = isValidForEach(s);
  if (a !== b) {
    console.error("Mismatch on input:", s, "forOf:", a, "forEach:", b);
    process.exit(1);
  }
}

console.log("Sanity check passed: both implementations agree on all test inputs.\n");

// ---------- Run benchmarks ----------

const ITERATIONS = 100_000;

benchmark(isValidForOf, "for...of", inputs, ITERATIONS);
benchmark(isValidForEach, "forEach", inputs, ITERATIONS);
