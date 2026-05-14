# RTGI — Specular Reflection

The specular pass of RTGI is what gives wet stone its sheen, lets metal pick up the colour of the lantern beside it, and puts a recognisable reflection of the character in a polished floor. It's the *shiny* half of global illumination — and in FFXIV, where stock specular is mostly a baked envmap, it's the difference between "armour" and "polished steel armour."

::: compare
before: images/rtgi-specular/rtgi-specular-off.svg
after: images/rtgi-specular/rtgi-specular-on.svg
label-before: RTGI off
label-after: RTGI on
:::

## What it simulates

Where the diffuse pass spreads bounced light in every direction, specular reflection is light bouncing in *one* direction — angle in equals angle out. The smoother the surface, the sharper the reflection; the rougher the surface, the softer and broader it gets.

RTGI's specular pass works the same way the diffuse one does, except it traces the actual reflection direction off each surface — and the rougher a surface is, the more those reflection rays get spread out. That spread is what turns a mirror reflection into a satin shimmer.

Same limits as the diffuse pass, and a bit more pronounced here: anything that should reflect content off-screen can't, and very rough surfaces need a lot of rays to look clean. The dial that matters most is roughness — it controls whether floors read as mirror, satin, or matte.

## How to use it in gposes

> _TODO: your use cases — what FFXIV gpose scenarios benefit from this effect, what looks it helps you achieve._

## What I use

I run **iMMERSE RTGI (specular pass)** for this. It's the companion to the diffuse pass — adds glossy reflections graded by surface roughness, sharing the same sampling work.

> _TODO: your personal notes — typical values you reach for, what you pair it with, any quirks you've noticed._

::: details Settings — iMMERSE RTGI (specular)

### Quality
Rays cast per pixel: Low / Medium / High / Ultra. Default Medium. More rays = cleaner reflections, less noise, more cost.

### Object Thickness
Same as the diffuse pass — how far behind a surface to assume the object extends, to prevent light leak. Range 0.0–1.0, default 0.25.

### Surface Roughness
How mirror-like or matte the reflections appear, applied globally. Range 0.0–0.5, default 0.2. The docs suggest 0.15–0.35 for natural-looking results.

### Fresnel F0
Strength of head-on (perpendicular) reflection. Range 0.04–0.5, default 0.04 (typical for non-metals). Push toward 0.1 for slightly more reflection even on flat surfaces.

### Fade-Out Range
How far into the scene the specular effect extends. Range 0.001–1.0, default 0.3.

### Debug View
Toggle: Disabled / Specular RTGI / Validation Layer. Use to isolate the specular contribution when tuning.

:::

## Alternatives

> _TODO: alternatives_
