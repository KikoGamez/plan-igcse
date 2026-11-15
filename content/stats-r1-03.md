# Measures of location and spread

> **In the exam:** On both papers, every series. Typical tasks: mean/median/mode/range from a list or frequency table (1–3 marks each), estimated mean and standard deviation of grouped data (4–6 marks), quartiles and IQR (2–3 marks), weighted or combined means (2–3 marks), and "which average is most suitable and why" (1–2 marks). Comparison questions need one measure of location and one of spread, in context.

## What you need to know

- Mean, median and mode for raw data, discrete frequency tables and grouped frequency tables (estimates for grouped data, including estimating the median by interpolation and identifying the modal class).
- Weighted mean; combined mean of two groups.
- Advantages and disadvantages of each average, and choosing the most appropriate one.
- Range, quartiles, interquartile range and percentiles.
- Variance and standard deviation for raw data, frequency tables and grouped data, using σ = √(Σ(x − x̄)² ÷ n) or σ = √(Σx² ÷ n − x̄²).
- Using measures of location and spread to compare data sets.

## Notes

### Averages

| Average | Calculation | Advantage | Disadvantage |
|---|---|---|---|
| Mean x̄ | Σx ÷ n; table: Σfx ÷ Σf | uses all the data | affected by extreme values (outliers) |
| Median | middle value: the (n + 1)/2 th value of ordered data | not affected by extreme values | does not use all the values |
| Mode | most frequent value | can be used for qualitative data | may not exist or there may be several |

- **Grouped data:** use class midpoints → *estimate* of the mean. Modal class = class with the highest frequency.
- **Median of grouped data (interpolation):** find the class containing the n/2 th value; median ≈ lower boundary + ((n/2 − cf before class) ÷ class frequency) × class width.
- **Weighted mean** = Σ(weight × value) ÷ Σweights. Example: exam 70%, coursework 30%, marks 62 and 80: 0.7 × 62 + 0.3 × 80 = 67.4.
- **Combined mean** = (n₁x̄₁ + n₂x̄₂) ÷ (n₁ + n₂). Never just average the two means unless the groups are the same size.

### Measures of spread

- **Range** = largest − smallest (affected by outliers).
- **Quartiles** (ordered list of n values): lower quartile Q₁ = (n + 1)/4 th value, median Q₂ = (n + 1)/2 th value, upper quartile Q₃ = 3(n + 1)/4 th value. If the position is not a whole number, take the value halfway (or the appropriate fraction) between the two neighbouring values.
- For large grouped data on a cumulative frequency graph: use n/4, n/2, 3n/4.
- **Interquartile range** IQR = Q₃ − Q₁: the spread of the middle 50%, not affected by extreme values.
- **Percentiles**: the p-th percentile is the value below which p% of the data lie. Interpercentile range, e.g. 10th to 90th.

### Standard deviation

Measures the spread of the data about the mean; uses all the values.

| Data | Formula |
|---|---|
| Raw data | σ = √(Σ(x − x̄)² ÷ n) = √(Σx² ÷ n − x̄²) |
| Frequency table / grouped | σ = √(Σfx² ÷ Σf − (Σfx ÷ Σf)²) |

Variance = σ². For grouped data, x = midpoint and the answer is an estimate.

**Method with a table:** columns x (or midpoint), f, fx, fx²; total Σf, Σfx, Σfx². Then substitute. Use calculator statistics mode to check, but show the totals.

### Comparing two data sets

Write **two** comparisons, each in context, each with a value:
1. Location: "The mean time for Group A (22 min) is higher than for Group B (18 min), so Group A generally took longer."
2. Spread: "The standard deviation for A (4.1) is lower than for B (6.3), so A's times are more consistent."

Pair the measures: mean with standard deviation; median with IQR.

## Key terms and definitions

| Term | Definition |
|---|---|
| Measure of location | A single value representing the centre of the data (mean, median, mode) |
| Measure of spread | A value showing how spread out the data are (range, IQR, standard deviation) |
| Interquartile range | Upper quartile − lower quartile; the range of the middle 50% of the data |
| Standard deviation | A measure of the spread of the data about the mean |
| Outlier | An extreme value that does not fit the pattern of the rest of the data |

## Worked examples

**1.** For the data 4, 7, 7, 9, 10, 12, 15 find (a) the mean, median and mode [3], (b) the interquartile range [2], (c) the standard deviation [3].

(a) 64 ÷ 7 = **9.14** B1; median = 4th value = **9** B1; mode **7** B1
(b) Q₁ = 2nd value = 7, Q₃ = 6th value = 12 M1; IQR = **5** A1
(c) Σx² = 664 M1; σ = √(664 ÷ 7 − 9.142…²) M1 = **3.36** A1

**2.** The masses of 40 parcels are shown.

| Mass (m kg) | 0 < m ≤ 10 | 10 < m ≤ 20 | 20 < m ≤ 30 | 30 < m ≤ 40 |
|---|---|---|---|---|
| Frequency | 6 | 10 | 14 | 10 |

Calculate estimates of (a) the mean [3], (b) the standard deviation [3], (c) the median [2].

(a) Midpoints 5, 15, 25, 35; Σfx = 30 + 150 + 350 + 350 = 880 M1 M1; 880 ÷ 40 = **22 kg** A1
(b) Σfx² = 150 + 2250 + 8750 + 12 250 = 23 400 M1; σ = √(23 400 ÷ 40 − 22²) M1 = √101 = **10.0 kg** A1
(c) 20th value; cf before class 20–30 is 16 M1; 20 + (4 ÷ 14) × 10 = **22.9 kg** A1

## Common mistakes

- Using class width or upper boundary instead of the midpoint.
- Dividing Σfx by the number of classes instead of Σf.
- Standard deviation: subtracting x̄ instead of x̄², or taking the square root before subtracting.
- Quoting the median position (e.g. "4th") instead of the median value.
- Averaging two means from groups of different sizes.
- Comparisons without context or without values; comparing mean with IQR (mismatched measures).

## Practice questions

1. Find the mean, median, mode and range of 3, 8, 8, 11, 15. [4]
2. For the table x: 1, 2, 3, 4, 5 with f: 3, 7, 9, 6, 5, find (a) the mean [2], (b) the median [1], (c) the standard deviation [3].
3. Find the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9. [3]
4. Find the quartiles and IQR of 3, 5, 6, 8, 9, 10, 12, 14, 15, 18, 21. [3]
5. Class A (20 students) has mean mark 65. Class B (30 students) has mean mark 70. Find the mean mark of all 50 students. [2]
6. House prices in a street (€000): 180, 195, 200, 210, 215, 950. Which average best represents a typical price? Give a reason. [2]
7. Two teams' scores: Team P mean 54, sd 3.2; Team Q mean 58, sd 7.5. Make two comparisons. [2]

<details><summary>Answers</summary>

1. Mean 45 ÷ 5 = **9**; median **8**; mode **8**; range **12**
2. (a) Σfx = 3 + 14 + 27 + 24 + 25 = 93; 93 ÷ 30 = **3.1** (b) 15.5th value; cf 3, 10, 19 → **3** (c) Σfx² = 333; √(333 ÷ 30 − 3.1²) = √1.49 = **1.22**
3. Mean 5; Σ(x − x̄)² = 32; √(32 ÷ 8) = **2**
4. n = 11: Q₁ = 3rd = **6**, Q₂ = 6th = **10**, Q₃ = 9th = **15**; IQR = **9**
5. (20 × 65 + 30 × 70) ÷ 50 = 3400 ÷ 50 = **68**
6. **Median** — the €950 000 house is an outlier which would make the mean unrepresentatively high.
7. Q has a higher mean score (58 vs 54), so on average Q scored more. P has a lower standard deviation (3.2 vs 7.5), so P's scores were more consistent.

</details>

## Plan for this hour

- **10 min** – Read the notes; flashcard: both standard deviation formulae and the quartile positions.
- **15 min** – Redo Example 2 with a full x, f, fx, fx² table; check with calculator statistics mode.
- **30 min** – Practice questions.
- **5 min** – Error log.
