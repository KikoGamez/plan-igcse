# Transformations

> **In the exam:** Almost every series, usually on a printed grid. Paper 2 and Paper 4 both have a question with 3–5 parts: "Draw the image of shape A after…" (2 marks each) and "Describe fully the single transformation that maps A onto B" (2–3 marks). Describing is where most marks are lost — every transformation needs specific details.

## What you need to know

- Recognise, describe and draw the following transformations:
 - reflection of a shape in a straight line;
 - rotation of a shape about a centre through multiples of 90°;
 - enlargement of a shape from a centre by a scale factor;
 - translation of a shape by a vector (x over y, written as a column vector).
- Extended: enlargements with fractional and negative scale factors.
- Positive, fractional and negative scale factors may be used.

## Notes

### Describing a transformation — the checklist

Write **one** transformation (the question says "single") with **all** of its details:

| Transformation | Details needed (each is a mark) |
|---|---|
| Translation | the word "translation" + column vector, e.g. (3 over −2) |
| Reflection | the word "reflection" + equation of the mirror line, e.g. y = −x |
| Rotation | the word "rotation" + centre (as coordinates) + angle + direction (clockwise/anticlockwise; 180° needs no direction) |
| Enlargement | the word "enlargement" + centre (as coordinates) + scale factor |

Never describe a combination ("reflect then translate") when a single transformation is asked for — this scores zero.

### Translation

- Column vector (x over y): top number = movement right (+) or left (−); bottom = up (+) or down (−).
- Every point moves the same way; the shape keeps its orientation.
- To find the vector: pick one vertex and its image, subtract: image − object.

### Reflection

- Mirror lines to know: x = a (vertical), y = b (horizontal), y = x, y = −x, the axes (x-axis is y = 0, y-axis is x = 0).
- Each point and its image are the same distance from the mirror line, on a line perpendicular to the mirror.
- Coordinate rules: in the x-axis (x, y) → (x, −y); in the y-axis (x, y) → (−x, y); in y = x (x, y) → (y, x); in y = −x (x, y) → (−y, −x).
- To find the mirror line: join a point to its image; the mirror line is the perpendicular bisector of that segment.

### Rotation

- About the origin: 90° clockwise (x, y) → (y, −x); 90° anticlockwise (x, y) → (−y, x); 180° (x, y) → (−x, −y).
- About another centre: work relative to the centre (subtract the centre, rotate, add it back), or use tracing paper (allowed in the exam — ask for it).
- To find the centre: try likely points with tracing paper, or draw the perpendicular bisectors of lines joining two points to their images; they meet at the centre.
- 90° clockwise = 270° anticlockwise, but describe it as 90° clockwise.

### Enlargement

- Image distance from the centre = scale factor × object distance from the centre (measure along rays from the centre).
- Scale factor k > 1: bigger. 0 < k < 1: smaller (still called an enlargement). Negative k: the image is on the opposite side of the centre and upside down.
- Scale factor = image length ÷ object length (negative if the image is inverted on the other side of the centre).
- To find the centre: draw lines through corresponding vertices (object to image) and extend them; they meet at the centre.
- Coordinate method: with centre C, image = C + k(object − C).

### What is preserved?

| | Size same? | Shape same? | Orientation same? |
|---|---|---|---|
| Translation | yes | yes | yes |
| Reflection | yes | yes | no (reversed) |
| Rotation | yes | yes | turned |
| Enlargement | no (unless k = ±1) | yes (similar) | k > 0 yes; k < 0 turned 180° |

Translations, reflections and rotations give **congruent** images; enlargements give **similar** images.

## Worked examples

**1.** Triangle P has vertices (2, 1), (4, 1) and (4, 2). Triangle Q has vertices (−1, 2), (−1, 4) and (−2, 4). Describe fully the single transformation that maps P onto Q. [3]

Test 90° anticlockwise about the origin, (x, y) → (−y, x): (2, 1) → (−1, 2) ✓, (4, 1) → (−1, 4) ✓, (4, 2) → (−2, 4) ✓.
**Rotation** B1, **90° anticlockwise** B1, **about (0, 0)** B1

**2.** Triangle A has vertices (2, 2), (4, 2) and (2, 3). Triangle B has vertices (3, 4), (7, 4) and (3, 6). Describe fully the single transformation that maps A onto B. [3]

Lengths: side (2,2)–(4,2) is 2, image side is 4, so scale factor 2.
Centre: lines through (2, 2)→(3, 4) and (4, 2)→(7, 4) meet at (1, 0). Check: (1, 0) + 2 × ((2, 3) − (1, 0)) = (1, 0) + (2, 6) = (3, 6) ✓
**Enlargement** B1, **scale factor 2** B1, **centre (1, 0)** B1

**3.** Rotate the point (3, 5) through 90° clockwise about (1, 2). [2]

Relative to centre: (3 − 1, 5 − 2) = (2, 3) M1. Rotate 90° clockwise: (3, −2). Add centre back: **(4, 0)** A1

**4.** Enlarge triangle with vertices (1, 1), (3, 1), (1, 2) by scale factor −2, centre (0, 0). [2]

Multiply each coordinate by −2: **(−2, −2), (−6, −2), (−2, −4)** B2 (B1 for two correct vertices)

## Common mistakes

- Giving two transformations when the question asks for a single one.
- Missing a detail: the centre of rotation/enlargement, the direction of rotation, or writing "reflection in the y-axis" when the line is y = 2.
- Writing a vector as coordinates (3, −2) instead of a column vector.
- Confusing x = 3 (vertical line) and y = 3 (horizontal line).
- Using the word "move" or "flip" or "turn" instead of translation, reflection, rotation.
- Rotating about the origin when a different centre is given.
- Negative scale factor drawn on the same side of the centre.
- Fractional scale factor described as a "reduction" — the correct word is enlargement.

## Practice questions

1. Translate the point (2, 5) by the vector (−3 over 4). [1]
2. Reflect the point (4, −1) in the line y = −x. [1]
3. Reflect the point (5, 2) in the line x = 3. [1]
4. Rotate the point (6, 1) through 180° about (2, 1). [2]
5. Shape S has vertices (1, 3), (3, 3), (3, 4). Shape T has vertices (4, 1), (6, 1), (6, 2). Describe fully the single transformation that maps S onto T. [2]
6. Triangle J has vertices (4, 2), (8, 2), (4, 6). Find the vertices of its image after an enlargement, scale factor −½, centre (0, 0). [2]
7. Triangle M has vertices (2, 3), (5, 3), (5, 4). Triangle N has vertices (2, −1), (5, −1), (5, −2). Describe fully the single transformation that maps M onto N. [2]
8. Describe fully the single transformation that maps triangle N in Q7 back onto triangle M. [2]

<details><summary>Answers</summary>

1. **(−1, 9)**
2. (x, y) → (−y, −x): **(1, −4)**
3. 5 is 2 units right of x = 3, so image is 2 units left: **(1, 2)**
4. Position relative to the centre: (6 − 2, 1 − 1) = (4, 0); rotate 180°: (−4, 0); add the centre back: **(−2, 1)**
5. Each point moves 3 right and 2 down: **translation by the vector (3 over −2)**
6. **(−2, −1), (−4, −1), (−2, −3)**
7. Points (2, 3) → (2, −1): midpoint y-value (3 + (−1)) ÷ 2 = 1: **reflection in the line y = 1** (check (5, 4) → (5, −2) ✓)
8. **Reflection in the line y = 1** (a reflection is its own inverse)

</details>

## Plan for this hour

- **10 min** – Read the notes; write the "describing" checklist on a flashcard.
- **15 min** – On squared paper, draw a triangle and apply one of each transformation (including scale factor −2 and ½); use tracing paper for rotations.
- **25 min** – Worked examples (covered) and practice questions.
- **10 min** – Mark; for every "describe" answer, check you have every detail. Error log.
