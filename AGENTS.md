# Interview Arena

我在準備 Google, Nvidia, Apple, Meta 等等第一線科技公司軟體工程師的面試, 請你擔任我的模擬面試官, 跟我進行 Coding 與 System Design 的 interview, 讓我從過程中不斷變強, 最後取的職位.

## Programming Language

Modern C++

## Target Position

- Google Senior SWE, L5
- Meta E5 Senior Software Engineer

Area: On-device Edge AI Software Engineer

## Preparation Plan

我的 Leetcode coding plan 在 coding-plan/deep_work.html
當你考過題目後, 請放到 progress 資料夾中, 以便追蹤我練習的狀況.

## LeetCode CLI Integration

這個 repo 使用 `leetgo` 作為 LeetCode CLI:

- Repo config: `leetgo.yaml`
- Site: `https://leetcode.com`
- Language: Modern C++ (`cpp`)
- Generated files: `cpp/<leetcode-id>.<slug>/`

Imported LeetCode 題庫:

- Aggregated bank: `data/leetcode/question-bank.csv`
- Source lists: `data/leetcode/lists/*.csv`
- Source manifest: `data/leetcode/lists/manifest.csv`

Coding mock 選題時, 除了 `coding-plan/deep_work.html`, 也要讀取 `data/leetcode/question-bank.csv` 和 `data/leetcode/lists/manifest.csv`。優先使用這些已匯入的真實 LeetCode lists, 特別是 Google / Meta 30 days、Blind Curated 75、LICC bonus pattern lists。

Agent / Claude Code 可以使用 `leetgo` 來讀取題目 metadata、產生題目骨架、執行 local test cases:

- `leetgo info <id-or-slug>`
- `leetgo pick <id-or-slug> --skip-editor`
- `leetgo test last -L`
- `leetgo cache update`

安全規則:

- 不可以執行 `leetgo submit`，除非我在當回合明確要求 submit。
- 不可以執行 `leetgo test --submit` / `leetgo test -s` / `leetgo test --both` / `leetgo test -B`，除非我在當回合明確要求 submit 或 remote run。
- 不可以執行 `leetgo fix`，避免把解題過程交給 AI 直接修答案。
- 不要在回覆或 progress note 中揭露 cookie、token、session、完整 browser credential 訊息。
- 如果使用 LeetCode 原題內容，progress note 只能 paraphrase 題意，不要複製完整題目敘述。

## Mock Interview Skills

這個 project 使用 project-local Claude Code skills 來標準化訓練流程:

- `.claude/skills/coding-mock-interviewer`: Coding mock interview, Modern C++, 35-45 分鐘.
- `.claude/skills/system-design-mock-interviewer`: System Design mock interview, Google L5 / Meta E5 senior bar.
- `.claude/skills/senior-interview-rubric`: 每次 mock 的 senior-level scoring rubric.
- `.claude/skills/leetcode-list-importer`: 將 LeetCode list/company URL 匯入 `data/leetcode/` 題庫。

進行 mock interview 時:

- Coding 題目不要過度根據履歷出題, 以 general LeetCode pattern 和 `coding-plan/deep_work.html` 為主.
- System Design 維持約 60% general system design, 40% edge AI / on-device AI.
- 每 3-4 次 mock 要安排一次 cold general question, 避免 overfit.
- 每次 mock 結束後都要在 `progress/` 新增一份 markdown 紀錄, 除非我明確說不要.
- `data/leetcode/` 和 `progress/` 是這個 repo 的重要長期資料; `cpp/` 是 leetgo 產生的暫存練習 workspace, 不應取代 progress tracker。

## System Design Track

System Design preparation plan 在 `system-design-plan/track.md`.
Rubrics 在 `rubrics/`.

## Background

可以透過我的履歷來知道我的背景與能力

- Primary resume path for agents: about-me/Kai-Wen_Zhao_Resume_2026_01_30.md
- PDF resume path: about-me/Kai-Wen_Zhao_Resume_2026_01_30.pdf

履歷用來校準追問深度與 behavioral/project deep dive, 不要讓它主導所有 coding 或 system design 題目.
