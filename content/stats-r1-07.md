# Time series

> **In the exam:** Appears regularly, usually as one long question (8–12 marks): plot a time series graph, calculate moving averages (3- or 4-point), plot them, draw a trend line, describe the trend, calculate seasonal variations and their mean, and use the trend line plus mean seasonal variation to predict a future value. Calculations are routine; marks are lost on plotting positions and on the prediction step.

## What you need to know

- Plot and interpret time series graphs.
- Recognise trends and seasonal (cyclical) patterns.
- Calculate appropriate moving averages (e.g. 3-point for data in thirds of a year, 4-point for quarterly data) and plot them.
- Draw a trend line through the moving averages and describe the trend.
- Calculate seasonal variation (actual value − trend value) and mean seasonal variation for each season.
- Use the trend line and mean seasonal variation to make predictions; comment on their reliability.

## Notes

### Time series graphs

- Time on the horizontal axis; plot points and join them with straight lines (the line in between has no meaning, it only shows the pattern).
- **Trend**: the general direction over time (increasing, decreasing, steady).
- **Seasonal variation**: a pattern that repeats every year (or every cycle), e.g. high sales every summer.

### Moving averages

A moving average smooths out seasonal variation to show the trend. Use the same number of points as the length of the cycle: 4-point for quarterly data, 3-point for termly data, 12-point for monthly data.

- 1st 3-point moving average = (value 1 + value 2 + value 3) ÷ 3; 2nd = (value 2 + value 3 + value 4) ÷ 3; and so on.
- n values give n − 2 three-point averages and n − 3 four-point averages.
- **Plotting**: plot each moving average at the **middle** of the time period it covers. A 3-point average is plotted at the middle value (e.g. above term 2). A 4-point average is plotted halfway between the 2nd and 3rd values.

### Trend line

- Draw a straight line of best fit by eye through the plotted moving averages (not through the original data).
- Describe the trend in context: "Sales are generally increasing over the three years."
- Gradient of the trend line = average increase per time period.

### Seasonal variation and prediction

- **Seasonal variation** = actual value − trend value (trend value read from the trend line, or the moving average at that point).
- **Mean seasonal variation** for a season = mean of all the seasonal variations for that season (e.g. all Quarter 1 values).
- **Prediction** = trend line value at the future time + mean seasonal variation for that season.

Steps for prediction:
1. Extend the trend line to the future time and read the trend value (or extend by the average change per period).
2. Add the mean seasonal variation for that season (it may be negative).

Reliability: predictions are less reliable the further into the future they are (extrapolation), and if the pattern changes.

## Key terms and definitions

| Term | Definition |
|---|---|
| Time series | A set of observations of a variable taken at regular intervals of time |
| Trend | The general direction in which the data are moving over time |
| Moving average | The mean of a fixed number of consecutive values, recalculated by moving on one value at a time |
| Seasonal variation | The difference between the actual value and the trend value |
| Mean seasonal variation | The mean of the seasonal variations for one particular season |

## Worked examples

**1.** A school shop records sales (€) each term (3 terms per year).

| Year | Term 1 | Term 2 | Term 3 |
|---|---|---|---|
| 1 | 120 | 90 | 150 |
| 2 | 129 | 96 | 162 |
| 3 | 138 | 102 | 171 |

(a) Calculate the 3-point moving averages. [3]
(b) Describe the trend. [1]
(c) Calculate the seasonal variations using the moving averages, and the mean seasonal variation for each term. [4]
(d) The trend increases by about €2.83 per term. Predict the sales for Year 4, Term 1. [3]

(a) (120 + 90 + 150) ÷ 3 = 120, then **120, 123, 125, 129, 132, 134, 137** M1 A2 (A1 for 4 correct). These are plotted at Y1T2, Y1T3, Y2T1, Y2T2, Y2T3, Y3T1, Y3T2.
(b) Sales are increasing over time B1
(c) Actual − moving average:

| | Term 1 | Term 2 | Term 3 |
|---|---|---|---|
| Year 1 | — | 90 − 120 = −30 | 150 − 123 = 27 |
| Year 2 | 129 − 125 = 4 | 96 − 129 = −33 | 162 − 132 = 30 |
| Year 3 | 138 − 134 = 4 | 102 − 137 = −35 | — |

M1 A1. Means: Term 1 **4**, Term 2 (−30 − 33 − 35) ÷ 3 = **−32.7**, Term 3 (27 + 30) ÷ 2 = **28.5** M1 A1
(d) Last trend value 137 at Y3T2; Y4T1 is two terms later: 137 + 2 × 2.83 ≈ 142.7 M1; prediction = 142.7 + 4 M1 ≈ **€147** A1

**2.** Quarterly values: 42, 58, 65, 35, 46, 62. Calculate the 4-point moving averages and say where to plot the first one. [3]

(42 + 58 + 65 + 35) ÷ 4 = **50** M1; (58 + 65 + 35 + 46) ÷ 4 = **51**; (65 + 35 + 46 + 62) ÷ 4 = **52** A1. The first is plotted halfway between Q2 and Q3 of the first year B1

## Common mistakes

- Using the wrong number of points (must match the length of the cycle).
- Plotting moving averages at the start or end of the period instead of the middle.
- Drawing the trend line through the original data points instead of the moving averages.
- Seasonal variation calculated as trend − actual (sign wrong).
- Forgetting to add the mean seasonal variation in the prediction, or using the wrong season's value.
- Describing the trend without context, or describing the seasonal ups and downs instead of the trend.

## Practice questions

1. Calculate the 4-point moving averages for: 42, 58, 65, 35, 46, 62, 71, 39, 50, 67, 74, 43. [3]
2. Describe the trend shown by your answers to Q1. [1]
3. For data with a 4-quarter cycle, the Quarter 3 values are 65, 71 and 74, and the trend values at those points are 51.5, 56.1 and 58.0. Find the mean seasonal variation for Quarter 3. [2]
4. The trend line value for next year's Quarter 3 is 62.0. Use Q3 to predict the actual value. [1]
5. Why is a 4-point moving average used for quarterly data? [1]
6. Give one reason why a prediction made using a trend line might be unreliable. [1]
7. Three-point moving averages are 40, 43 and 45. The first is (38 + 47 + x) ÷ 3. Find x, and the next value y in the series if the second average is (47 + x + y) ÷ 3. [3]

<details><summary>Answers</summary>

1. **50, 51, 52, 53.5, 54.5, 55.5, 56.75, 57.5, 58.5**
2. Increasing trend: the values are generally rising over time.
3. 65 − 51.5 = 13.5; 71 − 56.1 = 14.9; 74 − 58.0 = 16.0; mean = 44.4 ÷ 3 = **14.8**
4. 62.0 + 14.8 = **76.8**
5. It covers one complete cycle (4 quarters), so the seasonal effect is removed.
6. It is extrapolation: the trend may not continue (e.g. economic changes).
7. 38 + 47 + x = 120 → **x = 35**; 47 + 35 + y = 129 → **y = 47**

</details>

## Plan for this hour

- **20 min** – On graph paper, plot the data in Worked Example 1 and its moving averages; draw a trend line and read off a trend value for Year 4, Term 1.
- **10 min** – Read the notes; flashcard: "seasonal variation = actual − trend", "prediction = trend + mean SV".
- **25 min** – Practice questions.
- **5 min** – Error log.
