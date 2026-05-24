# Coding Teaching: Text Justification

**Date:** 2026-05-23
**Track:** Coding
**Mode:** Teaching
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected
**Pattern:** Greedy line packing + space distribution
**Result:** Retest Scheduled
**LeetCode:** 68 text-justification
**Leetgo Evidence:** `leetgo info 68`; no local skeleton or tests used

## Problem Summary

Given a list of words and a target line width, group the words in order into
lines that are as full as possible. Return a `vector<string>` where every
string is exactly `maxWidth` characters. Non-final lines distribute spaces
between words as evenly as possible, with earlier gaps receiving extra spaces.
The final line and single-word lines are left-justified and padded on the right.

## Candidate Approach

- Clarification: needed help understanding that `words` is `vector<string>` and
  the output is `vector<string>`, where each returned string represents one
  fully formatted line.
- Brute force: not covered; session stopped before full problem solving.
- Bottleneck: not covered.
- Optimal approach: identified the right high-level greedy window idea:
  represent word lengths, move a right pointer while the current line can still
  fit, then jump the left pointer to the next line.
- Invariant / state / proof: partially introduced but not proved. The key line
  packing condition was taught as `letters + words[j].size() + (j - i) <=
  maxWidth`, where `(j - i)` accounts for minimum one-space gaps.

## Code Review Notes

- Correctness: no code was written.
- C++ API / implementation: clarified the expected function shape:
  `vector<string> fullJustify(vector<string>& words, int maxWidth)`.
- Complexity: not analyzed during this teaching session.
- Edge cases: introduced two important formatting cases: final line and
  single-word line.

## Learning Checkpoint

These are teaching-session learning checkpoints, not interview readiness scores.

| Dimension | Score | Evidence |
| --- | ---: | --- |
| I/O comprehension | 2 | Initially unclear on `vector<string>` input/output; improved after examples. |
| Greedy line grouping | 2 | Proposed a sliding-window style grouping strategy, but still needed help with the exact fit condition. |
| Space distribution | 1 | Recognized this as the hard part, but did not yet derive `base` and `extra` independently. |
| Edge-case awareness | 2 | Learned that last line and single-word lines use left justification. |
| Code readiness | 1 | No implementation attempted in this session. |

## Interviewer Feedback

### Strengths

- Correctly sensed that the problem can be decomposed into line grouping and
  line formatting.
- Proposed a useful pointer movement model: once a line is fixed, advance
  `left` directly to the next unprocessed word.
- Stopped early when the statement was unclear instead of forcing code on a
  shaky interpretation.

### Improvement Since Last Session

Compared with the earlier 2026-05-23 Minimum Genetic Mutation mock, this was not
a full solve. The useful improvement was process-level: the candidate surfaced
statement confusion early, which is better than silently coding against the
wrong contract.

### Improvement Areas

- Practice translating formatting problems into exact input/output contracts
  before discussing algorithms.
- Memorize the two-stage structure: greedily group words first, then format one
  line.
- Drill the space distribution formula: `totalSpaces`, `gaps`, `base`, and
  `extra`.

### Key Moment

The key moment was the dry run on `["What","must","be","acknowledgment","shall","be"]`
with width 16. The grouping was correct, but the output used one-space joins
instead of fully justified non-final lines and did not pad each line to exact
width.

## Seven-Question Completion

- [ ] Pattern
- [ ] Brute force
- [ ] Bottleneck
- [ ] Optimal repeated-work reduction
- [ ] Invariant / state / DFS return value
- [ ] Time / space complexity
- [x] Edge cases

## Teaching Notes

- Concepts taught:
  - `words` is `vector<string>` and the return value is one formatted string per
    line.
  - Every returned line must have length exactly `maxWidth`.
  - Greedy grouping condition includes both letter count and minimum required
    spaces.
  - Normal lines distribute all spaces across gaps; last and single-word lines
    are left-justified.
- Hints / scaffolding used:
  - Direct I/O explanation with a small example.
  - Guided dry run of a width-16 example.
  - Formula reveal for `totalSpaces / gaps` and `totalSpaces % gaps`.
- Still shaky:
  - Deriving the line-fit condition without help.
  - Building a fully justified line from `base` and `extra`.
  - Keeping final-line behavior separate from normal-line behavior.

## Follow-Up / Retest Plan

**Redo needed:** Yes
**Redo date:** N/A
**Next target:** Teaching redo or Drill Mode on Text Justification. First retest
should require explaining the I/O contract, deriving the greedy grouping
condition, and formatting one normal line by hand before writing C++.
