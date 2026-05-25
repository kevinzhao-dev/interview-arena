import fs from "node:fs/promises";
import path from "node:path";

const CSV_HEADERS = [
  "source_key",
  "source_name",
  "source_type",
  "source_url",
  "problem_id",
  "slug",
  "title",
  "difficulty",
  "acceptance",
  "problem_url",
  "concepts",
  "imported_at",
];

const BANK_HEADERS = [
  "problem_id",
  "slug",
  "title",
  "difficulty",
  "acceptance",
  "problem_url",
  "source_keys",
  "source_count",
  "concepts",
  "imported_at",
];

const MANIFEST_HEADERS = [
  "source_key",
  "source_name",
  "source_type",
  "source_url",
  "question_count",
  "page_progress",
  "imported_at",
];

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csvRow(values) {
  return values.map(csvEscape).join(",");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const [headers, ...body] = rows.filter((r) => r.length && r.some(Boolean));
  if (!headers) return [];
  return body.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

async function readCsv(file) {
  try {
    return parseCsv(await fs.readFile(file, "utf8"));
  } catch (error) {
    if (error && error.code === "ENOENT") return [];
    throw error;
  }
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sourceName(result) {
  const url = result.url;
  const h1 = result.meta?.h1 || result.meta?.title || "LeetCode List";
  if (url.includes("/company/google/")) return "Google 30 Days";
  if (url.includes("/company/facebook/")) return "Meta 30 Days";
  return h1.replace(/^🌟\s*/, "").trim();
}

function sourceKey(result) {
  if (result.url.includes("/company/google/")) return "google-thirty-days";
  if (result.url.includes("/company/facebook/")) return "meta-thirty-days";
  return slugify(sourceName(result));
}

function sourceType(url) {
  return url.includes("/company/") ? "company" : "problem-list";
}

function problemUrl(slug) {
  return slug ? `https://leetcode.com/problems/${slug}/` : "";
}

function splitConcepts(value) {
  return String(value || "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseProblemLink(link) {
  const text = (link.text || "").replace(/\u00a0/g, " ").trim();
  const lines = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const first = lines.find((s) => /^\d+\.\s+/.test(s)) || lines[0] || "";
  const match = first.match(/^(\d+)\.\s+(.+)$/);
  const href = link.href || "";
  const slugMatch = href.match(/\/problems\/([^/?#]+)/);
  const difficultyLine = lines.find((s) => /^(Easy|Med\.|Medium|Hard)$/i.test(s));
  const acceptanceLine = lines.find((s) => /^\d+(\.\d+)?%$/.test(s));
  return {
    id: match ? match[1] : "",
    title: match ? match[2] : first,
    slug: slugMatch ? slugMatch[1] : "",
    difficulty: difficultyLine ? difficultyLine.replace(/^Med\.$/i, "Medium") : "",
    acceptance: acceptanceLine || "",
    href,
  };
}

async function collectProblemLinks(tab) {
  const links = await tab.playwright.evaluate(() => Array.from(document.querySelectorAll('a[href*="/problems/"]')).map((a) => ({
    href: a.href,
    text: a.innerText,
  })));
  return links.map(parseProblemLink).filter((p) => p.id && p.slug);
}

async function extractUrl(tab, url, options) {
  const maxScrolls = options.maxScrolls ?? 120;
  const stableRounds = options.stableRounds ?? 10;
  const waitAfterLoadMs = options.waitAfterLoadMs ?? 5500;
  await tab.goto(url);
  await tab.playwright.waitForLoadState({ state: "domcontentloaded", timeoutMs: 30000 });
  await tab.playwright.waitForTimeout(waitAfterLoadMs);

  const seen = new Map();
  let stable = 0;
  let lastCount = -1;
  for (let i = 0; i < maxScrolls; i++) {
    for (const problem of await collectProblemLinks(tab)) {
      seen.set(`${problem.id}:${problem.slug}`, problem);
    }
    if (seen.size === lastCount) stable++;
    else stable = 0;
    lastCount = seen.size;
    if (stable >= stableRounds) break;
    await tab.cua.scroll({ x: 1300, y: 850, scrollY: 950, scrollX: 0 });
    await tab.playwright.waitForTimeout(700);
  }

  const meta = await tab.playwright.evaluate(() => {
    const body = document.body.innerText || "";
    const h1 = document.querySelector("h1")?.innerText?.trim() || "";
    const title = document.title || "";
    const questionCount = body.match(/(\d+)\s+questions/i)?.[1] || "";
    const progress = body.match(/Progress\s+(\d+\/\d+)\s+Solved/i)?.[1] || body.match(/(\d+\/\d+)\s+Solved/i)?.[1] || "";
    return { h1, title, questionCount, progress };
  });

  return {
    url,
    meta,
    problems: Array.from(seen.values()).sort((a, b) => Number(a.id) - Number(b.id)),
  };
}

async function writeResults(results, root, importedAt) {
  const dataDir = path.join(root, "data/leetcode");
  const listsDir = path.join(dataDir, "lists");
  await fs.mkdir(listsDir, { recursive: true });

  const manifestByKey = new Map((await readCsv(path.join(listsDir, "manifest.csv"))).map((row) => [row.source_key, row]));

  for (const result of results) {
    const key = sourceKey(result);
    const name = sourceName(result);
    const type = sourceType(result.url);
    const rows = [CSV_HEADERS];
    for (const p of result.problems) {
      rows.push([key, name, type, result.url, p.id, p.slug, p.title, p.difficulty, p.acceptance, problemUrl(p.slug), p.concepts || "", importedAt]);
    }
    await fs.writeFile(path.join(listsDir, `${key}.csv`), rows.map(csvRow).join("\n") + "\n", "utf8");
    manifestByKey.set(key, {
      source_key: key,
      source_name: name,
      source_type: type,
      source_url: result.url,
      question_count: String(result.problems.length),
      page_progress: result.meta?.progress || "",
      imported_at: importedAt,
    });
  }

  const manifestRows = [MANIFEST_HEADERS];
  for (const row of Array.from(manifestByKey.values()).sort((a, b) => a.source_key.localeCompare(b.source_key))) {
    manifestRows.push(MANIFEST_HEADERS.map((h) => row[h] ?? ""));
  }
  await fs.writeFile(path.join(listsDir, "manifest.csv"), manifestRows.map(csvRow).join("\n") + "\n", "utf8");

  const existingBank = new Map((await readCsv(path.join(dataDir, "question-bank.csv"))).map((row) => [`${row.problem_id}:${row.slug}`, row]));
  const aggregate = new Map();
  const listFiles = (await fs.readdir(listsDir)).filter((f) => f.endsWith(".csv") && f !== "manifest.csv");
  for (const file of listFiles) {
    for (const row of await readCsv(path.join(listsDir, file))) {
      if (!row.problem_id || !row.slug) continue;
      const key = `${row.problem_id}:${row.slug}`;
      if (!aggregate.has(key)) {
        const existing = existingBank.get(key) || {};
        aggregate.set(key, {
          problem_id: row.problem_id,
          slug: row.slug,
          title: existing.title || row.title || "",
          difficulty: existing.difficulty || row.difficulty || "",
          acceptance: existing.acceptance || row.acceptance || "",
          problem_url: existing.problem_url || row.problem_url || problemUrl(row.slug),
          sources: new Set(),
          concepts: new Set(splitConcepts(existing.concepts)),
        });
      }
      const item = aggregate.get(key);
      item.sources.add(row.source_key);
      for (const field of ["title", "difficulty", "acceptance", "problem_url"]) {
        if (!item[field] && row[field]) item[field] = row[field];
      }
      for (const concept of splitConcepts(row.concepts)) {
        item.concepts.add(concept);
      }
    }
  }

  const bankRows = [BANK_HEADERS];
  for (const item of Array.from(aggregate.values()).sort((a, b) => Number(a.problem_id) - Number(b.problem_id))) {
    const sources = Array.from(item.sources).sort();
    bankRows.push([
      item.problem_id,
      item.slug,
      item.title,
      item.difficulty,
      item.acceptance,
      problemUrl(item.slug),
      sources.join(";"),
      String(sources.length),
      Array.from(item.concepts).sort().join(";"),
      importedAt,
    ]);
  }
  await fs.writeFile(path.join(dataDir, "question-bank.csv"), bankRows.map(csvRow).join("\n") + "\n", "utf8");

  return {
    sources: manifestByKey.size,
    imported_sources: results.length,
    imported_entries: results.reduce((sum, r) => sum + r.problems.length, 0),
    unique: aggregate.size,
  };
}

export async function importLeetCodeLists(options) {
  const { urls, root, browser, tab } = options;
  if (!Array.isArray(urls) || urls.length === 0) throw new Error("urls must be a non-empty array");
  if (!root) throw new Error("root is required");
  if (!browser && !tab) throw new Error("browser or tab is required");

  const workingTab = tab || await browser.tabs.new();
  const importedAt = options.importedAt || new Date().toISOString().slice(0, 10);
  const results = [];
  for (const url of urls) {
    results.push(await extractUrl(workingTab, url, options));
  }

  const summary = await writeResults(results, root, importedAt);
  return { summary, results };
}
