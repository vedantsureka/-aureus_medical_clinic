# Homepage doctor slideshow images

The homepage automatically switches between both doctors every 5 seconds. It pauses on hover/keyboard focus; reduced-motion users can switch slides manually with the two dots.

Place approved headshots in `public/doctors/` and either:

- Replace `ayushi.svg` and `ashwin.svg` with custom SVG images at the same filenames; OR
- Add `ayushi.jpg` and `ashwin.jpg` and update the two `src` paths in `src/components/site.tsx` inside `DoctorSlideshow` from `.svg` to `.jpg`.

Recommended photos: portrait crop 4:5, ideally 800x1000, with faces centred and room for the caption at the bottom.

The original site branding and other images remain unchanged. The doctor-specific Ayushi portrait on her individual About page is deliberately retained.
