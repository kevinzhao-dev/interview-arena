# Coding Mock: Minimum Genetic Mutation

**Date:** 2026-05-23
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected
**Pattern:** BFS shortest path on implicit unweighted graph
**Result:** Close
**LeetCode:** 433 minimum-genetic-mutation
**Leetgo Evidence:** `leetgo info 433`; `leetgo pick 433 --skip-editor`; `leetgo test last -L` passed local examples; `leetgo submit last` accepted 20/20

## Problem Summary

Given a starting gene, target gene, and valid gene bank, find the minimum
number of one-character mutations needed to reach the target, where every
intermediate gene must be present in the bank. Return -1 when no valid mutation
sequence exists.

## Candidate Approach

- Clarification: asked whether all genes share length, whether genes are
  strings, whether the alphabet is A/C/G/T, whether start can equal end, and
  whether end is guaranteed in the bank. Strong coverage.
- Brute force: described exploring mutations from the start gene through valid
  bank matches until reaching the target. Initial complexity was stated as
  O(N * 4^L), which was too loose for one-character neighbor generation.
- Bottleneck: identified too many mutation candidates, but the stronger
  bottleneck statement is repeated graph exploration without visited-state
  pruning.
- Optimal approach: BFS from `startGene`, generate one-character mutations,
  filter through an `unordered_set` bank, and mark visited at enqueue time.
- Invariant / proof: stated that level-order BFS explores all genes reachable
  in the current number of mutations before moving deeper, so the first time
  `endGene` is reached is minimal.

## Code Review Notes

- Correctness: final BFS solution accepted by LeetCode. Handles
  `startGene == endGene`, missing `endGene`, visited pruning, and level count.
- C++ API / implementation: first draft had compile-time issues:
  `geneSet`/`bankSet` mismatch, undefined `beginGene`, and a missing
  parenthesis in the membership check. Corrected implementation used
  `unordered_set`, `queue`, and char choices cleanly.
- Complexity: candidate stated O(4 * L * N) time and O(N) space. More precise
  C++ accounting may include string copy/hash cost, giving O(N * L^2) in the
  usual model where hashing/copying length-L strings costs O(L). With fixed
  gene length 8, this is effectively O(N).
- Edge cases: named `endGene` not in bank as a -1 case; also handled
  `startGene == endGene`.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 4 | Covered length, type, alphabet, start=end, and end membership. |
| Brute force / bottleneck | 2 | Proposed search idea, but complexity was initially exponential and bottleneck framing needed tightening. |
| Optimal approach | 3 | Correct BFS graph model with hash-set neighbor filtering. |
| Proof / invariant | 3 | Correctly tied level-order BFS to shortest path in an unweighted graph. |
| C++ correctness | 2 | First draft had multiple compile-time errors before interviewer correction. |
| Testing | 3 | Manual dry-run found the correct 2-step answer and level sequence. |
| Communication | 3 | Reasoning was clear, with one acknowledged gap on bidirectional BFS. |

## Interviewer Feedback

### Strengths

- Strong clarification phase.
- Correct graph model: gene as node, valid one-mutation change as edge.
- Good visited timing: marking on enqueue avoids repeated candidates.
- Dry-run was concise and correct.

### Improvement Since Last Session

Compared with the 2026-05-21 Word Ladder session, brute-force articulation and
dry-run discipline improved: this time the candidate attempted the brute force,
answered complexity, and completed the sample trace when asked. Implementation
hygiene regressed due to variable-name and syntax mistakes in the first draft.

### Improvement Areas

- Before finalizing code, do a compile-oriented scan for identifier consistency:
  set name, input variable name, and parentheses.
- State BFS complexity with the string-cost assumption explicitly:
  "O(N * L * alphabet) hash lookups, plus O(L) string build/hash cost."
- Review bidirectional BFS as a follow-up for large implicit unweighted graphs.

### Key Moment

The main senior signal came from the BFS invariant answer: the candidate
understood that shortest path comes from unit-cost level expansion, not merely
"faster exploration." The main weakness was code-as-written reliability.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [x] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** Bidirectional BFS drill on Word Ladder / Genetic Mutation style
implicit graphs, plus a 5-minute C++ compile-check routine after coding.
