# Coding Mock: Max Consecutive Ones III

**Date:** 2026-05-24
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up drill after LC 1838
**Pattern:** Variable-size sliding window
**Result:** Pass
**LeetCode:** 1004 max-consecutive-ones-iii
**Leetgo Evidence:** `leetgo info 1004`, `leetgo pick 1004 --skip-editor`, `leetgo test last -L` passed 2/2 local cases, `leetgo submit last` accepted 60/60

## Problem Summary

Given a binary array and at most `k` zero-to-one flips, return the longest contiguous window that can become all ones.

## Candidate Approach

- Clarification: Not emphasized in this short follow-up drill.
- Brute force: Described checking from each starting point and scanning forward, leading to quadratic work.
- Bottleneck: Correctly identified repeated forward scans as `O(n^2)`.
- Optimal approach: Used sliding window with a zero count.
- Invariant / state / proof: Initially stated the equivalent `window size <= ones + k`; after one prompt, used the cleaner predicate `zeros <= k`. Correctly described shrinking left until the predicate is restored.

## Code Review Notes

- Correctness: Final code correct and accepted.
- C++ API / implementation: Initial code had the recurring `int` vs `.size()` signed/unsigned issue; fixed with `int n = static_cast<int>(nums.size())`.
- Complexity: Sliding window is `O(n)` time and `O(1)` extra space.
- Edge cases: Not fully drilled because user requested LeetCode submission before dry-run completion.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Drill target: predicate + invariant before code | Pass | Candidate reached `zeros <= k` with one prompt and wrote correct shrink logic independently. |

## Interviewer Feedback

### Strengths

- Strong improvement on deriving a concrete validity predicate compared with LC 1838.
- Correctly tracked the state transition when `right` includes a zero and when `left` removes a zero.
- Implementation was concise and accepted after local test verification.

### Improvement Since Last Session

- Compared with LC 1838, the window predicate was much closer to independent: the initial condition was equivalent, and only needed translation into the simpler zero-count form.

### Improvement Areas

- Keep fixing the signed/unsigned loop habit before it reaches final code.
- Complete the dry-run and edge-case phase before submission in future drills.

### Key Moment

The key improvement was switching from a result-style condition (`window size <= ones + k`) to the direct resource predicate (`zeros <= k`).

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [ ] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** One more variable-window medium where the validity predicate is less obvious, such as LC 209 or LC 3, with strict dry-run completion before submit.
