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

### Sample Radius
Small radius hugs the actual contact points — under a chin, the inside of a sleeve. Large radius spreads occlusion out into broader cavity darkening that can read more like a soft grey wash around the figure than a real shadow.

### Increase Radius with Distance
Keeps far-away geometry from losing all its AO — useful for big outdoor scenes. Push it too hard and distant silhouettes pick up a smoky halo around them.

### Ambient Occlusion Amount
Low values are a gentle weight in the shadows. High values pull midtones down and give the shot a heavy, almost charcoal-shaded feel — figures sit firmly in the world but the overall image gets darker and moodier.

### Fade-Out Distance
Pulls AO off the back of the scene so distant backdrops don't accumulate a dirty wash. Set it too aggressive and your background looks flat compared to the foreground.

:::

::: details Technical controls — iMMERSE MXAO

### Sample Quality
Low values leave a grainy, noisy shadow under collars and in corners. Push it and the AO settles into smooth, clean cavity shading.

### Shading Rate
Drops AO down to half or quarter resolution to save frametime. Lower rates show as slightly softer, less precise shadow edges — usually fine on character shots, more noticeable on hard architectural geometry.

### Filter Quality
Higher values smooth out the speckly noise in the AO at the cost of frametime — cleaner shadow gradients, less of that grainy "dirt" look.

### MXAO_AO_TYPE
Algorithm selector. Each option gives a slightly different shadow character — worth flipping through with the rest of your settings fixed.

### MXAO_USE_LAUNCHPAD_NORMALS
Pulls surface data from Launchpad instead of deriving it from depth. Cleaner result if Launchpad is in your stack.

### _MARTYSMODS_TAAU_SCALE
Compensation toggle for DLSS / FSR / TAAU jitter. Needs Launchpad running before MXAO.

### Show Raw AO
Debug view — shows just the AO term with no texture underneath.

:::

## Alternatives

- **qUINT SSAO / HBAO** — older qUINT screen-space AO. Lighter on performance, simpler controls.
- **Ambient Light** — adds a brightness lift to bright areas alongside an AO-like darkening of cavities. Not strictly AO, but lives in the same slot in many presets.
- **OBGE / Stock SSAO** — many ReShade preset packs ship with a basic SSAO. Cheaper than MXAO, with fewer controls.
