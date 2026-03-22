# CSS

### From Basic to Advanced

CSS  
|-- At-rules (@...)  
|-- Properties (grouped by category)  
 |-- Property name  
 |-- Explanation  
 |-- Possible values / syntax / types  
 |-- Initial value  
 |-- Applies to  
 |-- Inherited?  
 |-- Percentages?  
 |-- Animation type (for transitions / @keyframes)

### 1. At-rules (Rules that start with @)

```
|-- @charset
    |-- Explanation          → must be first (if present), declares character encoding
    |-- Syntax               → @charset "UTF-8";

|-- @import
    |-- Explanation          → import another stylesheet
    |-- Syntax               → @import "style.css";  or  @import url(style.css) screen and (min-width: 600px);
    |-- Media/support layer  → can have media query or supports() or layer name after URL

|-- @layer
    |-- Explanation          → define cascade layers (very important since 2022–2025)
    |-- Syntax               → @layer base;   @layer theme;   @layer utilities;
                         → or @layer base { … rules … }

|-- @namespace
    |-- Explanation          → XML namespaces (very rare in normal web today)

|-- @media
    |-- Explanation          → conditional rules based on media features
    |-- Syntax               → @media (min-width: 768px) and (orientation: landscape) { … }

|-- @supports
    |-- Explanation          → conditional rules based on supported features
    |-- Syntax               → @supports (accent-color: red) and (aspect-ratio: 1 / 1) { … }

|-- @keyframes
    |-- Explanation          → define animation steps
    |-- Syntax               → @keyframes slide { from { } to { } }  or  0%, 50%, 100% { }

|-- @font-face
    |-- Explanation          → define custom font
    |-- Descriptors          → font-family, src, font-weight, font-style, font-stretch, unicode-range, size-adjust, ascent-override, descent-override, line-gap-override, font-display

|-- @font-palette-values
    |-- Explanation          → customise colour font palettes (COLR/CPAL fonts)

|-- @property
    |-- Explanation          → register custom property with type, initial value, inherits (Houdini / advanced)
    |-- Syntax               → @property --my-color { syntax: "<color>"; initial: transparent; inherits: false; }

|-- @container
    |-- Explanation          → container queries (style based on parent container size – 2023+)
    |-- Syntax               → @container (min-width: 400px) { … }

|-- @scope
    |-- Explanation          → limit style rules to subtree (2024–2025 feature)
    |-- Syntax               → @scope (.card) to (.content) { … }

|-- @starting-style        (very new – 2025)
    |-- Explanation          → define styles before element is inserted (for entry animations)
```

### 2. Selectors (very brief – because focus is on properties)

Basic: `*`, `tag`, `.class`, `#id`, `[attr]`, `:hover`, `:nth-child()`, `:is()`, `:where()`, `:has()`, combinators `>`, `+`, `~`, `||`

### 3. Properties – Grouped

#### 3.1 Box Model & Layout

```
|-- display
    |-- Explanation          → most important layout property
    |-- Values               → block | inline | inline-block | flex | inline-flex | grid | inline-grid | flow | flow-root | table | table-cell | table-row | list-item | contents | none | revert-layer

|-- width / height / inline-size / block-size
    |-- Values               → auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>) | stretch

|-- min-width / max-width / min-height / max-height
    |-- Values               → same as above + none (for max-*) + 100% etc.

|-- margin / padding
    |-- Values               → auto | <length> | <percentage>

|-- border / border-*
    |-- border-width         → thin | medium | thick | <length>
    |-- border-style         → none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
    |-- border-color         → <color>

|-- box-sizing
    |-- Values               → content-box | border-box

|-- overflow / overflow-x / overflow-y
    |-- Values               → visible | hidden | clip | scroll | auto | overlay (non-standard)

|-- clip-path
    |-- Values               → <basic-shape> | <geometry-box> | none | url() | polygon(…) | inset(…) | circle() | ellipse() | path(…)

|-- aspect-ratio
    |-- Values               → auto | <ratio> (e.g. 16 / 9 | 1)

|-- box-shadow
    |-- Values               → inset? && <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>?
```

#### 3.2 Flexbox

```
|-- flex-direction       → row | row-reverse | column | column-reverse
|-- flex-wrap            → nowrap | wrap | wrap-reverse
|-- flex-flow            → <flex-direction> || <flex-wrap>
|-- justify-content      → flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right
|-- align-items          → stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end
|-- align-content        → same as justify-content + stretch
|-- place-content        → <align-content> / <justify-content>
|-- flex-grow            → <number> (default 0)
|-- flex-shrink          → <number> (default 1)
|-- flex-basis           → content | auto | <width>
|-- flex                → none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
|-- gap / row-gap / column-gap
    |-- Values           → <length> | <percentage> | normal
```

#### 3.3 Grid

```
|-- grid-template-columns / grid-template-rows
    |-- Values               → none | <track-list> | <auto-track-list> | subgrid | masonry (experimental)

|-- grid-template-areas      → "header header" "main sidebar" ". footer"

|-- grid-template            → shorthand for above three

|-- grid-auto-columns / grid-auto-rows
    |-- Values               → <track-size>+

|-- grid-auto-flow           → row | column | row dense | column dense

|-- grid                     → very complex shorthand

|-- grid-area                → <row-start> / <column-start> / <row-end> / <column-end>   or named area

|-- place-self / justify-self / align-self
    |-- Values               → auto | normal | stretch | start | end | center | baseline …
```

#### 3.4 Positioning

```
|-- position             → static | relative | absolute | fixed | sticky
|-- inset / top / right / bottom / left / inset-block / inset-inline
    |-- Values           → auto | <length> | <percentage>
|-- z-index               → auto | <integer>
```

#### 3.5 Typography & Text

```
|-- font-family          → <family-name> | <generic-family> | system-ui | ui-serif | math | emoji | fangsong …
|-- font-size            → xx-small … xx-large | larger | smaller | <length> | <percentage>
|-- font-weight          → normal | bold | bolder | lighter | 100 | 200 … 900
|-- font-style           → normal | italic | oblique <angle>?
|-- font-stretch         → ultra-condensed … ultra-expanded | <percentage> 75%–125%
|-- line-height          → normal | <number> | <length> | <percentage>
|-- letter-spacing       → normal | <length>
|-- word-spacing         → normal | <length>
|-- text-transform       → none | capitalize | uppercase | lowercase | full-width | full-size-kana
|-- text-decoration-line  → none | underline | overline | line-through | blink (ignored)
|-- text-decoration-style → solid | double | dotted | dashed | wavy
|-- text-decoration-color → <color>
|-- text-decoration-thickness → auto | from-font | <length> | <percentage>
|-- text-decoration       → shorthand
|-- text-underline-offset → auto | <length> | <percentage>
|-- text-align            → start | end | left | right | center | justify | match-parent | justify-all
|-- text-justify          → auto | inter-character | inter-word | none (mostly legacy)
|-- white-space          → normal | pre | nowrap | pre-wrap | pre-line | break-spaces
|-- word-break            → normal | break-all | keep-all | break-word (legacy)
|-- overflow-wrap / word-wrap → normal | break-word | anywhere
|-- hyphens              → none | manual | auto
|-- text-wrap            → wrap | nowrap | balance | pretty | stable (new 2024–2025)
```

#### 3.6 Colors & Backgrounds

```
|-- color                → <color>
|-- background-color     → <color>
|-- background-image     → none | url() | gradient functions | image() | element() | cross-fade() …
|-- background-position  → [ [ left | center | right ] || [ top | center | bottom ] ] | <length-percentage>
|-- background-size      → auto | cover | contain | <length-percentage>
|-- background-repeat    → repeat | repeat-x | repeat-y | space | round | no-repeat
|-- background-attachment → scroll | fixed | local
|-- background-clip      → border-box | padding-box | content-box | text
|-- background-origin    → same as clip
|-- background-blend-mode → normal | multiply | screen | overlay … hue | luminosity
|-- background           → very longhand shorthand
|-- accent-color         → auto | <color>
|-- caret-color          → auto | <color>
|-- opacity              → <number [0,1]> | <percentage>
```

#### 3.7 Filters, Blend, Effects

```
|-- filter               → none | brightness() contrast() drop-shadow() grayscale() hue-rotate() invert() opacity() saturate() sepia() blur() url()
|-- backdrop-filter      → same as filter
|-- mix-blend-mode       → normal | multiply | screen … difference | exclusion
```

#### 3.8 Transforms & Transitions & Animations

```
|-- transform            → none | matrix() | translate() rotate() scale() skew() perspective() …
|-- transform-origin     → [ left | center | right | top | bottom | <length-percentage> ]{1,2}
|-- transform-style      → flat | preserve-3d
|-- perspective          → none | <length>
|-- perspective-origin   → <position>

|-- transition-property  → none | all | <custom-ident>#
|-- transition-duration  → <time>#
|-- transition-timing-function → ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier() | steps() | jump-…
|-- transition-delay     → <time>#
|-- transition           → shorthand

|-- animation-name       → none | <keyframes-name>#
|-- animation-duration   → <time>#
|-- animation-timing-function → same as transition
|-- animation-iteration-count → <number> | infinite
|-- animation-direction  → normal | reverse | alternate | alternate-reverse
|-- animation-play-state → running | paused
|-- animation-fill-mode  → none | forwards | backwards | both
|-- animation-timeline   → auto | <scroll-timeline-name> | <view-timeline-name> | <time-range>
|-- animation            → shorthand
```

#### 3.9 Custom Properties & Cascade

```
|-- --* (custom properties)
    |-- Values               → almost anything
    |-- Syntax               → --main-color: #0066cc;

|-- initial / inherit / unset / revert / revert-layer
```

#### 3.10 Scroll & Overscroll

```
|-- scroll-behavior      → auto | smooth
|-- overscroll-behavior  → contain | none | auto
|-- scroll-snap-type     → none | [ x | y | block | inline | both ] [ mandatory | proximity ]
|-- scroll-padding*      → <length-percentage>
```

#### 3.11 Miscellaneous Modern / 2024–2026

```
|-- container-type       → normal | size | inline-size | block-size | style (experimental)
|-- container-name       → <custom-ident>
|-- field-sizing         → fixed | content (new – controls <input>/<textarea> size)
|-- text-box             → <edge> (trim-leading / trim-trailing – very new)
|-- initial-letter       → normal | <number> <integer>?
|-- hanging-punctuation  → none | [ first || [ force-end | allow-end ] || last ]
```

This list covers ~95% of properties you will actually use in 2025–2026.

The most frequently used / changed / discussed properties in modern CSS (2024–2026):

- container queries (@container, container-type, container-name)
- cascade layers (@layer)
- :has()
- text-wrap: balance / pretty
- accent-color
- anchor positioning (position-anchor, inset-area, … – still maturing in 2026)
- scroll-driven animations (animation-timeline: scroll(), view())
- @starting-style
- field-sizing
