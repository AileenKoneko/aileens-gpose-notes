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

> _Use cases coming soon._

## What I use

I run **iMMERSE ReGrade** for this. It's a slot-based grading pipeline — nine slots, you pick which operation each one runs and what order they fire in, and each slot feeds the next.

> _Personal notes coming soon._

::: details Settings — iMMERSE ReGrade

### Levels — Black Level In / White Level In / Black Level Out / White Level Out
The classic Photoshop Levels controls. Pull the In sliders toward the middle for crunchier, more punchy contrast. Push Black Level Out up to lift shadows toward a milky, matte, faded-film feel; pull White Level Out down to cap highlights short of pure white for a softer, slightly washed look.

### Contrast / Exposure / Gamma / Filmic Gamma
Global tone controls. Exposure brightens or darkens the whole image in stops, like a real camera dial. Contrast snaps the range tighter or wider. Gamma lifts or crushes the midtones. Filmic Gamma applies a shadow-weighted curve that gives the image a softer film feel rather than a hard digital one.

### Saturation / Vibrance
Saturation pushes every colour at once — gentle in small doses, neon-poster at the top. Vibrance focuses the boost on duller colours and leaves already-vivid ones alone, which keeps skin and saturated cloth from blowing out.

### Lift Gamma Gain
Three colour wheels for tinting shadows, midtones, and highlights independently. Cool the shadows and warm the highlights for a familiar teal-and-orange look; reverse it for something stranger and moodier.

### Color Temperature
The Kelvin white-balance dial. Low Kelvin values throw warm orange light through the whole scene — golden hour, lamplight, indoor warmth. High Kelvin shifts everything cool and blue — overcast, moonlight, clinical.

### Lab A / Lab B Offset
Two perpendicular colour-cast dials. Lab A nudges the image toward green or magenta; Lab B toward blue or orange. Useful for subtle casts that don't sit on the warm/cool axis.

### R / G / B Primary Mode + Hue + Saturation
Lets you re-define what "red," "green," and "blue" mean to the rest of the grading chain. Shifting the red primary cool drags the whole reddish range of the image cool with it. Powerful and very easy to push into stylised, off-kilter territory.

### Color Remapping
Per-hue surgery: pick a band (reds, oranges, yellows, greens, aqua, blues, magenta) and shift its hue, saturation, or brightness independently. Mute a too-loud sky, push grass toward yellow-green, swing magenta cloth toward red — without touching anything else.

### Tone Curve
A four-zone curve over shadows, darks, lights, and highlights. Lift the shadows and darks for a faded matte look; pull them down and push highlights up for harder cinematic contrast. Dark Wash Range and Intensity push the matte further — that lifted, slightly hazy shadow you see in moody film stills.

### Split Toning
Tints two parts of the image different colours — typically warm highlights and cool shadows, or vice versa. Soft Light blend keeps it gentle; Overlay pushes it harder and more graphic.

### Color Balance
Three-zone hue and saturation shifts on shadows, midtones, and highlights separately. Quieter than Lift Gamma Gain but the same idea — tint each tonal range on its own.

### Bleach Bypass
Mimics the film-lab trick of skipping the bleach step: desaturated, harsh, high-contrast, slightly silver. Low values nudge that direction; high values fully commit to the war-film, gritty-thriller look.

### Gamma on Luma / Chroma
Independent gamma lift on brightness vs colour. Useful when you want to lift shadows without also flattening colour intensity, or vice versa.

### Vignette
Darkens the edges of the frame to draw the eye inward. Mechanical Vignette gives you a hard radial shape — adjustable size, softness, and stretch. Sensor Vignette is the subtler camera-sensor-style falloff. HDR Simulation modes preserve highlights inside the darkened ring rather than crushing them.

:::

::: details Technical controls — iMMERSE ReGrade

### Order of Color Operations
Nine slots processed top-to-bottom. Order matters — saturating before white-balancing lands differently than the reverse. Each slot can be set to any operation, bypassed, or left empty.

### Dithering
Adds a tiny amount of noise to break up visible banding in smooth gradients (skies are the worst offender). 8-bit is the workhorse — kills banding without showing as grain.

### Display Colormap
Debug overlay showing the current colour distribution of the image.

### ENABLE_SOLARIS_REGRADE_PARITY
Preprocessor toggle. Hands HDR-space output from Solaris to ReGrade so bloom and grading don't fight each other.

:::

## Alternatives

- **qUINT LUT / LUT.fx** — apply a baked colour lookup table. Fast, predictable, and the format every grading tutorial uses. Good for matching a specific film stock or preset look.
- **AdaptiveTint / Cinematic Tone** — older single-purpose grading shaders that bundle a handful of operations into one pass. Cheaper but less flexible.
- **Curves.fx** — minimal RGB/luma curve adjustment. Useful when you want one specific curve and nothing else.
