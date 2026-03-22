# HTML
### From Basic to Advanced (A to Z Reference)

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

### Tags (Categorized: Basic → Advanced)

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
