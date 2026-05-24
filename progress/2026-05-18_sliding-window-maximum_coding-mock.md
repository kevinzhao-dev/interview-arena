# Coding Mock: Sliding Window Maximum

**Date:** 2026-05-18
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected (sliding window pattern)
**Pattern:** Monotonic deque (sliding window)
**Result:** Close
**LeetCode:** 239 sliding-window-maximum (Hard)
**Leetgo Evidence:** `leetgo info 239`, `leetgo pick 239 --skip-editor`, `leetgo test last -L` (2/2 local), `leetgo test last --submit` (52/52 Accepted, 16ms / 85%, 139.1MB / 66%)

## Problem Summary

給 array `nums` 和 window 大小 `k`, window 從左滑到右, 回傳每個 window position 的最大值.

## Candidate Approach

- Clarification: 未主動 clarify input size / duplicates / k 範圍, 直接進 approach.
- Brute force: 未明說, 隱含 O(nk) 對每個 window 掃過取 max.
- Bottleneck: 自己點出「每次都要重新 go through queue 找 max 不對」, 推導出需要 monotonic structure.
- Optimal approach: Monotonic decreasing deque, 存 index. Push 時從 back 清掉所有 ≤ nums[i] 的; window 過期則從 front pop; window 滿之後 front 即為當前 max.
- Invariant / state / proof: Deque 內 indices ∈ `[i-k+1, i]` 且對應 nums strictly decreasing. 自己推時是非正式版本, 由 interviewer 幫忙寫精確.

## Code Review Notes

- Correctness: 初版有 4 個 bug — (1) `q.back() <= nums[i]` 沒解 index, (2) window 大小公式 `q.front() - i + 1` 寫反, (3) 用 `q.top()` (deque 無此 method), (4) 沒判斷 window 滿才 push 結果. 透過 dry-run 提示後自行修完. Window-fill 條件第一次寫成 `i >= k` 有 off-by-one, 提示後修為 `i >= k-1`.
- C++ API / implementation: `std::deque` API 不熟 (誤用 `top()`). 索引 vs 值的分離意識在初稿不夠紮實 (deque 存 index 但比較和回傳時忘了 deref).
- Complexity: 初答 `O(n+k)`, 由 interviewer 修正為 **amortized O(n)** (每個 index 至多 push 一次 / pop 一次). Space 答 O(n), 修正為 **O(k)** (deque 上界).
- Edge cases: 未主動列出. Interviewer 補: k=1, k=n, 全遞增, 全遞減, 重複值.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 2 | 跳過 clarify, 直接進方法. |
| Brute force / bottleneck | 3 | Bottleneck 自己抓到, brute force 沒明說. |
| Optimal approach | 3 | Monotonic deque + store index 方向正確且獨立推得. |
| Proof / invariant | 2 | 概念對, 但不會用精確 invariant 形式表達; "invariant" 一詞陌生. |
| C++ correctness | 2 | 初版 4 bug + off-by-one, 全靠 dry-run 提示才發現. |
| Testing | 2 | 拒絕手動 dry-run, 改要求直接 submit. Onsite 場合會扣分. |
| Communication | 3 | 思路清楚, 願意修正, 對 interviewer 引導反應快. |

## Interviewer Feedback

### Strengths

- 從 deque 自然推到 monotonic queue, 再推到「存 index 才能判斷 window 過期」, 推理鏈完整.
- Pop-back 條件的直覺正確 (新元素出現後, 比它小的舊元素永遠不會再當 max).
- 對 interviewer 的提問會自己回去 trace 並改正, 不會卡死辯護初版.

### Improvement Since Last Session

- 對比 05-17 longest-repeating-character-replacement, 這次主動點出 bottleneck 並選對資料結構, 不需要 interviewer 暗示 sliding window 框架.

### Improvement Areas

- **Clarification 一定要做**, 哪怕只是「k 保證 1 ≤ k ≤ n 嗎? nums 範圍?」, 這在 Google/Meta 是 senior bar 必觀察點.
- **Invariant 要會用精確語言寫**: 「deque 內 indices 全在 window 內 + 對應 value 嚴格遞減」這種 (a)(b) 兩條形式, 平常練習時就用文字寫一遍再 code.
- **Code 之前先 dry-run 一個 case**, 至少把第一個 window 的 deque 內容寫在旁邊. 這次 4 個 bug 全部會被一輪 dry-run 抓到.
- **Complexity 要會講 amortized argument**: nested while 看起來 O(nk), 真正講清楚每個 element 最多 push/pop 一次才是 senior signal. 不能只報 big-O 數字.
- 拒絕 dry-run、改要 submit 在 onsite 是明顯扣分行為, 練習時要強迫自己跑一遍.

### Key Moment

要求手動 dry-run 時跳過, 改要求 submit. AC 雖然過了, 但「不驗證 code 就交」這個習慣在 onsite 會放大. 下次必須在送出前口頭跑過至少一個 case.

## Seven-Question Completion

- [x] Pattern (monotonic deque)
- [ ] Brute force (沒明說)
- [x] Bottleneck (自己抓到)
- [x] Optimal repeated-work reduction
- [~] Invariant (概念對但形式不精確)
- [~] Time / space complexity (初答錯, 修正後對)
- [ ] Edge cases (沒主動列)

## Follow-Up

**Redo needed:** No (AC 且核心推理對), 但下一題 sliding window 時要驗 invariant 表達和 dry-run 紀律.
**Redo date:** N/A
**Next target:** Sliding window 變化題 — 建議 Minimum Window Substring (76) 或 Longest Substring with At Most K Distinct Characters (340), 換 hashmap-based sliding window 換手感. 或挑一題 monotonic stack (e.g. Daily Temperatures, Largest Rectangle in Histogram) 鞏固 monotonic 結構的另一面.
