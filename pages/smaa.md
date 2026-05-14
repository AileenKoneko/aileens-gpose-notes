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

> _TODO: your use cases — what FFXIV gpose scenarios benefit from this effect, what looks it helps you achieve._

## What I use

I run **iMMERSE SMAA** for this. It's a modern take on the SMAA approach with selectable edge-detection (luma, colour, depth) and tunable quality vs performance trade-offs.

> _TODO: your personal notes — typical values you reach for, what you pair it with, any quirks you've noticed._

::: details Settings — iMMERSE SMAA

### Edge Detection Type
Which signal SMAA uses to find edges: Luminance, Color (Max), Color (Weighted), or Depth. Luminance is the standard default; depth-based catches geometry edges that luma can miss.

### Edge Detection Threshold
How sensitive the edge detector is. Lower catches subtle edges but risks false positives on textures; higher only catches prominent edges.

### Depth Edge Detection Threshold
Sensitivity for the depth-based edge pass. Only active with predicated thresholding.

### Max Search Steps
How far SMAA scans horizontally/vertically along an edge to figure out the gradient direction. Higher = cleaner long edges, more cost.

### Max Search Steps Diagonal
Same as above, but for diagonal edges.

### Corner Rounding
How aggressively SMAA smooths at corners. Too high softens corners that should be sharp; too low leaves visible stair-step there.

### SMAA_USE_EXTENDED_EDGE_DETECTION
Switch for enhanced detection on high-magnitude edges.

### View Edges
Debug overlay — shows where SMAA decided edges are. Useful when tuning the threshold.

### View Weights
Debug overlay — shows the internal blend weights.

:::

## Alternatives

- **FXAA** — older, faster, blurrier. Cheap and ubiquitous but softens texture detail more than SMAA does.
- **CMAA2** — Conservative Morphological AA, Intel's evolution of FXAA/SMAA. Sharper than FXAA, similar cost to SMAA.
- **In-game FXAA** — FFXIV ships with FXAA. Worth comparing against; some prefer it off when SMAA is on, to avoid double-blurring.
