# Probability

> **In the exam:** On both papers, usually one long question (8–12 marks) plus short parts elsewhere. Typical tasks: complete a tree diagram (2 marks), find combined probabilities (2–3 marks each), complete a Venn diagram from given probabilities (3 marks), test for independence (2 marks), and conditional probability from a tree, Venn diagram or two-way table (2–3 marks). Show the calculation — a correct answer with no working may lose marks.

## What you need to know

- The probability scale from 0 to 1; equally likely outcomes; P(not A) = 1 − P(A).
- Relative frequency (experimental probability) as an estimate of probability; expected frequency = probability × number of trials.
- Sample space diagrams; two-way tables.
- Mutually exclusive events: P(A or B) = P(A) + P(B).
- The addition law: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
- Independent events: P(A ∩ B) = P(A) × P(B); testing whether two events are independent.
- Tree diagrams, including dependent events (without replacement).
- Venn diagrams for probabilities.
- Conditional probability: P(A | B) = P(A ∩ B) ÷ P(B).

## Notes

### Basic ideas

- P(event) = number of favourable outcomes ÷ total number of equally likely outcomes.
- Probabilities lie between 0 (impossible) and 1 (certain). Give them as fractions, decimals or percentages.
- **Relative frequency** = number of times the event occurred ÷ number of trials. It becomes a better estimate of probability as the number of trials increases.
- **Expected frequency** = P(event) × number of trials.

### Notation

| Notation | Meaning |
|---|---|
| P(A′) | probability A does not happen = 1 − P(A) |
| P(A ∩ B) | probability A and B both happen |
| P(A ∪ B) | probability A or B or both happen |
| P(A \| B) | probability A happens given that B has happened |

### Mutually exclusive and independent

| | Meaning | Rule |
|---|---|---|
| Mutually exclusive | A and B cannot both happen | P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B) |
| Independent | one happening does not affect the probability of the other | P(A ∩ B) = P(A) × P(B); also P(A \| B) = P(A) |

**Addition law (always true):** P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

**Testing independence:** calculate P(A) × P(B) and compare with P(A ∩ B). If equal → independent; if not → not independent. Write the conclusion.

### Tree diagrams

- Each set of branches adds up to 1.
- Multiply **along** the branches; add the results of different paths.
- For dependent events (without replacement, or "if it rains…"), the second-stage probabilities change depending on the first branch.

### Venn diagrams

- Fill in P(A ∩ B) first, then A only = P(A) − P(A ∩ B), B only = P(B) − P(A ∩ B), outside = 1 − all the rest.
- The whole diagram adds up to 1 (or to the total number, if using frequencies).

### Conditional probability

**P(A | B) = P(A ∩ B) ÷ P(B)**

- From a two-way table: use only the row/column for B.
- From a tree diagram ("reverse" conditional): find P(B) by adding all paths that give B, find P(A ∩ B) from the one path, then divide.
- From a Venn diagram: the denominator is the whole of circle B.

## Key terms and definitions

| Term | Definition |
|---|---|
| Mutually exclusive events | Events that cannot happen at the same time |
| Independent events | Events where the occurrence of one does not affect the probability of the other |
| Relative frequency | Number of times an event occurs ÷ total number of trials |
| Expected frequency | Probability of the event × number of trials |
| Conditional probability | The probability of an event given that another event has occurred |

## Worked examples

**1.** P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.2.
(a) Find P(A ∪ B). [2] (b) Show that A and B are independent. [2] (c) Find P(A | B). [2]

(a) 0.4 + 0.5 − 0.2 M1 = **0.7** A1
(b) P(A) × P(B) = 0.4 × 0.5 = 0.2 M1 = P(A ∩ B), so **A and B are independent** A1
(c) 0.2 ÷ 0.5 M1 = **0.4** A1 (equal to P(A), as expected for independent events)

**2.** Machine X makes 60% of a factory's items and Machine Y makes the rest. 3% of X's items and 5% of Y's items are faulty.
(a) Find the probability that a randomly chosen item is faulty. [3]
(b) Given that an item is faulty, find the probability it was made by X. [2]
(c) How many faulty items would you expect in a batch of 5000? [1]

(a) Tree: 0.6 × 0.03 = 0.018 M1; 0.4 × 0.05 = 0.02 M1; total **0.038** A1
(b) 0.018 ÷ 0.038 M1 = **0.474** (9/19) A1
(c) 0.038 × 5000 = **190** B1

**3.** Two counters are taken without replacement from a bag of 3 red and 7 blue. Find the probability they are different colours. [3]

P(RB) = 3/10 × 7/9 = 21/90 M1; P(BR) = 7/10 × 3/9 = 21/90 M1; total 42/90 = **7/15** A1

## Common mistakes

- Using P(A) + P(B) for events that are not mutually exclusive (forgetting − P(A ∩ B)).
- Confusing mutually exclusive with independent.
- Testing independence without stating a conclusion.
- Tree diagrams "without replacement" with unchanged second-stage probabilities.
- Conditional probability: dividing by the total (1 or n) instead of P(B).
- Venn diagrams with P(A) written in the "A only" region.
- Probabilities greater than 1 or written as ratios.

## Practice questions

1. A and B are mutually exclusive with P(A) = 0.3 and P(B) = 0.45. Find P(A ∪ B) and P(A ∩ B). [2]
2. A and B are independent, P(A) = 0.2 and P(B) = 0.6. Find P(A ∩ B) and P(A ∪ B). [3]
3. P(A) = 0.5, P(B) = 0.6, P(A ∪ B) = 0.8. Find P(A ∩ B) and decide whether A and B are independent. [3]
4. Of 100 students, 48 are boys and 52 are girls. 12 boys and 18 girls wear glasses. A student is chosen at random. Find (a) P(wears glasses) [1], (b) P(girl | wears glasses) [2], (c) P(wears glasses | boy) [1].
5. Draw a Venn diagram for Q3 and find P(neither A nor B). [2]
6. A coin is biased. In 250 throws it lands on heads 95 times. Estimate the probability of heads and the number of heads expected in 1000 throws. [2]
7. The probability that Leo passes his driving test at the first attempt is 0.6. If he fails, the probability he passes at the second attempt is 0.75. Find the probability that he passes at the first or second attempt. [3]

<details><summary>Answers</summary>

1. P(A ∪ B) = **0.75**; P(A ∩ B) = **0**
2. P(A ∩ B) = 0.2 × 0.6 = **0.12**; P(A ∪ B) = 0.2 + 0.6 − 0.12 = **0.68**
3. 0.8 = 0.5 + 0.6 − P(A ∩ B) → **P(A ∩ B) = 0.3**; P(A) × P(B) = 0.3 = P(A ∩ B), so **independent**
4. (a) 30/100 = **0.3** (b) 18/30 = **0.6** (c) 12/48 = **0.25**
5. A only 0.2, both 0.3, B only 0.3, outside **0.2**
6. 95 ÷ 250 = **0.38**; 0.38 × 1000 = **380**
7. 0.6 + 0.4 × 0.75 = 0.6 + 0.3 = **0.9**

</details>

## Plan for this hour

- **10 min** – Read the notes; flashcard: addition law, independence test, conditional formula.
- **15 min** – Draw the tree diagram for Worked Example 2 and the Venn diagram for Worked Example 1 yourself.
- **30 min** – Practice questions.
- **5 min** – Error log.
