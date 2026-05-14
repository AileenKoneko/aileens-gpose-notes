# Color Grading

Color grading is the layer where the final look comes together. Exposure, contrast, white balance, the temperature of the shadows, the saturation of a single hue — every distinct *look* you see in a gpose preset is some combination of these. It sits near the end of the pipeline and shapes the final mood.

::: compare
before: images/color-grading/color-grading-off.svg
after: images/color-grading/color-grading-on.svg
label-before: Grading off
label-after: Grading on
:::

## What it does

Grading is a chain of small adjustments applied to the final image. The big categories: exposure (overall brightness), contrast curves (how shadows, midtones, and highlights respond differently), white balance (warmer vs cooler), saturation, and per-hue tweaks — push the reds, mute the greens, that sort of thing.

What makes grading powerful is *order*. Boosting saturation before adjusting white balance lands differently than the reverse — the first paints everything in the current cast, the second neutralises the cast first and then saturates. A "cinematic" or "vintage" or "vivid" look is usually built from several small operations in sequence, not from one big dial.

Modern grading shaders expose that whole sequence so each step is something you can shape on its own.

## How to use it in gposes

> _TODO: your use cases — what FFXIV gpose scenarios benefit from this effect, what looks it helps you achieve._

## What I use

I run **iMMERSE ReGrade** for this. It's a slot-based grading pipeline — nine slots, you pick which operation each one runs and what order they fire in, and each slot feeds the next.

> _TODO: your personal notes — typical values you reach for, what you pair it with, any quirks you've noticed._

::: details Settings — iMMERSE ReGrade

### Order of Color Operations
Nine slots, processed top-to-bottom. Each slot can be assigned any of the available operations (or left as None), each has a Bypass toggle, and the same operation can be assigned to multiple slots — they share parameters across slots.

### Levels — Black Level In / White Level In / Black Level Out / White Level Out
Input/output range remapping, 0–255. Raising Black Level In or lowering White Level In adds contrast by clipping. Raising Black Level Out lifts blacks toward a faded look; lowering White Level Out caps highlights below pure white.

### Contrast / Exposure / Gamma / Filmic Gamma
Global tone controls. Exposure runs −4.0 to 4.0 stops. Filmic Gamma applies a film-style curve weighted toward the shadows.

### Saturation / Vibrance
Saturation is a flat boost across all colours. Vibrance preferentially boosts the less-saturated ones, which keeps already-vivid colours from going neon.

### Lift Gamma Gain
Shadow / midtone / highlight colour wheels. Mode selectable between ASC CDL and DaVinci Resolve formulas. Lift defaults to 0.5, 0.5, 0.5 (neutral).

### Color Temperature
1700K–40000K, default 6500K. Warm/cool white-balance shift.

### Lab A / Lab B Offset
Green/magenta and blue/orange axis offsets. Range −1.0 to 1.0 each.

### R / G / B Primary Mode + Hue + Saturation
Per-channel primary adjustment. Modes: ReGrade Legacy, Barycentric, Hue Based. Hue and Saturation per channel range −1.0 to 1.0.

### Color Remapping
Seven hue bands (Red, Orange, Yellow, Green, Aqua, Blue, Magenta), each with independent hue / saturation / value offsets. All default to 0.0.

### Tone Curve
Shadows / Darks / Lights / Highlights — four-zone tone-curve adjustments, range −1.0 to 1.0 each. Plus Dark Wash Range and Dark Wash Intensity for matte/faded shadow effects.

### Split Toning
Two-colour split-toning. Split Mode chooses Shadows/Highlights or Greys/Saturated Colors. Tint A and Tint B are colour pickers. Balance −1.0 to 1.0 biases between them. Blend Mode is Soft Light (gentle) or Overlay (stronger).

### Color Balance
Hue and Saturation shifts independently for Shadows / Midtones / Highlights.

### Bleach Bypass
0.0–1.0. Simulates skipping the bleach stage in film development — desaturated, high contrast look.

### Gamma on Luma / Chroma
Independent gamma adjustment on luminance vs chrominance, −1.0 to 1.0 each.

### Vignette
Toggle, off by default. Mechanical Vignette has Radius, Blurryness, Shape (circular at 0, horizontal stretch positive, vertical stretch negative). Sensor Vignette has Scale. Blending modes: Standard, HDR Simulation, HDR Simulation (Protect Tones).

### Dithering
Off / 6 / 8 / 10 / 12 bit. 8 bit is the recommended default — kills banding without adding visible noise.

### Display Colormap
On-screen reference visualisation of the current colour distribution.

### ENABLE_SOLARIS_REGRADE_PARITY
Switch that lets ReGrade receive HDR-space output from Solaris, so bloom and grading don't fight each other.

:::

## Alternatives

- **qUINT LUT / LUT.fx** — apply a baked colour lookup table. Fast, predictable, and the format every grading tutorial uses. Good for matching a specific film stock or preset look.
- **AdaptiveTint / Cinematic Tone** — older single-purpose grading shaders that bundle a handful of operations into one pass. Cheaper but less flexible.
- **Curves.fx** — minimal RGB/luma curve adjustment. Useful when you want one specific curve and nothing else.
