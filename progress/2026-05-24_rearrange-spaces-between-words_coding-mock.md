# Coding Mock: Rearrange Spaces Between Words

**Date:** 2026-05-24
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up from Text Justification
**Pattern:** String parsing + space distribution
**Result:** Close
**LeetCode:** 1592 rearrange-spaces-between-words
**Leetgo Evidence:** `leetgo pick 1592 --skip-editor`; red local test failed on missing implementation; `leetgo test last -L` passed local examples; `leetgo submit last` accepted 90/90

## Problem Summary

Given one string containing words and spaces, preserve the word order while
redistributing all spaces as evenly as possible between adjacent words. Any
leftover spaces go at the end, and the returned string must keep the original
length.

## Candidate Approach

- Clarification: asked whether spaces are guaranteed and whether an input could
  contain no words. Good instinct for input contract and edge cases.
- Brute force: described scanning the string to count spaces and extract words,
  then constructing a new string with redistributed spaces.
- Bottleneck: recognized no separate optimization was apparent; interviewer
  confirmed the scan-and-build approach is optimal because every character must
  be read and the output must be produced.
- Optimal approach: count total spaces, collect words in order, compute
  `spaces / gaps` and `spaces % gaps`, and build the result.
- Invariant / state / proof: interviewer supplied the main correctness
  invariant: all original words are preserved in order and
  `between * gaps + trailing == totalSpaces`.

## Code Review Notes

- Correctness: final solution accepted by LeetCode.
- C++ API / implementation: first draft had several syntax/API issues:
  `txt` vs `text`, missing `)`, reversed `string(count, char)` constructor
  arguments, and malformed `i != words.size() - 1` condition. Interviewer
  patched syntax in the local LeetCode workspace.
- Complexity: O(n) time and O(n) space, where n is `text.size()`.
- Edge cases: covered no spaces and single-word input; implementation handles
  the single-word case by appending all spaces to the end.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3 | Asked about required spaces and empty-word possibility. |
| Brute force / bottleneck | 3 | Proposed the correct scan-and-rebuild structure; interviewer clarified it is already optimal. |
| Optimal approach | 3 | Correctly used word extraction, total space count, and redistribution. |
| Proof / invariant | 2 | Correctness invariant was mostly interviewer-supplied rather than independently stated. |
| C++ correctness | 2 | Algorithm was right, but code needed syntax/API patching before it could compile. |
| Testing | 3 | Local examples passed and remote submit accepted 90/90 after syntax fixes. |
| Communication | 3 | Clearly surfaced C++ API unfamiliarity and kept the algorithm explanation direct. |

## Interviewer Feedback

### Strengths

- Correctly decomposed the problem into parsing, counting, distribution, and
  construction.
- Asked useful clarification questions before coding.
- The algorithmic idea was already optimal; no unnecessary data structure or
  overcomplication.

### Improvement Since Last Session

Compared with the 2026-05-23 Text Justification teaching session, this was a
clear improvement on the same subskill: the candidate understood the output
contract, derived the space distribution idea, and produced the intended
algorithm. The remaining gap moved from problem comprehension to C++ syntax and
string API fluency.

### Improvement Areas

- Drill `string(count, char)`, `substr(start, len)`, and `+=` construction until
  they are automatic.
- After writing code, do a compile-oriented scan for undefined identifiers,
  missing parentheses, and malformed conditions.
- Practice stating the conservation invariant: preserve all words, preserve all
  spaces, and therefore preserve output length.

### Key Moment

The strongest signal was recognizing that the straightforward scan-and-rebuild
method is the complete solution. The main weakness was needing interviewer help
to make the C++ code compile.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [x] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** No for this Easy problem; yes for the underlying C++ string API
drill.
**Redo date:** N/A
**Next target:** Return to Text Justification only after a short drill on
`string(count, char)`, `substr`, and one-pass word parsing.
