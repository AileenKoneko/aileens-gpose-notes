# SMAA

SMAA smooths out the jagged stair-step edges that FFXIV's built-in anti-aliasing leaves behind. It runs on the final image rather than during rendering, which means it plays nicely with the rest of the stack and has a small performance cost.

::: compare
before: images/smaa/smaa-off.svg
after: images/smaa/smaa-on.svg
label-before: SMAA off
label-after: SMAA on
:::

## What it does

A pixel grid is square; the real edge of a sword or a roof tile isn't. When the renderer drops those edges onto pixels, you get a staircase — the *jaggies*.

SMAA looks at the final image, finds those jagged edges, and re-blends the pixels along them so the transitions read smooth. It can't recover detail that was never in the image to begin with — it just cleans up what's visible.

You'll mostly notice SMAA when it's *off*: distant roof lines shimmer, sword edges crawl. With it on, those things just look calm.

## How to use it in gposes

> _Use cases coming soon._

## What I use

I run **iMMERSE SMAA** for this. It's a modern take on the SMAA approach with selectable edge-detection (luma, colour, depth) and tunable quality vs performance trade-offs.

> _Personal notes coming soon._

::: details Settings — iMMERSE SMAA

### Edge Detection Type
Which signal SMAA hunts edges from. Luminance is the standard, balanced default. Colour modes catch edges luminance misses — coloured cloth against same-brightness backgrounds, that sort of thing. Depth catches geometry edges that have no visible contrast at all.

### Edge Detection Threshold
Low values catch every subtle edge — cleaner result, but textures can soften because they're being treated as edges too. High values only smooth the obvious jaggies and leave texture detail untouched, at the cost of letting some shimmer through.

### Max Search Steps
Higher values clean up long, shallow edges — roof lines, sword silhouettes — that would otherwise stay slightly stair-stepped. Low values leave those edges with visible crawl.

### Max Search Steps Diagonal
Same idea but for diagonal edges. Higher = cleaner diagonals at frametime cost.

### Corner Rounding
Higher values soften corners — fine on character silhouettes, not so fine on architecture where sharp 90° angles should stay sharp. Low values keep corners crisp at the cost of leaving a tiny stair-step.

:::

::: details Technical controls — iMMERSE SMAA

### Depth Edge Detection Threshold
Sensitivity for the depth-based edge pass. Only matters when predicated thresholding is active.

### SMAA_USE_EXTENDED_EDGE_DETECTION
Toggle for enhanced detection on high-contrast edges.

### View Edges
Debug overlay — shows where SMAA decided edges are.

### View Weights
Debug overlay — shows the internal blend weights.

:::

## Alternatives

- **FXAA** — older, faster, blurrier. Cheap and ubiquitous but softens texture detail more than SMAA does.
- **CMAA2** — Conservative Morphological AA, Intel's evolution of FXAA/SMAA. Sharper than FXAA, similar cost to SMAA.
- **In-game FXAA** — FFXIV ships with FXAA. Worth comparing against; some prefer it off when SMAA is on, to avoid double-blurring.
