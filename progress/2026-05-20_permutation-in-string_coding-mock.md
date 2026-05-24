# Coding Mock: Permutation in String

**Date:** 2026-05-20
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected
**Pattern:** Fixed-size sliding window + character frequency array
**Result:** Needs Work
**LeetCode:** 567 permutation-in-string
**Leetgo Evidence:** `leetgo info 567` (metadata only)

## Problem Summary

Given `s1` and `s2`, return true if any permutation of `s1` appears as a
contiguous substring of `s2`. Lowercase letters, length up to 10^4.
Drill objective: correct fixed-size sliding window — precise invariant
stated before coding, single-pass O(n), correct on first dry-run.

## Candidate Approach

- Clarification: minimal; constraints were given upfront.
- Brute force: enumerate all substrings O(n^2), check each is a permutation.
- Bottleneck: recomputing the window frequency from scratch each shift.
- Optimal approach: fixed-width-k window, O(1) incremental count update,
  compare two size-26 frequency arrays each step.
- Invariant / state / proof: window width is always k = s1.size();
  `count1` fixed, `count2` updated O(1) per slide; return true when
  `count1 == count2`. Final invariant landed only after 3 rounds of
  tightening, and the key clauses were interviewer-supplied.

## Code Review Notes

- Correctness: final code correct. First sliding attempt had a
  frequency-array sign bug — element leaving the window used `++`
  instead of `--`; found via a directed dry-run on s1="ab", s2="cab".
- C++ API / implementation: clean — `m > n` early return, `int` indices
  (no unsigned underflow on `n - m`), `vector<int>` operator== for compare.
- Complexity: Time O(n) (26-wide compare is constant), Space O(1).
- Edge cases: m > n handled; first window handled before the slide loop.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Drill target: fixed-size window invariant + hygiene | Needs Work | Invariant needed 3 rounds and was largely interviewer-supplied; first impl recomputed the window (O(n*m)); `++`/`--` sign bug on the leaving element. |

## Interviewer Feedback

### Strengths

- Strong intuition: sensed the invariant was "off" before it was correct.
- Disciplined dry-run actually traced `count2` step by step and caught the
  sign bug.
- Clean C++ hygiene: early return, int indices, vector equality compare.

### Improvement Since Last Session

- vs 2026-05-17 longest-repeating-character-replacement: again opened by
  treating the window as variable-size ("left jumps to current position"),
  but this time pivoted quickly once told the window width is fixed.
- Still missing: an opening reflex to classify fixed vs variable window
  before designing.

### Improvement Areas

- Classify window type (fixed vs variable) in the first sentence.
- Conceptual gap surfaced: thought `c - 'a'` was an unknown "hash" mapping;
  it is a deterministic 0-25 index. Fix this for all counting-array problems.
- When shifting a window, write add and remove together and check the sign.

### Key Moment

Candidate said "the array is hashed, I don't know which slot should be 0" —
revealed a misconception that `c - 'a'` is a hash rather than a fixed index.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [~] Invariant / state / DFS return value (assisted)
- [x] Time / space complexity
- [x] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** Yes
**Redo date:** by 2026-05-23
**Next target:** 567 redo in Guided Mock (independent invariant + first-try
correct); then 438 Find All Anagrams as a `matches`-counter drill for true
O(1) comparison.
