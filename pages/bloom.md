# Bloom

Bloom adds a soft halo of light around the brightest parts of an image. In gposes it sells the *feeling* of a scene — a hot summer afternoon, neon at night, the bounce of magic from a spell — more than any single other effect. It sits at the very end of the pipeline, after everything else is in place, and it's where most of the "wow" lives.

::: compare
before: images/bloom/bloom-off.svg
after: images/bloom/bloom-on.svg
label-before: Bloom off
label-after: Bloom on
:::

## What it simulates

Bloom is what real lenses and real eyes do when light is too bright to capture cleanly. Photons scatter off lens elements, off the moisture in your eye, off particles in the air, and the result is a soft glow that spills outward from each highlight. It is one of the cheapest ways to make a render feel *photographic* instead of digital.

A few things to keep in mind:

- **Bloom is not glow.** Glow is an art-direction call (anime light streaks). Bloom is a physics simulation of light bleeding past a hard edge.
- **It always starts at a threshold.** Below some brightness, nothing blooms. Above it, the brighter a pixel is, the more it spills.
- **It is shaped like the lens.** Long, anamorphic horizontal flares come from cinema lenses. Round, diffuse halos come from eyes and most camera lenses. ReShade bloom usually does the round kind unless you stack anamorphic on top.

The common pitfall is letting bloom carry the exposure. If a scene looks dull, fix exposure first and let bloom add the finish — otherwise you get a hazy milk-glass image instead of luminous highlights — unless it's your goal.

## How to use it in gposes
Subtle bloom is often less about obvious glow and more about softening the transition between bright and dark areas.

In the example below, bloom softens the crystal highlights, lifts the atmosphere around the light sources, and adds a gentle glow around the edges of the character without overpowering the image.

::: compare
before: images/bloom/1-before.png
after: images/bloom/1-after.png
label-before: Bloom off
label-after: Bloom on
:::

Which works well for more realistic or cinematic vibes, but bloom on its own can also push a scene into something dreamlike or romantic. So what happens if we crank it to 11?

::: compare
before: images/bloom/2-before.png
after: images/bloom/2-after.png
label-before: Bloom off
label-after: Bloom on
:::

The image gets hazy, the subject gets swallowed by the white haze. That's the hazy milk-glass effect I mentioned earlier.

Someone could say that this is just wrong, overcooked. But if you add some orange/warm light...

::: compare
before: images/bloom/2-after.png
after: images/bloom/3-after.png
label-before: Bloom off
label-after: Bloom on
:::

Suddenly it feels very hot in here, doesn’t it? Or are we in a fever-dream? :3 


## What I use

I run **iMMERSE Solaris** for this. It reverse-tonemaps the scene back into HDR before computing bloom, so the bloom term behaves like real light and scales with scene exposure rather than being a fixed post-process haze on top of an already-tonemapped image.

::: compare
before: images/bloom/personal-bloom-before.png
after: images/bloom/personal-bloom-after.png
label-before: Bloom off
label-after: Bloom on
:::

Personally, I usually aim for very subtle bloom, like the soft glow around the arm or where the hair intersects with the clouds in the image above.

My internal rule is:

**“The best bloom is the one you notice only after it’s gone.”**

::: details Settings — iMMERSE Solaris

### Log Exposure Bias
High values make highlights aggressively spill into the frame, which can feel dreamy or overexposed depending on the scene. Negative values pull bloom back — only the truly bright stuff blooms, and the image keeps its clarity.

### Log HDR Whitepoint
The threshold above which something starts to bloom. Low values let middling-bright surfaces (skin in sunlight, pale stone) glow softly — the whole image picks up a hazy luminance. High values reserve bloom for actual highlights — neon signs, sun, candle flames — and leave the rest of the scene crisp.

### Bloom Intensity
Low values are a tasteful kiss of light around bright things. High values shroud the whole image in glow,pushing the image toward romantic softness or outright overexposure depending on the shot.

### Bloom Radius
Low values keep halos tight around their source — sharp little glints. High values let glow extend far across the frame, softening edges and giving the image that hazy, dreamlike spill.

### Bloom Haziness
Low values keep the bloom coloured — neon stays neon, candlelight stays warm. High values wash the glow toward neutral white, which can feel more cinematic or just blander, depending on what you wanted.

### Mask by Depth
Toggle. Holds bloom off distant geometry so far-away highlights don't dominate the frame.

### Depth Mask Strength
How aggressively distant bloom is suppressed. Low values still let some glow leak into the back of the scene; high values keep bloom firmly on the foreground.

### SOLARIS_ARTISTIC_MODE
Preprocessor toggle. Swaps the physically-based bloom for a set of art-directed blend modes: Energy Conserving, HDR Drama, Orton, Dreamy, Depth Blend, Screen.

:::

::: details Technical controls — iMMERSE Solaris

### High Resolution Input
Toggle. Computes bloom from the full-resolution image — sharper result, more expensive.

### ENABLE_SOLARIS_REGRADE_PARITY
Preprocessor toggle. Hands HDR-space output to ReGrade so grading happens before tonemap rather than after — keeps the bloom non-destructive.

### SOLARIS_PERF_MODE
Preprocessor toggle. Cheaper path at the cost of some visual quality.

:::

## Alternatives

- **MagicBloom** — older but well-regarded. Closer to a "classic ReShade look." Cheaper performance cost.
- **AmbientLight** — not strictly bloom but often paired with it; lifts bright areas globally and adds atmosphere.
- **qUINT_Bloom** — part of the qUINT suite. Physically based, similar in spirit to Solaris but with a different look. Some prefer it for cooler scenes.
- **In-game bloom + ReShade off** — FFXIV's built-in bloom is fine for casual shots. Worth comparing against, especially before spending an hour tuning Solaris.
