# Circuits and safety

> **In the exam:** Paper 2: 4–6 items (series/parallel rules, combined resistance, potential dividers, fuses, earthing). Paper 4: almost every paper has a circuits question of 7–10 marks: combined resistance, currents in branches, potential divider with a thermistor or LDR, power and cost in kW h, choosing a fuse. Paper 6: building series/parallel circuits, measuring current and p.d., drawing circuit diagrams.

## What you need to know

- Electric circuits transfer energy from a source to components and then to the surroundings. P = IV; E = IVt; the kilowatt-hour and cost of electricity.
- Draw and interpret circuit diagrams with cells, batteries, power supplies, generators, potential dividers, switches, fixed and variable resistors, heaters, thermistors (NTC), LDRs, lamps, motors, bells, ammeters, voltmeters, magnetising coils, transformers, fuses and relays. *Extended:* diodes and LEDs.
- Series: same current everywhere; combined e.m.f. of sources in series; combined resistance of resistors in series. Parallel: current from source is larger than in each branch; combined resistance of two resistors in parallel is less than either. Advantages of lamps in parallel.
- *Extended:* currents into a junction = currents out (conservation of charge); p.d.s in series add; p.d. across parallel branches is the same; calculate two resistors in parallel.
- P.d. across a conductor increases with its resistance for a constant current. *Extended:* action of a variable potential divider; R₁/R₂ = V₁/V₂.
- Hazards: damaged insulation, overheating cables, damp conditions, overloading plugs, extension leads and sockets. Live, neutral and earth wires; switch in the live wire; fuses and trip switches (choose ratings); double insulation or earthing; a fuse without an earth wire protects the circuit and cabling of a double-insulated appliance.

## Notes

### Equations

| Equation | Symbols and units |
|---|---|
| Series: R = R₁ + R₂ + ... | R resistance (Ω) |
| Parallel (two resistors): 1/R = 1/R₁ + 1/R₂ *(Extended)* — also R = R₁R₂ ÷ (R₁ + R₂) | Ω |
| Series: V = V₁ + V₂ + ... ; parallel: same p.d. across each branch *(Extended)* | V |
| Junction: I = I₁ + I₂ *(Extended)* | A |
| R₁ ÷ R₂ = V₁ ÷ V₂ (potential divider) *(Extended)* | V₁ p.d. across R₁, V₂ p.d. across R₂ |
| P = IV | P power (W), I current (A), V p.d. (V) |
| E = IVt | E energy (J), t time (s) |
| R = V ÷ I | (from the previous topic) |
| Energy in kW h = power (kW) × time (h); cost = kW h × price per kW h | 1 kW h = 3.6 × 10⁶ J |
| P = I²R (from P = IV and V = IR; the syllabus requires it for cable losses) | W |

### Series circuits

- One path. Same current through every component.
- Supply p.d. shared between components: V = V₁ + V₂. Bigger resistor → bigger share of p.d.
- Total resistance = sum. Adding a resistor increases R, decreases current.
- Cells in series (same way round): e.m.f.s add. One reversed cell subtracts.
- Disadvantage for lamps: one lamp breaks → all go out; lamps share the p.d. so are dimmer.

### Parallel circuits

- Each branch connected directly across the supply: each branch has the full supply p.d.
- Current from the supply = sum of branch currents (charge is conserved at a junction).
- Combined resistance is **less than the smallest** resistor. Adding another branch decreases total R and increases supply current.
- Advantages for house lighting: each lamp has full mains p.d. (full brightness); lamps can be switched independently; if one fails the others stay on.

### Solving a combined circuit (method)

1. Combine parallel pairs into one resistance.
2. Add series resistances → total R.
3. I_total = V_supply ÷ R_total.
4. Find p.d. across each series section with V = IR.
5. Find branch currents with I = V ÷ R (branch p.d. ÷ branch resistance).

### Potential dividers (Extended for the equation)

- Two resistors in series across a supply share the p.d. in the ratio of their resistances: V₁/V₂ = R₁/R₂.
- Variable potential divider (potentiometer / variable resistor): sliding contact gives an output p.d. from 0 to the full supply.
- **Thermistor (NTC):** resistance decreases as temperature increases. **LDR:** resistance decreases as light intensity increases.
- Sensor circuits: e.g. thermistor in series with a fixed resistor. As temperature rises → thermistor R falls → p.d. across thermistor falls → p.d. across fixed resistor rises. Used to switch on a fan, a heater or a light (often via a relay).

### Components

| Component | Behaviour |
|---|---|
| Variable resistor | changes resistance → controls current (dimmer) |
| Thermistor (NTC) | R decreases as temperature increases |
| LDR | R decreases as light intensity increases |
| Diode *(Ext)* | current in one direction only |
| LED *(Ext)* | diode that emits light when current flows forwards |
| Fuse | thin wire melts if current exceeds rating, breaking the circuit |
| Relay | electromagnetic switch: small current in a coil switches a separate circuit |

### Electrical safety

- **Hazards:** damaged insulation (touching bare live wire → electric shock, or short circuit → fire); overheating cables (too much current/too thin cable → fire); damp conditions (water conducts → shock); overloading sockets/extension leads (too large a current → overheating → fire).
- **Mains wires:** live (line) — at high alternating p.d. (about 230 V in Spain/UK); neutral — near 0 V, completes the circuit; earth — safety wire connected to the metal casing and to the ground.
- **Switches and fuses must be in the live wire** so that when off/blown, the appliance is disconnected from the high p.d. (a switch in neutral leaves the appliance live).
- **Fuse:** a thin wire that melts if the current exceeds its rating, breaking the circuit. Choose the rating **just above** the normal working current (common ratings 3 A, 5 A, 13 A).
- **Trip switch / circuit breaker:** automatically opens a switch when the current is too large; can be reset; acts faster than a fuse. Choose its setting just above the normal current.
- **Earthing:** if a fault makes the metal casing live, a large current flows through the low-resistance earth wire to ground; this blows the fuse (or trips the breaker), disconnecting the appliance; the user does not get a shock.
- **Double insulation:** casing is plastic (non-conducting), so it cannot become live; no earth wire needed (symbol: square inside a square). The fuse still protects the circuit and the cable.

### Paper 6 skills for this topic

- Draw complete circuit diagrams with standard symbols and a ruler; meters correctly placed.
- Check meter zero, use suitable ranges, record I and V to the precision of the meter (e.g. 0.05 A, 0.1 V).
- Typical tasks: compare lamps in series and parallel; check "the sum of the currents in the branches equals the supply current within the limits of experimental accuracy"; investigate how combined resistance changes.
- Switch off between readings so components don't heat up.

## Key terms and definitions

| Term | Definition |
|---|---|
| Kilowatt-hour | Energy transferred by a 1 kW appliance in 1 hour (3.6 × 10⁶ J) |
| Potential divider | Two (or more) resistors in series that divide the supply p.d. in the ratio of their resistances |
| Fuse | Thin wire that melts and breaks the circuit when the current exceeds its rating |
| Trip switch (circuit breaker) | Automatic switch that opens when the current exceeds a set value; can be reset |
| Earth wire | Safety wire connecting the metal casing to the ground, providing a low-resistance path for fault current |
| Double insulated | Appliance with a non-conducting outer casing, so no earth wire is needed |

## Worked examples

**1.** A 6.0 Ω and a 3.0 Ω resistor are in parallel; this combination is in series with a 4.0 Ω resistor and a 12 V battery. Calculate (a) the total resistance, [2] (b) the current from the battery, [1] (c) the current in the 3.0 Ω resistor. [2]

- (a) parallel: 1/R = 1/6.0 + 1/3.0 = 1/2.0 → 2.0 Ω (C1); total = 2.0 + 4.0 = **6.0 Ω** (A1)
- (b) I = 12 ÷ 6.0 = **2.0 A** (B1)
- (c) p.d. across parallel part = 2.0 × 2.0 = 4.0 V (C1); I = 4.0 ÷ 3.0 = **1.3 A** (A1)

**2.** A 9.0 V supply is connected across a 2.0 kΩ fixed resistor in series with a thermistor of resistance 4.0 kΩ. (a) Calculate the p.d. across the thermistor. [2] (b) State and explain what happens to this p.d. when the thermistor warms up. [2]

- (a) ratio 4.0 : 2.0, so thermistor gets 4/6 of 9.0 V (C1) = **6.0 V** (A1)
- (b) p.d. decreases (B1); thermistor resistance decreases so it gets a smaller share of the supply p.d. (B1)

**3.** A kettle is rated 2.3 kW, 230 V. Fuses of 3 A, 5 A and 13 A are available. Calculate the working current and choose the fuse. [3]

- I = P ÷ V = 2300 ÷ 230 (C1) = 10 A (A1)
- **13 A** — the smallest rating above the working current (B1)

**4.** A 2.5 kW heater is used for 3.0 hours a day for 30 days. Electricity costs $0.20 per kW h. Calculate the cost. [2]

- energy = 2.5 × 3.0 × 30 = 225 kW h (C1)
- cost = 225 × 0.20 = **$45** (A1)

## Common mistakes

- Adding parallel resistors as if in series, or forgetting to take the reciprocal at the end of 1/R = 1/R₁ + 1/R₂.
- Saying "current is used up" by components — current is the same all round a series circuit.
- Using the supply p.d. across a component that is in series with others.
- Choosing a fuse below the working current, or far too high (e.g. 13 A for a 1 A lamp).
- Saying the earth wire "stops" the current — it carries a large current that melts the fuse.
- Writing "the fuse protects the person" — it protects the appliance and cable; earthing + fuse together protect the user.
- kW h: using seconds or watts instead of hours and kilowatts.

## Practice questions

1. Calculate the combined resistance of 10 Ω, 20 Ω and 30 Ω in series. [1]
2. Calculate the combined resistance of 12 Ω and 6.0 Ω in parallel. [2]
3. A 12 V, 24 W lamp works normally. Calculate (a) the current, (b) its resistance, (c) the energy transferred in 10 minutes. [5]
4. Currents of 0.30 A and 0.45 A leave a junction in two branches. What current enters the junction? [1]
5. An LDR and a fixed resistor form a potential divider. Explain how the p.d. across the fixed resistor changes when it gets darker. [3]
6. Explain why the switch in a mains appliance must be in the live wire. [2]
7. A toaster has a metal case. Explain how the earth wire and fuse protect the user if the live wire touches the case. [3]

<details><summary>Answers</summary>

1. **60 Ω**
2. 1/R = 1/12 + 1/6.0 = 3/12 → **4.0 Ω**.
3. (a) I = 24 ÷ 12 = **2.0 A** (b) R = 12 ÷ 2.0 = **6.0 Ω** (c) E = IVt = 2.0 × 12 × 600 = **14 400 J**.
4. **0.75 A**
5. Darker → LDR resistance increases → LDR takes a larger share of the p.d. → p.d. across fixed resistor **decreases**.
6. When the switch is off, the appliance is disconnected from the live (high p.d.) wire, so it is safe to touch / no shock.
7. Large current flows from live through the case and earth wire to ground (low resistance); this current melts the fuse; the appliance is disconnected so the case is no longer live.

</details>

## Plan for this hour

10 min read Notes · 10 min write the series/parallel rules and the 5-step method on a card · 30 min worked examples + practice (do every calculation fully) · 10 min mark, log errors.
