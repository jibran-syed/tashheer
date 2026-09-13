# Tashheer.pk image generation prompts

Use these prompts in ChatGPT Plus Image. Generate each image without typography, logos, watermarks, social-media icons, app interfaces, or recognizable Meta/Facebook/Instagram branding. The website supplies all text and UI overlays.

## Shared art direction

- Photorealistic premium commercial editorial photography, warm, optimistic, modern and trustworthy.
- People and locations should feel authentically Pakistani, contemporary and aspirational without looking luxurious or corporate.
- Natural skin texture, realistic hands, believable products and working environments. Avoid stock-photo poses.
- Use natural environmental colors. For designed props or wardrobe accents, use only the approved Tashheer brand colors: orange `#FF6A00`, magenta `#FF2D7A`, purple `#7B61FF`, near-black `#0D1117`, white `#FFFFFF`, and light gray `#F5F6F8`.
- Keep gradients out of the photography. The website will add the approved orange–magenta–purple gradient sparingly.
- Soft directional daylight, gentle contrast, clean whites, editorial framing, subtle depth of field, no heavy cinematic color grade.
- No visible brand names, incorrect Urdu, generated text, currency notes, political symbols, flags, or religious landmarks.
- Deliver high-resolution WebP or PNG. Preserve the requested aspect ratio and composition space.

---

## TSH-01 — Home baker hero portrait

**Website placement:** First and largest image in the “Made for Pakistan” editorial showcase.

**Output:** Portrait 4:5, at least 1600 × 2000 px. Installed as `public/images/tashheer-business-home-baker.png`.

**Prompt:**

> Create a photorealistic premium commercial editorial portrait for Tashheer.pk, a friendly Pakistani small-business advertising platform. Show a confident Pakistani woman in her early 30s who runs a home baking business in Lahore, standing naturally at a bright, real working kitchen counter. She is finishing a beautifully decorated celebration cake while checking a customer message on her smartphone. Her expression is focused, calm and quietly proud, not posed for the camera. Include believable small-business details: cake boxes, a piping bag, a cooling rack, two finished cupcakes and a simple order notebook, all arranged with tasteful restraint. Use soft morning window light, natural skin texture, realistic hands and food, gentle depth of field and a clean editorial composition. Add a subtle orange `#FF6A00` accent through one practical object such as a cake-box ribbon, with small purple `#7B61FF` detail elsewhere; keep the environment predominantly white and light gray. Frame her slightly left of center and leave calm negative space in the upper-right area for website overlays. Contemporary Pakistani home interior, warm and attainable, not luxury. No text, no logos, no watermarks, no visible social-media interface, no exaggerated makeup, no oversaturated colors, no gradient background. Portrait 4:5, high-resolution, polished brand campaign photography.

---

## TSH-02 — Fashion boutique owner

**Website placement:** Middle image in the “Made for Pakistan” editorial showcase.

**Output:** Portrait 4:5, at least 1600 × 2000 px. Installed as `public/images/tashheer-business-boutique.png`.

**Prompt:**

> Create a photorealistic editorial brand photograph for Tashheer.pk featuring a Pakistani fashion boutique owner in Karachi, late 20s to mid 30s, inside a compact contemporary boutique. Capture an unposed working moment as she arranges a new kurta on a minimal clothing rail while holding a smartphone in her other hand, as if preparing to promote the new collection. Show authentic fabrics, neat folded garments, tailoring details and a few parcel boxes, but keep the scene uncluttered. The business should feel independent, successful and approachable rather than high-end corporate. Use clean side daylight, realistic Pakistani skin tone, natural fabric texture, modern modest styling and soft depth of field. Keep the palette grounded in white, light gray and near-black, with one orange `#FF6A00` garment detail and one restrained magenta `#FF2D7A` or purple `#7B61FF` accessory. Compose vertically with the owner in the lower-middle area and generous negative space above and to one side. No brand names, no store signage, no readable text, no logos, no watermarks, no social-media icons, no gradient lighting, no artificial stock-photo smile. Portrait 4:5, high-resolution commercial photography, crisp but warm.

---

## TSH-03 — Beauty and service business

**Website placement:** Small right-hand image in the “Made for Pakistan” editorial showcase.

**Output:** Portrait 4:5, at least 1600 × 2000 px. Installed as `public/images/tashheer-business-beauty.png`.

**Prompt:**

> Create a photorealistic modern editorial image for Tashheer.pk showing a Pakistani beauty salon owner in Islamabad in her early 30s. Capture a genuine in-between moment in a small, bright salon as she checks a new customer enquiry on her smartphone beside a tidy styling station. Include a mirror edge, clean brushes, folded towels, a salon chair and one small plant, with no visible brands or labels. She should look capable, welcoming and pleased by the business notification, with a subtle natural expression rather than a posed smile. Use soft diffused daylight, realistic skin and hands, clean near-white surfaces and a gentle shallow depth of field. Include restrained brand-color accents through a purple `#7B61FF` phone case and a tiny orange `#FF6A00` object; do not use a gradient. Compose the subject low enough to leave clear negative space near the top for web layout flexibility. The setting must feel authentically Pakistani, contemporary, attainable and non-corporate. No text, no logos, no watermarks, no payment symbols, no social-media interface, no exaggerated luxury decor, no neon lighting. Portrait 4:5, high-resolution premium commercial photography.

---

## TSH-04 — Guided ad creation on a phone

**Website placement:** Large visual beside the four “How it works” steps.

**Output:** Portrait 4:5, at least 1600 × 2000 px. Installed as `public/images/tashheer-how-it-works-owner.png`.

**Prompt:**

> Create a photorealistic premium editorial photograph for the “How it works” section of Tashheer.pk. Show a Pakistani male small shop owner in his late 30s sitting at the counter of a neat neighborhood retail shop, comfortably using his smartphone to prepare an advertisement. Photograph from a three-quarter side angle so his face, hands and phone use feel natural, but keep the phone screen softly out of focus and completely free of readable interface or text. Include believable shop details such as neatly arranged packaged products, a small paper order ledger, a calculator and a parcel ready for a customer. His body language should communicate that the task is simple and manageable: relaxed shoulders, focused expression, slight sense of progress. Use warm afternoon window light with balanced clean whites, realistic skin texture and documentary-style authenticity. Keep the environment mostly white, light gray and natural materials; add a restrained orange `#FF6A00` counter detail and a small purple `#7B61FF` object. Leave generous negative space in the upper-left portion and avoid clutter. No brand names, no logos, no readable labels, no watermarks, no Facebook or Instagram screens, no gradient background, no posed thumbs-up, no corporate office. Portrait 4:5, high-resolution, modern Pakistani small-business campaign photography.

## Implementation status

All four photos are installed in `public/images/` and rendered through the reusable `BusinessImage` component. Notification overlays remain lightweight HTML/CSS components, with their bilingual content and per-image placement defined in `data/image-overlays.ts`.
