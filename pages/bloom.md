# Bloom

Bloom adds a soft halo of light around the brightest parts of an image. In gposes it sells the *feeling* of a scene — a hot summer afternoon, neon at night, the bounce of magic from a spell — more than any single other effect. It sits at the very end of the pipeline, after everything else is in place, and it's where most of the "wow" lives.

::: compare
before: images/bloom/bloom-off.svg
after: images/bloom/bloom-on.svg
label-before: Bloom off
label-after: Bloom on
:::

## What it simulates

Bloom is what real lenses and real eyes do when light is too bright to capture cleanly. Photons scatter off lens elements, off the moisture in your eye, off particles in the air, and the result is a soft glow that spills outward from each highlight. It is one of the cheapest ways to make a render feel *photographic* instead of digital.

A few things to keep in mind:

- **Bloom is not glow.** Glow is an art-direction call (anime light streaks). Bloom is a physics simulation of light bleeding past a hard edge.
- **It always starts at a threshold.** Below some brightness, nothing blooms. Above it, the brighter a pixel is, the more it spills.
- **It is shaped like the lens.** Long, anamorphic horizontal flares come from cinema lenses. Round, diffuse halos come from eyes and most camera lenses. ReShade bloom usually does the round kind unless you stack anamorphic on top.

The common pitfall is letting bloom carry the exposure. If a scene looks dull, fix exposure first and let bloom add the finish — otherwise you get a hazy milk-glass image instead of luminous highlights.

## How to use it in gposes

> _TODO: your use cases — what FFXIV gpose scenarios benefit from this effect, what looks it helps you achieve._

## What I use

I run **iMMERSE Solaris** for this. It reverse-tonemaps the scene back into HDR before computing bloom, so the bloom term behaves like real light and scales with scene exposure rather than being a fixed post-process haze on top of an already-tonemapped image.

> _TODO: your personal notes — typical values you reach for, what you pair it with, any quirks you've noticed._

::: details Settings — iMMERSE Solaris

### Log Exposure Bias
Stops of exposure adjustment applied before the bloom calculation. Range −5.0 to 5.0, default 0.0.

### Log HDR Whitepoint
Brightness above which the reverse-tonemap treats pixels as HDR highlights. Range 0.0–12.0, default 7.0. The effective bloom threshold.

### Bloom Intensity
How much bloom is mixed back into the image. Range 0.0–1.0, default 0.3.

### Bloom Radius
Spread of the bloom — how far halos extend from their sources. Range 0.0–1.0, default 1.0.

### Bloom Haziness
Blends the bloom toward neutral white at high values, keeps it color-correct at low. Range 0.0–1.0, default 0.9.

### High Resolution Input
Toggle. Computes bloom from the full-resolution image instead of a reduced one — sharper, more expensive.

### Mask by Depth
Toggle. Reduces bloom on distant geometry so distant highlights don't dominate.

### Depth Mask Strength
Strength of the depth-based bloom falloff. Range 0.0–1.0, default 0.5.

### ENABLE_SOLARIS_REGRADE_PARITY
Preprocessor toggle. Hands HDR-space output to ReGrade so color grading happens before tonemap rather than after — keeps the bloom non-destructive.

### SOLARIS_PERF_MODE
Preprocessor toggle. Cheaper path at the cost of some visual quality.

### SOLARIS_ARTISTIC_MODE
Preprocessor toggle. Switches from the physically-based bloom to a set of art-directed blend modes: Energy Conserving, HDR Drama, Orton, Dreamy, Depth Blend, Screen.

:::

## Alternatives

- **MagicBloom** — older but well-regarded. Closer to a "classic ReShade look." Cheaper performance cost.
- **AmbientLight** — not strictly bloom but often paired with it; lifts bright areas globally and adds atmosphere.
- **qUINT_Bloom** — part of the qUINT suite. Physically based, similar in spirit to Solaris but with a different look. Some prefer it for cooler scenes.
- **In-game bloom + ReShade off** — FFXIV's built-in bloom is fine for casual shots. Worth comparing against, especially before spending an hour tuning Solaris.
