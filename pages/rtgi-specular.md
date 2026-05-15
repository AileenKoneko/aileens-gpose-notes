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

> _Use cases coming soon._

## What I use

I run **iMMERSE RTGI (specular pass)** for this. It's the companion to the diffuse pass — adds glossy reflections graded by surface roughness, sharing the same sampling work.

> _Personal notes coming soon._

::: details Settings — iMMERSE RTGI (specular)

### Object Thickness
Same dial as on the diffuse pass — how solid the shader assumes objects are behind their front surfaces. Affects how reflections handle things they can't see directly.

### Surface Roughness
The most consequential dial. At the low end, every surface picks up a mirror-like reflection — floors look wet, polished stone behaves like glass. Push it higher and reflections smear into a satin shimmer; higher still and they become a soft, broad sheen that you almost don't read as reflection at all.

### Fresnel F0
Controls how reflective surfaces are when you're looking straight at them. Low values keep flat surfaces matte until you view them at a grazing angle — the natural look for skin, cloth, painted wood. High values give even head-on surfaces a metallic sheen, useful when you want polished armour or jewellery to read as metal.

### Fade-Out Range
How far back into the scene the reflections reach. Pull it in tight and only the foreground gets the glossy treatment; push it out and distant water/floors keep reflecting too.

:::

::: details Technical controls — iMMERSE RTGI (specular)

### Quality
Higher settings produce cleaner, less grainy reflections at frametime cost. Low settings leave a fizzy, noisy quality on glossy surfaces — especially the slightly-rough ones, which need the most rays to look stable.

### Debug View
Toggle for isolating the specular contribution on its own — useful when tuning.

:::

## Alternatives

> _Alternatives coming soon._
