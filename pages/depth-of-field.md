# Depth of Field

Depth of field is the blur of everything that isn't your subject. It separates the character from the background, pulls the eye toward the focal point, and is a big part of what makes a gpose feel like a *photo* rather than a screenshot. The catch: it's expensive, fussy to tune, and very sensitive to small changes in focus distance or aperture.

::: compare
before: images/depth-of-field/depth-of-field-off.svg
after: images/depth-of-field/depth-of-field-on.svg
label-before: DoF off
label-after: DoF on
:::

## What it simulates

Real lenses can only focus on one distance at a time. Anything closer or further than that distance spreads out into a small disc of light — a *circle of confusion* — instead of a clean point. The further out of focus a thing is, the bigger the disc gets. The *shape* of the disc follows the shape of the aperture: a hexagonal iris gives hexagonal bokeh, a perfectly round iris gives round bokeh.

A DoF shader recreates that — it works out how far each pixel is from the focal plane, then redraws it as a disc of the right size and aperture shape. Bright highlights against a dark background become bokeh balls. Sharp edges go soft.

Things to watch for: bleeding (in-focus subject leaks blur into the background, or vice versa), polygonal aliasing on the bokeh (not enough samples to make discs look round), and very shallow focus depths that leave parts of the character outside the focal plane — that last one can absolutely be intentional, depending on the shot.

## How to use it in gposes

> _TODO: your use cases — what FFXIV gpose scenarios benefit from this effect, what looks it helps you achieve._

## What I use

I run **iMMERSE DoF** for this. It takes real-camera inputs — focal length, f-stop, aperture blades, aperture roundness — and produces correctly shaped bokeh from highlights.

> _TODO: your personal notes — typical values you reach for, what you pair it with, any quirks you've noticed._

::: details Settings — iMMERSE DoF

### Focusing Mode
Manual Focus (slider-driven focal plane), Autofocus (closest detected surface), or Point-and-Click (middle-mouse target). Default is Autofocus.

### Focal Distance
Distance of the focal plane. Range 0.002–1.0, default 0.1. Non-linear so you have more precision close to the camera.

### Show Focus Distance
Overlay that visualises the focal plane. Modes: Disabled / While Editing / Toggle With GUI / Enabled.

### Center
Where on-screen the autofocus sample region sits. Range −1.0 to 1.0 on each axis, default 0.0 (centre).

### Detection Range
Radius of the autofocus sample region. Range 0.05–1.0, default 0.35.

### Adjustment Speed
How quickly autofocus snaps to a new target. Range 0.0–1.0, default 0.5.

### Foreground / Background Blur Scale
Independent multipliers on the foreground vs background blur. 0–100% each, default 100%.

### Focal Length
The main blur-strength dial. Range 0–350mm, default 90mm. Longer focal lengths = shallower depth of field, more blur.

### Aperture F-Stops
The aperture size. Range f/0.95 to f/8.0, default f/2.8. Lower f-number = larger aperture = larger bokeh discs and shallower DoF.

### Aperture Shape
Number of aperture blades, 3–12, default 6. Determines the bokeh polygon shape.

### Aperture Roundness
0.0–1.0, default 1.0. Blends between a hard polygon (0.0) and a perfect circle (1.0).

### Aperture Rotation
0.0–1.0, default 0.25. Rotates the aperture polygon.

### Quality
Number of sample rings used to build each bokeh disc. Range 5–25, default 7. Docs recommend 7–12 for real-time.

### Smoothness
Extra smoothing pass over out-of-focus regions. Range 0.0–1.0, default 0.5.

### Highlight Intensity
How prominent bokeh discs from bright highlights are. Range 0.0–1.0, default 0.9.

### Highlight Gamma
Tone-curve adjustment within the highlight bokeh. Range 0.0–1.0, default 1.0.

### Color Intensity
Saturation of the bokeh discs themselves. Range 0.0–1.0, default 1.0.

### Sprite Density
Performance optimisation that replaces fully-sampled bokeh with cheaper procedural sprites in places. Range 0.0–1.0, default 0.5.

### VRS Strength
Variable-rate shading in the blurred regions — shades them at a lower rate to save cost. Range 0.0–1.0, default 0.5.

### VRS Debug
Colour-codes the shading-rate map for debugging. Range 0.0–1.0, default 0.0.

### Focus Debug Color Scheme
Palette for the focus overlay: Default, Accessible, Electric Sunset.

:::

## Alternatives

- **qUINT Cinematic DoF** — long-standing favourite in the gpose scene before iMMERSE DoF existed. Heavy but produces clean bokeh.
- **ADoF / Magic DoF** — older free-shader DoF implementations. Cheaper, less physically accurate, fine for subtle background blur.
- **In-game DoF** — FFXIV's built-in gpose DoF. Limited, but free and zero-config; worth comparing against before going deep.
