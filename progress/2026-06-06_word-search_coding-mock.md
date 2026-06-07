# Coding Mock: Word Search

**Date:** 2026-06-06
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected DFS, imported list-backed
**Pattern:** Matrix DFS / backtracking
**Result:** Close (assisted)
**LeetCode:** 79 word-search
**Leetgo Evidence:** `leetgo info word-search`; `leetgo pick word-search --skip-editor`; `leetgo test last -L` passed 3/3 local cases; `leetgo submit last --yes` accepted 88/88

## Problem Summary

Given a character grid and a target word, determine whether there is a path
through adjacent horizontal/vertical cells that matches the word in order,
without reusing a cell in the same path.

## Candidate Approach

- Clarification: asked about character set and whether `word` may contain
  letters absent from the board. Missed input-size constraints initially.
- Brute force: described enumerating paths from cells and comparing strings,
  and recognized exponential growth. Needed refinement from `mn` choices per
  step to grid-local branching of about `4 * 3^(L - 1)`.
- Bottleneck: initially framed as building complete strings; corrected to
  pruning as soon as the current prefix mismatches `word`.
- Optimal approach: start from cells matching `word[0]`, DFS one character at a
  time, and stop immediately on mismatch.
- Invariant / state / proof: after prompting, defined `dfs(r, c, k)` as whether
  a path starting at `(r, c)` can match `word[k...]`, with visited cells
  representing the current path prefix.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 2 | Asked useful charset/existence questions but skipped constraints until prompted. |
| Brute force / bottleneck | 3 | Correctly recognized exponential search and improved the branching analysis after feedback. |
| Optimal approach | 2 | Needed guided hints to connect prefix pruning, starting cells, and path-local visited into DFS/backtracking. |
| Proof / invariant | 2 | First invariant only checked `board[r][c] == word[k]`; later expanded it to suffix path semantics after prompting. |
| C++ correctness | 3 | Core submitted DFS/backtracking structure was correct; interviewer fixed small compile/base-case style issues. |
| Testing | 2 | Local examples and LeetCode submit passed, but manual dry-run and complexity explanation were not completed independently. |
| Communication | 3 | Clearly surfaced confusion and iterated on the model instead of forcing code prematurely. |

## Feedback

### Strong Signals

- Correctly moved from full-string enumeration toward prefix pruning.
- Accepted the key correction that `visited` is path-local, not global.
- Final implementation restored the board after marking visited and short-circuited on success.

### Improvement Since Last Session

- Compared with the recent DFS/matrix drills, the suffix-state framing came back
  faster once prompted.
- The remaining gap is recognizing the standard backtracking skeleton without
  interviewer scaffolding: current cell check, terminal match, mark, recurse,
  unmark.

### Weak Signals

- DFS return-value semantics were initially too local: only character equality,
  not "can this suffix be matched from here?"
- Base-case placement was initially valid but less aligned with the stated
  invariant, which made reasoning harder.
- Complexity and adversarial edge cases still need to be stated before coding.

### Key Moment

The important correction was changing `visited` from a possible global set into
state owned by the current recursive path. That unlocks correct backtracking.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [ ] Time / space complexity
- [x] Edge cases

## Next Drill / Retest Plan

**Redo needed:** Yes
**Redo date:** 2026-06-08
**Next target:** Redo Word Search or a nearby backtracking problem such as
Palindrome Partitioning. Success criterion: state `dfs` semantics, base cases,
backtracking lifecycle, and complexity before writing code.
