import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sourceRoot = path.join(repoRoot, ".claude/skills");
const targetRoot = path.join(repoRoot, ".agents/skills");
const checkOnly = process.argv.includes("--check");

function filesUnder(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(fullPath);
      else if (entry.isFile()) files.push(path.relative(root, fullPath));
    }
  }
  visit(root);
  return files.sort();
}

const sourceFiles = filesUnder(sourceRoot);
if (sourceFiles.length === 0) throw new Error(`No canonical skills found in ${sourceRoot}`);

if (!checkOnly) {
  for (const relative of sourceFiles) {
    const source = path.join(sourceRoot, relative);
    const target = path.join(targetRoot, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

const targetFiles = filesUnder(targetRoot);
const sourceSet = new Set(sourceFiles);
const targetSet = new Set(targetFiles);
const missing = sourceFiles.filter((file) => !targetSet.has(file));
const extra = targetFiles.filter((file) => !sourceSet.has(file));
const changed = sourceFiles.filter((file) => targetSet.has(file)
  && !fs.readFileSync(path.join(sourceRoot, file)).equals(fs.readFileSync(path.join(targetRoot, file))));

if (missing.length || extra.length || changed.length) {
  const details = { missing, extra, changed };
  throw new Error(`Agent skill copies are out of sync: ${JSON.stringify(details)}`);
}

console.log(checkOnly ? "agent skills are in sync" : "agent skills synchronized");
