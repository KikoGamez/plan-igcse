# Functions: notation, inverse and composite

> **In the exam:** One functions question in almost every series, usually on **Paper 2** but also on Paper 4. It is a multi-part question worth 6–10 marks: evaluate f(3), find gf(x) or fg(2), find f⁻¹(x), solve an equation such as f(x) = g(x) or ff(x) = 5. Each part is 1–3 marks and the parts are often independent, so attempt them all.

## What you need to know

- (Extended) Understand functions, domain and range, and use function notation, e.g. f(x) = 3x − 5, f: x ↦ 3x − 5.
- (Extended) Understand and find inverse functions f⁻¹(x).
- (Extended) Form composite functions as defined by gf(x) = g(f(x)).
- Substitute values into functions, including negative and fractional values.
- Solve equations involving functions.

## Notes

### Function notation

- f(x) = 3x − 5 (also written f: x ↦ 3x − 5) is a rule: "multiply by 3, then subtract 5".
- **f(4)** means substitute x = 4: f(4) = 3(4) − 5 = 7.
- **f(a + 1)** means replace every x with (a + 1): 3(a + 1) − 5 = 3a − 2.
- **f(x) = 10** means "solve": 3x − 5 = 10 → x = 5. Do not confuse f(10) (substitute) with f(x) = 10 (solve).
- **Domain** = the set of input values allowed. **Range** = the set of output values. Values that make a denominator zero (or a square root negative) are excluded from the domain: g(x) = 1/(x + 1), x ≠ −1.

Use brackets for negatives: if g(x) = x² + 2, g(−3) = (−3)² + 2 = 11.

### Composite functions

**fg(x) means f(g(x)): do g first, then f.** Work from the inside (right) outwards.

With f(x) = 3x − 5 and g(x) = x² + 2:

| Composite | Working | Result |
|---|---|---|
| fg(2) | g(2) = 6, then f(6) = 13 | 13 |
| gf(2) | f(2) = 1, then g(1) = 3 | 3 |
| fg(x) | f(x² + 2) = 3(x² + 2) − 5 | 3x² + 1 |
| gf(x) | g(3x − 5) = (3x − 5)² + 2 | 9x² − 30x + 27 |
| ff(x) | f(3x − 5) = 3(3x − 5) − 5 | 9x − 20 |

- fg(x) and gf(x) are usually **different**.
- ff(x) is not the same as [f(x)]².
- Put the inner function in **brackets** when you substitute.
- Expand and simplify unless the question says otherwise; check by putting x = 2 into your answer (fg(2) = 3(4) + 1 = 13 ✓).

### Inverse functions

f⁻¹(x) **undoes** f: if f(4) = 7 then f⁻¹(7) = 4.

**Method:**
1. Write y = f(x).
2. Rearrange to make x the subject.
3. Swap x and y (write the answer as f⁻¹(x) = … in terms of x).

f(x) = 3x − 5: y = 3x − 5 → x = (y + 5)/3 → **f⁻¹(x) = (x + 5)/3**.

**When x appears twice** (fractions) — use the "subject appears twice" method:
h(x) = (2x + 1)/(x − 3): y(x − 3) = 2x + 1 → xy − 3y = 2x + 1 → xy − 2x = 3y + 1 → x(y − 2) = 3y + 1 → **h⁻¹(x) = (3x + 1)/(x − 2)**.

Facts:
- ff⁻¹(x) = f⁻¹f(x) = x.
- f⁻¹(x) is **not** 1/f(x).
- The graph of y = f⁻¹(x) is the reflection of y = f(x) in the line y = x.
- To find f⁻¹(7) you can find f⁻¹(x) first, or solve f(x) = 7.
- Some functions are their own inverse, e.g. k(x) = (x + 4)/(2x − 1).

### Solving equations with functions

- f(x) = g(x): write the two expressions equal and solve.
- fg(x) = 7: find fg(x) first, then solve.
- f⁻¹(x) = 2: either find f⁻¹(x) and solve, or use the fact that x = f(2).
- Exponential functions: f(x) = 2ˣ. f(−2) = 2⁻² = 1/4. Solve f(x) = 32 → 2ˣ = 2⁵ → x = 5.

## Worked examples

**1.** f(x) = 3x − 5 and g(x) = x² + 2.
(a) Find gf(x). Give your answer in the form ax² + bx + c. [3]
(b) Find f⁻¹(x). [2]
(c) Solve fg(x) = 13. [3]

- (a) (3x − 5)² + 2 — **M1**; expansion 9x² − 15x − 15x + 25 — **M1**; **9x² − 30x + 27** — **A1**
- (b) x = 3y − 5 or y + 5 = 3x — **M1**; **f⁻¹(x) = (x + 5)/3** — **A1**
- (c) 3(x² + 2) − 5 = 13 — **M1**; 3x² = 12 or x² = 4 — **M1**; **x = 2 or x = −2** — **A1**

**2.** h(x) = (2x + 1)/(x − 3), x ≠ 3. Find h⁻¹(x). [3]

- y(x − 3) = 2x + 1 (or with x and y swapped) — **M1**
- x(y − 2) = 3y + 1 — **M1** (subject terms collected and factorised)
- **h⁻¹(x) = (3x + 1)/(x − 2)** — **A1**

**3.** f(x) = 2ˣ. (a) Find f(−2). [1] (b) Solve f(x) = 32. [1]

- (a) **1/4** — **B1**
- (b) **x = 5** — **B1**

## Common mistakes

- Doing composite functions in the wrong order (fg(x) means g **first**).
- Writing fg(x) as f(x) × g(x), or ff(x) as [f(x)]².
- Missing brackets: substituting 3x − 5 into x² + 2 as 3x − 5² + 2.
- Expanding (3x − 5)² as 9x² + 25.
- Giving f⁻¹(x) as 1/(3x − 5), or leaving the answer in terms of y.
- Confusing f(10) with f(x) = 10.
- Sign errors with negative inputs: g(−3) for g(x) = x² + 2 is 11, not −7.

## Practice questions

f(x) = 5 − 2x, g(x) = x², h(x) = 3ˣ.

1. Find f(−3). [1]
2. Find gf(1). [2]
3. Find f⁻¹(x). [2]
4. Find gf(x), giving your answer in the form ax² + bx + c. [2]
5. Solve fg(x) = −13. [3]
6. (a) Find h(−1). [1] (b) Solve h(x) = 81. [1]
7. Solve f(x) = f⁻¹(x). [3]
8. Find ff(x) in its simplest form. [2]
9. k(x) = (x + 4)/(2x − 1), x ≠ ½. Find k⁻¹(x). What do you notice? [4]

<details><summary>Answers</summary>

1. 5 − 2(−3) = **11**
2. f(1) = 3, g(3) = **9**
3. y = 5 − 2x → x = (5 − y)/2 → **f⁻¹(x) = (5 − x)/2**
4. (5 − 2x)² = **4x² − 20x + 25**
5. 5 − 2x² = −13 → x² = 9 → **x = 3 or x = −3**
6. (a) **1/3** (b) 81 = 3⁴ → **x = 4**
7. 5 − 2x = (5 − x)/2 → 10 − 4x = 5 − x → 3x = 5 → **x = 5/3**
8. 5 − 2(5 − 2x) = **4x − 5**
9. y(2x − 1) = x + 4 → 2xy − x = y + 4 → x(2y − 1) = y + 4 → **k⁻¹(x) = (x + 4)/(2x − 1)**; k⁻¹(x) = k(x), so k is its **own inverse**.

</details>

## Plan for this hour

- **10 min** – Read the notes; learn "fg(x): g first" and the 3-step inverse method.
- **15 min** – Summary card with the composite-function table; make up two functions and find fg, gf, f⁻¹ for them.
- **30 min** – Practice questions without a calculator, then mark them.
- **5 min** – Error log.
