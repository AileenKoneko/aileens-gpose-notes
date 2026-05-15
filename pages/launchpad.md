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

> _Use cases coming soon._

## What I use

I run **iMMERSE Launchpad** for this. It gives you smoothed and textured surface data plus motion tracking, with quality presets ranging from cheap to slow-but-clean.

> _Personal notes coming soon._

::: details Settings — iMMERSE Launchpad

### Smoothed Normals
Rounds out the surface data so curved things actually look curved. With it off, gentle curves shade like flat facets — cheeks, shoulders, columns all get a low-poly hardness to them.

### Textured Normals
Lets lighting respond to fine surface roughness the game never modelled — fabric weave, pores, stone grain. Off, surfaces shade smooth; on, they shade like they have a real microsurface.

### Textured Normals Sample Radius
Low values keep the synthesised detail tight and crisp — every pore reads. High values smear it into something broader and softer, more cloth-like than skin-like.

### Textured Normals Intensity
Barely-there at low values, almost like a faint matte coating. Push it and surfaces start to look gritty, even sandpapered.

### Textured Normals Quality
Higher settings make the synthesised detail look more coherent and less noisy at the cost of frametime.

:::

::: details Technical controls — iMMERSE Launchpad

### Flow Quality
Push this up and the shaders downstream get steadier motion data — less ghosting on pans, less crawl in RTGI. Low settings leave a faint smear when the camera moves.

### Flow Optimizer
Algorithm selector for motion tracking. *Sophia* holds up better on turbulent or complex motion; *Newton* is faster and tidier on smooth camera moves.

### LAUNCHPAD_DEBUG_OUTPUT
Debug overlay for inspecting what Launchpad is feeding downstream — flow, normals, or depth.

:::

## Alternatives

- **FFXIV Crashpad** — FFXIV-specific buffer pre-processor that fills a similar role. Heads up: it doesn't work with iMMERSE RTGI. If your stack uses Marty's RTGI, stay on iMMERSE Launchpad.
