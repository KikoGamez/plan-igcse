# Probability and sets

> **In the exam:** Every series, both papers. Paper 2: set notation and shading Venn diagrams (1–2 marks each), simple probabilities as fractions. Paper 4: a 6–10 mark question with a tree diagram (often "without replacement"), Venn diagram with frequencies, and a conditional probability part ("given that…"). Answers can be fractions, decimals or percentages — never ratios or "1 in 4".

## What you need to know

- Understand and use set language, notation and Venn diagrams to describe sets and represent relationships between sets (up to three sets): n(A), ∈, ∉, A′, ∪, ∩, ⊆, ⊄, ξ, ∅.
- Understand and use the probability scale from 0 to 1; calculate the probability of a single event; know P(not A) = 1 − P(A).
- Understand relative frequency as an estimate of probability; calculate expected frequencies.
- Calculate the probability of combined events using, where appropriate: sample space diagrams, Venn diagrams, tree diagrams.
- Extended: calculate conditional probability using Venn diagrams, tree diagrams and tables.

## Notes

### Set notation

| Symbol | Meaning | Example (ξ = {1, …, 12}, A = {3, 6, 9, 12}, B = {1, 2, 3, 4, 6, 12}) |
|---|---|---|
| ξ | universal set | all numbers 1 to 12 |
| ∈ / ∉ | is / is not an element of | 9 ∈ A, 9 ∉ B |
| n(A) | number of elements in A | n(A) = 4 |
| A′ | complement: not in A | n(A′) = 8 |
| A ∩ B | intersection: in A **and** B | {3, 6, 12} |
| A ∪ B | union: in A **or** B (or both) | {1, 2, 3, 4, 6, 9, 12} |
| ⊆ | is a subset of | {3, 6} ⊆ A |
| ⊄ | is not a subset of | {1, 3} ⊄ A |
| ∅ | the empty set | A ∩ {5, 7} = ∅ |

Shading regions: A ∩ B′ = in A but not in B; (A ∪ B)′ = outside both circles; A′ ∪ B = everything except "A only".

### Venn diagrams with numbers

- Fill in from the **middle outwards**: start with the intersection, then "only" regions, then the outside.
- n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
- With unknowns, write each region in terms of x and form an equation using the total.
- Three sets: fill the centre (all three), then the three "two only" regions, then the "one only" regions, then outside.

### Basic probability

- P(event) = number of favourable outcomes ÷ total number of equally likely outcomes.
- P(not A) = 1 − P(A). Probabilities of all possible outcomes add up to 1.
- Relative frequency = number of times event happens ÷ number of trials. More trials → better estimate.
- Expected frequency = probability × number of trials.

### Combined events

- **Sample space diagram**: a grid for two events (e.g. two dice: 36 outcomes).
- **AND** rule (independent events): P(A and B) = P(A) × P(B). Multiply **along** branches of a tree.
- **OR** rule (mutually exclusive outcomes): P(A or B) = P(A) + P(B). Add the **ends** of different branches.
- **Tree diagrams:** each set of branches adds up to 1. Write probabilities on the branches, multiply along each path.
- **Without replacement:** the second-stage denominators go down by 1, and the numerator of the colour already taken goes down by 1.
- "At least one" = 1 − P(none).

### Conditional probability

"The probability of A **given** B" — restrict to the outcomes where B happened:

P(A given B) = P(A and B) ÷ P(B) = n(A ∩ B) ÷ n(B)

- From a Venn diagram: the denominator is the whole of circle B, not the total.
- From a tree diagram: find P(B) by adding all paths that give B; find P(A and B) from the relevant path; divide.
- From a two-way table: use the row or column total of the "given" group.

## Worked examples

**1.** A bag contains 5 red and 3 blue counters. Two counters are taken at random without replacement.
(a) Find the probability that both counters are the same colour. [3]
(b) Find the probability that at least one counter is blue. [2]

(a) P(RR) = 5/8 × 4/7 = 20/56; P(BB) = 3/8 × 2/7 = 6/56 M1 M1 → 26/56 = **13/28** A1
(b) 1 − P(RR) = 1 − 20/56 M1 = **9/14** A1

**2.** In a class of 30 students, 18 play football (F), 12 play tennis (T) and 5 play neither.
(a) Complete a Venn diagram. [2] (b) A student who plays football is chosen at random. Find the probability that they also play tennis. [1]

(a) n(F ∪ T) = 30 − 5 = 25; n(F ∩ T) = 18 + 12 − 25 = 5 M1. F only = 13, T only = 7, both = 5, neither = 5 A1
(b) **5/18** B1

**3.** The probability that it rains on a day is 0.3. If it rains, the probability that Ana is late is 0.4. If it does not rain, the probability she is late is 0.1.
(a) Find the probability that Ana is late. [2] (b) Given that Ana is late, find the probability that it rained. [2]

(a) 0.3 × 0.4 + 0.7 × 0.1 M1 = 0.12 + 0.07 = **0.19** A1
(b) 0.12 ÷ 0.19 M1 = **12/19** A1 (0.632)

## Common mistakes

- Adding along branches instead of multiplying; multiplying the ends of branches instead of adding.
- "Without replacement" treated as "with replacement" (denominators not reduced).
- Conditional probability: dividing by the overall total instead of the total of the "given" group.
- In Venn diagrams, putting the total for A in the "A only" region (forgetting to subtract the intersection).
- Writing probabilities as ratios (3 : 8) or words ("3 out of 8") — use fractions, decimals or percentages.
- Simplifying fractions incorrectly, or rounding to 1 significant figure (give exact fractions or 3 s.f.).
- Confusing ∪ (or) and ∩ (and).

## Practice questions

1. ξ = {1, 2, …, 12}, A = {multiples of 3}, B = {factors of 12}. List (a) A ∩ B [1], (b) A ∪ B [1], (c) (A ∪ B)′ [1]. (d) Find n(A′). [1]
2. Two fair six-sided dice are thrown. Find the probability that the total is 8. [2]
3. A spinner lands on red 45 times in 150 spins. (a) Find the relative frequency of red. [1] (b) The spinner is spun 400 times. How many reds would you expect? [1]
4. A box has 4 green and 6 yellow sweets. Three are taken at random without replacement. Find the probability that all three are green. [2]
5. Using the box in Q4, two sweets are taken without replacement. Find the probability that exactly one is green. [3]
6. In a group of 32 people, 20 like cats, 15 like dogs and 4 like neither. (a) How many like both? [2] (b) A person who likes cats is chosen at random. Find the probability that they like dogs. [1]
7. P(A) = 0.6, P(B) = 0.5 and A and B are independent. Find P(A and B) and P(neither A nor B). [3]

<details><summary>Answers</summary>

1. A = {3, 6, 9, 12}, B = {1, 2, 3, 4, 6, 12}. (a) **{3, 6, 12}** (b) **{1, 2, 3, 4, 6, 9, 12}** (c) **{5, 7, 8, 10, 11}** (d) **8**
2. (2,6), (3,5), (4,4), (5,3), (6,2): **5/36**
3. (a) 45/150 = **0.3** (b) 0.3 × 400 = **120**
4. 4/10 × 3/9 × 2/8 = 24/720 = **1/30**
5. GY + YG = 4/10 × 6/9 + 6/10 × 4/9 = 24/90 + 24/90 = 48/90 = **8/15**
6. (a) 20 + 15 + 4 − 32 = **7** (b) **7/20**
7. P(A and B) = 0.6 × 0.5 = **0.3**; P(neither) = 0.4 × 0.5 = **0.2**

</details>

## Plan for this hour

- **10 min** – Read the notes; make a set-notation flashcard with a small shaded sketch for each symbol.
- **15 min** – Worked examples with answers covered; draw the tree and Venn diagrams yourself.
- **30 min** – Practice questions (Q1–Q6 non-calculator).
- **5 min** – Error log.
