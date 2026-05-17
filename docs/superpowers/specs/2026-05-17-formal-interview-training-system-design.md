# Formal Interview Training System Design

## Goal

Build a formal mock-interview operating system for Google L5 / Meta E5 preparation, focused on Modern C++, senior-level coding interviews, system design, and on-device edge AI software engineering.

## Scope

The system adds project-local Claude Code skills, reusable progress templates, a system design track, and a consistent senior-level rubric.

It does not replace the existing `coding-plan/deep_work.html`; that page remains the coding syllabus and visual tracker. The new files define how an interview agent should conduct sessions, score performance, and write durable notes.

## Principles

- Train general interview ability first; use the resume for calibration and follow-up depth, not as a narrow题库.
- Preserve the current coding plan's emphasis on pattern, invariant, state, proof intuition, and Hard tolerance.
- Make every mock produce an artifact in `progress/`.
- Score at L5/E5 signal level: clarity, correctness, tradeoff judgment, debugging maturity, and communication.
- Keep skills small and composable so Claude Code can trigger the right workflow without loading irrelevant instructions.

## Components

### `.claude/skills/coding-mock-interviewer`

Conducts 35-45 minute coding interviews in Modern C++. It follows the loop:

1. Clarify requirements.
2. Ask for brute force.
3. Identify bottleneck.
4. Drive toward optimal solution.
5. Require invariant/state/proof intuition.
6. Have the candidate code.
7. Ask for tests and edge cases.
8. Score and write progress notes.

### `.claude/skills/system-design-mock-interviewer`

Conducts senior-level system design mocks with a balanced mix:

- 60% general distributed/product system design.
- 40% edge AI / on-device AI / inference platform design.

It avoids overfitting to the resume by rotating cold questions and general systems.

### `.claude/skills/senior-interview-rubric`

Defines the scoring language and hire bar:

- Strong Hire
- Hire
- Lean Hire
- Lean No Hire
- No Hire

Scores are grounded in observable behavior, not vibes.

### `system-design-plan/`

Stores the system design training track: topic list, session cadence, and cold-question rotation.

### `rubrics/`

Stores human-readable scoring references that can be used by any agent or by the candidate during review.

### `progress/`

Stores session artifacts. Each mock should create one markdown file with the date, topic, result, feedback, and next action.

## Resume Use Policy

The resume at `about-me/Kai-Wen_Zhao_Resume_2026_01_30.md` should be used as background calibration:

- Use it to choose realistic follow-up depth.
- Use it for behavioral and project deep dives.
- Use it to create edge AI variants of general design questions.
- Do not let it dominate coding question selection.
- Include fully cold questions regularly.

## Success Criteria

- Claude Code can trigger specialized mock-interview behavior from project-local skills.
- Each mock ends with a clear score and a saved progress note.
- System design practice includes both general L5/E5 systems and edge AI systems.
- The rubric distinguishes "solved eventually" from "senior interview signal."
- The project remains readable and low-maintenance.
