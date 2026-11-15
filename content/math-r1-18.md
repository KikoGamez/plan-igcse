# Vectors

> **In the exam:** Most series. Paper 2: column vector arithmetic and magnitude (2–3 marks), and a vector geometry question (express vectors in terms of **a** and **b**, 3–6 marks). Paper 4: the same, plus "show that" or "prove that the points are collinear / lines are parallel" (2–3 marks). The final "show that" part is the most commonly dropped.

## What you need to know

- Describe a translation using a column vector.
- Understand and use vector notation: a vector written as a column vector, as a bold letter (**a**), as AB with an arrow over it.
- Add and subtract vectors; multiply a vector by a scalar.
- Extended: calculate the magnitude of a vector (x over y) as √(x² + y²).
- Extended: represent vectors by directed line segments; use position vectors.
- Extended: use the sum and difference of two or more vectors to express given vectors in terms of two coplanar vectors; use vectors to reason and to solve geometric problems (parallel lines, collinear points).

## Notes

*In these notes a column vector is written on one line as (x, y) to save space. In the exam, write it as a column: x on top, y underneath, in brackets — never with a comma like a coordinate.*

### Column vectors

- (x, y): x = movement right (+) / left (−); y = movement up (+) / down (−).
- Add / subtract component by component: (3, −4) + (−1, 2) = (2, −2).
- Multiply by a scalar: 3 × (2, −5) = (6, −15).
- Vector from A to B: AB = (position of B) − (position of A). For A(2, −1) and B(7, 3): AB = (5, 4).

### Magnitude

|(x, y)| = √(x² + y²). Example: |(3, −4)| = √(9 + 16) = 5. The magnitude is a length, so it is never negative.

### Notation and rules

- In print, vectors are bold (**a**); in handwriting, underline them (a with a line under it).
- AB means the vector from A to B. BA = −AB.
- Equal vectors: same magnitude and same direction (anywhere on the diagram).
- k**a** is parallel to **a**: same direction if k > 0, opposite if k < 0, k times as long.
- **Position vector** of a point P = OP, the vector from the origin O.

### Vector geometry: the method

1. **Find a route** along known vectors: AB = AO + OB = −**a** + **b** = **b** − **a**.
2. **Fractions along a line:** if P is on AB with AP : PB = 1 : 3, then AP = ¼ AB (1 part out of 1 + 3 = 4).
3. **Midpoint** M of AB: OM = ½(**a** + **b**).
4. Simplify: collect **a** terms and **b** terms.

### Proving parallel and collinear

- Two vectors are **parallel** if one is a multiple of the other: e.g. 6**a** − 3**b** = 3(2**a** − **b**).
- Three points P, Q, R are **collinear** (on a straight line) if PQ and PR (or PQ and QR) are parallel **and** share a point. Show PR = k × PQ, then write the conclusion: "PR = 3PQ, so PQ and PR are parallel and share the point P, so P, Q and R are collinear."
- For two column vectors (a, b) and (c, d) to be parallel, a/c = b/d.

## Worked examples

**1.** **a** = (3, −4) and **b** = (−1, 2). Find (a) 2**a** − 3**b** [2], (b) |**a**| [2].

(a) (6, −8) − (−3, 6) M1 = **(9, −14)** A1
(b) √(3² + (−4)²) M1 = **5** A1

**2.** OAB is a triangle with OA = **a** and OB = **b**. P is on AB such that AP : PB = 1 : 3.
(a) Find AB in terms of **a** and **b**. [1]
(b) Show that OP = ¾**a** + ¼**b**. [2]
(c) R is the point such that OR = 3**a** + **b**. Show that O, P and R are collinear. [2]

(a) AB = **b** − **a** B1
(b) OP = OA + AP = **a** + ¼(**b** − **a**) M1 = ¾**a** + ¼**b** A1
(c) OR = 3**a** + **b** = 4(¾**a** + ¼**b**) = 4OP M1. OR is a multiple of OP and both pass through O, so O, P and R are collinear A1

**3.** OABC is a parallelogram with OA = **a** and OC = **c**. M is the midpoint of BC. Find, in terms of **a** and **c**, (a) OM [1], (b) AM [2].

(a) OM = OC + CM = **c** + ½**a** B1 (CB = OA = **a**)
(b) AM = AO + OM M1 = −**a** + **c** + ½**a** = **c** − ½**a** A1

## Common mistakes

- Writing AB as **a** − **b** instead of **b** − **a** (it is "end minus start" for position vectors).
- Using the wrong fraction: AP : PB = 1 : 3 means AP = ¼AB, not ⅓AB.
- Not going round a valid route — each step must follow arrows you know (reverse an arrow by changing the sign).
- Writing vectors without bold or underlining, or as coordinates with a comma.
- In collinear proofs, showing the multiple but not stating the conclusion (parallel + a common point). The final mark needs the sentence.
- Magnitude: forgetting to square the negative component properly, e.g. (−4)² = 16.

## Practice questions

1. Find the magnitude of (5, −12). [2]
2. (x, 3) + 2(4, y) = (11, −1). Find x and y. [2]
3. A is (2, −1) and B is (7, 3). Find AB as a column vector and its magnitude. [3]
4. **a** = (2, −1), **b** = (−3, 4). Find (a) 3**a** − 2**b** [2], (b) |**a** + **b**| [2].
5. The vectors (2, k) and (6, 9) are parallel. Find k. [1]
6. The vector (k, 8) has magnitude 10. Find the possible values of k. [2]
7. OAB is a triangle, OA = **a**, OB = **b**. M is the midpoint of AB. Find (a) AB, (b) AM, (c) OM, in terms of **a** and **b**. [3]
8. OABC is a parallelogram with OA = **a** and OC = **c**. N is the midpoint of AB. X is on OB with OX : XB = 2 : 1.
 (a) Find ON and OX in terms of **a** and **c**. [2]
 (b) Show that C, X and N are collinear. [3]

<details><summary>Answers</summary>

1. √(25 + 144) = **13**
2. x + 8 = 11 → **x = 3**; 3 + 2y = −1 → **y = −2**
3. **AB = (5, 4)**; |AB| = √41 = **6.40**
4. (a) (6, −3) − (−6, 8) = **(12, −11)** (b) **a** + **b** = (−1, 3); √10 = **3.16**
5. 6 = 3 × 2, so k = 9 ÷ 3 = **3**
6. k² + 64 = 100 → **k = 6 or −6**
7. (a) **b** − **a** (b) ½(**b** − **a**) (c) **a** + ½(**b** − **a**) = **½a + ½b**
8. (a) ON = **a** + ½**c** (AB = OC = **c**); OB = **a** + **c**, so OX = ⅔**a** + ⅔**c**
 (b) CX = OX − OC = ⅔**a** − ⅓**c**; CN = ON − OC = **a** − ½**c**. CX = ⅔CN, so CX and CN are parallel and share point C, so C, X and N are collinear.

</details>

## Plan for this hour

- **10 min** – Read the notes; flashcard: "route", "fraction of a line", "parallel = multiple", "collinear = multiple + common point".
- **15 min** – Worked examples with answers covered.
- **30 min** – Practice questions (all of them can be done without a calculator).
- **5 min** – Error log.
