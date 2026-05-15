# Clarity

Clarity is the midtone-contrast lift that adds depth to flat-lit scenes without crushing shadows or blowing highlights. Think of Lightroom's Clarity slider — it's not quite sharpening, it's not quite contrast, it's the local-contrast boost that sits between them.

::: compare
before: images/clarity/clarity-off.svg
after: images/clarity/clarity-on.svg
label-before: Clarity off
label-after: Clarity on
:::

## What it simulates

Clarity boosts contrast on a *regional* scale rather than a per-pixel one. Sharpening works on the edges between adjacent pixels; Clarity works on the difference between *areas* of an image — a face versus the wall behind it, fabric folds versus the surrounding fabric. The result is that texture and shape come forward without the halos and crunch you'd get from heavy sharpening.

Pushed too far it can flatten in a different way — skin takes on a grey cast, the sky goes muddy, hard edges between bright and dark areas pick up subtle halos. Pushed gently it's one of the friendlier ways to bring a flat-lit FFXIV scene to life.

## How to use it in gposes

> _Use cases coming soon._

## What I use

I run **iMMERSE Clarity** for this. It's a real-time take on the Lightroom/Photoshop Clarity idea, with separate dials for the sampling area, the fine-detail boost, and the broader midtone contrast.

> _Personal notes coming soon._

::: details Settings — iMMERSE Clarity

### Effect Radius
The area each pixel "looks around" when calculating its local contrast. Smaller radius behaves closer to sharpening. Larger radius behaves closer to a tone curve — broader lift, but with more risk of subtle haloing.

### Texture Intensity
Strength of the fine-detail component. The docs suggest starting low and creeping up until you get "natural, crisp enhancement without over-processing artifacts."

### Local Contrast Intensity
Strength of the broader midtone-contrast lift. The dial that pushes back hardest against flat lighting. At high values the look shifts toward heavy HDR-style processing — whether that's what you want is up to the shot.

:::

## Alternatives

> _Alternatives coming soon._
