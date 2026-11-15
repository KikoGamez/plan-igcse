# Cumulative frequency, box plots and skew

> **In the exam:** Both papers, almost every series. A typical question (8–12 marks) gives a grouped frequency table: complete the cumulative frequency column, draw the curve, read off the median, quartiles or a percentile, draw a box plot, identify outliers, describe the skewness and compare with another box plot. Comparisons must be in context and use figures.

## What you need to know

- Construct cumulative frequency tables and draw cumulative frequency graphs (polygons or curves).
- Use cumulative frequency graphs to estimate the median, quartiles, interquartile range, percentiles and interpercentile ranges, and the number of values above or below a given value.
- Draw and interpret box plots (box-and-whisker diagrams).
- Identify outliers using the rule: below Q₁ − 1.5 × IQR or above Q₃ + 1.5 × IQR.
- Recognise and describe symmetrical, positively skewed and negatively skewed distributions, using diagrams and the relative positions of the mean, median and mode or the quartiles.
- Compare distributions using box plots and summary statistics.

## Notes

### Cumulative frequency

1. Running total of the frequencies.
2. Plot each cumulative frequency against the **upper class boundary**; start the graph at (lowest boundary, 0).
3. Join with a smooth curve or straight line segments (cumulative frequency polygon).
4. Readings (n = total frequency):

| Quantity | Read at cumulative frequency |
|---|---|
| Lower quartile Q₁ | n/4 |
| Median Q₂ | n/2 |
| Upper quartile Q₃ | 3n/4 |
| p-th percentile | (p/100) × n |

- Number **above** a value x: n − (cumulative frequency at x).
- Without a graph, estimate by linear interpolation inside the class: value ≈ lower boundary + ((position − cf before) ÷ class frequency) × class width.

### Box plots

Five values on a scale: minimum, Q₁, median, Q₃, maximum. The box goes from Q₁ to Q₃ with a line at the median; whiskers go to the minimum and maximum (or to the last non-outlier, with outliers marked as crosses).

- Draw on graph paper with a labelled scale; use a ruler.
- From a cumulative frequency graph the minimum and maximum are not known exactly — use the values given in the question.

### Outliers

- Lower limit = Q₁ − 1.5 × IQR; upper limit = Q₃ + 1.5 × IQR.
- Any value outside these limits is an outlier. Show the calculation, then state clearly "so 58 is an outlier".
- Outliers may be errors (check and remove) or genuine extreme values (keep).

### Skewness

| Shape | Box plot / quartiles | Mean, median, mode |
|---|---|---|
| Symmetrical | Q₃ − Q₂ = Q₂ − Q₁ | mean = median = mode |
| Positive skew (tail to the right) | Q₃ − Q₂ > Q₂ − Q₁ | mean > median > mode |
| Negative skew (tail to the left) | Q₃ − Q₂ < Q₂ − Q₁ | mean < median < mode |

Example of positive skew: incomes (most people earn moderate amounts, a few earn a lot).

### Comparing distributions

Give at least two comparisons, each with values and context:
- **Location:** "The median time for boys (34 min) is higher than for girls (31 min), so boys generally took longer."
- **Spread:** "The IQR for girls (5 min) is smaller than for boys (8.75 min), so girls' times were more consistent."
- **Skew** (if asked): "Boys' times show positive skew, girls' times are roughly symmetrical."

## Key terms and definitions

| Term | Definition |
|---|---|
| Cumulative frequency | The running total of the frequencies |
| Percentile | The value below which a given percentage of the data lies |
| Box plot | A diagram showing the minimum, lower quartile, median, upper quartile and maximum |
| Outlier | A value more than 1.5 × IQR below the lower quartile or above the upper quartile |
| Positive skew | Distribution with a longer tail on the right (higher values); Q₃ − Q₂ > Q₂ − Q₁ |
| Negative skew | Distribution with a longer tail on the left (lower values); Q₃ − Q₂ < Q₂ − Q₁ |

## Worked examples

**1.** The times taken by 80 runners are shown. The fastest time was 21 minutes and the slowest 58 minutes.

| Time (t min) | 20 < t ≤ 25 | 25 < t ≤ 30 | 30 < t ≤ 35 | 35 < t ≤ 40 | 40 < t ≤ 50 | 50 < t ≤ 60 |
|---|---|---|---|---|---|---|
| Frequency | 6 | 14 | 25 | 20 | 10 | 5 |

(a) Complete a cumulative frequency table. [1]
(b) Estimate the median and the quartiles. [3]
(c) Is the slowest time an outlier? Show your working. [3]
(d) Describe the skewness. [1]

(a) Cumulative frequencies at 25, 30, 35, 40, 50, 60: **6, 20, 45, 65, 75, 80** B1
(b) Median: 40th value: 30 + (20 ÷ 25) × 5 = **34 min** B1. Q₁: 20th value = **30 min** B1. Q₃: 60th value: 35 + (15 ÷ 20) × 5 = **38.75 min** B1 (graph readings within ±0.5 accepted)
(c) IQR = 38.75 − 30 = 8.75 M1; upper limit = 38.75 + 1.5 × 8.75 = 51.875 M1; 58 > 51.875 so **yes, it is an outlier** A1
(d) Q₃ − Q₂ = 4.75 > Q₂ − Q₁ = 4, so **slight positive skew** B1

**2.** Using Example 1, estimate (a) the 90th percentile [2], (b) the number of runners who took more than 45 minutes [2].

(a) 0.9 × 80 = 72nd value M1; 40 + (7 ÷ 10) × 10 = **47 min** A1
(b) Half of the 40–50 class is above 45: 5 M1; plus 5 in 50–60 = **10 runners** A1

## Common mistakes

- Plotting cumulative frequencies at midpoints instead of upper class boundaries.
- Not starting the curve at zero cumulative frequency at the lowest boundary.
- Using (n + 1)/4 on a cumulative frequency graph of grouped data — use n/4.
- Reading the value off the wrong axis (e.g. giving "40" — the position — as the median).
- Saying "positively skewed" because the data are positive numbers — skew is about shape.
- Outlier answers with no conclusion, or using 1.5 × range instead of 1.5 × IQR.
- Comparing box plots using only the range, or without context.

## Practice questions

1. For a set of data, Q₁ = 18, Q₃ = 30 and the maximum is 52. Is 52 an outlier? [2]
2. A distribution has mean 42, median 45 and mode 47. Describe its skewness. [1]
3. A cumulative frequency graph for 120 students' test marks gives these readings: 30 students scored 34 or less, 60 scored 48 or less, 90 scored 57 or less. Write down the median and IQR. [2]
4. Using the data in Q3, describe the skewness. Give a reason. [2]
5. Box plot A: min 10, Q₁ 22, median 28, Q₃ 35, max 50. Box plot B: min 15, Q₁ 20, median 24, Q₃ 27, max 40. A and B are times (minutes) to complete a puzzle for two classes. Make two comparisons. [2]
6. Using the table in Example 1, estimate the 20th percentile. [2]

<details><summary>Answers</summary>

1. IQR = 12; 30 + 1.5 × 12 = 48; 52 > 48, so **yes, 52 is an outlier**.
2. Mean < median < mode: **negative skew**.
3. Median **48**; IQR = 57 − 34 = **23**
4. Q₃ − Q₂ = 9 < Q₂ − Q₁ = 14, so **negative skew**.
5. Class A has a higher median (28 vs 24 min), so A generally took longer. A has a larger IQR (13 vs 7 min), so B's times were more consistent.
6. 0.2 × 80 = 16th value: 25 + (10 ÷ 14) × 5 = **28.6 min**

</details>

## Plan for this hour

- **20 min** – On graph paper, draw the cumulative frequency curve and box plot for Example 1; mark the readings.
- **10 min** – Read the notes on skew and outliers; flashcard with the outlier rule and skew table.
- **25 min** – Practice questions.
- **5 min** – Error log.
