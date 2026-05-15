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
Low values let objects feel paper-thin — light bleeds around them in ways that can look ghostly or wrong. High values give everything a solid back, which can read more grounded but at the cost of haloing and over-occlusion around silhouettes. Very scene-dependent.

### Bounce Lighting Intensity
Low values are a subtle warmth in the shadow side of things — a red wall tinting the floor by a hint. High values push toward dramatic colour bleed, where the entire shaded side of a character glows in the colour of whatever's next to them. Past a certain point the scene starts looking lit by something that isn't actually there.

### Ambient Occlusion Intensity
Low values give a gentle weight in cavities and contact points. High values darken midtones hard and push the image toward moody, heavy shadow — sometimes muddy if you push it past what the bounce light can support.

### Fadeout
Pulls the GI off the back of the scene so distance fog doesn't pick up coloured bounce. Keeps the effect focused on the foreground at a small performance benefit.

:::

::: details Technical controls — iMMERSE RTGI (diffuse)

### Smoothed Normals
Pulls Launchpad-smoothed surface data into the bounce calculation. Helps the GI look soft and continuous rather than patchy across low-poly surfaces.

### Textured Normals
Lets the bounce light react to fine surface detail from Launchpad. Bounce highlights gain a bit of texture rather than spreading across surfaces evenly.

### _MARTYSMODS_TAAU_SCALE
Compensation toggle for DLSS / FSR / TAAU jitter. Needed for those upscalers to play nicely with RTGI.

:::

## Alternatives

> _Alternatives coming soon._
