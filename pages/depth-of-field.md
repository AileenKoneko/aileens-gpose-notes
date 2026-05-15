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

> _Use cases coming soon._

## What I use

I run **iMMERSE DoF** for this. It takes real-camera inputs — focal length, f-stop, aperture blades, aperture roundness — and produces correctly shaped bokeh from highlights.

> _Personal notes coming soon._

::: details Settings — iMMERSE DoF

### Focusing Mode
How the focal plane is chosen: Manual (you drive a slider), Autofocus (closest detected surface), or Point-and-Click (middle-mouse target).

### Focal Distance
Where the in-focus plane sits in the scene. Sweep it close and the camera dwells on something near the lens; push it deep and the background snaps into focus while the foreground softens.

### Center
Where on screen the autofocus reads from. Move it off-centre to lock focus on a subject that isn't dead centre of the frame.

### Detection Range
How wide an area autofocus considers. Tight values lock on the exact pixel under the centre point; wider values average over a bigger region, less twitchy but less precise.

### Adjustment Speed
How quickly autofocus chases a new subject. Low values feel like a smooth rack focus; high values snap.

### Foreground / Background Blur Scale
Independent dials on near vs far blur. Drop the foreground to keep close objects mostly readable while the background still melts; drop the background for the opposite.

### Focal Length
The main feel-of-the-lens dial. Short focal lengths (think 24mm) give you wide, deep, almost everything-in-focus shots. Long focal lengths (135mm and up) compress the scene and shrink the focal plane to a sliver — the classic creamy portrait look.

### Aperture F-Stops
Lower f-numbers (f/1.4, f/0.95) blow open the aperture: huge bokeh, paper-thin focal slice, dreamy and cinematic. Higher f-numbers (f/5.6, f/8) tighten everything up — small, tidy bokeh and a much deeper in-focus zone.

### Aperture Shape
Number of aperture blades. Few blades give you obvious polygonal bokeh — hexagons, pentagons, the "vintage lens" look. More blades round out the discs toward circular.

### Aperture Roundness
Slides between the hard polygon shape and a perfect circle. Low values keep faceted, geometric bokeh that reads as character-y and lens-specific; high values give you smooth modern circular bokeh.

### Aperture Rotation
Rotates the bokeh polygon. Only matters when the aperture shape is visibly polygonal — useful for tilting the orientation of the bokeh discs so they don't sit flat.

### Smoothness
Extra blur pass over the out-of-focus areas. Low values keep bokeh discs crisp and individually visible; high values melt them together into a creamier wash.

### Highlight Intensity
Low values keep bright highlights subdued in the blur — soft, even bokeh. High values let highlights punch through as bright bokeh balls, which is what gives night-time and fairy-light shots their look.

### Highlight Gamma
Shapes the falloff inside each bokeh ball. Lower values give bokeh discs harder, more defined edges; higher values soften them toward their middle.

### Color Intensity
Low values desaturate the bokeh toward white. High values keep the colour of each highlight intact — coloured lanterns stay coloured, magic glow stays tinted.

:::

::: details Technical controls — iMMERSE DoF

### Show Focus Distance
Debug overlay that visualises where the focal plane is sitting.

### Quality
More sample rings = rounder, cleaner bokeh discs. Low values can leave bokeh looking polygonal or banded even when you've asked for round.

### Sprite Density
Performance toggle that swaps fully-sampled bokeh for cheaper sprites in parts of the frame. Lower values are faster but can look less consistent across the blurred area.

### VRS Strength
Drops shading rate in the blurred areas to save frametime. The blur hides most of the quality loss; push it too far and you may see banding in smooth out-of-focus gradients.

### VRS Debug
Debug overlay colour-coding the shading-rate map.

### Focus Debug Color Scheme
Palette for the focus-distance debug overlay.

:::

## Alternatives

- **qUINT Cinematic DoF** — long-standing favourite in the gpose scene before iMMERSE DoF existed. Heavy but produces clean bokeh.
- **ADoF / Magic DoF** — older free-shader DoF implementations. Cheaper, less physically accurate, fine for subtle background blur.
- **In-game DoF** — FFXIV's built-in gpose DoF. Limited, but free and zero-config; worth comparing against before going deep.
