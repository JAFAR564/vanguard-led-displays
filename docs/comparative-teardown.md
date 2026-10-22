# Teardown: why the Lumora concepts read better than Vanguard

Two reference pages: `digital-advertising-billboards.vercel.app/atrium` and `/pixel`.
Measured against `vanguard-led-displays.vercel.app`.

---

## 0. What we are actually comparing

| | Lumora | Vanguard |
| --- | --- | --- |
| Deliverable | **two concept landing pages** | one production site |
| Pages | 2 (+ an index that says "two landing page concepts") | homepage, about, 404, form API |
| Sections | 6 | 8 |
| Words | ~345 (Atrium) | ~1,203 |
| Images | 9 (Atrium), 9 (Pixel) | 4 |
| Case study | none | one, with a 62-second field video |
| Certificates / standards | none | SANS 10160, SANS 10142-1, PMR 29(2), POPIA |
| Legal / privacy | none visible | privacy, POPIA, footer register |

That framing matters. He shipped **options**; we shipped **liability**. A concept page has no
obligations — no certificate to substantiate, no privacy notice, no case study someone can check.
Both are legitimate, but they are not the same product, and part of the density difference is
simply that ours has to carry evidence.

That said, his pages are better at one specific job: **being understood in five seconds**. That
part is absolutely transferable, and the rest of this document is about how.

---

## 1. The single number that explains the gap

> **Lumora: one image every 38 words. Vanguard: one image every 300 words.**

That is an eight-fold difference, and it is the whole story. Everything else in this document is
downstream of it. "Food for the eyes" is not a colour palette or a typeface — it is the ratio of
image to text.

Context for the ratio:

| | Words | Images | Words per image |
| --- | ---: | ---: | ---: |
| Atrium | 345 | 9 | 38 |
| Pixel | ~360 | 9 | 40 |
| **Vanguard** | **1,203** | **4** | **300** |

And it is worse than that on our side, because our four images are **three photographs of two
buildings**, all shot in the same flat overcast. His nine are nine different scenes.

We spent the last four rounds tightening copy from 1,395 words to 1,203. That was correct, but it
was optimising the numerator. The ratio is the thing.

---

## 2. Five measurable differences

### 2.1 Who the sentence is about

I counted every sentence in `site.ts` (98) and in the Atrium copy (29).

| | Vanguard | Atrium |
| --- | ---: | ---: |
| Sentences opening with "you / your" | 2% | — |
| Sentences opening with "we / our" | 5% | — |
| Sentences opening with a thing ("the / a / this") | 21% | — |
| "you / your" per 100 words | **0.5** | **3.7** |
| Mean sentence length | 9.8 words | 11.2 words |

Look at the mean sentence length: **ours are already shorter than his.** Length was never the
problem. The problem is the grammatical subject.

- Ours: *"Final specification is fixed by the survey."* — a fact about a process.
- His: *"Tell us what you're after and we'll come back within one working day."* — a thing that
  happens to you.

We also carry **24 passive constructions**, which is roughly one every four sentences. That is
appropriate for a specification document and wrong for a hero section.

### 2.2 What a caption is for

| | Caption |
| --- | --- |
| Lumora | "**Community nights** — Movies, big matches and events on the lawn." |
| Vanguard | "Plate 02 — cabinet rigging during installation, Garden Route." |

His caption says what the picture *does for you*. Ours is a catalogue entry. Same photograph, same
length, opposite job. This is a pure copy fix and costs nothing.

### 2.3 Where the numbers live

His hero is followed immediately by four reassurance chips: **Daylight bright · IP65 · 500 mm ·
24/7**. Four facts, four words or fewer each, above the fold.

Ours has the same facts — `IP65 front and rear`, `10,000 nits`, `3,840 Hz` — in a two-column
register at section 05, twelve rows deep, in mono type. A trustee scanning for "will this survive
the weather" has to reach the bottom of the page.

We are not short of numbers. We are hiding them in the appendix.

### 2.4 One funnel or two

Atrium splits the page in half: **For brands** and **For centres and estates**, each with three
bullets and its own button. One page, two buyers, two doors.

We serve three property types and two commercial models and offer every one of them the same
"Commission a site survey" button. That is efficient and it is undifferentiated.

### 2.5 The step sequence

| | Lumora | Vanguard |
| --- | --- | --- |
| Structure | Step 1–4, benefit line each | Stage 01–04, body + deliverable + certificate badge |
| Reading time | ~15 seconds | ~45 seconds |

Ours is better content and worse pacing. The certificates are the most persuasive asset we have
and they are currently the *fourth* thing you read in each card, after a body paragraph about
process. They should be a visual spine, not a footnote.

---

## 3. What he did with the tools (reverse-engineered)

**Higgsfield is not a design tool.** It is a multi-model image and video generator — Soul, Soul
Cinema, Nano Banana, Seedance, Kling, Veo, Sora, all under one subscription, plus camera control
(Cinema Studio), palette locking (Soul HEX) and character consistency (Soul ID). Claude writes the
code; Higgsfield supplies the pictures. The design quality is not from the image model — it is
from **what he asked for, nine times, consistently.**

### 3.1 The shot list is the skill, not the prompt

Count what he actually has: atrium, escalators, food court, entrance at dusk, shoppers walking
past, marketers with a laptop, a cabinet module on white, a macro of red-green-blue diodes,
residents watching a film at night, gloved hands fitting a cabinet, an estate gatehouse at dusk,
raindrops on a screen face.

That is a **12-frame shot list**, not a hero image. Each frame answers a different buyer question:

| Frame | Question it kills |
| --- | --- |
| Atrium / escalators / food court | "Where does it go, and will people see it?" |
| Entrance at dusk | "Does it work at night without dominating?" |
| Cabinet module, diodes macro | "What is it actually made of?" |
| Gloved hands | "Who fits it?" |
| Residents at night | "What is it like to live with?" |
| Marketers with laptop | "Who am I buying from?" |
| Raindrops | "Does it survive weather?" |

Our four images answer one question — "what did it look like on the day?" — very well, and nothing
else.

### 3.2 The prompt pattern

The output implies a three-part structure, applied to every frame:

```
[SUBJECT + PLACE]        a wide LED wall at the end of a bright mall atrium
+ [SCREEN IS THE LIGHT]  the screen is the brightest object, light spilling onto the floor
+ [FIXED STYLE BLOCK]    full-frame camera, 24mm, f/2.8, natural mixed light,
                         muted concrete palette, no text on screen, photoreal
```

The style block is the important part and it must be **copied verbatim into every prompt**. The
look of a set comes from holding the variables constant and changing only the subject. Nine
one-off prompts produce nine unrelated pictures; that is the most common failure.

Two craft details worth stealing:

- **Generate at the slot's aspect ratio**, not one ratio and crop later. His portrait totem frame
  was born portrait.
- **Keep text off the screens.** Image models garble lettering. Either prompt "screen displaying
  an abstract colour field" or composite real content afterwards. Several of his frames read as
  abstract or soft content, which is likely not an accident.

### 3.3 What Claude actually contributed

Not the visuals. The structure: a persona split, a four-step process, a two-column objection
handling block ("You keep control / We do the work"), a form with a role dropdown. That is
copywriting discipline — short declaratives, second person, one idea per block. It is the same
skill that produced "People skip ads on their phones. They can't skip a screen two storeys tall."

Note the honesty check built into that: he is selling advertising reach, so an imagined mall is a
fair illustration. We sell certified installations, so an imagined install would be a false claim.

---

## 4. What is transferable — and what is not

### Copy it

1. **The words-per-image ratio.** Target one image per 90 words on the homepage. That is 13 images,
   up from 4.
2. **Benefit captions.** Rewrite every `caption` string as *label + what it does for the reader*.
3. **A stat strip above the fold.** Four facts from `specifications`, four words each.
4. **A persona fork.** "For estates" / "For advertisers" as two doors, at the commission section.
5. **Second person in the hero and the FAQ.** Raise second-person density from 0.5 to ~2 per 100
   words without adding a word.

### Do not copy it

1. **Invented installations.** Our whole argument is that the work is documented. One fabricated
   install and the certificate badges become decoration.
2. **The bright editorial palette** for the compliance half of the page. A trustee buys on
   competence; the current paper-and-hairline register is doing real work there.

### The honest middle path

Three kinds of image are legitimate for us, and we currently have one:

| Type | Example | Status |
| --- | --- | --- |
| **Evidence** — real, on site | the George estate install | we have 3 |
| **Technical illustration** — a diagram, not a claim | diode macro, cabinet module, pitch at 3 / 10 / 30 m, exploded mounting detail | none |
| **Labelled visualisation** — explicitly hypothetical | "Visualisation — P6.67 at 12 m viewing distance" | none |

A diode macro is not a photograph of our screen. It is a diagram of what a diode is. That is
honest, it is standard in engineering marketing, and it is exactly what a generator is good at.
The label carries the honesty.

**Also free:** the 62-second field video contains at least six usable stills — wide approach, close
product shot, night frame, match frame, terrace frame. We currently use one poster frame from it.
Harvesting those costs nothing and is 100% real.

---

## 5. Recommendation

| Move | What | Effort | Effect |
| --- | --- | --- | --- |
| **A** | Benefit captions, stat strip above the fold, persona fork at commission, second-person pass on hero + FAQ | small — copy and layout only | closes 2.1, 2.2, 2.3, 2.4 |
| **B** | Harvest 6 stills from the field video + build 4 technical illustrations (diode, cabinet, pitch-at-distance, mounting) | medium — assets, labelled | takes words-per-image from 300 to ~90 |
| **C** | A second page for the advertising buyer, mirroring his two-door structure | large — a new route | competes for the brand side of the business |

**A is worth doing today.** It is pure editing, it cannot misrepresent anything, and it addresses
four of the five measured gaps.

**B is the real answer to "food for the eyes"** and is the only part that needs generated imagery.
It should ship with visible "technical illustration" and "visualisation" labels.

**C is a business decision, not a design one.** It only makes sense if advertising revenue is a
business you actually want.
