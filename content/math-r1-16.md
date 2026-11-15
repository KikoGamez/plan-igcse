# Trigonometry: sine rule, cosine rule, area and 3D

> **In the exam:** Mainly Paper 4 (calculator), almost every series: a 10–15 mark question on a non-right-angled triangle or a quadrilateral split into triangles, often with bearings; area using ½ab sin C (2–3 marks); 3D problems in cuboids, prisms or pyramids (3–5 marks). Paper 2 can include sin/cos of obtuse angles or a simple ½ab sin C with exact values given.

## What you need to know

- Extended: use the sine rule and the cosine rule in any triangle, to find sides and angles, including problems involving bearings.
- Extended: use the formula area of triangle = ½ab sin C.
- Extended: carry out calculations and solve problems in three dimensions using Pythagoras' theorem and trigonometry, including calculating the angle between a line and a plane.
- Extended: know that sin x = sin(180° − x), so an angle found from its sine may be acute or obtuse; know that cosine is negative for obtuse angles.

## Notes

Label the triangle with angles A, B, C and the side opposite each angle with the matching small letter a, b, c.

### Sine rule

a ÷ sin A = b ÷ sin B = c ÷ sin C  (for sides)
sin A ÷ a = sin B ÷ b = sin C ÷ c  (for angles — put the unknown on top)

**Use when** you know a side and the angle opposite it (an "opposite pair"), plus one more side or angle.

- If you know two angles, find the third first: 180° minus the other two.
- **Ambiguous case:** when finding an angle with the sine rule, sin⁻¹ gives the acute angle θ, but 180° − θ has the same sine. If the question says the angle is obtuse, or the diagram shows it, use 180° − θ. Check that the angles still add up to less than 180°.

### Cosine rule

a² = b² + c² − 2bc cos A  (to find a side)
cos A = (b² + c² − a²) ÷ 2bc  (to find an angle)

**Use when** you know two sides and the included angle (SAS) to find the third side, or all three sides (SSS) to find an angle.

- If cos A is negative, A is obtuse — this is correct, not an error.
- The largest angle is opposite the longest side; the smallest angle is opposite the shortest side.
- Calculator tip: type the whole expression in one go, e.g. √(7² + 10² − 2 × 7 × 10 × cos 115).

### Which rule?

| You know | You want | Use |
|---|---|---|
| 2 angles + any side | a side | sine rule |
| 2 sides + a non-included angle | an angle | sine rule (check ambiguous case) |
| 2 sides + included angle | third side | cosine rule |
| 3 sides | an angle | cosine rule |
| 2 sides + included angle | area | ½ab sin C |

### Area of a triangle

Area = ½ab sin C, where C is the angle **between** sides a and b.
- Rearranged to find an angle: sin C = 2 × area ÷ (ab). Again C could be acute or obtuse.
- Area of a parallelogram with sides a, b and angle C = ab sin C.

### Problems in 3D

1. Identify a right-angled triangle that contains the length or angle you want.
2. Draw it separately, flat, with the right angle marked.
3. Often you need a diagonal first: in a cuboid l × w × h, the base diagonal is √(l² + w²) and the space diagonal is √(l² + w² + h²).
4. **Angle between a line and a plane:** drop a perpendicular from the top of the line to the plane; the angle is between the line and its projection (the line joining its foot to the point where the line meets the plane).

Square-based pyramid with apex vertically above the centre of the base: the distance from a corner to the centre is half the diagonal of the base.

## Worked examples

**1.** In triangle ABC, angle A = 48°, angle B = 62° and BC = 9 cm. Find AC. [3]

BC = a is opposite A; AC = b is opposite B.
b ÷ sin 62° = 9 ÷ sin 48° M1 → b = 9 sin 62° ÷ sin 48° M1 = **10.7 cm** A1

**2.** A triangle has sides 5 cm, 7 cm and 9 cm. Find its largest angle. [3]

Largest angle is opposite 9 cm. cos C = (5² + 7² − 9²) ÷ (2 × 5 × 7) M1 = −7 ÷ 70 = −0.1 M1 → C = **95.7°** A1

**3.** In triangle PQR, PQ = 7 cm, PR = 10 cm and angle QPR = 115°. Find (a) QR [3], (b) the area of the triangle [2].

(a) QR² = 7² + 10² − 2 × 7 × 10 × cos 115° M1 M1 = 208.2… → QR = **14.4 cm** A1
(b) ½ × 7 × 10 × sin 115° M1 = **31.7 cm²** A1

**4.** A cuboid measures 8 cm by 6 cm by 5 cm. Find (a) the length of a space diagonal [2], (b) the angle this diagonal makes with the base [2].

(a) √(8² + 6² + 5²) M1 = √125 = **11.2 cm** A1
(b) Base diagonal = √(64 + 36) = 10; tan θ = 5 ÷ 10 M1 → θ = **26.6°** A1

## Common mistakes

- Using the cosine rule with the wrong angle: the angle must be between the two known sides (and opposite the side you want).
- Calculator order: 49 + 100 − 140 cos 115 must be worked out as one expression; working out (49 + 100 − 140) first gives nonsense.
- Missing the obtuse answer from the sine rule when the diagram shows an obtuse angle.
- Using ½ab sin C with an angle that is not between sides a and b.
- In 3D, using the wrong right angle — always draw the triangle flat and check where the 90° is.
- Bearings questions: not finding the interior angle of the triangle from the bearings first (use parallel north lines).
- Premature rounding: keep 4+ significant figures in working.

## Practice questions

1. In triangle ABC, a = 8 cm, b = 11 cm and angle A = 35°. Angle B is obtuse. Find angle B. [3]
2. In triangle ABC, b = 6 cm, c = 9 cm and angle A = 72°. Find a. [3]
3. Find the area of a triangle with sides 12 cm and 15 cm and an included angle of 130°. [2]
4. A triangle has sides 10 cm and 12 cm and area 40 cm². The angle between these sides is acute. Find it. [3]
5. A boat sails from A to B, 8 km on a bearing of 050°, then from B to C, 5 km on a bearing of 120°.
 (a) Show that angle ABC = 110°. [2] (b) Find AC. [3]
6. A square-based pyramid has base 6 cm by 6 cm. The apex is 10 cm vertically above the centre of the base. Find the angle between a slant edge and the base. [4]
7. A triangle has sides 7 cm, 8 cm and 10 cm. Find its smallest angle. [3]

<details><summary>Answers</summary>

1. sin B = 11 sin 35° ÷ 8 = 0.7887 → 52.06°; obtuse so B = 180 − 52.06 = **127.9°** (check 35 + 127.9 < 180 ✓)
2. a² = 36 + 81 − 108 cos 72° = 83.6… → **a = 9.14 cm**
3. ½ × 12 × 15 × sin 130° = **68.9 cm²**
4. sin C = 2 × 40 ÷ (10 × 12) = 2/3 → **C = 41.8°**
5. (a) Bearing of A from B = 050 + 180 = 230°; 230 − 120 = 110° (b) AC² = 64 + 25 − 80 cos 110° = 116.36… → **AC = 10.8 km**
6. Half-diagonal = ½√(36 + 36) = 4.243; tan θ = 10 ÷ 4.243 → **θ = 67.0°**
7. Opposite 7 cm: cos θ = (8² + 10² − 7²) ÷ (2 × 8 × 10) = 115/160 → **θ = 44.0°**

</details>

## Plan for this hour

- **10 min** – Read the notes; make a flashcard with the "Which rule?" table.
- **15 min** – Redo the worked examples with answers covered.
- **30 min** – Practice questions; for each one write which rule you will use *before* calculating.
- **5 min** – Error log.
