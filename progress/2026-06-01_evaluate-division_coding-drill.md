# Coding Drill: Evaluate Division

**Date:** 2026-06-01
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected, imported list-backed
**Pattern:** Weighted graph traversal / DFS
**Result:** Pass
**LeetCode:** 399 evaluate-division
**Leetgo Evidence:** `leetgo info 399`; `leetgo pick 399 --skip-editor`; `leetgo test last -L` passed 3/3 local cases; `leetgo submit last` accepted 29/29

## Problem Summary

Given known ratios between pairs of variables, answer ratio queries by deriving
whether the two variables are connected through known relationships. Unknown
variables or disconnected variables return `-1.0`.

## Candidate Approach

- Clarification: correctly identified that `x / x` is only `1.0` when `x` is a
  known variable.
- Brute force: not expanded, since this was a targeted graph drill.
- Bottleneck: each query can be answered by searching only the connected
  component reachable from the numerator.
- Optimal approach: model each equation as two directed weighted edges, then run
  iterative DFS per query and multiply edge weights along the path.
- Invariant / state / proof: stack state `(node, product)` means `product` is
  the derived ratio `start / node` for the path used to reach `node`.

## Drill Notes

- Correctly modeled `A / B = k` as `A -> B` with weight `k`, and `B -> A` with
  weight `1 / k`.
- The main C++ issues were type syntax, avoiding names like `stack` for local
  variables, and making sure every query appends exactly one result.
- Marking visited on push was used to prevent duplicate stack entries.
- The final implementation passed local cases and was accepted by LeetCode.

## Improvement Since Last Session

- Compared with recent graph practice, the graph abstraction was immediate and
  accurate: nodes, directed weighted edges, path product, and disconnected cases
  were all identified before coding.
- The remaining improvement area is C++ compile precision under interview
  pressure, especially type declarations and container names.

## Drill Result

**Pass:** Weighted graph modeling and iterative DFS query evaluation were
implemented and accepted after syntax/readability corrections.

## Next Drill / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** Practice one weighted union-find version of Evaluate Division
or another graph query problem where the key invariant must be stated before
coding.
