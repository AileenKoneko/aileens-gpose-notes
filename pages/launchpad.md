# Launchpad

Launchpad isn't something you'll see in a screenshot — it's the prep shader the rest of the iMMERSE stack reads from. MXAO, RTGI, and anything else that needs to know which direction a surface is facing or how a pixel moved between frames pulls that info from Launchpad. If you're running Marty's shaders, this sits at the top of your load order.

<!--
Add screenshots, then uncomment to enable the before/after slider:

::: compare
before: images/launchpad-off.png
after: images/launchpad-on.png
label-before: Off
label-after: On
:::
-->

## What it does

The game hands ReShade a pretty rough version of its surface and motion data — surface directions come through blocky, and there's no info at all about how pixels moved between frames. Launchpad smooths the surface data out and adds the missing motion tracking. Curved surfaces stop shading like faceted polygons, and the shaders that lean on motion data (RTGI especially) get something stable to align against.

You won't spot Launchpad in any one shot. What you'll see is the rest of the stack looking *cleaner* — crisper AO contact shadows, less flickering in RTGI, fewer ghosting trails when the camera pans.

The catch is wiring: each shader that pulls from Launchpad needs its "Use Launchpad" switch turned on in that shader's settings, and Launchpad has to run before them in the load order.

## How to use it in gposes

> _TODO: your use cases — what FFXIV gpose scenarios benefit from this effect, what looks it helps you achieve._

## What I use

I run **iMMERSE Launchpad** for this. It gives you smoothed and textured surface data plus motion tracking, with quality presets ranging from cheap to slow-but-clean.

> _TODO: your personal notes — typical values you reach for, what you pair it with, any quirks you've noticed._

::: details Settings — iMMERSE Launchpad

### Flow Quality
Motion tracking precision. Higher settings give cleaner results at a small performance cost.

### Flow Optimizer
Pick between two motion-tracking algorithms. *Sophia* handles complex or turbulent motion better at higher cost; *Newton* is faster and tends to do better on smooth, predictable camera moves but can struggle on fine detail.

### Smoothed Normals
Smooths the surface direction data so curved surfaces stop looking like faceted polygons.

### Textured Normals
Adds fine surface detail pulled from the colour texture, so lighting reacts to surface roughness the game didn't include.

### Textured Normals Sample Radius
How far around each pixel the texture detail is sampled. Lower preserves sharp detail; higher reduces noise but softens features.

### Textured Normals Intensity
Strength of the synthesised detail. Subtle at low values, exaggerated at high.

### Textured Normals Quality
Quality preset from 1 (cheap) to 3 (best). 3 looks best but costs the most.

### LAUNCHPAD_DEBUG_OUTPUT
Lets you visualise what Launchpad is producing. Five modes: All, Optical Flow, Optical Flow Vectors, Normals, Depth — useful for checking the data other shaders are receiving from it.

:::

## Alternatives

- **FFXIV Crashpad** — FFXIV-specific buffer pre-processor that fills a similar role. Heads up: it doesn't work with iMMERSE RTGI. If your stack uses Marty's RTGI, stay on iMMERSE Launchpad.
