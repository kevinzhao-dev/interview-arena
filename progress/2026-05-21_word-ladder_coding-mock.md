# Coding Mock: Word Ladder

**Date:** 2026-05-21
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected
**Pattern:** BFS shortest path on implicit unweighted graph
**Result:** Close
**LeetCode:** 127 word-ladder (Hard)
**Leetgo Evidence:** `leetgo info 127` (metadata only)

## Problem Summary

Given `beginWord`, `endWord`, and a `wordList`, return the number of words
in the shortest transformation sequence where each adjacent pair differs by
exactly one letter and every intermediate word is in `wordList`. Return 0 if
no sequence exists. All words equal length, lowercase a-z.

## Candidate Approach

- Clarification: asked about equal length and lowercase charset. Good.
- Brute force: could not articulate it; interviewer supplied (DFS enumerating
  all paths, exponential due to re-expanding nodes without memo).
- Optimal: BFS on implicit graph. Node = word, edge = differ by one letter.
  Unweighted graph -> first time endWord is reached is the shortest length.
- Neighbor generation: candidate independently proposed replacing each of L
  positions with a-z (O(26*L)) and using an unordered_set for O(1) membership,
  avoiding O(N^2) pairwise comparison.
- Invariant: mark visited at enqueue time (not dequeue) to prevent re-enqueue;
  level-order BFS with `int size = q.size()` snapshot per layer, `distance++`
  after each layer.

## Code Review Notes

- Correctness: final code correct. Returns 5 on the canonical hit->cog example.
- Edge case: `endWord` not in dict handled by early `if (!dict.contains(endWord))
  return 0;`.
- C++ API / implementation: clean. `typedef std::string Word`, set built from
  `cbegin/cend`, `contains`, `emplace`, level snapshot with `int` size.
  `Word next = current;` rebuilt per position so no manual char restore needed.
- Minor: defensive `beginWord == endWord` check is unnecessary (problem
  guarantees they differ); left unresolved in candidate's draft.
- Complexity: Time O(N*L^2) (per word: L positions * 26 chars, each a length-L
  string build + hash). Space O(N*L).

## Scores (1-4)

| Dimension | Score |
|---|---|
| Problem clarification | 3 |
| Brute force & bottleneck | 2 |
| Optimal approach & proof | 3 |
| Code correctness | 3 |
| C++ implementation quality | 3 |
| Testing & edge cases | 2 |
| Communication under pressure | 2 |

## Improvement Since Last Session

Previous session (2026-05-20, Permutation in String) had a frequency-array
sign bug. This session the code was written correctly on the first pass with
no API errors -- implementation hygiene improved.

## Weakest Signals

- Could not state the brute force at all; skipped straight to "I have the
  optimal, it's BFS". Brute force is the tool for locating the bottleneck and
  should not be skipped at senior level.
- Did not perform the dry-run or state complexity when asked; responded
  "continue" instead. Interviewer-supplied the test analysis.

## Follow-Up

**Redo needed:** No (core solve correct and independent), but self-verification
discipline must improve.
**Next target:**
1. Brute-force articulation drill -- 3 problems, 30s each, BF + bottleneck only.
2. Word Ladder II (LC 126) -- BFS + backtracking to return all shortest paths.
3. Always self-run dry-run + complexity without being prompted.
