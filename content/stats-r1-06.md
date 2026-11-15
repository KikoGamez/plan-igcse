# Correlation and regression

> **In the exam:** Every series, often a long question (10–15 marks). Typical parts: plot points on a scatter diagram (2 marks), describe the correlation (1 mark), plot the mean point and draw the line of best fit through it (2 marks), find its equation and interpret the gradient and intercept in context (3–4 marks), make a prediction and comment on its reliability (2 marks), calculate Spearman's rank correlation coefficient and interpret it (4–6 marks).

## What you need to know

- Draw and interpret scatter diagrams for bivariate data; identify outliers.
- Describe correlation: positive, negative, no correlation; strong or weak.
- Understand that correlation does not imply causation.
- Draw a line of best fit by eye, passing through the mean point (x̄, ȳ).
- Find the equation of a line of best fit in the form y = a + bx, and interpret a and b in context.
- Use a line of best fit to make predictions; understand the dangers of extrapolation compared with interpolation.
- Calculate and interpret Spearman's rank correlation coefficient: rs = 1 − 6Σd² ÷ (n(n² − 1)).

## Notes

### Scatter diagrams and correlation

| Pattern | Description | Interpretation (write in context) |
|---|---|---|
| Points rise left to right | positive correlation | as x increases, y tends to increase |
| Points fall left to right | negative correlation | as x increases, y tends to decrease |
| No pattern | no correlation | no linear relationship |

- Strong correlation: points close to a straight line; weak: widely scattered.
- An **outlier** is a point that clearly doesn't fit the pattern. It may be an error; it can be ignored when drawing the line.
- **Causation**: correlation does not prove that x causes y; there could be a third factor (e.g. ice-cream sales and drowning both rise with temperature).

### Line of best fit

1. Calculate the mean point (x̄, ȳ) and plot it (often marked with a different symbol).
2. Draw a straight line **through the mean point**, following the trend, with points roughly balanced either side. It doesn't have to go through the origin.
3. Equation y = a + bx:
 - b = gradient = change in y ÷ change in x (use two points far apart on the line);
 - a = y-intercept (value of y when x = 0).

**Interpreting in context**
- Gradient b: "For each extra hour of revision, the score increases by about 6 marks."
- Intercept a: "A student who did no revision would be expected to score about 25 marks." (Only meaningful if x = 0 makes sense.)

### Predictions

- **Interpolation**: predicting within the range of the data — reliable (if correlation is strong).
- **Extrapolation**: predicting outside the range — unreliable, because the pattern may not continue (e.g. a predicted mark above 100).
- Only predict y from x using a line of y on x.

### Spearman's rank correlation coefficient

rs = 1 − 6Σd² ÷ (n(n² − 1))

Method:
1. Rank each variable separately (1 = highest, or 1 = lowest — but the same way for both).
2. d = difference between the two ranks for each item; square it.
3. Add the d² values; substitute with n = number of pairs.

| rs value | Interpretation |
|---|---|
| 1 | perfect positive agreement between rankings |
| close to 1 (e.g. 0.8) | strong positive correlation |
| close to 0 | no correlation |
| close to −1 | strong negative correlation |
| −1 | perfect negative (rankings exactly reversed) |

- rs must lie between −1 and 1 — if not, recheck Σd².
- Interpret in context: "rs = 0.89, so there is strong positive correlation between the maths and science ranks: students who did well in maths tended to do well in science."
- Spearman's measures agreement between **rankings**; it can be used when data are ranks (e.g. judges' orders) or when the relationship is not linear but consistently increasing or decreasing.

## Key terms and definitions

| Term | Definition |
|---|---|
| Bivariate data | Data with two variables recorded for each item |
| Correlation | A measure of the strength of the linear relationship between two variables |
| Line of best fit | A straight line drawn through the mean point that best represents the trend in a scatter diagram |
| Interpolation | Estimating a value within the range of the data |
| Extrapolation | Estimating a value outside the range of the data |
| Spearman's rank correlation coefficient | A measure of agreement between two sets of rankings, from −1 to +1 |

## Worked examples

**1.** Calculate Spearman's rank correlation coefficient for these marks and interpret it. [5]

| Student | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| Maths | 56 | 72 | 45 | 88 | 63 | 70 | 51 |
| Science | 60 | 75 | 52 | 80 | 58 | 77 | 49 |

Ranks (1 = highest): Maths 5, 2, 7, 1, 4, 3, 6; Science 4, 3, 6, 1, 5, 2, 7 M1
d = 1, −1, 1, 0, −1, 1, −1; Σd² = 6 M1
rs = 1 − (6 × 6) ÷ (7 × 48) M1 = 1 − 36/336 = **0.893** A1
Strong positive correlation: students who did well in maths tended to do well in science B1

**2.** For data on hours of revision (x) and test score (y), x̄ = 6 and ȳ = 40. The line of best fit passes through the mean point and through (2, 22).
(a) Find the equation of the line in the form y = a + bx. [3]
(b) Interpret the gradient. [1]
(c) Estimate the score for 15 hours of revision and comment on its reliability, given the data range was 1 to 10 hours. [2]

(a) b = (40 − 22) ÷ (6 − 2) = 4.5 M1; 40 = a + 4.5 × 6 → a = 13 M1; **y = 13 + 4.5x** A1
(b) Each extra hour of revision is associated with about 4.5 more marks B1
(c) 13 + 4.5 × 15 = **80.5** B1; unreliable because it is extrapolation (outside 1–10 hours) B1

## Common mistakes

- Ranking one variable from highest and the other from lowest.
- Forgetting to square d, or using n² instead of n(n² − 1).
- Answers for rs outside −1 to 1 not noticed.
- Interpretation without context ("strong positive correlation" alone often gets only part of the mark).
- Line of best fit not through the mean point, or forced through the origin.
- Gradient read from points too close together, or using grid squares rather than the axis scales.
- Saying correlation proves cause.

## Practice questions

1. Two judges rank six contestants. Judge 1: 1, 2, 3, 4, 5, 6. Judge 2: 2, 1, 4, 3, 6, 5. Calculate rs and interpret it. [4]
2. For 8 pairs, Σd² = 50. Calculate rs. [2]
3. Five items are ranked 1, 2, 3, 4, 5 by one person and 5, 4, 3, 2, 1 by another. Without calculating, write down rs. [1]
4. For 10 pairs, rs = 0.6. Find Σd². [2]
5. Temperatures (°C) 18, 22, 25, 15, 30 and ice-cream sales 120, 150, 140, 90, 200 on five days. Calculate rs. [4]
6. A line of best fit for car age x (years) and value y (€000) is y = 24 − 2.5x. Interpret 24 and −2.5 in context. [2]
7. Explain why using the line in Q6 to predict the value of a 12-year-old car might not be sensible. [1]

<details><summary>Answers</summary>

1. d = −1, 1, −1, 1, −1, 1; Σd² = 6; rs = 1 − 36 ÷ (6 × 35) = **0.829**: strong agreement between the judges.
2. 1 − 300 ÷ (8 × 63) = 1 − 300/504 = **0.405**
3. **−1**
4. 0.6 = 1 − 6Σd² ÷ 990 → 6Σd² = 396 → **Σd² = 66**
5. Temperature ranks 4, 3, 2, 5, 1; sales ranks 4, 2, 3, 5, 1; d = 0, 1, −1, 0, 0; Σd² = 2; rs = 1 − 12 ÷ (5 × 24) = **0.9**
6. 24: estimated value of a new car (age 0) is €24 000. −2.5: value falls by about €2500 per year of age.
7. It predicts 24 − 30 = −6, a negative value, which is impossible (and it is probably extrapolation).

</details>

## Plan for this hour

- **10 min** – Read the notes; flashcard: Spearman's formula, the interpolation/extrapolation rule, how to interpret a and b.
- **15 min** – Redo Worked Example 1 in a full table (ranks, d, d²).
- **30 min** – Practice questions.
- **5 min** – Error log.
