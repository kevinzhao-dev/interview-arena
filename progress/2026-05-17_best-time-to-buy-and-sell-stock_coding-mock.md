# Coding Mock: Best Time to Buy and Sell Stock

**Date:** 2026-05-17
**Track:** Coding
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Cold (Easy, short session)
**Pattern:** Running minimum / single-pass scan (二選一視角: two-pointer)
**Result:** Lean Hire (for Easy bar)
**LeetCode:** 121 / best-time-to-buy-and-sell-stock
**Leetgo Evidence:** `leetgo info 121`

## Problem Summary

給一個股票每日價格陣列, 選一天買, 之後某一天賣, 求最大獲利; 無法獲利則回傳 0.

## Candidate Approach

- Clarification: **跳過**, interviewer push 後才補. 候選人只關心 int / 長度 1 兩點.
- Brute force: O(n²), 每個 i 往後找最大 `prices[j] - prices[i]`.
- Bottleneck: 每次都重新掃右側; 真正需要的只是「目前為止的最低買點」.
- Optimal approach: 單次 O(n) 掃描, 維護 `left` (= argmin of `prices[0..i]`); 每步用 `prices[i] - prices[left]` 更新答案.
- Invariant / state / proof: 第一次描述為「必然有更低的買點」(結果式, 不精確); 經 push 後修正為「`left` 指向 0..right 區間的最低價」. 抵達 senior 可接受的精度.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 2/5 | 完全跳過, 被 push 才回答, 且仍漏 length=1 處理 |
| Brute force / bottleneck | 4/5 | 直接給 O(n²); bottleneck 沒主動講, 但被問會答 |
| Optimal approach | 5/5 | 一眼看出 running min / two-pointer |
| Proof / invariant | 3/5 | 初版鬆散, 修正後到位; 自發精度不足 |
| C++ correctness | 4/5 | 邏輯一次寫對; 漏 `const&`, signed/unsigned 比較 |
| Testing | 3/5 | 沒自發跑 test, interviewer 代跑 |
| Communication | 2/5 | 跳步驟, 抗拒流程 ("you are annoying"), 但被 push 後能補 |

## Feedback

### Strong Signals

- Pattern recognition 秒看 (running min disguised as two-pointer).
- Code 一次寫對, 邏輯乾淨, 邊界 (length 1, all decreasing, all equal) 都正確.
- 對 invariant 的修正能力存在, 被 push 能講出精確版.

### Weak Signals

- **流程紀律不足**: clarification / brute force / invariant 三個 senior 必走的步驟全部跳過. Real interviewer 不會 push 你補, 只會默默扣分.
- **Signature 紀律**: `vector<int> prices` 而非 `const vector<int>&`. Senior 級不應該漏 `&`.
- **Lint 紀律**: `int i < prices.size()` (signed/unsigned 比較). Google/Meta CI 會擋.
- **Invariant 用結果式而非定義式**: 「必然有更低的買點」vs 正確的「`left` 是 `[0..i]` 的 argmin」. 結果式描述在 hard 題會出 bug.

### Key Moment

在 clarification 階段 push 後候選人回覆 "you are annoying", 但隨後仍補上 brute force 與 invariant. 在 real interview 這個 push-back 是危險信號; senior 候選人應該內化流程, 不需要 interviewer 提醒.

## Seven-Question Completion

- [x] Pattern — running min / single-pass
- [x] Brute force — O(n²)
- [x] Bottleneck — 重複掃右側
- [x] Optimal repeated-work reduction — 只保留目前最低買點
- [x] Invariant — `left = argmin prices[0..i]` (修正後)
- [x] Time / space complexity — O(n) / O(1)
- [x] Edge cases — length 1, strictly decreasing, all equal

## Next Drill

**Redo needed:** No (Easy 已掌握; 但流程紀律問題不在這題重練)
**Redo date:** N/A
**Next target:**
1. 下一場 Easy/Medium 一律強制走完: 3 句 clarification + 1 句 brute force + 1 句 invariant (定義式), 再動手.
2. 練 `Maximum Subarray` (LC 53) — 同屬 single-pass DP 家族, 練 invariant 的「定義式」描述: `dp[i] = 以 i 結尾的最大子陣列和`.
3. 強制 C++ signature checklist: `vector` / `string` / struct 一律先 `const&`; 迴圈 index 用 `size_t` 或 `static_cast`.
