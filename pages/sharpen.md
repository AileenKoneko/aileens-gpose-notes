# Sharpen

Sharpening pulls back the detail that anti-aliasing, DLSS, or just low resolution can smear away. In gposes it can be the difference between hair that reads as strands and hair that reads as a soft mass. Used lightly it's almost invisible; pushed harder you start seeing halos around edges.

::: compare
before: images/sharpen/sharpen-off.svg
after: images/sharpen/sharpen-on.svg
label-before: Sharpen off
label-after: Sharpen on
:::

## What it does

Sharpening looks at each pixel and its neighbours, finds the spots where brightness changes quickly (the edges in the image), and exaggerates that change — bright sides of an edge get brighter, dark sides darker. Your eye reads that as *sharper*.

The trouble is, the same boost applied to noise reads as grain, and the same boost on soft gradients can produce *ringing* — the bright/dark halos along edges. Most ReShade sharpeners don't have built-in protection against either, so the dial is yours to manage.

Sharpen usually sits late in the stack, after bloom, DoF, and grading — since those passes affect how much detail there is to sharpen in the first place.

## How to use it in gposes

> _Use cases coming soon._

## What I use

I run **iMMERSE Sharpen** for this. It's a simple contrast-based sharpener with two sampling patterns and no anti-ringing protection — the docs note that ringing artifacts can show up at higher intensity values.

> _Personal notes coming soon._

::: details Settings — iMMERSE Sharpen

### Sharpen Intensity
Strength of the sharpening. Start at 0 and creep up — the docs explicitly note there's no guard against over-sharpening or ringing.

### Sharpen Preset
Sampling pattern. *Simple* uses a plus-shape (centre plus 4 neighbours) and is the lighter option. *Advanced* uses a box including diagonals, more refined on detailed or high-resolution images.

:::

## Alternatives

- **LumaSharpen** — the original ReShade sharpener. Older, simpler, still ships in many preset packs. Predictable.
- **CAS (Contrast Adaptive Sharpening)** — AMD's open-source sharpener, ported to ReShade. Adapts its strength based on local contrast so flat areas don't crunch.
- **FilmicAnamorphSharpen** — a softer, more "film-look" sharpener if you don't want digital crispness.
