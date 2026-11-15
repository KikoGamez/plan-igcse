# Circuits and safety

> **In the exam:** In Co-ordinated Sciences 0654 (Extended) Physics questions appear alongside Biology and Chemistry. Paper 2 (Multiple Choice, 45 min, 40 questions across all three sciences): typically 1–3 items here (series/parallel rules, combined resistance, fuses, earthing). Paper 4 (Theory, 2 h, 120 marks): a common Physics question of 5–9 marks (combined resistance, branch currents, P = IV and E = IVt, cost in kW h, choosing a fuse, explaining earthing). Paper 6 (Alternative to Practical, 1 h 30 min, 60 marks): "electric circuits, including the connection and reconnection of these circuits, and the measurement of current and potential difference" is a named practical context.

## What you need to know

Syllabus sections P4.2.5, P4.3 and P4.4 (Core, then *Supplement* for Extended).

- Electric circuits transfer energy from a source of electrical energy (cell, mains) to the circuit components and then to the surroundings.
- Recall and use P = IV and E = IVt; define the kilowatt-hour (kW h) and calculate the cost of using electrical appliances.
- Draw and interpret circuit diagrams containing cells, batteries, power supplies, switches, resistors (fixed and variable), heaters, lamps, motors, ammeters, voltmeters and fuses, and know how these components behave. *Supplement:* also generators and light-emitting diodes (LEDs).
- Series: the current at every point is the same; calculate the combined resistance of two or more resistors in series.
- Construct and use series and parallel circuits; know the advantages of connecting lamps in parallel; in a parallel circuit the current from the source is larger than the current in each branch; the combined resistance of two resistors in parallel is less than either resistor by itself.
- *Supplement:* the sum of the currents entering a junction equals the sum of the currents leaving it; the total p.d. across components in series is the sum of the individual p.d.s; the p.d. across each parallel branch is the p.d. across the whole arrangement; calculate the combined resistance of two resistors in parallel.
- Describe the heating effect of current; state the hazards of damaged insulation, overheating cables, damp conditions, and excess current from overloading plugs, extension leads and sockets.
- Explain the use and operation of trip switches and fuses and choose appropriate fuse ratings and trip switch settings (RCDs not required).
- Explain why the outer casing of an electrical appliance must be either non-conducting (double-insulated) or earthed.

**Not in 0654** (they are in Physics 0625): potential dividers, thermistors, LDRs, relays, diodes other than LEDs, and P = I²R in circuit work (P = I²R appears only with transformers and power cables). Skip them.

## Notes

### Equations

| Equation | Symbols and units |
|---|---|
| P = IV | P power (W), I current (A), V p.d. (V) |
| E = IVt | E energy (J), t time (s) |
| energy (kW h) = power (kW) × time (h); cost = energy in kW h × price per kW h | 1 kW h = 3.6 × 10⁶ J |
| R = V ÷ I | (from the previous topic) |
| Series: R = R₁ + R₂ + … | R resistance (Ω) |
| Parallel (two resistors) *(Supplement)*: 1/R = 1/R₁ + 1/R₂, or R = R₁R₂ ÷ (R₁ + R₂) | Ω |
| Series: V = V₁ + V₂ + …; parallel: same p.d. across each branch *(Supplement)* | V |
| Junction: I = I₁ + I₂ *(Supplement)* | A |

### Series circuits

- One path. Same current through every component.
- The supply p.d. is shared between the components: V = V₁ + V₂ (Supplement). Bigger resistance → bigger share of the p.d.
- Total resistance = sum. Adding a resistor increases the total resistance and decreases the current.
- Lamps in series: if one breaks, all go out; they share the p.d. so they are dimmer.

### Parallel circuits

- Each branch is connected directly across the supply: each branch has the full supply p.d.
- Current from the supply = sum of the branch currents (Supplement: charge is conserved at a junction), so it is larger than the current in any one branch.
- Combined resistance is **less than the smallest** resistor. Adding another branch decreases the total resistance and increases the supply current.
- **Advantages of lamps in parallel (house lighting):** each lamp gets the full supply p.d. (full brightness); each can be switched on and off independently; if one fails, the others stay on.

### Solving a combined circuit (Supplement method)

1. Combine each parallel pair into one resistance.
2. Add series resistances → total R.
3. I_total = V_supply ÷ R_total.
4. Find the p.d. across each series section with V = IR.
5. Find branch currents with I = V ÷ R (branch p.d. ÷ branch resistance).

### Components

| Component | Behaviour |
|---|---|
| Cell / battery / power supply | source of e.m.f. (d.c.) |
| Generator *(S)* | source of e.m.f. (a.c. or d.c.) |
| Switch | opens or closes the circuit |
| Fixed resistor | constant resistance |
| Variable resistor | resistance can be changed → controls the current (e.g. dimmer) |
| Lamp | lights when current flows |
| Heater | transfers electrical energy to internal (thermal) energy |
| Motor | transfers electrical energy to kinetic energy |
| Ammeter / voltmeter | measures current (in series) / p.d. (in parallel) |
| Fuse | thin wire that melts if the current exceeds its rating |
| LED *(S)* | lets current flow in one direction only and emits light when it does |

### Electrical safety

- **Heating effect:** a current in a resistance transfers energy to internal (thermal) energy — useful in heaters, kettles and fuses; dangerous in overloaded cables.
- **Hazards:** damaged insulation (touching a bare wire → electric shock; wires touching → short circuit, fire); overheating cables (too large a current or too thin a cable → fire); damp conditions (water conducts → shock); overloading plugs, extension leads and multiple sockets (total current too large → cables overheat → fire).
- **Fuse:** a thin wire that heats up and melts if the current exceeds its rating, breaking the circuit and stopping the current. Choose the rating **just above** the normal working current (common ratings 3 A, 5 A, 13 A).
- **Trip switch (circuit breaker):** automatically opens a switch when the current exceeds a set value; it can be reset and acts faster than a fuse. Choose its setting just above the normal current.
- **Earthing:** the metal casing is connected by the earth wire to the ground. If a fault makes the casing live, a large current flows through the low-resistance earth wire; this melts the fuse (or trips the switch), disconnecting the supply, so the user does not get a shock.
- **Double insulation:** the outer casing is non-conducting (plastic), so it cannot become live; no earth wire is needed.

### Paper 6 skills for this topic

- Draw complete circuit diagrams with standard symbols and a ruler; meters correctly placed.
- Check meter zero, use suitable ranges, record I and V to the precision of the meter (e.g. 0.02 A, 0.1 V).
- Typical tasks: compare lamps in series and in parallel; check that "the sum of the branch currents equals the supply current within the limits of experimental accuracy"; investigate how combined resistance changes when resistors are added.
- Switch off between readings so components do not heat up.

## Key terms and definitions

| Term | Definition |
|---|---|
| Kilowatt-hour | Energy transferred by a 1 kW appliance in 1 hour (3.6 × 10⁶ J) |
| Fuse | Thin wire that melts and breaks the circuit when the current exceeds its rating |
| Trip switch (circuit breaker) | Automatic switch that opens when the current exceeds a set value; can be reset |
| Earthing | Connecting the metal casing to the ground through the earth wire, giving a low-resistance path for a fault current |
| Double insulated | Appliance with a non-conducting outer casing, so no earth wire is needed |

## Worked examples

**1.** A 6.0 Ω and a 3.0 Ω resistor are in parallel; this combination is in series with a 4.0 Ω resistor and a 12 V battery. Calculate (a) the total resistance, [2] (b) the current from the battery, [1] (c) the current in the 3.0 Ω resistor. [2]

- (a) parallel: 1/R = 1/6.0 + 1/3.0 = 1/2.0 → 2.0 Ω (C1); total = 2.0 + 4.0 = **6.0 Ω** (A1)
- (b) I = 12 ÷ 6.0 = **2.0 A** (B1)
- (c) p.d. across parallel part = 2.0 × 2.0 = 4.0 V (C1); I = 4.0 ÷ 3.0 = **1.3 A** (A1)

**2.** Two lamps of resistance 6.0 Ω and 12 Ω are connected in parallel to a 6.0 V supply. Calculate (a) the current in each lamp, [2] (b) the current from the supply, [1] (c) the combined resistance. [2]

- (a) 6.0 ÷ 6.0 = **1.0 A** (B1); 6.0 ÷ 12 = **0.50 A** (B1)
- (b) 1.0 + 0.50 = **1.5 A** (B1)
- (c) R = 6.0 ÷ 1.5 (or 6.0 × 12 ÷ 18) (C1) = **4.0 Ω** (A1)

**3.** A kettle is rated 2.3 kW, 230 V. Fuses of 3 A, 5 A and 13 A are available. Calculate the working current and choose the fuse. [3]

- I = P ÷ V = 2300 ÷ 230 (C1) = 10 A (A1)
- **13 A** — the smallest rating above the working current (B1)

**4.** A 2.5 kW heater is used for 3.0 hours a day for 30 days. Electricity costs €0.20 per kW h. Calculate the cost. [2]

- energy = 2.5 × 3.0 × 30 = 225 kW h (C1)
- cost = 225 × 0.20 = **€45** (A1)

## Common mistakes

- Adding parallel resistors as if in series, or forgetting to take the reciprocal at the end of 1/R = 1/R₁ + 1/R₂.
- Saying "current is used up" by components — the current is the same all round a series circuit.
- Using the supply p.d. across a component that is in series with others.
- Choosing a fuse below the working current, or far too high (e.g. 13 A for a 1 A lamp).
- Saying the earth wire "stops" the current — it carries a large current that melts the fuse.
- Writing "the fuse protects the person" — it protects the appliance and the cable; earthing + fuse together protect the user.
- kW h: using seconds or watts instead of hours and kilowatts.

## Practice questions

1. Calculate the combined resistance of 10 Ω, 20 Ω and 30 Ω in series. [1]
2. Calculate the combined resistance of 12 Ω and 6.0 Ω in parallel. [2]
3. A 12 V, 24 W lamp works normally. Calculate (a) the current, (b) its resistance, (c) the energy transferred in 10 minutes. [5]
4. Currents of 0.30 A and 0.45 A leave a junction in two branches. What current enters the junction? [1]
5. State two advantages of connecting the lamps in a house in parallel rather than in series. [2]
6. State the hazard of (a) damaged insulation, (b) plugging too many appliances into one extension lead. [2]
7. A toaster has a metal case. Explain how the earth wire and fuse protect the user if the live wire touches the case. [3]

<details><summary>Answers</summary>

1. **60 Ω**
2. 1/R = 1/12 + 1/6.0 = 3/12 → **4.0 Ω**.
3. (a) I = 24 ÷ 12 = **2.0 A** (b) R = 12 ÷ 2.0 = **6.0 Ω** (c) E = IVt = 2.0 × 12 × 600 = **14 400 J**.
4. **0.75 A**
5. Each lamp gets the full supply p.d. / full brightness; lamps can be switched independently; if one lamp fails the others stay lit (any two).
6. (a) Bare wire can be touched → electric shock (or short circuit → fire). (b) Total current too large → cable/plug overheats → fire.
7. A large current flows from the live wire through the case and the low-resistance earth wire to ground; this current melts the fuse; the supply is disconnected, so the case is no longer live.

</details>

## Plan for this hour

10 min read Notes · 10 min write the series/parallel rules and the 5-step method on a card · 30 min worked examples + practice (do every calculation fully) · 10 min mark, log errors.
