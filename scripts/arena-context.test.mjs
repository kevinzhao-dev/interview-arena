import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const resolver = path.join(scriptDir, "arena-context.mjs");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "interview-arena-context-"));

function run(dataRoot) {
  return JSON.parse(execFileSync(process.execPath, [resolver], {
    encoding: "utf8",
    env: { ...process.env, INTERVIEW_ARENA_DATA_DIR: dataRoot },
  }));
}

try {
  const defaults = run(tempRoot);
  assert.equal(defaults.settings.preset, "senior-swe");
  assert.equal(defaults.target.id, "senior-swe");
  assert.equal(defaults.progress_dir, path.join(tempRoot, "progress"));

  fs.writeFileSync(path.join(tempRoot, "settings.json"), JSON.stringify({
    preset: "google-meta-senior-edge-ai",
    progress_dir: "session-history",
  }));
  const customized = run(tempRoot);
  assert.equal(customized.target.id, "google-meta-senior-edge-ai");
  assert.equal(customized.progress_dir, path.join(tempRoot, "session-history"));

  fs.writeFileSync(path.join(tempRoot, "settings.json"), JSON.stringify({
    progress_dir: "../escape",
  }));
  const invalid = spawnSync(process.execPath, [resolver], {
    encoding: "utf8",
    env: { ...process.env, INTERVIEW_ARENA_DATA_DIR: tempRoot },
  });
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /must stay inside the data root/);

  console.log("arena-context tests passed");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
