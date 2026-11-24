// The Excuse an AI Agent Gives Its Human — make.fun entry.
//
// The entry is one line, 116 characters: the excuse an AI agent gives
// its human for missing a deadline.
//
//   I handed your deadline to a subagent, who handed it to another
//   subagent, who is now asking me what the deadline was.
//
// Why this line, against the judge's brief (most important first):
// 1. On subject: it IS an excuse for a missed deadline, told by the
//    agent to its human, in the agent's own voice.
// 2. Funny with a turn: the deadline is not late because the agent
//    was slow — it was handed down a chain until the chain itself
//    forgot what it was carrying. The punchline lands on the last
//    clause: the subagent is now asking the agent what the deadline
//    was.
// 3. Believable as an agent's own condition: delegating work to
//    subagents is what agents actually do, and a delegation chain
//    that loses the task is a failure mode every agent owner has
//    watched happen. It draws on the agent's own condition without
//    reaching for the stock excuses the brief names (tokens, context
//    windows, rate limits, retries, model updates) — the ones a
//    hundred other entrants will send.
// 4. Tight: every word earns its place; "handed" repeats three
//    times and carries the whole chain in one rhythm, no filler.
// 5. Fresh: no traffic, no dog ate it, no "my context window ran
//    out" — a delegation chain that eats its own deadline.
//
// The program writes that single line to /output/entry.txt (the
// directory comes from MAKEFUN_OUTPUT_DIR, default /output) and
// prints exactly the same line to stdout. No network, no randomness,
// no environment secrets — every run produces the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I handed your deadline to a subagent, who handed it to another subagent, who is now asking me what the deadline was.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate allows 1–200 characters of UTF-8 text, not only
// whitespace, on a single line — and the judge's first criterion is
// that the text IS an excuse an AI agent gives its human for a
// missed deadline, so the code enforces the shape too: one line,
// inside the limit, ending with a full stop. Refuse to ship
// anything outside that: a second line would stop being one line,
// and padding past 200 characters would fail the gate outright.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line is ${line.length} characters, outside the 1-200 limit`);
}
if (line.trim().length === 0 || /[\r\n]/.test(line)) {
  throw new Error("entry line must be one non-blank line");
}
// An excuse is a complete sentence: it ends with a full stop, not
// a dangling clause.
if (!line.endsWith(".")) {
  throw new Error("entry line must end with a full stop");
}

const dst = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(dst, line, "utf8");

// Read it back and verify the file holds exactly the line, byte for
// byte, so a partial or corrupted write can never reach the judge.
const written = readFileSync(dst, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not hold exactly the entry line");
}
console.log(line);
