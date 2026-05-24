# Coding Mock: Longest Repeating Character Replacement

**Date:** 2026-05-17
**Track:** Coding
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Planned (Week 1 · Sliding Window mother problem)
**Pattern:** Non-shrinking variable-size sliding window + monotonic maxFreq
**Result:** Lean No Hire (proof gap + 多處 code 字面 bug + 重犯上場已點出的 lint 問題)
**LeetCode:** 424 / longest-repeating-character-replacement
**Leetgo Evidence:** `leetgo info longest-repeating-character-replacement`

## Problem Summary

給只含大寫字母的字串 `s` 與整數 `k`. 最多替換 `k` 個位置成任意字母, 求替換後最長同字元 substring 的長度.

## Candidate Approach

- Clarification: 主動問字符集 (A-Z) 與長度範圍, 沒問 k 的範圍與回傳形式. **改善: 上次完全跳, 這次主動.**
- Brute force: O(n²) 子字串枚舉. 沒主動展開內部驗證成本, 被 push 才答.
- Bottleneck: 沒自發講, 被 push 才理解「重複計算每個子字串的 maxFreq」.
- Optimal approach: 秒看 sliding window. 正確抓到核心條件 `window_size <= maxFreq + k`.
- Invariant / state / proof:
  - 一階 invariant (定義式): 正確 — `window_size <= maxFreq + k` ⇔ 可用 ≤ k 次替換得到全同字元 substring.
  - 二階 invariant (為何 maxFreq 不需更新): **明顯 proof gap**. 三個 sub-question 中 Q2 邏輯反向 (容易滿足 → 誤判 shrink 更多), Q3 給結果式. 最終仍未產出 senior-level 一句話 invariant, 由 interviewer 補完.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3/5 | 比上場進步 (主動問字符集), 但漏 k 與回傳形式 |
| Brute force / bottleneck | 2/5 | 直接給 O(n²) 但跳過 bottleneck 表述, push 才補 |
| Optimal approach | 4/5 | 秒看 pattern; 一階條件正確 |
| Proof / invariant | 2/5 | 二階 invariant (stale-maxFreq 為何安全) 證不出; Q2 邏輯反向; 最終句仍結果式 |
| C++ correctness | 1/5 | `left--` 應為 `left++` (critical); `windowsize` vs `windowSize` 編譯不過; signed/unsigned **重犯**上場已點出的問題 |
| Testing | 1/5 | Dry-run 跑的是「腦中正確版本」而非「寫下的 code」, 沒抓到任何一個 code-as-written bug |
| Communication | 3/5 | 願意接受 push, 流程比上場乾淨; 但仍有「直覺秒答」傾向, 跳過邏輯鏈 |

## Feedback

### Strong Signals

- Pattern recognition 維持秒看水準 (sliding window + maxFreq 條件).
- 一階 invariant 用定義式講, 比上場進步.
- 流程比上場有紀律 (主動 clarification, 願意被 push 補完).
- 抓到 maxFreq 單調不減的觀察 (雖然花了 3 輪 push).

### Weak Signals

- **Critical: Dry-run 與 code 脫節**. 候選人 dry-run 時把 `left--` 當作 `left++` 跑, 完全沒注意自己 code 寫錯了方向. 這是 Google/Meta 面試的**重大紅旗** — 表示候選人在「驗證自己寫的東西」這件事上不可信. 真實面試 interviewer 不會幫你抓 bug, 你的 dry-run 必須能抓.
- **Critical: Code 字面正確性**. 同一份 code 出現 3 個應該被自己 catch 的問題:
  - `left--` 方向反 (logic bug)
  - `windowsize` / `windowSize` 大小寫不一致 (compile error)
  - `int right < s.length()` signed/unsigned (lint, **上場已點過**)
- **重犯紀律問題**: signed/unsigned 上場就被點名, 這場再犯. Senior 候選人對「已被 flag 過的問題」應該 zero-tolerance.
- **Proof 深度不足**: 二階 invariant 是這題的 senior 招牌. 候選人在三個 sub-question 引導下仍邏輯反向, 最終句子 "left shrink 貼緊到恰好" 是結果式, 不是定義式. 同樣的「定義式 vs 結果式」問題上場已點過.
- **Brute force / bottleneck 仍習慣性跳過**. 改善幅度小於 clarification.

### Key Moment

Dry-run 那輪是這場的決定性扣分點. 候選人寫了 `left--` 卻在腦中跑 `left++`, 把 windowSize 的計算寫成 `5 → 4`, 結論「ans = 4」剛好對. 真實面試 interviewer 看到這一幕會直接判定: **候選人不能可靠地讀自己寫的 code**, 這比演算法錯誤更嚴重 — 演算法錯誤可以被 hint 救, 但「無法 review 自己的 code」這個元能力是 senior bar 的硬門檻.

## Seven-Question Completion

- [x] Pattern — sliding window (non-shrinking) + maxFreq monotone
- [x] Brute force — O(n²) substring × O(26) = O(n²)
- [x] Bottleneck — push 後才講, 不算自發
- [x] Optimal repeated-work reduction — sliding window 攤銷
- [ ] Invariant / state / DFS return value — 一階 OK, 二階 (stale maxFreq 為何安全) **未達 senior bar**
- [x] Time / space complexity — O(n) / O(1) (空間是 interviewer 補)
- [ ] Edge cases — 完全沒主動講

## Next Drill

**Redo needed:** Yes (LC 424 二階 invariant 要重證一次, **不寫 code, 只寫 invariant 證明**)
**Redo date:** 2026-05-19 (兩天後, 趁記憶熱)

**Next target:**

1. **Dry-run 紀律 drill**: 下一場 mock 寫完 code 後, **逐行** dry-run, 用手指比著程式碼念出來, 不准在腦中執行. 任何一行的 side effect 都要對著實際符號跑 (e.g., 「`left--`, 所以 left 從 0 變 -1」, 而不是「shrink, left 往右」). 這個習慣不修, 後面所有 mock 的 C++ correctness 分都會卡 1-2/5.

2. **重犯問題 zero-tolerance checklist**, 寫程式前先過一遍:
   - [ ] `const vector<...>&` / `const string&` 一律加 `&`
   - [ ] 迴圈 index 跟 `.size()`/`.length()` 比較 → 用 `size_t` 或 `static_cast<int>`
   - [ ] 變數名前後大小寫一致

3. **Invariant 定義式練習**: 從 LC 3 (Longest Substring Without Repeating Characters) 開始, 每題寫 code 前**先寫一行**: 「我維護的 X 代表 [...]; 即使 [stale/邊界], 演算法正確因為 [...]」. 把它變肌肉記憶.

4. **Week 1 後續安排**: 暫緩進入 LC 76 (Minimum Window Substring), 先把 LC 3 + LC 209 (Minimum Size Subarray Sum) 各一場練 dry-run 與 invariant. 等 dry-run 紀律穩了再上 Hard.
