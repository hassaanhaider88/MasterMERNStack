# HTML

Hyper Text Markup language by Tim Berners Lee in 1991

#### Declaration (Essential – Not a Tag)

```
|-- <!DOCTYPE html>
    |-- Explanation: Must be the very first line of every HTML document. Tells the browser this is HTML5 (Living Standard). Without it, browsers may enter "quirks mode" (old rendering).
    |-- Attributes: None.
```

#### Global Attributes

(Apply to **all tags** except a few like `<html>`, `<head>`, `<title>`, etc. where noted. These are explained once here to avoid repetition.)

```
|-- accesskey
    |-- Explanation: Keyboard shortcut hint (e.g., Alt + key on Windows).
    |-- Possible values: Space-separated list of characters (e.g., "a", "s", "ctrl+a" – but single printable chars preferred).
    |-- <button accesskey="c" onclick="alert('hello')">Alt + C</button> click alt + c
|-- anchor
    |-- Explanation: Links a positioned popover/anchored element to another element’s ID.
    |-- Possible values: Any valid ID string (must match an existing element’s id).
|-- autocapitalize
    |-- Explanation: Controls auto-capitalization on mobile/virtual keyboards.
    |-- Possible values: `off` | `none` | `on` | `sentences` | `words` | `characters`.
|-- autocorrect (non-standard but widely supported)
    |-- Explanation: Enables/disables automatic spelling correction.
    |-- Possible values: `on` | `off` (boolean-style).
|-- autofocus
    |-- Explanation: Element receives focus automatically when page loads (or dialog opens).
    |-- Possible values: Boolean (presence = true; or `autofocus=""`).
|-- class
    |-- Explanation: For CSS styling and JavaScript selection.
    |-- Possible values: Space-separated list of class names (tokens).
|-- contenteditable
    |-- Explanation: Makes element editable by user.
    |-- Possible values: `true` | `false` | `plaintext-only` | (empty string = true).
|-- data-*
    |-- Explanation: Custom data storage (accessible via JS `dataset`).
    |-- Possible values: Any string value; attribute name must start with `data-` followed by valid name.
|-- dir
    |-- Explanation: Text direction.
    |-- Possible values: `ltr` | `rtl` | `auto`.
|-- draggable
    |-- Explanation: Enables native drag-and-drop.
    |-- Possible values: `true` | `false`.
|-- enterkeyhint
    |-- Explanation: Custom label for Enter key on virtual keyboards.
    |-- Possible values: `enter` | `done` | `go` | `next` | `previous` | `search` | `send`.
|-- exportparts
    |-- Explanation: Exports Shadow DOM parts to parent.
    |-- Possible values: Comma-separated list of part names.
|-- hidden
    |-- Explanation: Hides element (not rendered).
    |-- Possible values: Boolean (presence hides it). Do **not** use for legitimate content.
|-- id
    |-- Explanation: Unique identifier (used by CSS, JS, anchors, ARIA).
    |-- Possible values: Any valid ID string (must be unique in document).
|-- inert
    |-- Explanation: Ignores all user input/events on element and descendants.
    |-- Possible values: Boolean (presence = true).
|-- inputmode
    |-- Explanation: Hints virtual keyboard type.
    |-- Possible values: `none` | `text` | `decimal` | `numeric` | `tel` | `search` | `email` | `url`.
|-- is
    |-- Explanation: Turns standard element into customized built-in element (Web Component).
    |-- Possible values: Name of registered custom element.
|-- itemid, itemprop, itemref, itemscope, itemtype
    |-- Explanation: Microdata (structured data for search engines).
    |-- Possible values: URLs for itemtype; IDs for itemref; strings for others.
|-- lang
    |-- Explanation: Language of content (affects spellcheck, screen readers).
    |-- Possible values: Valid BCP 47 language tag (e.g., `en`, `en-US`, `fr`, `zh-CN`).
|-- nonce
    |-- Explanation: CSP (Content Security Policy) nonce for scripts/styles.
    |-- Possible values: Cryptographic nonce string.
|-- part
    |-- Explanation: For CSS `::part()` styling in Shadow DOM.
    |-- Possible values: Space-separated part names.
|-- popover
    |-- Explanation: Makes element a popover (top layer, dismissible).
    |-- Possible values: `auto` | `manual` | (empty = auto).
|-- role
    |-- Explanation: ARIA role for accessibility.
    |-- Possible values: Any valid ARIA role name (e.g., `button`, `dialog`, `main`).
|-- slot
    |-- Explanation: Assigns element to a named slot in Shadow DOM.
    |-- Possible values: Name matching `<slot name="...">`.
|-- spellcheck
    |-- Explanation: Enables browser spell checking.
    |-- Possible values: `true` | `false` | (empty = true).
|-- style
    |-- Explanation: Inline CSS (avoid in production).
    |-- Possible values: Any valid CSS declarations (e.g., `color: red; font-size: 16px;`).
|-- tabindex
    |-- Explanation: Controls tab order and focus.
    |-- Possible values: Integer (`-1` = focusable but not tabbable; `0` = natural order; positive = custom order).
|-- title
    |-- Explanation: Tooltip / advisory text.
    |-- Possible values: Any text string.
|-- translate
    |-- Explanation: Tells translation tools whether to translate.
    |-- Possible values: `yes` | `no`.
|-- virtualkeyboardpolicy
    |-- Explanation: Controls virtual keyboard on touch devices.
    |-- Possible values: `auto` | `manual`.
|-- writingsuggestions
    |-- Explanation: Browser writing suggestions (e.g., emoji, grammar).
    |-- Possible values: `true` | `false`.
|-- Event handler attributes (all global)
    |-- Explanation: Inline event listeners (discouraged; prefer `addEventListener`).
    |-- Possible values: JavaScript code string (e.g., `onclick="alert('hi')"`). Full list: onabort, onanimation*, onclick, ondrag*, onfocus*, onkeydown, onload, onpointer*, onscroll, onsubmit, ontouch*, etc. (only relevant events fire on relevant elements).
```

### Tags

Every tag includes:

- Explanation
- Specific attributes (global always apply unless forbidden)
- All possible values for each specific attribute

#### 1. Main Root

```
|-- <html>
    |-- Explanation: Root of the entire document. All other tags must be inside it.
    |-- Attributes
        |-- lang (global but almost always used here)
            |-- Possible values: BCP 47 language tag.
```

#### 2. Document Metadata (inside `<head>`)

```
|-- <head>
    |-- Explanation: Container for metadata (title, links, scripts, styles). Not displayed.
    |-- Attributes: None specific (global limited).

|-- <title>
    |-- Explanation: Page title (browser tab / search results).
    |-- Attributes: None specific.

|-- <meta>
    |-- Explanation: Generic metadata.
    |-- Attributes
        |-- charset
            |-- Possible values: `utf-8` (recommended; others like `iso-8859-1`).
        |-- name
            |-- Possible values: `application-name`, `author`, `description`, `keywords`, `viewport`, `robots`, `theme-color`, etc.
        |-- content
            |-- Possible values: String matching the name (e.g., for viewport: `width=device-width, initial-scale=1`).
        |-- http-equiv
            |-- Possible values: `content-security-policy`, `refresh`, `default-style`, `x-ua-compatible`.

|-- <base>
    |-- Explanation: Base URL for all relative links.
    |-- Attributes
        |-- href
            |-- Possible values: Absolute or relative URL.
        |-- target
            |-- Possible values: `_self` | `_blank` | `_parent` | `_top` | framename.

|-- <link>
    |-- Explanation: Links external resources (CSS, icons, preload, etc.).
    |-- Attributes
        |-- href
            |-- Possible values: URL.
        |-- rel
            |-- Possible values: `stylesheet`, `icon`, `preload`, `canonical`, `alternate`, `manifest`, `dns-prefetch`, `modulepreload`, etc.
        |-- type
            |-- Possible values: MIME type (e.g., `text/css`, `image/png`).
        |-- media
            |-- Possible values: Media query (e.g., `screen and (max-width: 600px)`).
        |-- sizes, crossorigin, integrity, etc. (standard values as per spec).

|-- <style>
    |-- Explanation: Embedded CSS.
    |-- Attributes
        |-- media
            |-- Possible values: Media query.
        |-- nonce
            |-- Possible values: CSP nonce.

|-- <script>
    |-- Explanation: Embedded or external JavaScript.
    |-- Attributes
        |-- src
            |-- Possible values: URL.
        |-- type
            |-- Possible values: `text/javascript` (default), `module`, `text/plain` (no execution), `application/json`.
        |-- async, defer
            |-- Possible values: Boolean.
        |-- crossorigin, integrity, nonce, nomodule.
```

#### 3. Sectioning Root & Content

```
|-- <body>
    |-- Explanation: Visible content of the page.
    |-- Attributes: None specific.

|-- <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
    |-- Explanation: Semantic sectioning (accessibility + SEO).
    |-- Attributes: None specific (use global + ARIA role if needed).

|-- <h1> to <h6>
    |-- Explanation: Headings (only one <h1> per page recommended).
    |-- Attributes: None specific.

|-- <hgroup>
    |-- Explanation: Groups heading + subheading/tagline.
    |-- Attributes: None specific.
```

#### 4. Text Content

```
|-- <p>, <div>, <span>, <pre>, <hr>
    |-- Explanation: Paragraphs, generic containers, preformatted text, thematic break.
    |-- Attributes: None specific.

|-- <blockquote>
    |-- Explanation: Long quotation.
    |-- Attributes
        |-- cite
            |-- Possible values: URL to source.

|-- <ul>, <ol>, <menu>
    |-- Explanation: Unordered/ordered/menu lists.
    |-- Attributes (ol only)
        |-- type
            |-- Possible values: `1` | `a` | `A` | `i` | `I`.
        |-- start
            |-- Possible values: Integer.
        |-- reversed
            |-- Possible values: Boolean.

|-- <li>
    |-- Explanation: List item.
    |-- Attributes
        |-- value (in <ol>)
            |-- Possible values: Integer (overrides numbering).

|-- <dl>, <dt>, <dd>
    |-- Explanation: Description list (glossary).
    |-- Attributes: None specific.
```

#### 5. Inline Text Semantics (Basic Text Formatting)

```
|-- <a>
    |-- Explanation: Hyperlink.
    |-- Attributes
        |-- href
            |-- Possible values: URL, `#id`, `mailto:`, `tel:`, `javascript:` (avoid last).
        |-- target
            |-- Possible values: `_self` | `_blank` | `_parent` | `_top`.
        |-- download
            |-- Possible values: Filename (triggers download).
        |-- rel, hreflang, type, ping, referrerpolicy.

|-- <strong>, <b>, <em>, <i>, <u>, <mark>, <small>, <del>, <ins>, <sub>, <sup>, <code>, <kbd>, <samp>, <var>, <abbr>, <cite>, <dfn>, <time>
    |-- Explanation: Bold/italic/emphasis/etc. (semantic where possible).
    |-- Attributes (specific ones)
        |-- <time> datetime
            |-- Possible values: Valid date/time string (e.g., `2026-03-17`, `2026-03-17T12:00`).
        |-- <abbr> title
            |-- Possible values: Full form.
```

#### 6. Image & Multimedia

```
|-- <img>
    |-- Explanation: Image.
    |-- Attributes
        |-- src, srcset
            |-- Possible values: URL(s).
        |-- alt
            |-- Possible values: Text description (required for accessibility).
        |-- width, height
            |-- Possible values: Pixels (integers).
        |-- loading
            |-- Possible values: `eager` | `lazy`.
        |-- decoding, crossorigin, referrerpolicy, usemap, ismap.

|-- <picture>, <source>
    |-- Explanation: Responsive images / art direction.
    |-- Attributes (source)
        |-- srcset, sizes, type, media.

|-- <video>, <audio>, <track>
    |-- Explanation: Video/audio with captions.
    |-- Attributes
        |-- src, controls, autoplay, loop, muted, poster (video), preload.
            |-- Possible values: URL or boolean.

|-- <iframe>
    |-- Explanation: Embedded external content (YouTube, maps).
    |-- Attributes
        |-- src, width, height, sandbox, allowfullscreen, loading, title.
            |-- sandbox values: `allow-scripts`, `allow-same-origin`, `allow-forms`, etc. (space-separated).
```

#### 7. Embedded & Interactive

```
|-- <embed>, <object>
    |-- Explanation: Plugin content (PDF, Flash legacy, etc.).
    |-- Attributes: src, type, width, height, data (object).

|-- <canvas>
    |-- Explanation: Graphics via JavaScript (2D/3D).
    |-- Attributes
        |-- width, height
            |-- Possible values: Pixels.

|-- <dialog>
    |-- Explanation: Native modal/pop-up dialog (advanced).
    |-- Attributes
        |-- open
            |-- Possible values: Boolean.

|-- <details>, <summary>
    |-- Explanation: Accordion/disclosure widget.
    |-- Attributes
        |-- open (details)
            |-- Possible values: Boolean.
```

#### 8. Forms (Most Complex – Advanced)

```
|-- <form>
    |-- Explanation: Form container.
    |-- Attributes
        |-- action
            |-- Possible values: URL.
        |-- method
            |-- Possible values: `get` | `post`.
        |-- enctype
            |-- Possible values: `application/x-www-form-urlencoded` | `multipart/form-data` | `text/plain`.
        |-- target, novalidate, autocomplete.

|-- <input>
    |-- Explanation: Most versatile form control (100+ variations).
    |-- Attributes (all possible)
        |-- type
            |-- Possible values: `text` | `password` | `email` | `url` | `tel` | `search` | `number` | `range` | `date` | `time` | `datetime-local` | `month` | `week` | `color` | `checkbox` | `radio` | `file` | `submit` | `image` | `reset` | `button` | `hidden`.
        |-- name, value, placeholder, required, readonly, disabled, autocomplete, autofocus, min, max, step, pattern, maxlength, minlength, multiple, accept (file), capture (camera), form, list (datalist), etc.
            |-- min/max/step: numbers or dates.
            |-- pattern: regex string.
            |-- accept: MIME types or `.ext`.

|-- <label>, <button>, <select>, <option>, <optgroup>, <textarea>, <fieldset>, <legend>, <datalist>, <output>, <progress>, <meter>
    |-- Explanation: Form helpers.
    |-- Attributes (key ones)
        |-- <button> type
            |-- Possible values: `submit` | `reset` | `button`.
        |-- <select> multiple, size.
        |-- <textarea> rows, cols, wrap (`soft` | `hard`).
        |-- <progress>, <meter>: value, max, min, low, high, optimum.
```

#### 9. Table (Advanced Structure)

```
|-- <table>, <caption>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>, <colgroup>, <col>
    |-- Explanation: Tabular data.
    |-- Attributes (key)
        |-- <table> border (legacy), summary (legacy).
        |-- <th>, <td> colspan, rowspan, headers.
            |-- Possible values: Integer.
        |-- scope (th): `row` | `col` | `rowgroup` | `colgroup`.
```

#### 10. Scripting & Advanced / Web Components

```
|-- <script>, <noscript>
    |-- Explanation: Already covered in metadata; also inline.

|-- <template>
    |-- Explanation: Reusable HTML fragment (not rendered until cloned).
    |-- Attributes: None specific.

|-- <slot>
    |-- Explanation: Placeholder in Web Components.
    |-- Attributes
        |-- name
            |-- Possible values: Any string.

|-- <custom-element> (e.g., <my-button>)
    |-- Explanation: Autonomous custom elements (Web Components – advanced).
    |-- Attributes: Any you define + `is` global for customized built-in.
```

### Obsolete / Deprecated Tags (Do NOT Use – For Historical Reference Only)

`<center>`, `<font>`, `<marquee>`, `<frame>`, `<frameset>`, `<noframes>`, `<acronym>`, `<applet>`, `<basefont>`, `<bgsound>`, `<big>`, `<blink>`, `<dir>`, `<isindex>`, `<keygen>`, `<listing>`, `<menu>`, `<nobr>`, `<noembed>`, `<plaintext>`, `<rb>`, `<rtc>`, `<tt>`, `<xmp>`.
These trigger warnings or quirks mode.

### HTML Syntax Rules (A to Z Essentials)

- Void elements (self-closing): `<br>`, `<img>`, `<input>`, `<meta>`, `<link>`, `<hr>`, `<area>`, `<base>`, `<col>`, `<embed>`, `<source>`, `<track>`, `<wbr>`.
- All tags must be properly nested.
- Attributes: `attr="value"` or boolean `attr`.
- Case-insensitive for tags/attributes (but lowercase recommended).
- Comments: `<!-- -->`.
- Entities: `&lt;`, `&amp;`, `&nbsp;`, etc.

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

# JavaScript

### From Basic to Advanced

JavaScript
|-- Syntax Constructs & Declarations
|-- Operators
|-- Control Flow & Loops
|-- Functions & Closures
|-- Objects & Classes
|-- Built-in Global Objects / Types
|-- Primitive wrappers & constructors
|-- Collections
|-- Async & Promises
|-- Iteration & Generators
|-- Intl & new 2025–2026
|-- Modules
|-- New & Experimental (2025–2026)

### 1. Syntax Constructs & Declarations

```
|-- var / let / const
    |-- Explanation          → Variable declaration (var = function/block hoisted; let/const = block-scoped; const = cannot reassign)
    |-- Temporal Dead Zone   → let & const have TDZ before declaration

|-- function declaration / function expression
    |-- function name() {}   → hoisted
    |-- const fn = function() {}   or arrow

|-- class declaration / class expression
    |-- class MyClass { … }

|-- import / export
    |-- See Modules section below

|-- block { }
    |-- Explanation          → Creates scope for let/const (since ES6)

|-- debugger;
    |-- Explanation          → Triggers debugger if dev tools open

|-- ; (automatic semicolon insertion – ASI rules apply)
```

### 2. Operators (grouped)

```
|-- Arithmetic
    |-- + - * / % ** (exponentiation ES2016)
    |-- ++ -- (pre/post)

|-- Assignment
    |-- = += -= *= /= %= **= <<= >>= >>>= &= ^= |= &&= ||= ??= (logical assignment ES2021)

|-- Comparison
    |-- == != === !== > >= < <=

|-- Logical
    |-- && || ! ?? (nullish coalescing ES2020) &&= ||= ??=

|-- Bitwise
    |-- & | ^ ~ << >> >>>

|-- Ternary
    |-- condition ? expr1 : expr2

|-- Spread / Rest
    |-- ... (array/object spread, rest parameters ES2015+)

|-- Optional chaining ?.
    |-- obj?.prop?.method?.(arg)   (ES2020)

|-- Nullish coalescing ??
    |-- value ?? default   (ES2020)

|-- Pipeline |>   (stage 1–2, not yet in 2026)

|-- Private fields / methods #name
    |-- class { #x = 1; #method() {} }   (ES2022)

|-- in / instanceof
```

### 3. Control Flow & Loops

```
|-- if / else / else if

|-- switch / case / default / fall-through (no automatic break)

|-- ternary ? :

|-- for (init; cond; update) { }

|-- for...of   (iterables: arrays, strings, Maps, Sets, generators, etc.)
    |-- for (const x of iterable) { }

|-- for...in   (object enumerable properties – avoid for arrays)

|-- while / do...while

|-- break / continue / labeled break & continue (rare)

|-- throw new Error("msg")
    |-- or throw value (any value)

|-- try { } catch (err) { } finally { }
    |-- catch without param allowed (ES2021+)
```

### 4. Functions & Closures

```
|-- function () {} / function* () {}   (generator)

|-- Arrow functions  () => { }
    |-- No own this, arguments, super, new.target
    |-- Implicit return if single expr

|-- Parameters
    |-- Default: param = value
    |-- Rest: ...args
    |-- Destructuring: ({a,b} = obj)

|-- IIFE   (Immediately Invoked Function Expression)
    |-- (function(){ ... })()

|-- Closures
    |-- Function remembers its lexical scope

|-- new.target   (in constructors)

|-- Function.prototype methods
    |-- .call() .apply() .bind()
```

### 5. Objects & Classes

```
|-- Object literal { key: value, shorthand {key}, computed [expr]: val, method() {} }

|-- class MyClass {
    constructor() {}
    method() {}
    static staticMethod() {}
    get prop() {}
    set prop(v) {}
    #privateField = 1;
    #privateMethod() {}
  }

|-- extends / super
    |-- super() in constructor
    |-- super.method()

|-- new Class()

|-- instanceof / typeof

|-- Object methods (static)
    |-- Object.keys() .values() .entries()
    |-- Object.assign()
    |-- Object.create()
    |-- Object.freeze() .seal() .preventExtensions()
    |-- Object.is() .isFrozen() etc.
```

### 6. Built-in Global Objects / Types

#### Primitives & Wrappers

```
|-- Number
    |-- .NaN Infinity parseInt() parseFloat()
    |-- .isNaN() .isFinite() .isInteger() .isSafeInteger()
    |-- .EPSILON .MAX_SAFE_INTEGER .MIN_SAFE_INTEGER

|-- String
    |-- .length .charAt() .slice() .substring() .substr() (legacy)
    |-- .toUpperCase() .trim() .padStart() .padEnd()
    |-- .includes() .startsWith() .endsWith() .repeat()
    |-- .match() .replace() .replaceAll() .split()
    |-- Template literals `Hello ${expr}`   (ES2015)

|-- Boolean
    |-- new Boolean() → wrapper (avoid)

|-- Symbol
    |-- Symbol("desc") Symbol.for("key") Symbol.keyFor()
    |-- Well-known: Symbol.iterator Symbol.toStringTag etc.

|-- BigInt
    |-- 123n   BigInt("123")
    |-- Operations need same type
```

#### Collections (ES6+)

```
|-- Array
    |-- new Array() [1,2,3]
    |-- .push() .pop() .shift() .unshift() .splice()
    |-- .map() .filter() .reduce() .reduceRight() .forEach()
    |-- .find() .findIndex() .some() .every()
    |-- .flat() .flatMap() (ES2019)
    |-- .at(index) (ES2022)   // negative supported
    |-- .toSorted() .toReversed() .toSpliced() (immutable ES2024)
    |-- .with(index, value) (immutable replace ES2024)

|-- Object   (see above)

|-- Map
    |-- new Map([[k,v], ...])
    |-- .set() .get() .has() .delete() .clear()
    |-- .keys() .values() .entries() .forEach()

|-- Set
    |-- new Set([1,2,3])
    |-- .add() .has() .delete() .clear()
    |-- .keys() .values() .entries() (same as values)
    |-- New in ES2025: .intersection() .union() .difference() .symmetricDifference() .isSubsetOf() .isSupersetOf() .isDisjointFrom()

|-- WeakMap / WeakSet   (keys must be objects, no enumeration)
```

#### Async & Concurrency

```
|-- Promise
    |-- new Promise((resolve, reject) => {})
    |-- .then() .catch() .finally()
    |-- Promise.all() .allSettled() .any() .race()
    |-- Promise.resolve() .reject()
    |-- New ES2025?: Promise.try()   (proposal for sync + async unification)

|-- async function () {}   → returns Promise
    |-- await expr   (only inside async)

|-- generators   function* () { yield 1; }
    |-- .next() .return() .throw()

|-- async generators   async function* () { yield await ... }

|-- for await...of   (async iterables)
```

#### Iteration & New 2025

```
|-- Iterable protocol   Symbol.iterator → { next() { return {value,done} } }

|-- Iterator protocol   { next() }

|-- New in ES2025: global Iterator
    |-- Iterator.from(iterable)
    |-- .map() .filter() .take() .drop() .flatMap() .reduce() .toArray() .find() .forEach() .some() .every() .includes()
    |-- Chainable iterator helpers

|-- RegExp
    |-- /pattern/flags   new RegExp()
    |-- .test() .exec() .matchAll()
    |-- New ES2025: RegExp.escape(str)   → escapes special chars
    |-- v flag (set notation, properties of strings)
```

#### Internationalization (Intl)

```
|-- Intl.DateTimeFormat() .NumberFormat() .RelativeTimeFormat() .ListFormat() .PluralRules()
    |-- .format() .formatToParts()
```

#### Temporal (likely ES2026 or very late 2025 – major date/time overhaul)

```
|-- Temporal.Now.zonedDateTimeISO()
|-- Temporal.PlainDate PlainTime PlainDateTime etc.
|-- Replaces Date object (immutable, timezone-aware, no legacy parsing issues)
```

### 7. Modules (ES2015+)

```
|-- export default expr;
|-- export { named };
|-- export * from "mod";
|-- export { default as alias } from "mod";

|-- import defaultImport from "mod";
|-- import { named } from "mod";
|-- import * as ns from "mod";
|-- import("mod").then(...)   → dynamic

|-- import attributes / JSON modules (ES2025)
    |-- import data from "./data.json" with { type: "json" };

|-- Top-level await   (in modules only)
    |-- const data = await fetchData();
```

### 8. Modern & Experimental (2024–2026 highlights)

- **ES2024** — Immutable array methods (.toSorted, .toReversed, .toSpliced, .with)
- **ES2025** — Iterator helpers, Set methods, RegExp.escape, JSON import, Promise.try (if finalized)
- **2025–2026 trends** — Temporal (new date/time), Records & Tuples (immutable compound values – still proposal), new error cause chaining, array grouping .group() .groupToMap()
- **Decorators** — @decorator syntax (stage 3 → likely 2026+)
- **Pattern matching** — match expr { when … } (early proposal)

# ReactJs

### From Basic to Advanced

React
|-- Core Concepts & JSX
|-- Components (Class vs Function)
|-- Built-in Hooks (use\*)
|-- React DOM APIs
|-- Server Components & React Server Components (RSC)
|-- New React 19 Features
|-- Patterns & Advanced Topics
|-- Ecosystem & Related Libraries (brief)

### 1. Core Concepts & JSX

```
|-- JSX
    |-- Explanation          → JavaScript + XML-like syntax → transpiled to React.createElement()
    |-- Syntax               → <Tag attr={value}>children</Tag>
    |-- Fragments            → <>...</>   or   <React.Fragment>...</React.Fragment>
    |-- Comments             → {/* comment */}   (not <!-- -->)

|-- React.createElement(type, props, ...children)
    |-- type                 → string (HTML tag) | Component function/class | Symbol(react.fragment)

|-- React elements vs Components
    |-- Element              → plain object { type, props, key, ref, ... }
    |-- Component            → function or class that returns element(s)
```

### 2. Components

```
|-- Function Component    (preferred since 16.8+)
    |-- const MyComp = (props) => { return <div>...</div> }
    |-- or arrow with implicit return

|-- Class Component       (still supported, legacy in new code)
    |-- class MyComp extends React.Component { render() { return ... } }

|-- Props
    |-- Read-only
    |-- Default: MyComp.defaultProps = { color: "blue" }
    |-- Children: props.children

|-- Key prop                 (must be unique among siblings)
    |-- Special: used only for reconciliation (never read inside component)

|-- Ref prop                 (special – forwarded or created with useRef / createRef)

|-- React.memo()             → memoize functional component (shallow props compare)
    |-- React.memo(MyComp, customCompareFn?)

|-- forwardRef               → expose ref to child DOM/component
    |-- const MyInput = forwardRef((props, ref) => <input ref={ref} ... />)

|-- StrictMode               → <React.StrictMode> wraps app → double renders in dev, catches issues
```

### 3. Built-in Hooks (use\*)

```
|-- useState
    |-- const [state, setState] = useState(initial)
    |-- setState(newValue) | setState(prev => prev + 1)
    |-- lazy init: useState(() => expensiveCalc())

|-- useReducer
    |-- const [state, dispatch] = useReducer(reducer, initial, initFn?)
    |-- reducer(state, action) => newState

|-- useEffect
    |-- useEffect(() => { sideEffect(); return cleanup? }, [deps])
    |-- deps: [] = mount+unmount, missing = every render, undefined = every render

|-- useLayoutEffect          → runs synchronously after DOM mutations (before paint)

|-- useInsertionEffect       → very early (CSS-in-JS libraries)

|-- useContext
    |-- const value = useContext(MyContext)

|-- useRef
    |-- const ref = useRef(initialValue)   → .current persists across renders
    |-- DOM ref: <div ref={ref} />

|-- useImperativeHandle      → customize ref exposed value (with forwardRef)

|-- useMemo
    |-- const memoized = useMemo(() => expensiveCalc(a,b), [a,b])

|-- useCallback
    |-- const memoizedFn = useCallback(fn, [deps])

|-- useTransition            (React 18+)
    |-- const [isPending, startTransition] = useTransition()
    |-- startTransition(() => setTab("expensive"))

|-- useDeferredValue         (React 18+)
    |-- const deferredQuery = useDeferredValue(query)

|-- useId                    (React 18+)
    |-- const id = useId()   → unique per component tree (no collisions)

|-- useSyncExternalStore     (React 18+) → low-level subscription hook (used by libraries)

|-- use                   (React 19 – new “use” keyword hook)
    |-- const data = use(promiseOrThenable)   → suspends until resolved
    |-- Works with promises, readable streams, etc.

|-- useActionState           (React 19 – form actions)
    |-- const [state, action, isPending] = useActionState(actionFn, initialState)

|-- useOptimistic            (React 19 – optimistic UI)
    |-- const [optimisticState, setOptimistic] = useOptimistic(realState, updateFn)
```

### 4. React DOM APIs

```
|-- createRoot
    |-- ReactDOM.createRoot(container).render(<App />)

|-- hydrateRoot             (for SSR)
    |-- ReactDOM.hydrateRoot(container, <App />)

|-- flushSync               → force synchronous update (rare)

|-- preconnect / prefetchDNS / preinit / preinitModule / preload / preconnect (React 19 helpers)
    |-- <link rel="preconnect" ... /> but via React APIs for better timing
```

### 5. Server Components & React Server Components (RSC) – React 19 era

```
|-- "use server"             → directive – marks server-only file/function
    |-- async function addItem() { "use server"; ...db... }

|-- "use client"             → directive – marks client component boundary

|-- Server Component          → default in Next.js App Router / frameworks
    → Can be async
    → Cannot use state, effects, browser APIs
    → Can import client components

|-- Client Component          → marked with "use client"
    → Can use hooks, state, effects

|-- Server Actions           → async functions marked "use server"
    → Can be passed to client as props (form action, onclick, etc.)

|-- useFormStatus            → read pending state of nearest form action

|-- useFormState             → legacy name → now useActionState in React 19
```

### 6. New React 19 Features (stable / near-stable by 2026)

```
|-- Actions & useActionState
|-- Optimistic updates with useOptimistic
|-- use() hook for promises / thenables
|-- Document Metadata (<title>, <meta>, <link>) directly in components
    → Auto hoisted to <head>
|-- Stylesheets / async scripts auto management
    → <link rel="stylesheet" href="..." /> inside component → deduped & preloaded
|-- Refs as props → ref as function or object (no more forwardRef in many cases)
|-- Better error handling / hydration mismatch warnings
|-- React Compiler (optional – auto memoization – still opt-in in 19)
```

### 7. Patterns & Advanced Topics

```
|-- Compound Components
|-- Render Props
|-- Higher-Order Components (HOC)
|-- Custom Hooks
|-- Context + useReducer for global state
|-- Concurrent Mode features (useTransition, useDeferredValue)
|-- Suspense + lazy()
    |-- const LazyComp = lazy(() => import("./Comp"))
    |-- <Suspense fallback={<Loading />}> <LazyComp /> </Suspense>

|-- Error Boundaries (class component only)
    |-- componentDidCatch / getDerivedStateFromError

|-- Portals
    |-- createPortal(children, domNode)

|-- Profiler
    |-- <Profiler id="..." onRender={callback}>

|-- Concurrent rendering patterns
    → startTransition, useDeferredValue, Suspense + streaming SSR
```

### 8. Ecosystem & Related (very brief – 2026 view)

```
|-- Next.js (App Router + Server Components dominant)
|-- React Query / TanStack Query
|-- Zustand / Jotai / Recoil / Redux Toolkit
|-- React Router v6 / v7
|-- Tailwind + shadcn/ui / Radix / Headless UI
|-- React Hook Form
|-- Zod + server validation
|-- React Server Components Frameworks: Next.js, Remix, Redwood, etc.
```

### Quick Modern React 19 “Hello World” skeleton (2026 style)

```jsx
// app/page.jsx  (Server Component – Next.js style)
import ClientCounter from './ClientCounter'

export default async function Page() {
  const data = await db.posts.findMany()   // server-only
  return (
    <>
      <title>My App</title>
      <meta name="description" content="..." />
      <h1>Posts</h1>
      <ul>
        {data.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
      <ClientCounter />
    </>
  )
}

// ClientCounter.jsx
'use client'

import { useState, useOptimistic } from 'react'

export default function ClientCounter() {
  const [count, setCount] = useState(0)
  const [optimisticCount, setOptimisticCount] = useOptimistic(count)

  async function increment() {
    setOptimisticCount(c => c + 1)
    await fakeApiCall()
    setCount(c => c + 1)
  }

  return (
    <button onClick={increment}>
      Count: {optimisticCount}
    </button>
  )
}
```

# NodeJs

### From Basic to Advanced

Node.js
|-- Core Modules (built-in, no install needed)
|-- Globals & Process
|-- File System & Streams
|-- HTTP / HTTPS / Fetch
|-- Events & EventEmitter
|-- Async Patterns & Promises
|-- Modules System (CommonJS vs ESM)
|-- CLI & Process.argv / Environment
|-- New & Experimental Features (2025–2026)
|-- Popular Patterns & Best Practices

### 1. Globals & Process (available everywhere)

```
|-- process
    |-- process.env                  → object with environment variables
    |-- process.argv                 → array of command-line arguments
    |-- process.exit(code)           → 0 = success, 1+ = error
    |-- process.cwd()                → current working directory
    |-- process.chdir(dir)
    |-- process.platform             → 'win32' | 'linux' | 'darwin' | 'freebsd' etc.
    |-- process.arch                 → 'x64' | 'arm64' | 'ia32'
    |-- process.memoryUsage()
    |-- process.title
    |-- process.uptime()
    |-- process.hrtime.bigint()      → high-resolution time

|-- globalThis / global          → Node’s global object (same as browser’s window in many ways)

|-- console
    |-- .log .info .warn .error .debug
    |-- .time / .timeEnd
    |-- .table
    |-- .dir .dirxml
    |-- .assert

|-- __dirname                    → directory of current module
|-- __filename                   → full path of current module
```

### 2. Core Modules (require('module-name') or import 'node:module-name')

```
|-- fs (File System)
    |-- fs.promises                 → promise-based API (recommended)
    |-- fs.readFile / readFileSync
    |-- fs.writeFile / writeFileSync
    |-- fs.appendFile
    |-- fs.mkdir / mkdirSync / rm / rmdir
    |-- fs.readdir / readdirSync
    |-- fs.stat / statSync / lstat
    |-- fs.watch / watchFile
    |-- fs.createReadStream(path, {encoding, highWaterMark, start, end})
    |-- fs.createWriteStream

|-- path
    |-- path.join(...parts)
    |-- path.resolve(...paths)
    |-- path.basename / dirname / extname
    |-- path.parse / format
    |-- path.sep / delimiter

|-- url
    |-- new URL(input, base)
    |-- url.parse(str, true)         → legacy
    |-- url.format(obj)

|-- os
    |-- os.cpus()                    → array of CPU info
    |-- os.freemem() / totalmem()
    |-- os.homedir() / tmpdir()
    |-- os.hostname() / userInfo()
    |-- os.networkInterfaces()
    |-- os.platform() / arch() / release() / type() / uptime()

|-- events
    |-- const EventEmitter = require('node:events')
    |-- class MyEmitter extends EventEmitter {}
    |-- emitter.on('event', listener)
    |-- emitter.once()
    |-- emitter.emit('event', ...args)
    |-- emitter.off() / removeListener / removeAllListeners
    |-- emitter.setMaxListeners(n)

|-- stream
    |-- Readable / Writable / Duplex / Transform
    |-- pipeline(source, ...transforms, destination, callback)   → modern & recommended
    |-- finished(stream, callback)
    |-- stream.promises.pipeline

|-- buffer
    |-- Buffer.from(str, encoding) / Buffer.alloc(size)
    |-- buf.toString() / slice() / copy() / equals()
    |-- Buffer.concat(list)
    |-- global Buffer (still exists but prefer import { Buffer } from 'node:buffer')

|-- crypto
    |-- crypto.createHash('sha256').update(data).digest('hex')
    |-- crypto.randomBytes(size)
    |-- crypto.createCipheriv / createDecipheriv
    |-- crypto.generateKeyPair / sign / verify

|-- zlib
    |-- zlib.gzip / gunzip / deflate / inflate

|-- child_process
    |-- spawn(command, args, options)        → streaming I/O
    |-- exec(command, callback)              → buffers output
    |-- execFile / fork                      → fork = new Node process
    |-- .on('exit') .on('error') .stdout .stderr

|-- worker_threads
    |-- const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
    |-- new Worker(__filename, { workerData })
    |-- parentPort.postMessage / on('message')

|-- perf_hooks
    |-- performance.now() / mark / measure
    |-- monitorEventLoopDelay

|-- dns
    |-- dns.promises.resolve / lookup / reverse

|-- net / tls / http / https
    |-- See HTTP section below

|-- util
    |-- util.promisify(fn)
    |-- util.inspect(obj, options)
    |-- util.format / formatWithOptions
    |-- util.deprecate(fn, msg)
    |-- util.callbackify(asyncFn)
```

### 3. HTTP / HTTPS / Fetch (modern Node)

```
|-- http / https
    |-- http.createServer((req, res) => { res.end('Hello') })
    |-- req.method / req.url / req.headers / req.socket
    |-- res.writeHead / res.write / res.end
    |-- res.statusCode / statusMessage

|-- fetch (Node 18+ native, stable in 21+)
    |-- global fetch(url, { method, headers, body, signal })
    |-- AbortController / AbortSignal

|-- undici (underlying fetch engine – can be used directly)
```

### 4. Modules System

```
|-- CommonJS (default until ~2024, still very common)
    |-- module.exports = ...
    |-- const x = require('./file')
    |-- require.cache / require.resolve

|-- ES Modules (recommended 2025–2026)
    |-- "type": "module" in package.json   or   .mjs extension
    |-- export default / export const ...
    |-- import ... from './file.js'
    |-- import.meta.url / import.meta.dirname (Node 20.11+)
    |-- --experimental-specifier-resolution=node (legacy bare imports)

|-- Top-level await               (only in ESM)
    |-- const data = await fetchData()
```

### 5. Async Patterns (Node-style → modern)

```
|-- Callback style                (classic)
|-- Promise style                 → util.promisify, fs.promises
|-- async / await                 → standard since Node 7.6+
|-- EventEmitter + async iterables
|-- streams + async iterators     → for await (const chunk of readable)
```

### 6. CLI & Process.argv / env

```
|-- node app.js --port=3000
    |-- process.argv[2] === '--port=3000'
    |-- process.argv.slice(2)

|-- Environment variables
    |-- process.env.PORT || 3000
    |-- .env files → use dotenv (npm package) or --env-file=node --env-file=.env
```

### 7. New & Experimental / Stabilized Features (2024–2026)

```
|-- Node 20–22 LTS highlights
    |-- Built-in .env file support (--env-file)
    |-- Stable test_runner module
    |-- fetch() + undici stable
    |-- ESM loader hooks (advanced customization)
    |-- Single executable applications (pkg-like, experimental → more stable)

|-- Node 22–23 (2025–2026)
    |-- require() of ESM from CJS (experimental flag → more usable)
    |-- Permission model (--allow-fs-read, --allow-net etc.)
    |-- SEA (Single Executable Applications) improvements
    |-- Web Crypto API almost complete parity
    |-- Built-in SQLite (experimental in 22 → likely stable-ish)
    |-- Enhanced watch mode (--watch + --env-file support)

|-- test module (node:test)
    |-- test('name', async () => { assert.strictEqual(...) })
    |-- describe / it / before / after
```

### 8. Popular Patterns & Best Practices (2026)

```
|-- Express / Fastify / Hono / Elysia / NestJS
|-- REST → tRPC / GraphQL (Apollo / Mercurius)
|-- WebSocket → ws / Socket.IO / uWebSockets.js
|-- ORM → Prisma / Drizzle / TypeORM / Sequelize
|-- Config → zod + env-var validation
|-- Logging → pino (fastest), winston
|-- Error handling → centralized middleware + asyncHandler
|-- Clustering → cluster module or pm2
|-- Docker + multi-stage builds
|-- TypeScript-first (ts-node/esm,tsx,bun,deno compatibility)
```

### Minimal Modern ESM Server (Node 22+ style – 2026)

```js
// server.js   (with "type": "module" in package.json)
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = createServer(async (req, res) => {
  if (req.url === "/") {
    const html = await readFile(path.join(__dirname, "index.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

# ExpressJs

### From Basic to Advanced

Express.js
|-- Core Concepts & Application Object
|-- Routing
|-- Middleware
|-- Request & Response Objects
|-- Built-in & Third-party Middleware
|-- Error Handling
|-- Template Engines
|-- Project Structure Patterns
|-- Modern Practices (2025–2026)

### 1. Core Concepts & Application Object

```
|-- const express = require('express')
    |-- or import express from 'express'   (ESM)

|-- const app = express()
    |-- The central Express application instance

|-- app.listen(port, hostname?, backlog?, callback?)
    |-- Starts HTTP server
    |-- Returns Node.js http.Server instance

|-- app.set(name, value) / app.get(name)
    |-- Settings examples:
        'view engine'    → 'pug' | 'ejs' | 'hbs' etc.
        'views'          → path to views directory
        'trust proxy'    → true | 'loopback' | number | array of IPs
        'json replacer' / 'json spaces'

|-- app.enable(name) / app.disable(name)
    |-- Shortcuts for boolean settings (e.g. 'case sensitive routing')

|-- app.locals / res.locals
    → app.locals.title = 'My App'
    → Available in templates & middleware
```

### 2. Routing

```
|-- app.METHOD(path, ...handlers)
    |-- METHODS: get post put patch delete options head
    |-- Examples:
        app.get('/', (req, res) => res.send('Hello'))
        app.post('/users', createUser)

|-- app.all(path, ...handlers)
    |-- Matches all HTTP methods

|-- app.use(path?, ...handlers)
    |-- Mounts middleware (with or without path)

|-- Router
    |-- const router = express.Router({ caseSensitive: true, strict: true })
    |-- router.get('/profile', ...)
    |-- app.use('/api', router)
    |-- router.route('/users/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser)

|-- Route parameters
    |-- /users/:id
    |-- /files/*path   (wildcard)
    |-- /blog/:year(\\d{4})/:month(\\d{2})

|-- Route chaining
    |-- app.route('/book')
        .get(...)
        .post(...)

|-- Express 5 preview changes (if using @expressjs/next or beta)
    |-- Better Promise support in handlers
    |-- async error handling without next(err)
```

### 3. Middleware

```
|-- Signature: function middleware(req, res, next) { ... }

|-- Types
    |-- Application-level    → app.use(...)
    |-- Router-level         → router.use(...)
    |-- Error-handling       → function(err, req, res, next)
    |-- Built-in             → express.json(), express.urlencoded(), express.static()
    |-- Third-party          → cors, helmet, morgan, compression, etc.

|-- Order matters!
    → Static files → logging → auth → routes → error handler

|-- Common built-in middleware (Express 4.16+)
    |-- express.json({ limit: '1mb', type: 'application/json' })
    |-- express.urlencoded({ extended: true })
    |-- express.raw()
    |-- express.text()
    |-- express.static(root, { index: false, maxAge: '1d', etag: true })

|-- next('route')          → skip to next route handler (rare)
|-- next()                 → continue to next middleware
|-- next(err)              → jump to error-handling middleware
```

### 4. Request (req) Object – Key Properties & Methods

```
|-- req.method / req.url / req.originalUrl
|-- req.path / req.baseUrl
|-- req.params         → { id: '123' } from /users/:id
|-- req.query           → { page: '2', sort: 'asc' }
|-- req.body            → after json/urlencoded middleware
|-- req.headers
|-- req.cookies         → with cookie-parser
|-- req.ip / req.ips    → with trust proxy
|-- req.protocol / req.secure / req.hostname
|-- req.get(field) / req.header(field)
|-- req.accepts(...) / req.acceptsLanguages(...) / req.acceptsCharsets(...)
|-- req.is(type)       → checks Content-Type
|-- req.xhr            → checks X-Requested-With header
```

### 5. Response (res) Object – Key Properties & Methods

```
|-- res.status(code).send(body?)
|-- res.sendStatus(code)           → 200 OK, 404 Not Found, etc.
|-- res.json(obj) / res.jsonp(obj)
|-- res.send(string | Buffer | object | array)
|-- res.render(view, locals?, callback?)
|-- res.redirect([status,] path/url)
|-- res.type(type) / res.contentType(type)
|-- res.set(field, value) / res.header(...)
|-- res.cookie(name, value, options?)
    |-- options: maxAge, expires, httpOnly, secure, sameSite, domain, path
|-- res.clearCookie(name, options?)
|-- res.download(path, filename?, options?, fn?)
|-- res.attachment(filename?)
|-- res.links(linksObj)            → Link header for pagination
|-- res.locals                 → per-request locals
```

### 6. Built-in & Popular Third-party Middleware (2026 ecosystem)

```
|-- Built-in
    express.static
    express.json
    express.urlencoded
    express.Router

|-- Very common third-party
    cors                  → Cross-Origin Resource Sharing
    helmet                → Security headers (CSP, HSTS, etc.)
    morgan                → Logging ('dev', 'combined', 'common')
    compression           → gzip/deflate
    cookie-parser
    express-rate-limit
    express-session / connect-redis / session-file-store
    passport              → Authentication
    multer                → File uploads
    csurf / express-csrf  → CSRF protection (less common now with SameSite cookies)
    winston / pino        → Advanced logging
    zod / joi / celebrate → Validation

|-- Modern alternatives / rising in 2025–2026
    hono / elysia / fastify → faster runtimes (some use Express-like API)
    drizzle-orm / prisma   → with Express
    tRPC / ts-rest         → type-safe APIs
```

### 7. Error Handling

```
|-- Synchronous errors → next(err)
|-- Async errors       → try/catch + next(err)   or   express-async-errors / express-promise-router
|-- Error middleware (must have 4 params)
    app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).json({ error: 'Internal Server Error' })
    })

|-- Centralized error format
    → { status, message, code?, details?, stack? (dev only) }

|-- Express 5 preview → native async error handling (no need for next(err) in async)
```

### 8. Template Engines (still used in SSR / MPA)

```
|-- app.set('view engine', 'pug')   or ejs, hbs, nunjucks, etc.
|-- res.render('index', { title: 'Home', user })
```

### 9. Modern Project Structure Patterns (2026)

```
|-- /src
    /controllers
    /services
    /models (or /db)
    /routes
    /middlewares
    /utils
    /config
    app.js / server.js
    index.js (entry)

|-- Feature-based structure
    /features
      /auth
        auth.controller.js
        auth.routes.js
        auth.service.js

|-- With TypeScript
    ├── src
    │   ├── app.ts
    │   ├── routes/
    │   ├── controllers/
    │   ├── dtos/
    │   ├── middlewares/
    │   └── index.ts

|-- With ESM + TypeScript (recommended 2026)
    "type": "module"
    import express from 'express'
```

### Minimal Modern Express App (ESM + 2026 style)

```js
// app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express 2026" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

# MongoDB

### From Basic to Advanced

MongoDB
|-- Core Concepts & Data Model
|-- MongoDB Shell (mongosh) & Basic Commands
|-- CRUD Operations
|-- Query Operators & Aggregation Pipeline
|-- Indexes & Performance
|-- Schema Design Patterns
|-- Drivers & Node.js Integration (mongodb / mongoose)
|-- Administration & Security
|-- Advanced Features (2024–2026)

### 1. Core Concepts & Data Model

```
|-- Document
    |-- BSON (Binary JSON) document → max 16 MB
    |-- Fields can be any BSON type: string, number, boolean, array, object, ObjectId, Date, BinData, etc.

|-- Collection
    |-- Analogous to table (but schema-less / flexible)
    |-- Names: lowercase recommended, no $ or system. prefix

|-- Database
    |-- Multiple databases per server/cluster
    |-- Names: alphanumeric + _ - (no / \ . " $)

|-- ObjectId
    |-- 12-byte: 4-byte timestamp + 5-byte random + 3-byte counter
    |-- _id field (auto-generated if omitted)

|-- BSON Types (most common)
    |-- Double, String, Object, Array, Binary data, ObjectId, Boolean, Date, Null, Regex, JavaScript, Int32, Timestamp, Int64 (Long), Decimal128, MinKey/MaxKey
```

### 2. MongoDB Shell (mongosh) – Basic Commands

```
|-- mongosh [uri] [options]
    |-- --host, --port, --username, --password, --authenticationDatabase

|-- show dbs / show collections / show users

|-- use mydb                    → switch database

|-- db                           → current database

|-- db.getCollectionNames()
|-- db.stats() / db.serverStatus()
```

### 3. CRUD Operations (mongosh / driver syntax)

```
|-- Create / Insert
    db.collection.insertOne({ name: "Ali", age: 30 })
    db.collection.insertMany([ {}, {}, ... ])
    → returns insertedIds

|-- Read / Find
    db.collection.find({ age: { $gt: 25 } })
    db.collection.findOne({ _id: ObjectId("...") })
    .sort({ age: -1 })
    .limit(10)
    .skip(20)
    .project({ name: 1, age: 1, _id: 0 })

|-- Update
    db.collection.updateOne(filter, update, options)
    db.collection.updateMany(filter, update)
    → Operators: $set, $unset, $inc, $push, $pull, $addToSet, $rename, $min/$max, $mul
    → Options: { upsert: true }

|-- Replace
    db.collection.replaceOne(filter, replacementDoc, { upsert })

|-- Delete
    db.collection.deleteOne(filter)
    db.collection.deleteMany(filter)

|-- Bulk operations
    db.collection.bulkWrite([ { insertOne: {...} }, { updateOne: {...} }, ... ])
```

### 4. Query Operators & Aggregation Pipeline

```
|-- Comparison: $eq $ne $gt $gte $lt $lte $in $nin

|-- Logical: $and $or $not $nor

|-- Element: $exists $type $size (array)

|-- Evaluation: $regex $mod $jsonSchema $expr

|-- Array: $all $elemMatch $size

|-- Geospatial: $geoWithin $geoIntersects $near $nearSphere

|-- Text: $text (requires text index)

|-- Aggregation Pipeline Stages (most used)
    $match
    $project / $unset
    $group { _id: ..., count: { $sum: 1 }, avgAge: { $avg: "$age" } }
    $sort
    $limit / $skip
    $unwind (array field)
    $lookup (left outer join)
    $addFields / $set / $replaceRoot
    $sortByCount
    $facet
    $unionWith
    $merge / $out (write results to collection)
    $densify / $fill (time-series)
    $vectorSearch (Atlas Vector Search – 2024+)

|-- Aggregation Examples
    db.sales.aggregate([
      { $match: { status: "A" } },
      { $group: { _id: "$customer", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ])
```

### 5. Indexes & Performance

```
|-- db.collection.createIndex({ field: 1 })          → ascending
|-- { field: -1 }                                     → descending
|-- Compound: { lastName: 1, firstName: 1 }
|-- Multikey: indexes on arrays
|-- Text: { $text: { $search: "keyword" } } → createIndex({ content: "text" })
|-- Hashed: for sharding
|-- Geospatial: 2dsphere / 2d
|-- TTL: expireAfterSeconds → createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
|-- Partial: partialFilterExpression
|-- Sparse: ignores docs without indexed field
|-- Collation: case-insensitive, locale-aware
|-- Covered query: all fields in projection from index
|-- explain("executionStats") / .explain("allPlansExecution")
```

### 6. Schema Design Patterns (Common in 2026)

```
|-- Embedding (1:1, 1:few)
|-- Referencing (1:many, many:many) + $lookup
|-- Subset pattern
|-- Bucket pattern (time-series data)
|-- Computed pattern (pre-calculated fields)
|-- Outlier / Extended Reference
|-- Versioning / Document versioning
|-- Polymorphic / Single collection for multiple types
|-- Atlas Search / Vector Search for AI apps
```

### 7. Drivers & Node.js Integration

```
|-- Official Node.js driver (mongodb package)
    const { MongoClient } = require("mongodb")
    const client = new MongoClient(uri, { ...options })
    await client.connect()
    const db = client.db("mydb")
    const collection = db.collection("users")

|-- Mongoose (ODM – Object Document Mapper)
    const mongoose = require('mongoose')
    mongoose.connect(uri)
    const UserSchema = new Schema({ name: String, age: Number })
    const User = mongoose.model('User', UserSchema)
    await User.create({ name: "Hassaan" })
    await User.find({ age: { $gt: 20 } })

|-- Modern connection (2025–2026 style)
    await MongoClient.connect(uri, {
      maxPoolSize: 20,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: "majority"
    })
```

### 8. Administration & Security

```
|-- Authentication
    SCRAM-SHA-256 (default), x.509, LDAP, Kerberos, AWS IAM (Atlas)

|-- Roles: read, readWrite, dbAdmin, clusterAdmin, root, etc.
    db.createUser({ user: "admin", pwd: "...", roles: ["root"] })

|-- TLS/SSL
|-- Auditing
|-- Backup: mongodump / mongorestore
|-- Sharding: enableSharding, shardCollection
|-- Replica Set: rs.initiate(), rs.status()
|-- Transactions (multi-document ACID since 4.0)
    session.startTransaction()
    await collection.insertOne(..., { session })
    await session.commitTransaction()

|-- Change Streams
    collection.watch(pipeline, options)
```

### 9. Advanced / Modern Features (2024–2026)

```
|-- Time Series Collections
    db.createCollection("weather", {
      timeseries: { timeField: "timestamp", metaField: "station" }
    })

|-- Atlas Vector Search
    { $vectorSearch: { index: "vector_idx", path: "embedding", queryVector: [...], numCandidates: 100, limit: 10 } }

|-- Queryable Encryption (field-level encryption)
|-- Columnar Storage (for analytics – Atlas 2025+)
|-- Online Archive (cold data tier)
|-- Search facets, highlighting, synonyms
|-- Window functions in aggregation ($rank, $denseRank, $documentNumber, etc.)
```

### Minimal Modern Node.js + MongoDB Example (2026 style – ESM)

```js
// server.js
import { MongoClient } from "mongodb";
import express from "express";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

const app = express();
app.use(express.json());

await client.connect();
const db = client.db("mydb");
const users = db.collection("users");

app.post("/users", async (req, res) => {
  const result = await users.insertOne(req.body);
  res.status(201).json({ id: result.insertedId });
});

app.get("/users/:id", async (req, res) => {
  const user = await users.findOne({ _id: new ObjectId(req.params.id) });
  user ? res.json(user) : res.status(404).json({ error: "Not found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

# MongooseJs

### From Basic to Advanced

Mongoose
|-- Core Concepts & Connection
|-- Schemas & Models
|-- Document Instance Methods & Properties
|-- Schema Types & Options
|-- Middleware (Hooks)
|-- Queries & Query Helpers
|-- Plugins & Advanced Schema Features
|-- Population & References
|-- Validation & Error Handling
|-- Modern Practices & 2025–2026 Updates

### 1. Core Concepts & Connection

```
|-- const mongoose = require('mongoose')
    |-- or import mongoose from 'mongoose'   (ESM recommended)

|-- mongoose.connect(uri, options?)
    |-- uri: 'mongodb://localhost:27017/mydb' or Atlas / srv URI
    |-- options (common 2026):
        maxPoolSize: 20
        minPoolSize: 5
        serverSelectionTimeoutMS: 5000
        retryWrites: true
        w: 'majority'
        family: 4 | 6
        authSource: 'admin'

|-- mongoose.connection
    |-- .on('connected') .on('error') .on('disconnected')
    |-- .readyState (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)

|-- mongoose.disconnect()
|-- mongoose.set('strictQuery', true/false/'throw')   → controls query filter strictness
```

### 2. Schemas & Models

```
|-- const schema = new mongoose.Schema(definition, options?)
    |-- definition: { field: Type | { type: Type, ...options } }
    |-- options: { timestamps: true, versionKey: false, strict: true/'throw', collection: 'customName', ... }

|-- const Model = mongoose.model('ModelName', schema, collectionName?)
    |-- Model.create(doc) / .insertMany([...])
    |-- Model.find() / findOne() / findById()
    |-- Model.updateOne() / updateMany() / findOneAndUpdate()
    |-- Model.deleteOne() / deleteMany() / findOneAndDelete()

|-- Schema methods
    schema.method('instanceMethod', function() { ... })
    schema.static('staticMethod', function() { ... })
    schema.query.queryHelper = function() { return this.find(...) }

|-- Discriminators (single collection, multiple models)
    const ChildSchema = schema.discriminator('ChildType', childDiscriminatorSchema)
```

### 3. Schema Types & Options (most common)

```
|-- Types
    String, Number, Boolean, Date, Buffer, ObjectId, Mixed (any), Array, Map, Decimal128, BigInt

|-- Common field options
    type: ...
    required: true / [true, 'Custom message']
    default: value | () => value
    unique: true
    index: true / { unique: true, sparse: true }
    min / max / enum / match / maxlength / minlength
    lowercase / uppercase / trim / set / get (transformers)
    ref: 'OtherModel'   → for population
    refPath: 'dynamicRefField'
    validate: [validatorFn, 'message'] / custom validator

|-- Timestamps option
    timestamps: true → auto createdAt & updatedAt (Date)

|-- toJSON / toObject options
    { virtuals: true, transform: (doc, ret) => { delete ret.__v; return ret; } }
```

### 4. Middleware (Hooks)

```
|-- Pre / Post hooks
    schema.pre('save', function(next) { ... })     // document middleware
    schema.pre('find', function() { ... })         // query middleware
    schema.post('save', function(doc) { ... })

|-- Hook types: init, validate, save, remove, countDocuments, find, findOne, findOneAndDelete, updateOne, etc.

|-- Async hooks: async function(next) { await ...; next() }
|-- Error in pre hook: next(new Error('...')) or throw

|-- this in middleware: document (save/remove) or query (find/update)
```

### 5. Document Instance Methods & Properties

```
|-- doc.save() / doc.validate() / doc.remove() / doc.deleteOne()
|-- doc.isModified(path?) / doc.isNew / doc.wasNew
|-- doc.id / doc._id
|-- doc.toJSON() / toObject() / toString()
|-- Virtuals: schema.virtual('fullName').get(function() { return this.first + ' ' + this.last })
```

### 6. Queries & Query Helpers

```
|-- Model.find(filter).exec() / .lean() / .cursor()
|-- .sort() .limit() .skip() .select() .populate()
|-- .where() .gt() .lt() .in() .nin() .or() .and() .nor()
|-- .countDocuments() .estimatedDocumentCount()
|-- .findOneAndUpdate(filter, update, { new: true, runValidators: true })
|-- .findByIdAndUpdate(id, update, options)
|-- Query chaining: await Model.find({ age: { $gt: 18 } }).sort('-age').limit(10)
```

### 7. Population & References

```
|-- ref: 'ModelName' in schema → stores ObjectId
|-- .populate('field') / .populate({ path: 'author', select: 'name email' })
|-- Deep population: .populate({ path: 'comments', populate: { path: 'author' } })
|-- Virtual population (no ref storage)
    schema.virtual('reviews', {
      ref: 'Review',
      localField: '_id',
      foreignField: 'product'
    })
```

### 8. Plugins & Advanced Schema Features

```
|-- schema.plugin(myPluginFn, options?)
    → e.g. mongoose-unique-validator, mongoose-paginate-v2, mongoose-delete (soft delete)

|-- Built-in plugins / common community
    mongoose-timestamp
    mongoose-autopopulate
    mongoose-aggregate-paginate-v2

|-- Custom types / casting
|-- Subdocuments / arrays of subdocs
```

### 9. Validation & Error Handling

```
|-- Built-in validators run on .save() / .validate()
|-- Custom: validate: { validator: v => v > 0, message: props => `${props.value} is invalid` }
|-- Cast errors / ValidationError
    try { await doc.save() } catch (err) { if (err.name === 'ValidationError') { ... } }
```

### 10. Modern Practices & 2025–2026 Updates (v9.x era)

```
|-- TypeScript-first (improved generics since v8/v9)
    import { Schema, model, Document } from 'mongoose'
    interface IUser extends Document { name: string; ... }
    const UserSchema = new Schema<IUser>({ ... })

|-- Zod / Joi integration for extra validation (many skip built-in for Zod)
|-- Lean queries + class-transformer for performance
|-- Transactions with session: await Model.create([...], { session })
|-- Change streams via Model.watch()
|-- Atlas Vector Search integration (via raw driver + Mongoose queries)
|-- Mongoose 9.x (Nov 2025+): Better Promise handling, stricter defaults, improved TypeScript, performance fixes
|-- Avoid overusing middleware for everything → prefer service layer logic
```

### Minimal Modern Mongoose Setup (ESM + TypeScript style – 2026)

```ts
// models/user.ts
import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    age: { type: Number, min: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
  },
);

userSchema.virtual("isAdult").get(function () {
  return this.age >= 18;
});

userSchema.pre("save", async function (next) {
  // example: hash password if added
  next();
});

export const User = model<IUser>("User", userSchema);

// db.ts
import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    maxPoolSize: 20,
  });
  console.log("MongoDB connected");
}
```

# PostgreSQL

### From Basic to Advanced

PostgreSQL
|-- Core Concepts & Data Model
|-- Installation & Basic Commands (psql)
|-- Data Types
|-- DDL – Tables, Constraints, Indexes
|-- DML – CRUD & SELECT
|-- Joins, Subqueries, CTEs
|-- Functions, Procedures, Triggers
|-- Transactions & Concurrency
|-- Performance & Indexes
|-- Advanced Features (2024–2026)
|-- PostgreSQL in Node.js (pg / TypeORM / Prisma / Drizzle)

### 1. Core Concepts & Data Model

```
|-- Database
    One cluster → many databases
    Each database is isolated (different schemas, users, objects)

|-- Schema
    Logical namespace inside a database (public is default)
    CREATE SCHEMA blog;

|-- Table
    CREATE TABLE users (
      id BIGSERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

|-- Row / Record / Tuple

|-- Column Types (see section 3)

|-- MVCC (Multi-Version Concurrency Control)
    → Readers don’t block writers, writers don’t block readers

|-- Transaction Isolation Levels
    READ UNCOMMITTED | READ COMMITTED (default) | REPEATABLE READ | SERIALIZABLE
```

### 2. Basic Commands (psql)

```
|-- psql -U postgres -d mydb -h localhost
    \l               → list databases
    \c mydb          → connect to database
    \dt              → list tables
    \d+ users        → describe table with details
    \dn              → list schemas
    \du              → list roles/users
    \?               → help
    \h SELECT        → syntax help for command

|-- \i filename.sql  → execute file
```

### 3. Data Types (most important in 2026)

```
|-- Numeric
    SMALLINT, INTEGER, BIGINT, SMALLSERIAL / SERIAL / BIGSERIAL
    NUMERIC(precision, scale) / DECIMAL
    REAL / DOUBLE PRECISION
    money (discouraged)

|-- Character
    CHAR(n) (fixed), VARCHAR(n), TEXT (preferred)

|-- Boolean
    BOOLEAN / BOOL

|-- Temporal
    DATE, TIME [WITH TIME ZONE], TIMESTAMP [WITHOUT TIME ZONE], TIMESTAMPTZ (preferred)
    INTERVAL

|-- JSON / JSONB
    JSON  → stored as text
    JSONB → binary, indexed, faster, operators @> <@ ? ?& ?| @?

|-- Arrays
    INTEGER[], TEXT[], JSONB[]

|-- UUID
    UUID (uuid-ossp extension or gen_random_uuid())

|-- Range Types
    INT4RANGE, DATERANGE, TSTZRANGE, etc.

|-- Geometric
    POINT, LINE, BOX, PATH, POLYGON, CIRCLE

|-- Network
    CIDR, INET, MACADDR

|-- Other
    BYTEA (binary), TSVECTOR / TSVQUERY (full-text search), XML
```

### 4. DDL – Tables, Constraints, Indexes

```
|-- CREATE TABLE
    CREATE TABLE orders (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

|-- Constraints
    PRIMARY KEY, UNIQUE, NOT NULL, CHECK, FOREIGN KEY ... ON DELETE/UPDATE (CASCADE | RESTRICT | SET NULL | SET DEFAULT | NO ACTION)

|-- Indexes
    CREATE INDEX idx_users_email ON users(email);
    CREATE UNIQUE INDEX idx_orders_user_status ON orders(user_id, status) WHERE status = 'active';  → partial
    CREATE INDEX idx_orders_gin ON orders USING GIN (tags);  → for JSONB / arrays

|-- Generated columns (stored / virtual)
    generated always as (first_name || ' ' || last_name) stored
```

### 5. DML – CRUD & SELECT

```
|-- INSERT
    INSERT INTO users (email, name) VALUES ('a@example.com', 'Hassaan')
    INSERT INTO ... SELECT ... (from other table)
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name

|-- SELECT
    SELECT id, email, created_at
    FROM users
    WHERE created_at >= NOW() - INTERVAL '30 days'
    ORDER BY created_at DESC
    LIMIT 20 OFFSET 40;

|-- UPDATE / DELETE
    UPDATE users SET last_login = NOW() WHERE id = 123
    DELETE FROM orders WHERE status = 'cancelled' AND created_at < NOW() - INTERVAL '90 days'

|-- RETURNING
    INSERT INTO ... RETURNING id, created_at
```

### 6. Joins, Subqueries, CTEs, Window Functions

```
|-- Joins
    INNER JOIN / LEFT / RIGHT / FULL OUTER JOIN / CROSS JOIN
    NATURAL JOIN / USING (column)

|-- Subqueries
    WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000)

|-- Common Table Expressions (WITH)
    WITH recent_orders AS (
      SELECT * FROM orders WHERE created_at > NOW() - INTERVAL '7 days'
    )
    SELECT u.email, COUNT(*) FROM users u
    JOIN recent_orders ro ON u.id = ro.user_id
    GROUP BY u.email;

|-- Window Functions
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at)
    RANK() / DENSE_RANK() / NTILE(4)
    LAG() / LEAD() / FIRST_VALUE() / LAST_VALUE()
    SUM(...) OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)
```

### 7. Functions, Procedures, Triggers

```
|-- Function (returns value)
    CREATE OR REPLACE FUNCTION get_full_name(first TEXT, last TEXT)
    RETURNS TEXT AS $$
      SELECT first || ' ' || last;
    $$ LANGUAGE SQL IMMUTABLE;

|-- Procedure (no return, can do DML)
    CREATE PROCEDURE archive_old_orders()
    LANGUAGE SQL
    AS $$
      DELETE FROM orders WHERE created_at < NOW() - INTERVAL '365 days';
    $$;

|-- Trigger
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
```

### 8. Transactions & Concurrency

```
|-- BEGIN; COMMIT; ROLLBACK;
    SAVEPOINT sp1; ROLLBACK TO sp1;

|-- Isolation levels
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

|-- Advisory locks
    pg_advisory_xact_lock(key)
```

### 9. Performance & Indexes

```
|-- EXPLAIN ANALYZE SELECT ...
|-- Sequential Scan vs Index Scan vs Bitmap Heap Scan vs Index Only Scan
|-- VACUUM / ANALYZE / VACUUM FULL / REINDEX
|-- Autovacuum tuning
|-- Partitioning (declarative since PG 10)
    PARTITION BY RANGE (created_at)
```

### 10. Advanced / Modern Features (PG 16–17, 2025–2026)

```
|-- Logical Replication (publisher / subscriber)
|-- Parallel query improvements
|-- JSON_TABLE (SQL/JSON)
|-- MERGE command (UPSERT advanced)
|-- Incremental materialized views (REFRESH MATERIALIZED VIEW incrementally)
|-- pgvector (vector similarity search – very popular with AI)
    CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops)
|-- Full-text search enhancements
|-- ICU collation support improvements
|-- Built-in MERGE support (PG 15+)
```

### Minimal Modern Node.js + PostgreSQL Example (using pg + TypeScript – 2026 style)

```ts
// db.ts
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// users.ts
import { pool } from "./db";

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: Date;
}

export async function getRecentUsers(): Promise<User[]> {
  const result = await pool.query<User>(`
    SELECT id, email, name, created_at
    FROM users
    WHERE created_at >= NOW() - INTERVAL '30 days'
    ORDER BY created_at DESC
    LIMIT 50
  `);
  return result.rows;
}

export async function createUser(email: string, name: string): Promise<User> {
  const result = await pool.query<User>(
    `INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *`,
    [email, name],
  );
  return result.rows[0];
}
```

# Prisma

### From Basic to Advanced

Prisma
|-- Core Concepts & Architecture
|-- Prisma Schema (schema.prisma)
|-- Data Modeling & Relations
|-- Prisma Client Generation & Usage
|-- CRUD Operations & Queries
|-- Filtering, Pagination, Sorting
|-- Transactions & Batch Operations
|-- Relations & Includes / Select
|-- Middleware & Query Extensions
|-- Prisma Migrate & Schema Evolution
|-- Advanced Features (2025–2026)
|-- Integration Patterns (Node.js, Express, NestJS, TypeScript)

### 1. Core Concepts & Architecture

```
|-- Prisma ORM
    Type-safe database client generator
    Works with: PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, CockroachDB, PlanetScale, etc.

|-- Three main parts
    1. Prisma Schema (schema.prisma)   → single source of truth
    2. Prisma CLI                         → generate client, migrate, studio, etc.
    3. Prisma Client                      → auto-generated, type-safe query builder

|-- npx prisma init
    → creates prisma/ folder with schema.prisma + .env

|-- npx prisma generate
    → regenerates @prisma/client after schema changes

|-- npx prisma db push   (prototyping / schema-first)
    npx prisma migrate dev   (production-grade migrations)
```

### 2. Prisma Schema (schema.prisma)

```
datasource db {
  provider = "postgresql" | "mysql" | "sqlite" | "mongodb" | "sqlserver" | "cockroachdb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "fullTextIndex", "driverAdapters", ...]
}

model User {
  id        BigInt    @id @default(autoincrement())
  email     String    @unique
  name      String?
  posts     Post[]
  profile   Profile?  @relation(fields: [profileId], references: [id])
  profileId Int?
  createdAt DateTime  @default(now())
  @@index([email])
}
```

### 3. Data Modeling & Relations

```
|-- Scalars
    String, Int, BigInt, Float, Decimal, Boolean, DateTime, Json, Bytes, Unsupported("citext")

|-- Attributes
    @id @default(autoincrement() | uuid() | cuid() | dbgenerated())
    @unique
    @default(now() | dbgenerated("gen_random_uuid()"))
    @map("column_name")
    @@id([field1, field2])
    @@unique([field1, field2])
    @@index([field], map: "idx_name")
    @@map("table_name")

|-- Relations
    1:1     → User profile   Profile?
    1:n     → User posts      Post[]
    m:n     → Post categories Category[]   (implicit or explicit via _ join table)
    Self-relation → User followedBy User[] @relation("Follows")

|-- MongoDB specifics
    id        String   @id @default(auto()) @map("_id") @db.ObjectId
    @@map("users")
```

### 4. Prisma Client Generation & Usage

```
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// or ESM
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

### 5. CRUD Operations & Queries

```
|-- Create
    prisma.user.create({ data: { email: "a@example.com", name: "Hassaan" } })
    prisma.user.createMany({ data: [{...}, {...}] })

|-- Read
    prisma.user.findUnique({ where: { id: 123 } })
    prisma.user.findFirst({ where: { email: { startsWith: "h" } } })
    prisma.user.findMany({
      where: { posts: { some: { published: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
      skip: 20
    })

|-- Update
    prisma.user.update({ where: { id: 123 }, data: { name: "New Name" } })
    prisma.user.updateMany({ where: {...}, data: { status: "active" } })

|-- Delete
    prisma.user.delete({ where: { id: 123 } })
    prisma.user.deleteMany({ where: { email: { endsWith: "@test.com" } } })
```

### 6. Filtering, Pagination, Sorting

```
where: {
  AND: [...],
  OR: [...],
  NOT: {...},
  email: { contains: "gmail", mode: "insensitive" },
  age: { gte: 18, lte: 65 },
  posts: { none: { title: { contains: "draft" } } }
}

orderBy: { createdAt: 'desc' } | [{ age: 'asc' }, { name: 'desc' }]

take / skip   (limit / offset)

cursor-based pagination
prisma.post.findMany({
  take: 10,
  cursor: { id: lastSeenId },
  skip: 1,
  orderBy: { id: 'asc' }
})
```

### 7. Relations & Includes / Select

```
prisma.user.findMany({
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    },
    profile: true
  }
})

select: {
  id: true,
  email: true,
  posts: {
    select: { title: true, published: true }
  }
}
```

### 8. Transactions & Batch Operations

```
await prisma.$transaction([
  prisma.user.create({ data: {...} }),
  prisma.post.create({ data: {...} })
])

// interactive transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({...})
  await tx.post.create({ data: { authorId: user.id, ... }})
  return user
}, { maxWait: 5000, timeout: 10000 })
```

### 9. Middleware & Query Extensions (Prisma Client extensions)

```
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null } // soft delete
        return query(args)
      }
    }
  },
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`
        }
      }
    }
  },
  model: {
    user: {
      async softDelete(id) {
        return this.update({ where: { id }, data: { deletedAt: new Date() } })
      }
    }
  }
})
```

### 10. Prisma Migrate & Schema Evolution

```
npx prisma migrate dev --name init
npx prisma migrate deploy   (production)
npx prisma migrate resolve --applied 202103...
npx prisma db push          (schema prototyping – no migration history)
npx prisma studio           → visual database browser
```

### 11. Advanced / Modern Features (2025–2026 – Prisma 5.x / 6.x)

```
|-- Prisma Postgres (new dedicated database offering)
|-- Driver Adapters (connect to non-supported DBs via http / ws)
|-- Accelerate (connection pooling + caching layer)
|-- Pulse (real-time database events / change streams)
|-- Full-text search & vectors (pgvector support)
    @@fulltext([title, content])
    where: { _fullText: { search: "prisma orm" } }

|-- Interactive transactions with timeout
|-- Raw queries / $queryRaw / $executeRaw
|-- Prisma Client extensions (model, query, result, client)
|-- Better MongoDB support (atomic updates, transactions)
```

### Minimal Modern Prisma + Express + TypeScript Example (2026 style)

```ts
// prisma/schema.prisma (excerpt)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}

// src/index.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { posts: { take: 3, orderBy: { createdAt: 'desc' } } },
    orderBy: { id: 'desc' },
    take: 20
  });
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    }
  });
  res.status(201).json(user);
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```

# TypeScript

### From Basic to Advanced

TypeScript
|-- Core Language Features & Syntax
|-- Types & Type Annotations
|-- Interfaces vs Types
|-- Generics
|-- Advanced Types & Utilities
|-- Modules & Namespaces
|-- Classes & OOP Features
|-- Decorators
|-- Configuration (tsconfig.json)
|-- Modern / 2025–2026 Features
|-- Integration Patterns (Node.js, React, Express, etc.)

### 1. Core Language Features & Syntax

```
|-- Type annotations
    let age: number = 30
    const name: string = "Hassaan"

|-- Inference
    let count = 42          → inferred as number
    const isActive = true   → inferred as true (literal type)

|-- Union types
    let id: string | number

|-- Literal types
    let direction: "up" | "down" | "left" | "right"

|-- Type assertion / type guard
    let value = someAny as string
    let value = <string>someAny           (older syntax)

|-- Non-null assertion
    element!.focus()

|-- Nullish coalescing & optional chaining (inherited from JS)
    user?.address?.city ?? "Unknown"
```

### 2. Types & Type Annotations

```
|-- Primitive types
    string, number, boolean, bigint, symbol, null, undefined, object, any, unknown, never, void

|-- Array & Tuple
    string[] | Array<string>
    [string, number, boolean]           → tuple

|-- Object literal types
    { name: string; age?: number; readonly id: number }

|-- Function types
    (x: number, y: string) => boolean
    type Callback = (err: Error | null, data?: any) => void

|-- Enum
    enum Direction { Up, Down, Left, Right }
    enum Status { Success = "SUCCESS", Error = "ERROR" }   → string enum

|-- Type alias
    type UserId = string | number
    type Point = { x: number; y: number }
```

### 3. Interfaces vs Types

```
|-- interface User { name: string; age: number }
    → Can be extended / merged (declaration merging)
    interface Admin extends User { role: string }

|-- type User = { name: string; age: number }
    → Cannot be reopened / merged (except in very specific cases)
    → Better for unions, intersections, primitives

|-- Key differences 2026 view:
    Use interface for objects you expect to extend (classes, React props)
    Use type for unions, mapped types, utility compositions
```

### 4. Generics

```
|-- Generic functions
    function identity<T>(arg: T): T { return arg }

|-- Generic interfaces / types
    interface Box<T> { value: T }
    type Pair<K, V> = { key: K; value: V }

|-- Generic classes
    class Stack<T> {
      private data: T[] = []
      push(item: T) { this.data.push(item) }
    }

|-- Constraints
    function longest<T extends { length: number }>(a: T, b: T): T

|-- Default type parameters
    type Response<T = unknown> = { data: T; status: number }

|-- keyof, typeof
    type Keys = keyof User
    type UserType = typeof user
```

### 5. Advanced Types & Utilities

```
|-- Union & Intersection
    type Admin = User & { role: string }
    type ID = string | number

|-- Mapped types
    type Readonly<T> = { readonly [K in keyof T]: T[K] }
    type Partial<T> = { [K in keyof T]?: T[K] }

|-- Conditional types
    type NonNullable<T> = T extends null | undefined ? never : T
    type Extract<T, U> = T extends U ? T : never

|-- Template literal types
    type EventName<T extends string> = `on${Capitalize<T>}`
    type MouseEvent = "click" | "hover"
    type MouseHandlers = EventName<MouseEvent>   → "onClick" | "onHover"

|-- Utility types (built-in)
    Partial<T>, Required<T>, Readonly<T>, Pick<T,K>, Omit<T,K>, Exclude<T,U>, Extract<T,U>, NonNullable<T>, Parameters<T>, ConstructorParameters<T>, ReturnType<T>, InstanceType<T>, ThisParameterType<T>, OmitThisParameter<T>, Uppercase<T>, Lowercase<T>, Capitalize<T>, Uncapitalize<T>

|-- Infer in conditional types
    type Return<T> = T extends (...args: any) => infer R ? R : never
```

### 6. Modules & Namespaces

```
|-- export / import
    export interface User { ... }
    export function greet(name: string): string
    export default class MyClass {}

    import { User } from './types'
    import * as Utils from './utils'
    import type { User } from './types'   → type-only import (no runtime)

|-- Namespaces (legacy – avoid in modern code)
    namespace Utils { export function log(...) {} }

|-- declare module "module-name" { ... }   → ambient declarations
```

### 7. Classes & OOP Features

```
|-- class User {
    readonly id: number
    private _name: string
    protected role: string

    constructor(public name: string, id: number) {
      this.id = id
    }

    get name() { return this._name }
    set name(value: string) { this._name = value.trim() }
  }

|-- abstract class BaseRepository<T> { abstract findAll(): T[] }

|-- implements
    class Admin implements IUser, IAuth { ... }

|-- Parameter properties
    constructor(public name: string, private age: number) {}
```

### 8. Decorators (Stage 3 → standard in TS 5.0+)

```
|-- ExperimentalDecorators + emitDecoratorMetadata (still needed in some setups)

|-- Class, method, property, accessor, parameter decorators
    function logged(target: any, key: string, desc: PropertyDescriptor) { ... }

    class Service {
      @logged
      fetchData() { ... }
    }

|-- Modern usage (2025–2026): tRPC, NestJS, TypeORM, MobX, Angular heavily use them
```

### 9. Configuration (tsconfig.json) – Common Settings 2026

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",                // or ESNext
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 10. Modern / 2025–2026 Features (TS 5.5–5.9)

```
|-- Isolated Declarations (5.5) → faster builds with --isolatedDeclarations
|-- Infer type predicates (5.5+)
|-- Using declarations (5.5) → using resource = new Disposable()
|-- const type parameters (5.4)
|-- Branded types / nominal typing patterns (community + template literals)
|-- satisfies operator (5.4)
    const config = { url: "..." } satisfies Record<string, string>
|-- Improved JSX inference & React 19 support
|-- Better error messages & quick fixes
```

### Minimal Modern TypeScript + Node.js Example (2026 style)

```ts
// src/index.ts
import express, { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const app = express();
app.use(express.json());

const users: User[] = [
  { id: 1, name: "Hassaan", email: "hassaan@example.com" },
];

app.get("/api/users", (req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({ success: true, data: users });
});

app.post(
  "/api/users",
  (
    req: Request<{}, {}, Omit<User, "id">>,
    res: Response<ApiResponse<User>>,
  ) => {
    const newUser: User = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
  },
);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
