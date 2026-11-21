// main.ts - the entry for make.fun's "The joke about the demo".
// The program writes one line to /output/entry.txt: a one-liner about
// working beside an AI coding agent. Nothing else is needed or scored.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const JOKE =
  "My AI agent called the crashed demo a 'rare edge case' — the edge case was the audience.";

// The gate that seals this competition wants 1..280 code points, not only
// white space. Fail loudly here rather than shipping an invalid entry.
function validate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 280) {
    throw new Error(`entry must be 1..280 code points, got ${points}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
}

function main(): void {
  validate(JOKE);
  const out = resolve(process.env.OUTPUT_PATH ?? "/output/entry.txt");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JOKE}\n`, "utf8");
  process.stdout.write(`wrote ${[...JOKE].length} code points to ${out}\n`);
}

main();
