# Ambient Occlusion

Ambient occlusion is the soft shadow that lives where two surfaces meet — under a collar, in the corner of a room, between fingers. The game's lighting doesn't include this, so AO is what adds that sense of surfaces actually touching the world around them.

::: compare
before: images/ambient-occlusion/ambient-occlusion-off.svg
after: images/ambient-occlusion/ambient-occlusion-on.svg
label-before: AO off
label-after: AO on
:::

## What it simulates

In the real world, ambient light comes from every direction at once — sky, walls, the ground — and the more surrounding geometry tucks a spot away, the less of that light reaches it. The crook of an elbow doesn't see as much sky as the outside of the arm, so it sits a little darker. AO recreates that.

What you'll notice when it's on: more depth in faces, more weight in clothing folds, less of that "everything is floating" look that flat game lighting can have.

Tuning notes: a large radius spreads occlusion into a wider halo around character outlines, which can read as a soft grey rim if you push it. High intensity pulls midtones down toward the shadow range. Both are matters of taste — some looks lean into a heavier AO, some keep it barely there.

## How to use it in gposes

> _Use cases coming soon._

## What I use

I run **iMMERSE MXAO** for this. It uses Ground Truth AO and a couple of newer algorithms, with optional Launchpad integration for cleaner surface data and a setting that compensates for upscaling jitter from DLSS / FSR.

> _Personal notes coming soon._

::: details Settings — iMMERSE MXAO

### Sample Quality
Samples per pixel used to figure out occlusion. More samples = less noise, more cost.

### Shading Rate
What resolution the AO is calculated at — Full, Half, or Quarter. Drop it to claw back performance at the cost of some detail.

### Sample Radius
How far out from each pixel the AO looks. Sets the scale of the shadows — small radius for tight contact shadows, larger for broader cavity darkening.

### Increase Radius with Distance
Scales the radius based on how far a surface is from the camera. Helps in scenes with deep view distance; can produce odd haloing on far geometry.

### Ambient Occlusion Amount
Overall intensity of the effect.

### Fade-Out Distance
The depth where AO starts disappearing. Stops AO from showing up on distant backdrops where it would just look like dirt.

### Filter Quality
Strength of the denoise pass on the raw AO. Higher hides banding and sample noise at a performance cost.

### MXAO_AO_TYPE
Algorithm selector: 0 = GTAO, 1 = Solid Angle, 2 = Visibility Bitmask, 3 = Bitmask with Solid Angle. Each has a slightly different character.

### MXAO_USE_LAUNCHPAD_NORMALS
Pulls smoothed/textured surface data from Launchpad instead of the raw depth-derived stuff. Cleaner result if you have Launchpad in your stack.

### _MARTYSMODS_TAAU_SCALE
Compensates for the sub-pixel jitter that DLSS / FSR / TAAU introduce. Needs Launchpad running before MXAO.

### Show Raw AO
Debug view — shows the AO term on its own, no texture. Handy for tuning.

:::

## Alternatives

- **qUINT SSAO / HBAO** — older qUINT screen-space AO. Lighter on performance, simpler controls.
- **Ambient Light** — adds a brightness lift to bright areas alongside an AO-like darkening of cavities. Not strictly AO, but lives in the same slot in many presets.
- **OBGE / Stock SSAO** — many ReShade preset packs ship with a basic SSAO. Cheaper than MXAO, with fewer controls.
