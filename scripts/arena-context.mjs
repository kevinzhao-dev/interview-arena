import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${file}: ${error.message}`);
    }
    throw error;
  }
}

function resolveInside(base, relativePath, field) {
  if (typeof relativePath !== "string" || relativePath.length === 0) {
    throw new Error(`${field} must be a non-empty relative path`);
  }
  if (path.isAbsolute(relativePath)) {
    throw new Error(`${field} must be relative to the data root`);
  }

  const resolved = path.resolve(base, relativePath);
  const relative = path.relative(base, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${field} must stay inside the data root`);
  }
  return resolved;
}

const defaultSettingsPath = path.join(repoRoot, "config/default-settings.json");
const defaultSettings = readJson(defaultSettingsPath);
const configuredDataRoot = process.env.INTERVIEW_ARENA_DATA_DIR?.trim();
const dataRoot = path.resolve(configuredDataRoot || path.join(repoRoot, ".arena"));
const localSettingsPath = path.join(dataRoot, "settings.json");
const hasLocalSettings = fs.existsSync(localSettingsPath);
const settings = {
  ...defaultSettings,
  ...(hasLocalSettings ? readJson(localSettingsPath) : {}),
};

if (typeof settings.preset !== "string" || !/^[a-z0-9-]+$/.test(settings.preset)) {
  throw new Error("preset must contain only lowercase letters, digits, and hyphens");
}

const presetPath = path.join(repoRoot, "presets", `${settings.preset}.json`);
if (!fs.existsSync(presetPath)) {
  throw new Error(`Unknown target preset: ${settings.preset}`);
}

const target = readJson(presetPath);
if (target.id !== settings.preset) {
  throw new Error(`Preset id mismatch in ${presetPath}`);
}

const result = {
  repo_root: repoRoot,
  data_root: dataRoot,
  settings_path: hasLocalSettings ? localSettingsPath : defaultSettingsPath,
  preset_path: presetPath,
  progress_dir: resolveInside(dataRoot, settings.progress_dir, "progress_dir"),
  settings,
  target,
};

const fieldIndex = process.argv.indexOf("--field");
if (fieldIndex !== -1) {
  const field = process.argv[fieldIndex + 1];
  if (!field || !(field in result)) {
    throw new Error(`Unknown field: ${field || "<missing>"}`);
  }
  const value = result[field];
  process.stdout.write(typeof value === "string" ? `${value}\n` : `${JSON.stringify(value, null, 2)}\n`);
} else {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
