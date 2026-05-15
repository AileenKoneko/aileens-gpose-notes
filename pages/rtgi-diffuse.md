# RTGI — Diffuse Illumination

Diffuse global illumination is the soft *bounced* light that arrives at a surface after hitting everything else first. A red wall makes the floor beside it slightly red. A bright sky pours soft light into otherwise shadowed alleys. FFXIV mostly doesn't include this — shadows come out darker than they would with real bounce, colours stay local to their own surface, every scene looks lit from one source. RTGI's diffuse pass puts the bounce back.

::: compare
before: images/rtgi-diffuse/rtgi-diffuse-off.svg
after: images/rtgi-diffuse/rtgi-diffuse-on.svg
label-before: RTGI off
label-after: RTGI on
:::

## What it simulates

Light doesn't stop when it hits a surface — it bounces. A photon from the sun lands on grass, picks up a green tint, and the next surface it hits receives a tiny amount of that green-tinted light. Repeat that across the whole scene and you get *global illumination*: every pixel lit not just by direct sources but by everything else around it.

RTGI recreates this by looking at what's currently on screen and working out where bounced light would come from based on the surfaces it can see. It also gives you ambient occlusion as a bonus from the same sampling work, so you usually drop your separate AO shader when RTGI is on.

The limits: RTGI can only see what's in the frame. Light that should come from behind the camera, or from geometry just off the edge, has to be guessed. And it's heavy — typically the most expensive shader in any stack that runs it. Worth keeping important bounce sources (a sunny wall, a glowing window, a bright sky) in the frame when the shot allows.

## How to use it in gposes

> _Use cases coming soon._

## What I use

I run **iMMERSE RTGI (diffuse pass)** for this. It uses screen-space ray tracing to produce diffuse global illumination plus AO from a single sampling pass.

> _Personal notes coming soon._

::: details Settings — iMMERSE RTGI (diffuse)

### Object Thickness
How far behind each surface RTGI assumes the object extends — affects how occluded the area behind it gets. Default 0.250, but heavily scene-dependent. Too high and you get haloing/over-occlusion; too low and objects become too transparent to the ray march.

### Bounce Lighting Intensity
Strength of the bounced light contribution. The docs caution this shouldn't exceed the brightness of the original light source — past that, the shader is inventing light.

### Ambient Occlusion Intensity
Strength of the AO term that comes out of the same sampling work. Same caution as above.

### Smoothed Normals
Uses Launchpad-smoothed surface data to soften the bounce result. Helps with the patchy look on low-poly surfaces.

### Textured Normals
Uses Launchpad-textured surface data so the bounce reacts to fine surface detail.

### Fadeout
Depth at which the GI and AO start fading out. Useful for keeping the effect out of distance fog, plus a small performance gain.

### _MARTYSMODS_TAAU_SCALE
Compensates for the depth jitter that DLSS / FSR / TAAU introduce. Needed for those upscalers to play nicely with RTGI.

:::

## Alternatives

> _Alternatives coming soon._
