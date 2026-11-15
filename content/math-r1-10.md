# Graphs: gradients and kinematics

> **In the exam:** Speed–time and distance–time graphs appear in most series, on **either paper** (acceleration, distance as area, average speed, finding an unknown time from a given distance; 4–7 marks). On **Paper 4**, the "draw the graph" question often ends with "draw a suitable tangent and estimate the gradient at x = …" (3 marks). Differentiation (gradient functions and turning points) appears in most series, usually 4–7 marks on either paper.

## What you need to know

- Use and interpret graphs in practical situations, including travel graphs and conversion graphs; draw graphs from given data.
- (Extended) Apply the idea of rate of change to simple kinematics involving distance–time and speed–time graphs, acceleration and deceleration; calculate distance travelled as the area under a speed–time graph.
- (Extended) Estimate gradients of curves by drawing tangents.
- (Extended) Use the derivatives of functions of the form axⁿ, where a is a rational constant and n is a positive integer or zero, and simple sums of not more than three of these.
- (Extended) Apply differentiation to gradients and stationary points (turning points); discriminate between maxima and minima by any method.

## Notes

### Gradient as a rate of change

Gradient = change in y ÷ change in x. It has **units**: (y-unit) per (x-unit).
- Distance (km) against time (h) → gradient in km/h = speed.
- Speed (m/s) against time (s) → gradient in m/s² = acceleration.
- Cost (£) against number of items → gradient = cost per item.

### Distance–time graphs

| Feature | Meaning |
|---|---|
| Gradient | speed (steeper = faster) |
| Horizontal line | stationary (stopped) |
| Line going back down to the axis | returning to the start |
| Curve | changing speed |

- **Average speed = total distance ÷ total time** (include stops). Not the average of the speeds.
- A cyclist rides 15 km in 45 min, stops for 30 min, then rides 15 km home in 1 h. Speed on the first part: 15 ÷ 0.75 = 20 km/h. Average speed for the whole journey: 30 ÷ 2.25 = 13.3 km/h.
- Time conversions: 45 min = 0.75 h; 20 min = ⅓ h (not 0.2 h).

### Speed–time graphs

| Feature | Meaning |
|---|---|
| Gradient | acceleration (negative gradient = deceleration) |
| Horizontal line | constant speed (acceleration 0) |
| **Area under graph** | **distance travelled** |

- Split the area into triangles, rectangles and trapeziums. Trapezium area = ½(a + b)h.
- Deceleration is given as a positive number: a gradient of −2 m/s² is a deceleration of 2 m/s².
- Speed–time graph from rest: starts at (0, 0).
- Units: km/h → m/s: × 1000 ÷ 3600, i.e. ÷ 3.6 (72 km/h = 20 m/s). m/s → km/h: × 3.6.
- **Unknown time questions:** write an expression for the total area, set it equal to the given distance, solve.

### Gradient of a curve: drawing a tangent

A **tangent** touches the curve at one point and has the same gradient as the curve there.

1. Place your ruler at the point so it touches the curve without cutting it (the curve should be on the same side of the ruler either side of the point, near it).
2. Draw a long line.
3. Choose two points **far apart** on your tangent (not on the curve) with easy coordinates.
4. Gradient = (y₂ − y₁)/(x₂ − x₁). Check the sign: going downhill left to right → negative.

Answers are accepted within a range, but the tangent must look correct.

Example: on y = x², the tangent at (3, 9) passes through (1, −3) and (4, 15); gradient = 18 ÷ 3 = 6.

### Differentiation (exact gradients)

| y | dy/dx |
|---|---|
| axⁿ | naxⁿ⁻¹ |
| 5x³ | 15x² |
| 4x | 4 |
| 7 (constant) | 0 |

- Differentiate term by term: y = 4x³ − 2x² + 7x − 1 → dy/dx = 12x² − 4x + 7.
- **Gradient at a point:** substitute x into dy/dx. At x = 1: 12 − 4 + 7 = 15.
- Expand brackets first: y = x(x − 3) = x² − 3x → dy/dx = 2x − 3.
- **Stationary (turning) points:** solve dy/dx = 0, then find y by substituting into the **original** equation.
- **Maximum or minimum?** Any method is accepted:
  - second derivative d²y/dx²: negative → maximum; positive → minimum; or
  - the sign of dy/dx either side: + then − → maximum; − then + → minimum; or
  - the shape of the graph (a positive x³ cubic has the maximum on the left).

Example: y = x³ − 6x² + 5. dy/dx = 3x² − 12x = 3x(x − 4) = 0 → x = 0 or x = 4.
x = 0: y = 5; x = 4: y = 64 − 96 + 5 = −27.
d²y/dx² = 6x − 12: at x = 0 it is −12 (maximum (0, 5)); at x = 4 it is 12 (minimum (4, −27)).

## Worked examples

**1.** A car starts from rest and accelerates uniformly to 12 m/s in 8 seconds. It travels at 12 m/s for 20 seconds, then decelerates uniformly to rest in 6 seconds.
(a) Calculate the acceleration in the first 8 seconds. [1]
(b) Calculate the total distance travelled. [3]
(c) Calculate the average speed for the whole journey. [2]

- (a) 12 ÷ 8 = **1.5 m/s²** — **B1**
- (b) ½ × 8 × 12 + 20 × 12 + ½ × 6 × 12 (or trapezium ½(20 + 34) × 12) — **M2** (M1 for one correct area); **324 m** — **A1**
- (c) 324 ÷ 34 — **M1**; **9.53 m/s** (9.529…) — **A1**

**2.** An object starts from rest and accelerates uniformly to 16 m/s in T seconds. It then travels at 16 m/s for 30 seconds. The total distance is 600 m. Find T. [3]

- ½ × T × 16 + 30 × 16 — **M1**
- 8T + 480 = 600 — **M1**
- **T = 15** — **A1**

**3.** y = x³ − 6x² + 5. Find the coordinates of the turning points and determine whether each is a maximum or a minimum. [6]

- dy/dx = 3x² − 12x — **B2** (B1 for one term correct)
- 3x² − 12x = 0 — **M1**
- (0, 5) and (4, −27) — **A1 A1**
- (0, 5) maximum, (4, −27) minimum, with a valid reason — **B1**

## Common mistakes

- Using distance ÷ time on a speed–time graph, or gradient instead of area for distance.
- Average speed calculated as the mean of the speeds, or ignoring the time stopped.
- Time in minutes when speed is in km/h (e.g. 15 ÷ 45 instead of 15 ÷ 0.75).
- Tangent drawn as a chord (crossing the curve twice), or gradient read off using the curve's points rather than points on the tangent; using a tiny triangle.
- Reading scales wrongly (one small square may be 0.2 or 5 units).
- Differentiation: differentiating the constant to something other than 0, or 4x → 4x⁰ written as 4x.
- Finding x at the turning point but not y, or substituting into dy/dx instead of y.

## Practice questions

1. Convert 72 km/h into metres per second. [2]
2. A train accelerates uniformly from 5 m/s to 25 m/s in 40 seconds. Find (a) the acceleration [1] (b) the distance travelled in this time. [2]
3. A car travelling at 30 m/s decelerates uniformly at 2.5 m/s² until it stops. Find (a) the time taken to stop [1] (b) the distance travelled while stopping. [2]
4. A cyclist rides 15 km in 45 minutes, stops for 30 minutes, then rides 15 km home in 1 hour. Find the average speed for the whole journey. [2]
5. Differentiate y = 4x³ − 2x² + 7x − 1 and find the gradient of the curve at x = 1. [3]
6. Find the coordinates of the turning point of y = x² − 8x + 3 and state whether it is a maximum or a minimum. [4]
7. Find the gradient of the curve y = x(x − 3) at the point where x = 2. [3]
8. A curve has equation y = 2x³ − 3x² − 12x. Find the x-coordinates of its stationary points. [4]

<details><summary>Answers</summary>

1. 72 × 1000 ÷ 3600 = **20 m/s**
2. (a) 20 ÷ 40 = **0.5 m/s²** (b) ½(5 + 25) × 40 = **600 m**
3. (a) 30 ÷ 2.5 = **12 s** (b) ½ × 12 × 30 = **180 m**
4. 30 km ÷ 2.25 h = **13.3 km/h**
5. dy/dx = **12x² − 4x + 7**; at x = 1, gradient = **15**
6. dy/dx = 2x − 8 = 0 → x = 4, y = 16 − 32 + 3 = −13 → **(4, −13), minimum** (positive x² curve, or d²y/dx² = 2 > 0)
7. y = x² − 3x → dy/dx = 2x − 3 → at x = 2: **1**
8. dy/dx = 6x² − 6x − 12 = 6(x² − x − 2) = 6(x − 2)(x + 1) = 0 → **x = 2, x = −1**

</details>

## Plan for this hour

- **10 min** – Read the notes; learn the two graph tables (distance–time and speed–time).
- **15 min** – Summary card: gradient = rate, area = distance, tangent method, differentiation rule and turning points.
- **30 min** – Practice questions, then mark them. If you have time, draw y = x² for 0 ≤ x ≤ 4 and estimate the gradient at x = 3 by a tangent (should be close to 6).
- **5 min** – Error log.
