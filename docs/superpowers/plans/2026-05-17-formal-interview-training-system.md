# Formal Interview Training System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add project-local Claude Code skills and supporting templates for coding mocks, system design mocks, and senior-level scoring.

**Architecture:** Keep the system file-based and agent-readable. Claude Code skills live under `.claude/skills/`; shared human references live under `rubrics/` and `system-design-plan/`; session outputs live under `progress/`.

**Tech Stack:** Markdown, Claude Code project skills, Git.

---

### Task 1: Repository Baseline

**Files:**
- Create: `.gitignore`
- Commit current project files.

- [x] **Step 1: Initialize Git**

Run: `git init`

- [x] **Step 2: Ignore local noise**

Add `.DS_Store`, logs, env files, and common build outputs to `.gitignore`.

- [x] **Step 3: Commit baseline**

Run:

```bash
git add .gitignore AGENTS.md CLAUDE.md about-me coding-plan
git commit -m "chore: initialize interview arena"
```

### Task 2: Design And Plan

**Files:**
- Create: `docs/superpowers/specs/2026-05-17-formal-interview-training-system-design.md`
- Create: `docs/superpowers/plans/2026-05-17-formal-interview-training-system.md`

- [x] **Step 1: Write the design**

Define goals, scope, components, resume-use policy, and success criteria.

- [x] **Step 2: Write this implementation plan**

Keep the plan aligned with the requested commit-by-section workflow.

- [ ] **Step 3: Commit design and plan**

Run:

```bash
git add docs/superpowers/specs/2026-05-17-formal-interview-training-system-design.md docs/superpowers/plans/2026-05-17-formal-interview-training-system.md
git commit -m "docs: design formal interview training system"
```

### Task 3: Coding Mock Skill

**Files:**
- Create: `.claude/skills/coding-mock-interviewer/SKILL.md`
- Create: `.claude/skills/coding-mock-interviewer/references/session-template.md`

- [ ] **Step 1: Create skill instructions**

Write a concise workflow for conducting 35-45 minute Modern C++ coding interviews.

- [ ] **Step 2: Create the session template**

Define the final progress note format.

- [ ] **Step 3: Commit coding skill**

Run:

```bash
git add .claude/skills/coding-mock-interviewer
git commit -m "feat: add coding mock interviewer skill"
```

### Task 4: System Design Track And Skill

**Files:**
- Create: `.claude/skills/system-design-mock-interviewer/SKILL.md`
- Create: `.claude/skills/system-design-mock-interviewer/references/question-bank.md`
- Create: `system-design-plan/track.md`

- [ ] **Step 1: Create system design skill**

Write a workflow for senior-level system design interviews.

- [ ] **Step 2: Create a balanced question bank**

Include general systems and edge AI systems.

- [ ] **Step 3: Create the system design training track**

Define cadence, topic sequence, and anti-overfit rotation.

- [ ] **Step 4: Commit system design section**

Run:

```bash
git add .claude/skills/system-design-mock-interviewer system-design-plan
git commit -m "feat: add system design mock track"
```

### Task 5: Senior Rubric And Progress Templates

**Files:**
- Create: `.claude/skills/senior-interview-rubric/SKILL.md`
- Create: `rubrics/senior-coding-rubric.md`
- Create: `rubrics/senior-system-design-rubric.md`
- Create: `progress/TEMPLATE-coding-mock.md`
- Create: `progress/TEMPLATE-system-design-mock.md`

- [ ] **Step 1: Create senior rubric skill**

Define scoring behavior and final recommendation language.

- [ ] **Step 2: Create human-readable rubrics**

Separate coding and system design signals.

- [ ] **Step 3: Create progress templates**

Make it easy to write consistent session records.

- [ ] **Step 4: Commit rubric section**

Run:

```bash
git add .claude/skills/senior-interview-rubric rubrics progress/TEMPLATE-coding-mock.md progress/TEMPLATE-system-design-mock.md
git commit -m "feat: add senior rubric and progress templates"
```

### Task 6: Project Instruction Wiring

**Files:**
- Modify: `AGENTS.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Reference markdown resume**

Point agents to the markdown resume as the primary readable source.

- [ ] **Step 2: Reference local skills and progress requirements**

Tell agents to use the relevant project-local skills for mocks.

- [ ] **Step 3: Verify**

Run:

```bash
git status --short
find .claude/skills -maxdepth 3 -type f | sort
find rubrics system-design-plan progress -maxdepth 2 -type f | sort
```

- [ ] **Step 4: Commit wiring**

Run:

```bash
git add AGENTS.md CLAUDE.md
git commit -m "docs: wire interview arena agent instructions"
```
