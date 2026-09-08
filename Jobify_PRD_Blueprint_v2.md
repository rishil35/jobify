# JOBIFY Website — Product Requirements Document & Visual Build Blueprint

**Document type:** Implementation PRD + visual replication specification  
**Primary source of truth:** `Purple and White Modern Clean Job Portal Desktop Prototype(1).pdf`  
**Reference canvas:** 960 × 600 design units per PDF page  
**Brand:** JOBIFY  
**Version:** v1.0  
**Purpose:** Give a coding agent enough detail to reconstruct the approved JOBIFY website from the wireframe, preserve the visual system, implement internal navigation correctly, and extend the site into the ATS upload → intake → results flow.

---

# 0. How to Use This PRD

This document separates requirements into three levels:

1. **SOURCE-LOCKED** — directly observable in the supplied PDF and should be reproduced as closely as possible.
2. **IMPLEMENTATION RULE** — necessary engineering behavior that is not visible in a static PDF.
3. **TBD / OWNER INPUT** — intentionally unresolved items, mainly final external URLs, contact destination, checkout behavior, analytics IDs, privacy copy, and exact ATS rule weights.

When an implementation decision conflicts with the PDF, follow this priority:

1. Exact supplied asset in `/assets`
2. PDF geometry / typography / visual relationship
3. This PRD
4. Responsive adaptation rules
5. Reasonable implementation defaults

Do **not** invent additional marketing sections, navigation items, illustrations, dashboard features, or content that are not specified here.

---

# 1. Product Summary

JOBIFY is a career-support business that helps job seekers become job-ready and execute their job search.

Core services:

- ATS-friendly resume preparation
- Role-specific resume optimisation
- LinkedIn / Naukri profile optimisation
- Personal portfolio creation
- Resume + cover-letter support
- Job search support
- Done-for-you job applications
- Free ATS resume scan as a lead-generation / diagnostic tool

The public site is intentionally compact and should feel like one continuous landing page rather than a large multi-page corporate website.

The ATS result experience is a focused product flow and should **not** contain the marketing-site footer or full navigation.

---

# 2. Scope

## 2.1 Public Landing Page

The five PDF pages represent consecutive visual sections of a single public landing page:

1. Hero + navigation + free ATS upload
2. Testimonials / social proof
3. Pricing
4. FAQ / About Us content entry point
5. Footer

These should be implemented as one vertically scrolling page.

Recommended section IDs:

```json
{
  "hero": "#home",
  "testimonials": "#testimonials",
  "pricing": "#pricing",
  "faq": "#about",
  "footer": "#footer"
}
```

Note: the FAQ section doubles as the site's lightweight **About Us** destination because the first FAQ question explains who JOBIFY is and how it helps.

## 2.2 ATS Product Flow

The ATS flow consists of:

1. Resume upload
2. Short intake form
3. Rule-based scan / processing state
4. ATS results dashboard

The ATS dashboard is not shown in the supplied PDF. Its visual system must inherit the public-site design language.

## 2.3 Out of Scope for V1

- User accounts
- Login / signup
- Saved scans
- AI or LLM integration
- MCP integration
- AI-generated resume rewriting
- Automated cover-letter generation
- Payment gateway / checkout; all paid-service CTAs route to WhatsApp in V1
- Complex admin panel
- Full CMS
- Blog
- Employer portal
- Recruiter portal

---

# 3. Source Measurement Model

The PDF uses a **960 × 600** page canvas.

All source coordinates in this document use:

```text
x = distance from left edge
y = distance from top edge
w = element width
h = element height
```

Coordinates are in PDF design units, which can be treated as pixels when reproducing at a 960px-wide visual-regression viewport.

For implementation:

```json
{
  "visual_regression_viewport": {
    "width": 960,
    "height_reference_per_section": 600
  },
  "desktop_target": {
    "min_width": 1024,
    "preferred_width": 1440,
    "max_content_width": "approximately 1200px"
  },
  "fidelity_method": "First match the 960px reference exactly, then apply responsive rules rather than blindly scaling the entire page."
}
```

### Scaling Rule

Do **not** set `transform: scale(...)` on the whole page.

Instead:

- preserve percentages and alignment relationships;
- preserve max-width relationships;
- scale typography with `clamp()` only where needed;
- retain the source's generous whitespace;
- ensure the 960px screenshot remains the visual-regression reference.

---

# 4. Global Design System

## 4.1 Typography

The PDF uses Poppins variants.

```json
{
  "font_family": "Poppins, sans-serif",
  "weights": {
    "extra_light": 200,
    "light": 300,
    "regular": 400,
    "semibold": 600,
    "bold": 700
  }
}
```

### Source font observations

| Usage | Source style |
|---|---|
| Hero heading | Poppins SemiBold |
| Major section heading | Poppins Bold |
| Body / subtitle | Poppins ExtraLight or Light |
| Pricing titles | Poppins Bold |
| Feature text | Poppins Regular |
| FAQ questions | Poppins Regular |
| Footer links | Poppins Regular |

## 4.2 Core Colors

Source-extracted colors:

```json
{
  "black": "#121212",
  "brand_purple": "#6A50E2",
  "dark_purple": "#13072E",
  "muted_gray": "#8B8D9B",
  "card_lilac": "#EFEEF4",
  "white": "#FFFFFF",
  "cta_text_light": "#F9F9F9",
  "sale_red": "#FC583B"
}
```

Recommended supporting tokens where exact source values are not separately encoded:

```json
{
  "border_gray": "#8B8D9B",
  "soft_lavender": "#E8E3FF",
  "secondary_purple": "#AE82F5"
}
```

## 4.3 Brand Gradient

Buttons visually transition from saturated violet to soft lavender.

Implementation target:

```css
background: linear-gradient(
  90deg,
  #6841ED 0%,
  #805BF0 55%,
  #B184F7 100%
);
```

This gradient is an implementation approximation. If a button asset exists in `/assets`, prefer the asset only if it preserves correct responsive behavior; otherwise use CSS.

## 4.4 Background Treatment

Across pages 1–4, the design uses:

- white base;
- extremely soft lavender radial glows;
- low contrast;
- no visible hard gradient boundary;
- no dark panels.

Recommended CSS approximation:

```css
background:
  radial-gradient(circle at 50% -10%, rgba(132, 103, 255, 0.18), transparent 34%),
  radial-gradient(circle at 2% 92%, rgba(114, 80, 226, 0.14), transparent 28%),
  #ffffff;
```

Important:
- gradient opacity should remain subtle;
- never let the lavender become a full solid section fill;
- if exact full-background artwork is supplied in `/assets`, use it instead.

## 4.5 Corner Radius

Observed visual language:

```json
{
  "small": "10px",
  "button": "18px to 22px",
  "card": "22px to 28px",
  "footer_top": "38px to 44px"
}
```

## 4.6 Shadows

The PDF uses very little obvious shadowing.

Rules:

- avoid large drop shadows;
- button may have a 3–5px darker-purple bottom edge or shadow;
- cards should rely primarily on fill and border;
- illustration glows may be part of the asset.

## 4.7 Global Interaction Feel

- smooth scroll for same-page navigation;
- hover should be restrained;
- button hover: slightly increase brightness or translate `-1px`;
- button active: translate back to `0`;
- no bouncing animations;
- no parallax required;
- FAQ accordion opens smoothly within 180–250ms.

---

# 5. Asset Contract

The coding agent should look in `/assets` first.

Recommended asset naming convention:

```text
/assets/
  logo-jobify.svg
  logo-jobify-white.svg
  hero-megaphone.webp
  hero-search.webp
  hero-resume-document.webp
  avatar-stack.webp
  testimonials-collage.webp
  trusted-logos.webp
  icon-upload.svg
  icon-arrow-right.svg
  icon-plus.svg
```

If the user supplies individual testimonial images instead of a collage:

```text
/assets/testimonials/
  testimonial-01.webp
  testimonial-02.webp
  ...
```

If individual trusted logos are supplied:

```text
/assets/trusted/
  instacart.svg
  lyft.svg
  nyu.svg
  stanford.svg
  university-michigan.svg
  datadog.svg
```

### Asset Rendering Rules

- do not redraw supplied logos;
- do not recolor company logos unless source does;
- preserve transparent backgrounds;
- use `object-fit: contain` for brand logos;
- testimonial screenshots should not be stretched;
- hero illustrations should preserve their existing glow.

---

# 6. Site Architecture and Routing

Recommended routes:

```json
{
  "/": "Public one-page landing site",
  "/ats": "Optional direct ATS upload route; may redirect/anchor to upload",
  "/ats/intake": "Short role / experience / location form",
  "/ats/results": "ATS results dashboard"
}
```

A cleaner implementation may keep the ATS flow client-side:

```text
/ → upload
/ats?step=intake
/ats?step=processing
/ats?step=results
```

Either architecture is acceptable, but browser refresh must not produce a broken state.

---

# 7. Navigation & Internal Linking

## 7.1 Header Navigation

SOURCE-LOCKED labels:

- Home
- Pricing
- About Us
- Contact Us

Behavior:

```json
{
  "Home": "#home",
  "Pricing": "#pricing",
  "About Us": "#about",
  "Contact Us": "https://wa.me/917207240653"
}
```

### About Us Mapping

There is no standalone About section in the approved wireframe.

`About Us` must:
1. smooth-scroll to the FAQ section (`#about`);
2. automatically open the first FAQ item:
   **“Who are we, and how can we help with your job search?”**
3. move keyboard focus to that accordion heading after scrolling.

This keeps the one-page architecture intact while making the About Us navigation intentional rather than merely approximate.

### Sticky Header

Desktop/tablet:
- header remains sticky after the user begins scrolling;
- use a white/semi-opaque background with light backdrop blur;
- preserve the original white-space-heavy visual style;
- subtle bottom border/shadow may appear only after scroll;
- header must not visibly jump when sticky state activates.

Active section state:
- `Home`, `Pricing`, and `About Us` should update as the user scrolls;
- active item gets a subtle brand-purple text/underline state;
- use `IntersectionObserver` rather than scroll-event-heavy logic.

Mobile:
- replace desktop nav with a hamburger menu;
- keep JOBIFY logo visible;
- menu contains Home, Pricing, About Us, Contact Us;
- Contact Us opens WhatsApp.

## 7.2 CTA Behavior Map

```json
{
  "Hero choose_file": "open native file picker",
  "Join The club": "https://wa.me/917207240653",
  "ATS Resume Get Started": "https://wa.me/917207240653",
  "LinkedIn/Naukri Get Started": "https://wa.me/917207240653",
  "Personal Portfolio Get Started": "https://wa.me/917207240653",
  "Job Applications Book a Call": "https://wa.me/917207240653",
  "FAQ Talk to Us": "https://wa.me/917207240653",
  "Header Contact Us": "https://wa.me/917207240653",
  "ATS Results Get Your ATS Resume": "https://wa.me/917207240653",
  "ATS Results Talk to Us": "https://wa.me/917207240653"
}
```

Use a single implementation constant for the WhatsApp destination:

```ts
const LINKS = {
  WHATSAPP: "https://wa.me/917207240653",
  LINKEDIN_COMPANY: "https://www.linkedin.com/company/jobify-jobs",
  LINKEDIN_CAREER: "https://www.linkedin.com/company/jobify-jobs/?viewAsMember=true",
  INSTAGRAM: "https://www.instagram.com/jobify.jobs/",
  FACEBOOK: "https://www.facebook.com/jobify.jobs/"
};
```

For WhatsApp CTAs, optionally prefill a short context-aware message (e.g. “Hi Jobify, I’m interested in the ATS Resume service.”), but never change the destination number.

---

# 8. SECTION 01 — Hero / Home

**Source:** PDF page 1  
**Section ID:** `home`  
**Reference canvas:** 960 × 600

## 8.1 Section Purpose

- establish JOBIFY brand;
- communicate core positioning;
- make free ATS scan the primary interaction;
- provide the main website navigation.

## 8.2 Reference Geometry

### Header

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Logo asset envelope | 40.29 | 36.69 | 111.75 | 48.75 |
| Home text | 342.25 | 51.46 | 36.39 | 18.20 |
| Pricing text | 460.66 | 51.46 | 38.66 | 18.20 |
| About Us text | 585.48 | 51.46 | 52.22 | 18.20 |
| Contact button asset envelope | 807.85 | 44.39 | 111.09 | 33.70 |

Header target height: approximately **100 design units**.

Navigation should feel vertically centered around `y ≈ 60`.

### Hero Heading

Source text:

> We Make You Job Ready

Structure:

- black: `We Make`
- purple: `You Job`
- black: `Ready`

Source text span:

```json
{
  "combined_bbox": [211.47, 164.34, 748.52, 230.43],
  "font": "Poppins SemiBold",
  "font_size_reference": 46.7,
  "color_black": "#121212",
  "color_highlight": "#6A50E2",
  "alignment": "center"
}
```

Target implementation:

```css
font-size: clamp(42px, 4.85vw, 64px);
font-weight: 600;
line-height: 1.08;
letter-spacing: -0.035em;
```

At the 960 reference viewport, aim for approximately **47px**.

### Subtitle

Text:

> ATS-friendly resumes, career profiles, and job application support  
> tailored to your goals.

Geometry:

```json
{
  "line_1_bbox": [252.06, 234.97, 729.53, 255.97],
  "line_2_bbox": [411.60, 255.97, 570.00, 276.97],
  "font_size": 15,
  "font": "Poppins ExtraLight",
  "color": "#121212",
  "alignment": "center",
  "line_height": 21
}
```

Use max-width around **500px** at 960 reference size.

### Social Proof Micro-Badge

Asset envelope:

```json
{
  "bbox": [375.60, 288.82, 573.60, 327.07],
  "visual_width": 198,
  "visual_height": 38.25
}
```

Contains:
- 3 small overlapping avatars;
- text `3500+ Job Seekers Helped` (approved production claim);
- white / lightly outlined badge.

Use supplied asset if available.

### Hero Decorative Assets

Left megaphone:

```json
{
  "bbox": [42.19, 210.70, 139.69, 301.45],
  "width": 97.50,
  "height": 90.75
}
```

Right search icon:

```json
{
  "bbox": [836.05, 129.00, 917.80, 210.75],
  "width": 81.75,
  "height": 81.75
}
```

These are decorative:
- `aria-hidden="true"`;
- non-interactive;
- hide or reposition on narrow screens.

## 8.3 ATS Upload Card

The full visual is embedded as an image in the source PDF, but the rendered visible card occupies approximately:

```json
{
  "x": 296,
  "y": 343,
  "width": 365,
  "height": 239,
  "border_radius": 24,
  "border_style": "dashed",
  "border_color": "muted lavender-gray",
  "border_width": "3px"
}
```

Use this as the primary implementation target.

Card content hierarchy:

1. resume/document icon
2. heading
3. accepted file formats
4. primary upload button

Heading:

> Get Your Free ATS Score

Exact extracted text geometry:

```json
{
  "bbox": [380.04, 434.67, 578.44, 457.64],
  "font": "Poppins Bold",
  "font_size": 16.41
}
```

Accepted formats:

> PDF · DOCX

Visual target:
- 12–13px;
- muted gray;
- center aligned.

Upload button:
- approx width: 300px;
- approx height: 47px;
- rounded 12–14px;
- gradient purple;
- white upload icon;
- white bold label `Choose file`.

### Upload Interaction

Accepted formats for V1:

```json
{
  "pdf": ["application/pdf"],
  "docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
}
```

The approved wireframe currently displays `PDF · DOCX · JPG · PNG`, but production V1 must display only:

> PDF · DOCX

Do not advertise JPG/PNG until OCR support is actually implemented.

Maximum V1 upload size:
`10 MB`.

Behavior:

1. click card or button → file picker;
2. drag-and-drop supported;
3. validate type and size;
4. on valid file → persist file in local/session flow state;
5. redirect to ATS intake step;
6. do not calculate result directly on the landing section.

Error examples:
- unsupported type;
- file exceeds maximum;
- empty / unreadable file.

## 8.4 Section Background

Two large low-opacity decorative gradient images are embedded in the PDF and extend beyond the canvas.

For code:
- recreate using radial gradients OR supplied background asset;
- preserve white central reading area;
- lavender should primarily appear top-center and lower-left/lower-right edges.

## 8.5 Responsive Rules

### Tablet
- keep logo left;
- nav may reduce gap;
- hero heading max 2 lines;
- decorative icons can shrink by ~20%;
- upload card width `min(82vw, 430px)`.

### Mobile
- hide decorative megaphone and search illustration if they compete with content;
- nav becomes a simple compact header;
- heading 38–44px;
- subtitle 15–16px;
- upload card width calc `100% - 32px`;
- card button width 100%;
- preserve `Get Your Free ATS Score` above fold as much as possible.

---

# 9. SECTION 02 — Testimonials / Social Proof

**Source:** PDF page 2  
**Section ID:** `testimonials`

## 9.1 Purpose

Demonstrate real customer outcomes and trust without long-form case studies.

## 9.2 Heading

Text:

> Straight From Our Clients

Geometry:

```json
{
  "bbox": [331.22, 57.21, 628.77, 92.93],
  "font": "Poppins Bold",
  "font_size": 25.515,
  "color": "#121212",
  "alignment": "center"
}
```

Recommended CSS at reference size:
- 26px;
- 700;
- line-height ~1.2.

## 9.3 Subtitle

Text:

> Real stories from job seekers we’ve helped move closer to their next  
> opportunity.

Geometry:

```json
{
  "line_1_bbox": [232.52, 103.95, 727.46, 124.95],
  "line_2_bbox": [436.43, 124.95, 523.56, 145.95],
  "font_size": 15,
  "font": "Poppins ExtraLight",
  "alignment": "center"
}
```

## 9.4 Testimonial Collage

Source image envelope:

```json
{
  "bbox": [49.69, 144.45, 909.94, 355.20],
  "width": 860.25,
  "height": 210.75
}
```

This collage is the dominant section object.

Implementation:
- if `testimonials-collage.webp` exists, use it exactly;
- max-width ≈ 860/960 = **89.6vw reference proportion**;
- `object-fit: contain`;
- no extra card behind it;
- do not crop screenshot content.

If built from individual assets:
- reproduce the same irregular mosaic rather than uniform equal cards;
- retain varied screenshot widths and vertical offsets;
- do not convert into a standard carousel unless mobile requires it.

## 9.5 CTA

Text:

> Join The club

Source button asset:

```json
{
  "bbox": [423.36, 379.73, 534.44, 413.43],
  "width": 111.08,
  "height": 33.70,
  "font_size": 12.9975,
  "font_weight": 300,
  "text_color": "#F9F9F9"
}
```

Button:
- pill shape;
- purple gradient;
- centered.

Destination:
`https://wa.me/917207240653`.

## 9.6 Trusted Logos Strip

Source visual envelope:

```json
{
  "bbox": [0.00, 458.93, 960.00, 512.18],
  "height": 53.25
}
```

Text at left:

> Trusted by Folks from

Then logos:
- Instacart
- Lyft
- NYU
- Stanford University
- University of Michigan
- Datadog

Implementation rules:
- the final trusted logos will be supplied by the owner in `/assets`; do not hard-code the temporary wireframe brands as production content;
- render the supplied logos as an **infinite horizontal marquee**;
- duplicate the logo sequence in the DOM only as needed to create a seamless loop;
- desktop animation duration target: 24–32 seconds per full cycle;
- linear timing;
- no pause or jump at loop boundary;
- no user interaction required;
- preserve native logo colors;
- vertically align optical centers;
- keep generous spacing between logos (~56–80px desktop);
- use soft edge masking/fade at far left/right if it visually improves the loop;
- on `prefers-reduced-motion: reduce`, disable the continuous animation and show a static/wrapping logo row;
- on mobile, reduce logo gap and maintain smooth horizontal movement rather than compressing logos excessively.

---

# 10. SECTION 03 — Pricing

**Source:** PDF page 3  
**Section ID:** `pricing`

## 10.1 Purpose

Present four independent services with minimal decision friction.

## 10.2 Heading Block

Heading:

> Simple Pricing. Built for Your Career.

Source:

```json
{
  "bbox": [270.28, 86.30, 689.71, 122.02],
  "font": "Poppins Bold",
  "font_size": 25.515,
  "alignment": "center"
}
```

Subtitle:

> Flexible career services designed around your  
> goals and job search.

```json
{
  "font": "Poppins ExtraLight",
  "font_size": 13.137,
  "alignment": "center",
  "line_height": 18.39
}
```

## 10.3 Pricing Card Grid

Exact source card geometry:

| Card | x | y | w | h |
|---|---:|---:|---:|---:|
| ATS Resume | 84.45 | 218.27 | 184.72 | 294.40 |
| LinkedIn / Naukri | 286.58 | 218.27 | 184.72 | 294.40 |
| Personal Portfolio | 497.25 | 218.27 | 184.72 | 294.40 |
| Job Applications | 707.92 | 218.27 | 184.72 | 294.40 |

Horizontal gaps:

```json
{
  "gap_1_2": 17.41,
  "gap_2_3": 25.95,
  "gap_3_4": 25.95
}
```

For implementation, normalize grid gap to **20–26px**, while preserving total alignment and visual width.

Card fill:
`#EFEEF4`.

Card radius:
approximately **22–26px**.

No visible heavy border.

### Grid Container

Approximate:
- x: 84px to 893px;
- width: 809px;
- top: 218px;
- bottom: 513px.

CSS recommendation:

```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  max-width: 810px;
  margin-inline: auto;
}
```

At the 960 reference viewport, card height target:
`~295px`.

## 10.4 Card 1 — ATS Resume

Title:

```text
ATS
Resume
```

Source:
- x ≈ 113;
- y ≈ 229;
- font 20.22px;
- Poppins Bold.

Old price:

> ₹499

- font ≈20.24px bold;
- struck out with red line / brush;
- sale color `#FC583B`.

Current price:

> ₹390

- font ≈24.4px bold.

Feature label:

> Features:

- 12.12px regular.

Features:
- ATS-friendly format
- Role-specific keywords
- Professionally written
- 3 free revisions

Feature font:
- 10.66px regular;
- line spacing ≈19.5px.

CTA:
> Get Started

Approx button envelope:
`x 111.5 → 246.2`, `y 476.65 → 498.19`.

Target:
- width ≈135px;
- height ≈22px in source;
- implement **28–34px minimum CSS height** for accessibility while maintaining visual ratio.

Destination:
`https://wa.me/917207240653`.

## 10.5 Card 2 — LinkedIn / Naukri Optimisation

Title:

```text
Linkedin / Naukri
Optimisation
```

Price:

> ₹950

Features:
- Profile rewrite
- Recruiter visibility
- Personal branding
- Keyword optimisation

CTA:
> Get Started

Destination:
`https://wa.me/917207240653`.

## 10.6 Card 3 — Personal Portfolio

Title:

```text
Personal
Portfolio
```

Price:

> ₹2500

Features:
- Personal portfolio website
- Mobile-friendly design
- Projects & experience
- Customised to your profile

CTA:
> Get Started

Destination:
`https://wa.me/917207240653`.

## 10.7 Card 4 — Job Applications

Title:

```text
Job
Applications
```

Price:

> ₹20 / Per job

Price source:
- Poppins Bold;
- ~21.06px.

Minimum:

> *Minimum 250 applications

Source:
- Poppins Italic;
- ~10.16px.

Features:
- Approved jobs only
- Dedicated career consultant
- Resume & cover letter preparation

CTA:
> Book a Call

Destination:
`https://wa.me/917207240653`.


### Pricing Lock

Production pricing is confirmed:

```json
{
  "ATS Resume": {
    "old_price": "₹499",
    "old_price_style": "visible red strikethrough",
    "current_price": "₹390"
  },
  "Linkedin / Naukri Optimisation": "₹950",
  "Personal Portfolio": "₹2500",
  "Job Applications": {
    "price": "₹20 / Per job",
    "minimum": "250 applications"
  }
}
```

For Job Applications, `Approved jobs only` means:
JOBIFY identifies relevant jobs → the customer approves the jobs → JOBIFY applies on the customer's behalf.

## 10.8 Pricing Mobile Behavior

At <= 900px:
- 2-column grid.

At <= 600px:
- 1-column stack;
- cards max width around 360px;
- center cards;
- preserve CTA near card bottom;
- do not allow content height differences to move button irregularly;
- use flex column with `margin-top:auto` for button.

---

# 11. SECTION 04 — FAQ + About Us

**Source:** PDF page 4  
**Section ID:** `about`

## 11.1 Purpose

This section handles:
- FAQs;
- About Us positioning;
- remaining objections;
- contact conversion.

The first FAQ item is the site's About Us content entry point.

## 11.2 Overall Layout

Two-column desktop layout.

Left content starts around:
`x = 45`.

Right accordion starts around:
`x = 491.25`.

Approx columns:

```json
{
  "left_column_width": 275,
  "middle_empty_space": 170,
  "right_column_width": 424
}
```

## 11.3 Left Heading

Text:

```text
Still have
questions?
```

Source:

```json
{
  "x": 45,
  "y": 68.86,
  "font_size": 24,
  "font": "Poppins Bold",
  "color": "#13072E",
  "line_height": 28.5
}
```

## 11.4 Left Body

Text:

> We’re here to help. Get in touch  
> with us and we’ll answer any  
> questions about our services.

Source:

```json
{
  "x": 45,
  "y": 149.27,
  "font_size": 15.9975,
  "font": "Poppins Light",
  "color": "#8B8D9B",
  "line_height": 18.75
}
```

## 11.5 Talk to Us CTA

Source image/button envelope:
`x 45 → 239.94`, `y 237.69 → 282.69`.

Visible button design:
- purple gradient left section;
- dark-purple square arrow block at right;
- total width ~195px;
- height ~45px;
- outer radius around 12–14px.

Text:
> Talk to Us

Source text:
- Poppins Bold;
- ~16.995px;
- white.

Right arrow tile:
- dark purple `#13072E`;
- width ~37.5px;
- white arrow.

Destination:
`https://wa.me/917207240653`.

## 11.6 FAQ Cards — Exact Geometry

| Item | x | y | w | h |
|---|---:|---:|---:|---:|
| FAQ 1 | 491.25 | 72.31 | 423.78 | 82.13 |
| FAQ 2 | 491.25 | 165.63 | 423.73 | 82.84 |
| FAQ 3 | 491.25 | 269.56 | 423.78 | 82.13 |
| FAQ 4 | 491.25 | 362.06 | 423.78 | 82.13 |
| FAQ 5 | 491.25 | 458.37 | 423.75 | 81.63 |

Fill:
`#EFEEF4`

Stroke:
`#8B8D9B`

Stroke width:
`1.5` source units.

Recommended CSS:
- border `1px solid rgba(139,141,155,.6)`;
- background `#EFEEF4`;
- radius ≈ 15–17px;
- min-height ≈ 82px at reference;
- horizontal padding ≈ 22px;
- right icon zone ≈ 48px.

## 11.7 FAQ Questions

Exact approved questions:

1. **Who are we, and how can we help with your job search?**
2. **How do you create an ATS-friendly resume for me?**
3. **How does your job application service work?**
4. **Can you help me apply for jobs outside my country?**
5. **Do you guarantee interviews or a job?**

Question font:
- Poppins Regular;
- ~20px at reference;
- dark purple `#13072E`;
- 24px source line height.

Plus icon:
- 15 × 15 source units;
- muted gray `#8B8D9B`;
- located ~22px from right side.

## 11.8 Accordion Behavior

Collapsed by default.

Interaction:
- click row or plus;
- expand answer below question inside same card;
- plus rotates to `×` or 45 degrees;
- only one item open at a time is recommended;
- keyboard accessible;
- `aria-expanded`;
- `aria-controls`.

Animation:
`180–250ms ease`.

On expand:
- card height auto;
- answer uses ~14–15px text;
- padding-bottom ~22px;
- no modal.

## 11.9 FAQ Answers

Use the following approved V1 answer copy.

### FAQ 1 — Who are we, and how can we help with your job search?

> JOBIFY is a team of career-support professionals helping job seekers become job-ready and move faster through their search. We create ATS-friendly resumes tailored to your role and target market, optimise LinkedIn/Naukri profiles, build personal portfolios, prepare cover letters, and can also apply to approved jobs on your behalf.

Purpose:
- doubles as the site's About Us content;
- explains the end-to-end positioning in one concise answer;
- should automatically open when the user enters the section through the header `About Us` link.

### FAQ 2 — How do you create an ATS-friendly resume for me?

> We build your resume around your target role, relevant keywords, clear section structure, and ATS-readable formatting. The goal is to make your experience easy for both applicant tracking systems and recruiters to understand, while keeping the resume specific to the roles and locations you are targeting.

### FAQ 3 — How does your job application service work?

> We first understand the roles, locations, and preferences you want to target. We then identify relevant opportunities for you to approve, and our team handles the applications on your behalf. The service starts from a minimum of 250 approved applications and is priced at ₹20 per application.

### FAQ 4 — Can you help me apply for jobs outside my country?

> Yes. JOBIFY supports job seekers targeting opportunities across different countries. We can tailor your resume and profile around the role and target market, and our job-application service can be aligned with the locations you want to pursue.

### FAQ 5 — Do you guarantee interviews or a job?

> No. Final hiring decisions are made by employers, so we do not guarantee interviews or job offers. What we do is improve your resume and profile, strengthen how you present your experience, and help you execute a more consistent and targeted job search.

Content rule:
- do not add guarantees, placement claims, or employer-affiliation claims beyond the copy above without owner approval.

---

# 12. SECTION 05 — Footer

**Source:** PDF page 5  
**Section ID:** `footer`

## 12.1 Overall Geometry

The source page intentionally leaves large white space before the footer begins.

Dark footer begins at:

```json
{
  "x": 0,
  "y": 201,
  "width": 960.68,
  "height_visible": 399,
  "background": "#13072E"
}
```

Top corners:
large rounded radius approximately **38–44px**.

## 12.2 Footer Logo

Source asset envelope:

```json
{
  "bbox": [24.58, 213.54, 179.83, 281.79]
}
```

Text `JOBIFY` extracted around:
`x 77.57`, `y 230.31`.

Use white logo variant.

## 12.3 Footer Columns

### Company

Heading:
> Company

x ≈ 487.5  
y ≈ 234.45

Links:
- Home
- Pricing
- Career

### Documentation

Heading:
> Documentation

Links:
- Contact
- FAQ
- Privacy Policy

### Social

Heading:
> Social

Links:
- Facebook
- Instagram
- Linkedin

All footer headings:
- Poppins Bold;
- 14px reference;
- white.

All footer links:
- Poppins Regular;
- 14px reference;
- white.

Vertical link step:
~27–28px.

## 12.4 Bottom Divider

Source:

```json
{
  "x1": 39.38,
  "x2": 922.50,
  "y": 531.38,
  "stroke_width": 0.75,
  "stroke_color": "approx #ADACB8"
}
```

## 12.5 Copyright

Left:

> © Jobify.in. All Rights Reserved 2026

Source:
- x = 37.5;
- y ≈ 543.96;
- 14px regular;
- white.

Right:

> Terms & Conditions

Source:
- x ≈ 786.14;
- y ≈ 543.96;
- 14px regular;
- white.

## 12.6 Footer Link Map

```json
{
  "Home": "#home",
  "Pricing": "#pricing",
  "Career": "https://www.linkedin.com/company/jobify-jobs/?viewAsMember=true",
  "Contact": "https://wa.me/917207240653",
  "FAQ": "#about",
  "Privacy Policy": "TBD_PRIVACY_URL",
  "Facebook": "https://www.facebook.com/jobify.jobs/",
  "Instagram": "https://www.instagram.com/jobify.jobs/",
  "Linkedin": "https://www.linkedin.com/company/jobify-jobs",
  "Terms & Conditions": "TBD_TERMS_URL"
}
```json
{
  "Home": "#home",
  "Pricing": "#pricing",
  "Career": "TBD",
  "Contact": "TBD_CONTACT_DESTINATION",
  "FAQ": "#about",
  "Privacy Policy": "TBD_PRIVACY_URL",
  "Facebook": "TBD_FACEBOOK_URL",
  "Instagram": "TBD_INSTAGRAM_URL",
  "Linkedin": "TBD_LINKEDIN_URL",
  "Terms & Conditions": "TBD_TERMS_URL"
}
```

---

# 13. Public Page Vertical Composition

The supplied PDF presents each major section on a separate 960 × 600 page. On the website, these pages become a continuous scroll.

Recommended desktop section heights:

```json
{
  "hero": "min-height: 600px",
  "testimonials": "min-height: 600px",
  "pricing": "min-height: 600px",
  "faq": "min-height: 600px",
  "footer_lead_in_plus_footer": "approximately 600px reference composition"
}
```

Do not insert visible hard page breaks between sections.

The background glow should flow naturally between sections.

---

# 14. ATS Upload → Intake Flow

This functional flow is not visible in the PDF but is required by the approved product concept.

The flow should feel like a lightweight extension of JOBIFY, not a generic multi-step enterprise form.

## 14.1 Step 1 — Upload

Entry:
Hero upload card.

On valid upload:
- store the file only in the active browser/session flow;
- navigate in the **same browser tab** to the ATS intake experience;
- do not upload to persistent storage;
- do not create a user account.

## 14.2 Intake Form — Four Micro-Steps

Use a compact four-step wizard rather than showing all fields at once.

Chrome:
- small JOBIFY logo top-left or centered;
- simple `Back` action where relevant;
- progress indicator: `1 of 4`, `2 of 4`, etc.;
- no public site footer;
- no pricing/testimonial navigation;
- white background + subtle lavender ambient gradient;
- one centered rounded pale-lilac card.

### Step 1 — Desired Role

Prompt:

> What role are you targeting?

Field:
- free-text;
- required;
- placeholder examples: `Project Analyst`, `Data Analyst`, `Software Engineer`;
- trim whitespace;
- minimum 2 meaningful characters;
- preserve the original user-entered value for the report.

Reason:
- drives role-keyword matching where a predefined alias/template exists;
- if no role-specific template exists, trigger the generic fallback template described below.

CTA:
`Continue`

### Step 2 — Target Industry

Prompt:

> Which industry are you targeting?

Field:
- optional searchable select + `Other`;
- examples: Technology, Consulting, Finance, Healthcare, Marketing, Operations, Sustainability, Education, Legal, Retail, Manufacturing, Other.

Reason:
- improves deterministic fallback selection when the exact role is not in the keyword dictionary;
- does not use semantic AI matching.

CTA:
`Continue`

### Step 3 — Experience Level

Prompt:

> What’s your experience level?

Required options:

- Student / Fresher
- 0–2 years
- 2–4 years
- 4–7 years
- 7+ years

Use selectable rounded option cards or a clean select.

CTA:
`Continue`

### Step 4 — Target Country / Market

Prompt:

> Where are you applying?

Field:
- searchable country/market select;
- required;
- allow `Multiple countries / Global`.

Reason:
- stored as report context;
- may select a predefined regional checklist/template where one exists;
- must **not** generate unsupported country-specific legal or hiring claims.

CTA:
`Check My Resume`

### Wizard UX Rules

- preserve entered values when moving Back;
- Enter key advances when valid;
- show inline validation, not alert boxes;
- keep each step visually short;
- step transition 150–220ms fade/slide;
- do not require name, email, phone, or account creation before results;
- free ATS checker is ungated in V1.

## 14.3 Step 3 — Processing

After the fourth intake step, show a short processing state in the same tab.

Copy progression may include:

1. `Reading your resume…`
2. `Checking resume structure…`
3. `Matching role keywords…`
4. `Preparing your ATS report…`

Do not say:
- `AI is analysing your resume`;
- `Our model is thinking`;
- `Recruiter prediction`.

When processing succeeds:
navigate to `/ats/results` or equivalent same-tab application state.

## 14.4 Unknown Role / Boilerplate Fallback

The desired role is intentionally open-ended.

Because V1 does not use AI, the implementation must not pretend every arbitrary title has a bespoke keyword model.

Resolution order:

```text
1. Exact normalized role alias match
2. Known role-family alias match
3. Selected industry template
4. Generic professional-resume keyword/check template
```

Generic fallback behavior:
- still calculate structure, contact, section, page, word-count and formatting checks;
- use a neutral generic keyword bank appropriate for professional resumes;
- label the keyword section:

  “General Keywords to Consider”

- supporting copy:

  “We don’t have a dedicated keyword template for this exact role yet, so this section uses a general resume keyword checklist.”

- never show an error merely because the role is unknown;
- never fabricate role-specific keywords.

---

# 15. ATS Rule Engine — V1 Capability Boundary

The ATS scanner must be deterministic.

Allowed inputs:

- extracted resume text;
- page count;
- word count;
- regex matches;
- presence of headings;
- predefined keywords by target role;
- contact details;
- basic text-extraction signals.

Allowed checks:

```json
{
  "contact_info": true,
  "email_detection": true,
  "phone_detection": true,
  "linkedin_detection": true,
  "experience_heading": true,
  "education_heading": true,
  "skills_heading": true,
  "summary_heading": true,
  "word_count": true,
  "page_count": true,
  "keyword_match": true,
  "special_character_density": true,
  "text_extraction_quality": true,
  "standard_heading_check": true
}
```

Not allowed in V1:

```json
{
  "grammar_intelligence": false,
  "semantic_skill_inference": false,
  "writing_quality_score": false,
  "leadership_score": false,
  "recruiter_appeal": false,
  "hiring_probability": false,
  "job_fit_prediction": false,
  "salary_prediction": false,
  "automatic_rewriting": false
}
```

---

# 16. ATS Score Policy

Business rule:

> Displayed ATS score must never exceed 70.

Implementation:

```ts
displayScore = Math.min(calculatedScore, 70);
```


### Score Interpretation Labels

The score wording should remain improvement-oriented without making false claims.

Use:

```json
{
  "0-30": "Needs major improvement",
  "31-45": "Needs improvement",
  "46-60": "Partially optimised",
  "61-70": "Good base — further optimisation recommended"
}
```

Rules:
- never label 61–70 as “Excellent”, “Strong ATS Resume”, “Highly Competitive”, or “Ready to Apply”;
- do not intentionally misstate a passing check as a failure;
- conversion should come from clear, truthful improvement opportunities rather than fabricated defects;
- every negative recommendation must correspond to an actual failed deterministic rule.

However, keep the displayed metric labelled:

> ATS Readiness Score

and include a disclaimer that it is an indicative rule-based score, not an employer ATS score.

Recommended disclaimer:

> ATS scores are indicative and based on predefined resume checks. Different employers and applicant tracking systems may evaluate resumes differently.

---

# 17. ATS Results Dashboard

This is a product screen, not a marketing page.

## 17.1 Chrome

Include:
- small JOBIFY logo;
- `Scan Another Resume` action.

Do not include:
- public nav links;
- footer;
- social links;
- pricing navigation;
- account menu;
- sidebars.

## 17.2 Dashboard Sections

Order:

1. Header + uploaded resume context
2. Overall ATS score
3. Resume breakdown
4. Role keyword analysis
5. ATS compatibility checks
6. What to improve
7. Optional resume snapshot
8. Small JOBIFY service CTA
9. Disclaimer

## 17.3 Visual Tokens

Use the same:
- Poppins;
- #121212 text;
- #6A50E2 purple;
- #EFEEF4 cards;
- #13072E dark-purple accents;
- soft lavender glow;
- rounded cards.

## 17.4 Score Hero

Mock data:

```json
{
  "ats_score": 64,
  "checks_passed": 12,
  "needs_attention": 4,
  "keywords_found": 8
}
```

Score card:
- dominant card;
- two-column desktop;
- large circular purple progress ring;
- right-side interpretation and three mini-stat cards.

## 17.5 Breakdown

Categories:

```json
[
  {
    "name": "Resume Structure",
    "score": "18 / 20",
    "status": "Strong"
  },
  {
    "name": "ATS Formatting",
    "score": "15 / 20",
    "status": "Good"
  },
  {
    "name": "Keyword Match",
    "score": "17 / 30",
    "status": "Needs Work"
  },
  {
    "name": "Resume Essentials",
    "score": "14 / 20",
    "status": "Good"
  }
]
```

These are illustrative dashboard values; production values must come from deterministic rules.

## 17.6 Keyword Analysis

Use predefined role dictionaries.

For example, Project Analyst:

Found:
- Project Management
- Stakeholder Management
- Excel
- Reporting
- Data Analysis
- Documentation
- Process Improvement
- KPI Tracking

To consider:
- Risk Management
- Project Planning
- Agile
- Power BI
- Resource Planning
- Budget Tracking

Always include:

> Only add keywords that accurately reflect your experience.

## 17.7 Improvement Cards

Each failed rule maps to a predefined recommendation.

Example:

```json
{
  "rule": "SUMMARY_NOT_FOUND",
  "priority": "MEDIUM",
  "title": "Add a professional summary",
  "description": "We couldn’t detect a clearly labelled professional summary section."
}
```

No free-form generative advice.

## 17.8 Product CTA

Compact only.

Heading:
> Want Us to Improve Your Resume?

Copy:
> Our team can create an ATS-friendly resume tailored to your target role.

CTA:
> Get Your ATS Resume

Destination:
`https://wa.me/917207240653`

Secondary:
> Talk to Us

Destination:
`https://wa.me/917207240653`

Price line:
> ATS Resume from ₹390

No footer below dashboard.

---

# 18. State Management

Suggested client-side state:

```json
{
  "uploadedFile": {
    "name": null,
    "type": null,
    "size": null
  },
  "intake": {
    "desiredRole": null,
    "targetIndustry": null,
    "experienceLevel": null,
    "targetLocation": null
  },
  "scan": {
    "status": "idle | extracting | evaluating | complete | failed",
    "result": null
  }
}
```

Storage policy for V1:
- no database;
- no permanent resume storage;
- process the file only for the current scan;
- do not persist raw resume text to localStorage;
- sessionStorage may hold only non-sensitive UI metadata/result data if needed for refresh resilience;
- when the user clicks `Scan Another Resume`, clear active scan state and return to the upload experience.

Recommended same-tab route:
`/ats/results`.

If the results route is opened without a valid current scan:
redirect to the ATS upload/start state.

### Extraction Failure State

If PDF/DOCX extraction fails, show a centered error card:

Heading:
> We couldn’t read this resume.

Body:
> Try uploading a text-based PDF or DOCX file.

Primary CTA:
> Try Again

Behavior:
- clears failed file;
- returns to file picker;
- no technical stack trace shown to user.

---

# 19. Accessibility Requirements

Minimum:
- semantic `header`, `main`, `section`, `footer`;
- one H1 on landing page;
- logical H2 headings for testimonials, pricing, FAQ;
- keyboard-accessible file input;
- visible focus states;
- FAQ buttons are actual `<button>` elements;
- `aria-expanded` on accordions;
- decorative hero assets `aria-hidden=true`;
- alt text for meaningful logos and testimonial content;
- contrast checks;
- minimum practical tap target around 44px on touch devices.

The source's very short pricing CTA buttons may be visually preserved on desktop but should use a larger invisible hit area or increased mobile height for usability.

---

# 20. Performance Requirements

Because this site is visually image-led:

- serve WebP/AVIF where possible;
- SVG for logo/icons;
- lazy-load testimonial collage and trusted-logo strip;
- do not lazy-load above-fold logo / hero icons / upload UI;
- set width and height to avoid CLS;
- preload Poppins only if self-hosted and licensed;
- otherwise load efficiently from approved source;
- avoid unnecessary JavaScript for static sections.

Target:
- Lighthouse Performance > 90 on desktop;
- avoid layout shift;
- usable without animation.

---

# 21. Responsive Breakpoints

Recommended:

```json
{
  "mobile": "<= 600px",
  "tablet": "601px–900px",
  "desktop": ">= 901px"
}
```

Desktop is the primary source-locked layout.

### Responsive adaptation principles

- preserve order;
- preserve brand spacing;
- never shrink body copy below legible size;
- pricing converts 4 → 2 → 1 columns;
- FAQ converts 2 columns → single column;
- testimonial mosaic can scale down or horizontally scroll;
- footer columns stack on narrow screens;
- hero illustration assets can disappear on mobile.

---

# 22. Suggested Component Tree

```text
App
├── LandingPage
│   ├── SiteHeader
│   ├── HeroSection
│   │   ├── HeroDecorations
│   │   ├── SocialProofBadge
│   │   └── ResumeUploadCard
│   ├── TestimonialsSection
│   │   ├── TestimonialsCollage
│   │   ├── JoinClubCTA
│   │   └── TrustedByStrip
│   ├── PricingSection
│   │   └── PricingCard × 4
│   ├── FAQSection
│   │   ├── ContactCTA
│   │   └── FAQAccordion
│   └── Footer
│
└── ATSFlow
    ├── ATSIntake
    ├── ATSProcessing
    └── ATSResults
        ├── ResultsTopBar
        ├── ScoreHero
        ├── ScoreBreakdown
        ├── KeywordAnalysis
        ├── CompatibilityChecklist
        ├── ImprovementList
        ├── ResumeSnapshot
        └── ATSServiceCTA
```

---

# 23. Content Data Model

Keep copy outside JSX where practical.

```json
{
  "pricing": [
    {
      "title": "ATS Resume",
      "oldPrice": "₹499",
      "price": "₹390",
      "features": [
        "ATS-friendly format",
        "Role-specific keywords",
        "Professionally written",
        "3 free revisions"
      ],
      "cta": "Get Started"
    },
    {
      "title": "Linkedin / Naukri Optimisation",
      "price": "₹950",
      "features": [
        "Profile rewrite",
        "Recruiter visibility",
        "Personal branding",
        "Keyword optimisation"
      ],
      "cta": "Get Started"
    },
    {
      "title": "Personal Portfolio",
      "price": "₹2500",
      "features": [
        "Personal portfolio website",
        "Mobile-friendly design",
        "Projects & experience",
        "Customised to your profile"
      ],
      "cta": "Get Started"
    },
    {
      "title": "Job Applications",
      "price": "₹20 / Per job",
      "note": "*Minimum 250 applications",
      "features": [
        "Approved jobs only",
        "Dedicated career consultant",
        "Resume & cover letter preparation"
      ],
      "cta": "Book a Call"
    }
  ]
}
```

FAQ:

```json
{
  "faq": [
    "Who are we, and how can we help with your job search?",
    "How do you create an ATS-friendly resume for me?",
    "How does your job application service work?",
    "Can you help me apply for jobs outside my country?",
    "Do you guarantee interviews or a job?"
  ]
}
```

---

# 24. Visual Regression Checklist

Before considering the landing page complete, capture screenshots at **960px width** and compare against the supplied PDF.

## Page/Section 1

- [ ] logo x/y visually matches
- [ ] nav spacing matches
- [ ] Contact Us button dimensions match
- [ ] heading baseline and line width match
- [ ] `You Job` is purple
- [ ] subtitle wraps exactly into 2 lines
- [ ] hero decorations match size and location
- [ ] social proof badge matches
- [ ] upload card width / height matches
- [ ] upload button width and position match
- [ ] background lavender glow intensity is subtle

## Section 2

- [ ] heading y position matches
- [ ] subtitle 2-line wrap matches
- [ ] testimonial collage occupies ~90% source width
- [ ] Join The club button centered
- [ ] trusted-logo strip baseline matches

## Section 3

- [ ] pricing heading / subtitle centered
- [ ] all 4 cards have equal height
- [ ] cards align top/bottom
- [ ] ATS old price is struck in red
- [ ] all CTAs align on same baseline
- [ ] fourth card minimum note appears under price
- [ ] card fill is #EFEEF4

## Section 4

- [ ] left column begins x≈45
- [ ] FAQ column begins x≈491
- [ ] five cards match ~424px width at source
- [ ] card spacing matches
- [ ] plus icons align consistently
- [ ] Talk to Us arrow tile is dark purple

## Section 5

- [ ] footer begins y≈201 in reference composition
- [ ] top corners are strongly rounded
- [ ] white JOBIFY logo is correct
- [ ] three link columns align
- [ ] divider y≈531
- [ ] copyright and Terms & Conditions align to opposite ends

---

# 25. Functional QA Checklist

## Navigation
- [ ] Home scrolls to hero
- [ ] Pricing scrolls to pricing
- [ ] About Us scrolls to FAQ/About section
- [ ] FAQ footer link scrolls to same FAQ/About section
- [ ] Contact Us opens WhatsApp `+91 7207240653`
- [ ] Talk to Us opens the same WhatsApp destination
- [ ] Join The Club opens the same WhatsApp destination
- [ ] all four pricing CTAs open the same WhatsApp destination
- [ ] ATS results service CTA opens the same WhatsApp destination

## File Upload
- [ ] file picker works
- [ ] drag/drop works
- [ ] PDF accepted
- [ ] DOCX accepted
- [ ] JPG accepted
- [ ] PNG accepted
- [ ] unsupported file rejected
- [ ] oversize file rejected
- [ ] intake opens after valid upload

## FAQ
- [ ] accordion keyboard accessible
- [ ] icon rotates
- [ ] answer animation does not shift page unexpectedly
- [ ] only one open at a time if that behavior is selected

## ATS
- [ ] extracted text stored only as required
- [ ] role selector affects keyword dictionary
- [ ] calculated score is capped at 70
- [ ] no AI claims shown
- [ ] recommendations map to deterministic failed rules
- [ ] results screen has no footer
- [ ] Scan Another Resume resets state

---

# 26. SEO / Metadata

Landing page metadata recommendation:

```json
{
  "title": "Jobify | ATS Resumes, Career Profiles & Job Application Support",
  "description": "Get ATS-friendly resumes, profile optimisation, portfolio support and done-for-you job application services with Jobify."
}
```

ATS results route:
- `noindex`;
- do not expose individual resume data to search engines.

---

# 27. Privacy / Data Handling Requirements

V1 policy is explicit:

- no database is required for resume scans;
- uploaded resumes are not permanently stored;
- process only for the current scan;
- do not publish file URLs;
- do not expose raw resume content to analytics;
- no public indexing of results;
- discard the file/raw extraction state when the session/reset flow ends;
- prefer client-side extraction where practical;
- if server-side extraction is introduced later, use temporary processing only and delete the file after extraction.

The public Privacy Policy must clearly reflect this behavior before launch.

---

# 28. Engineering Notes for Zero-Upfront-Cost V1

Preferred lightweight approach:

### PDF
Use a local/open-source browser or server library capable of extracting text.

### DOCX
Use a DOCX text extractor.

### JPG / PNG

Not supported in V1.

The public upload card must display only:
`PDF · DOCX`

Never advertise a file type that is not supported.

---

# 28A. Analytics Event Instrumentation

Include lightweight analytics hooks from day one, but do not make the first release dependent on a paid analytics platform.

Create a small analytics abstraction so a provider can be connected later.

Recommended events:

```json
[
  "resume_upload_started",
  "resume_upload_validated",
  "resume_upload_failed",
  "ats_intake_started",
  "ats_intake_completed",
  "ats_report_generated",
  "ats_scan_again_clicked",
  "pricing_cta_clicked",
  "whatsapp_contact_clicked",
  "job_application_cta_clicked",
  "testimonial_join_club_clicked",
  "faq_contact_clicked"
]
```

Properties may include:
- CTA source;
- pricing card name;
- file type (PDF/DOCX only);
- experience-level bucket;
- whether fallback keyword template was used.

Do **not** send:
- raw resume text;
- resume file;
- email/phone extracted from the resume;
- full name extracted from the resume;
- other resume PII.

If no analytics provider is configured, the abstraction should no-op cleanly.

# 29. Exactness / Fidelity Caveat

The supplied wireframe is a Canva-exported PDF.

The following are source-verifiable:
- canvas size;
- text content;
- Poppins font variants;
- text bounding boxes;
- many font sizes;
- key colors;
- pricing-card geometry;
- FAQ-card geometry;
- footer geometry;
- embedded image envelopes.

Some objects—especially:
- upload card internals,
- testimonial collage internals,
- trusted-logo strip,
- gradient buttons,
- hero decorative illustrations

are flattened into raster images inside the PDF.

Therefore their internal layer-level properties such as:
- exact original Canva blur radius;
- individual gradient stops;
- object-level transparency;
- hidden padding inside transparent PNGs

cannot be recovered with certainty from the PDF.

For those elements:
1. use exact supplied source assets in `/assets` if available;
2. otherwise visually match the rendered PDF;
3. use the reference measurements in this PRD;
4. validate at a 960px screenshot.

Do not claim arbitrary CSS values are “exact” when the PDF does not expose them.

---

# 30. Owner Inputs Still Required Before Production Launch

The following decisions are now locked:

```json
{
  "whatsapp_contact": "https://wa.me/917207240653",
  "career_destination": "https://www.linkedin.com/company/jobify-jobs/?viewAsMember=true",
  "facebook": "https://www.facebook.com/jobify.jobs/",
  "instagram": "https://www.instagram.com/jobify.jobs/",
  "linkedin": "https://www.linkedin.com/company/jobify-jobs",
  "upload_types_v1": ["PDF", "DOCX"],
  "max_upload_size": "10 MB",
  "ats_score_cap": 70,
  "results_same_tab": true,
  "permanent_resume_storage": false,
  "sticky_header": true,
  "active_nav_state": true,
  "mobile_navigation": "hamburger",
  "pricing_cta_behavior": "WhatsApp",
  "payment_functionality_v1": false,
  "social_proof_count": "3500+ Job Seekers Helped"
}
```

Still required before production launch:

```json
{
  "privacy_policy_url_or_page": "TBD",
  "terms_and_conditions_url_or_page": "TBD",
  "final_trusted_logo_assets": "Owner will place in /assets",
  "final_hero_and_testimonial_assets": "Owner will place in /assets",
  "ats_exact_rule_weights": "TBD during scoring-engine implementation",
  "role_alias_and_keyword_templates": "Build iteratively; open-ended role input with deterministic fallback",
  "resume_privacy_copy": "Must reflect no permanent storage"
}
```

---

# 31. Definition of Done

The project is ready for release when:

1. the 960px desktop implementation visually matches the supplied wireframe section-by-section;
2. the page adapts cleanly at tablet and mobile sizes;
3. every navigation item resolves to a real destination;
4. every service CTA resolves to the intended lead / booking flow;
5. resume upload and validation work;
6. intake fields correctly feed the deterministic scan logic;
7. ATS dashboard displays only capabilities that actually exist;
8. ATS score never exceeds 70;
9. FAQ content is approved;
10. privacy and terms destinations are live;
11. no broken links exist;
12. no placeholder `TBD` remains in production;
13. uploaded resume handling matches published privacy language;
14. results pages are not indexed;
15. visual QA and functional QA checklists pass.

---

# 32. Build Sequence for the Coding Agent

Execute in this order:

```text
01. Create design tokens.
02. Register Poppins typography.
03. Build global background system.
04. Build header.
05. Build hero and ATS upload card.
06. Match hero against PDF at 960px.
07. Build testimonials section.
08. Match testimonials against PDF.
09. Build pricing section.
10. Match card dimensions and typography.
11. Build FAQ/About section.
12. Implement accordion.
13. Build footer.
14. Connect same-page anchor navigation.
15. Connect CTA constants.
16. Build ATS intake screen.
17. Implement text extraction.
18. Implement deterministic scoring rules.
19. Build ATS processing state.
20. Build ATS results dashboard.
21. Implement scan reset.
22. Add responsive rules.
23. Run visual regression.
24. Run accessibility checks.
25. Run functional link QA.
26. Replace all TBD URLs/content.
27. Production build.
```

---

# 33. Final Implementation Principle

The website should not be “inspired by” the wireframe. The wireframe is the visual source of truth.

The coding agent should preserve:
- hierarchy;
- proportions;
- typography;
- spacing relationships;
- color system;
- card geometry;
- content order;
- CTA labels;
- one-page navigation model.

Where the source PDF contains flattened objects and cannot expose an exact layer property, the agent should use the closest visual match and prefer source assets from `/assets`.

The ATS product experience should feel like JOBIFY continues after the upload—not like the user has been sent into a different SaaS product.
