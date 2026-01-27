# AI Copilot Instructions for Frontend Layouts Repository

## Project Overview

This is a **frontend layout practice repository** containing multiple HTML/CSS projects at varying complexity levels. It's an educational codebase with real-world examples, not a production application.

**Key Projects:**

- `bwlanding/` - Black & white landing page with responsive menu and jQuery interactions
- `dveri-master/` - Door catalog site with multi-page navigation, grid layouts, and product filters
- `fragment1/`, `fragment2/`, `fclanding/` - Smaller component/page fragment examples
- `test/`, `examples/`, `makets/` - Test and reference materials

## Architecture & Patterns

### HTML Structure

- **BEM-inspired naming**: Classes use `block__element--modifier` pattern (e.g., `.menu__item`, `.team__item-img`)
- **Semantic sections**: `<header>`, `<div class="about">`, `<div class="team">` for major content blocks
- **Responsive dual menus**: Desktop and mobile variants (`.menu__desktop`, `.menu__mobile`) for same HTML navigation
- **Container pattern**: All content wrapped in `.container` class for centering and max-width (typically 1200px or 1344px)

### CSS Methodology

- **CSS Variables**: Projects use `:root` variables for colors (e.g., `--accent-1`, `--text-dark`, `--text-accent`)
- **Box-sizing reset**: All projects start with `box-sizing: border-box` on `*`
- **Font management**: Custom fonts via `@font-face` (HelveticaNeue variants, Montserrat, Roboto, Merriweather)
- **Flexbox heavy**: Navigation and layout heavily use `display: flex; justify-content; align-items`
- **Grid layouts**: Modern projects (fragment1) use CSS Grid for card grids (e.g., `grid-template-columns: repeat(4, 1fr)`)
- **Responsive classes**: Grid system with `.col-3`, `.col-4`, `.col-6`, `.col-12` for breakpoint-aware layouts

### JavaScript Patterns (jQuery-based)

- **Menu interactivity**: Smooth scroll navigation with hash anchors (`$('nav a[href^="#"]')`)
- **Toggle functionality**: Mobile menu open/close via `.toggle(500)` and `.toggleClass('close')`
- **Active states**: Adding/removing `.active` class on navigation items during scroll
- **Minimal JS**: Projects use vanilla jQuery—no frameworks. Single `main.js` file per project

### Responsive Design

- **Mobile-first structure**: Mobile menu separate from desktop in HTML
- **Breakpoint approach**: Class-based grid system (`.col-lg-12` pattern) for responsive behavior
- **Image backgrounds**: Use inline `style="background-image: url()"` for hero sections and cards

## Developer Workflows

### Project Structure & File Discovery

- Each major project is **self-contained** in its own directory
- **No build tools**: HTML, CSS, JS are processed as-is (no webpack, no transpilation)
- **Figma files included**: Some projects include `.fig` files for design reference (check fragment1, fclanding, examples)
- **Static assets**: All images in `img/` subdirectories; fonts in `fonts/`; libraries (fontello, baguetteBox) in respective folders

### Common Tasks

1. **Adding a new page**: Copy existing HTML template, update `<title>`, adjust section IDs for navigation
2. **Creating a component**: Use `.fig` Figma files as reference; follow existing BEM naming and CSS variable patterns
3. **Updating navigation**: Edit menu items in both `.menu__desktop` and `.menu__mobile` sections (keep in sync!)
4. **Responsive adjustments**: Modify grid classes (`.col-*`) and media queries for breakpoints

### Key Dependencies & Libraries

- **jQuery 3.5.1** (bwlanding) - for DOM manipulation and smooth scrolling
- **Fontello** (bwlanding) - custom icon font system (fontello.css)
- **BaguetteBox.js** (dveri-master) - lightbox/gallery functionality for portfolio
- **MixItUp.js** (dveri-master) - filter/sort functionality for catalog
- **List.js** (dveri-master) - search/filter utilities

## Critical Conventions

### CSS Variables & Theming

```css
:root {
	--accent-1: #00868a;
	--text-dark: #222;
	--font-family: "Arial", sans-serif;
}
```

Always define colors and fonts as variables for easy reusability. Use consistent naming: `--accent-N`, `--text-*`, `--[property]-[modifier]`.

### Grid & Layout

```css
.container {
	max-width: 1200px;
	width: 100%;
	padding: 0 24px;
	margin: 0 auto;
}
.row {
	display: flex;
	flex-wrap: wrap;
}
.col-4 {
	width: 33.33%;
}
```

Use container + row + col pattern for all layouts. Always include `padding: 0 24px` on rows for gutters.

### Menu Structure Pattern

Keep mobile and desktop menu HTML in sync:

```html
<nav class="menu__desktop">
	<!-- Show on desktop -->
	<ul class="menu">
		<li class="menu__item"><a href="#section">Link</a></li>
	</ul>
</nav>
<nav class="menu__mobile">
	<!-- Show on mobile -->
	<div class="menu__inner">
		<div class="menu__burger"><span>toggle menu</span></div>
	</div>
	<ul class="menu">
		<!-- Same structure as desktop -->
		<li class="menu__item"><a href="#section">Link</a></li>
	</ul>
</nav>
```

### JavaScript for Interactivity

```javascript
$(document).ready(function () {
	// Smooth scroll + menu toggle
	$('nav a[href^="#"]').click(function () {
		let target = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(target).offset().top }, 500);
		// Add active class logic
	});

	// Mobile menu toggle
	$(".menu__burger").click(function () {
		$(".menu__mobile .menu").toggle(500);
		$(this).toggleClass("close");
	});
});
```

## Integration Points

### Cross-Component Communication

- **No API layer**: All projects are static. Data (like portfolio items) is hardcoded in HTML
- **Fragment-based design**: Small fragments (fragment1, fragment2) demonstrate isolated component patterns that could be reused
- **Design files as source of truth**: Figma `.fig` files accompany most projects—use these for pixel-perfect measurements

### External Resources

- **Fontello icon system**: Custom icon fonts—don't change without rebuilding font files
- **Image optimization**: Check `img/` folders for unoptimized assets; use SVG for icons where possible
- **Font files**: Locally hosted custom fonts reduce external dependencies

## Project-Specific Notes

### dveri-master (Most Complex)

- Full multi-page site with catalog filtering (MixItUp.js), portfolio gallery (BaguetteBox.js)
- Has `source/` directory (likely PSD/design files)
- Multiple HTML pages with consistent header/footer structure
- CSS uses more advanced selectors for dropdown menus and state management

### bwlanding (jQuery-Heavy)

- Good example of responsive menu patterns
- Uses Fontello for social media icons
- Demonstrates smooth scroll navigation with hash linking
- Active menu state follows scroll position

### fragment\* Projects (Pattern Examples)

- Minimal, focused examples (cards grid, etc.)
- Use modern CSS (Grid, CSS Variables)
- Good for learning individual patterns before applying to full projects

## Tips for Code Generation

1. **When creating new HTML**: Always include responsive meta viewport and container pattern
2. **When updating CSS**: Add new colors/sizes as CSS variables first, then use them
3. **When modifying menus**: Remember to update BOTH desktop and mobile versions
4. **When referencing Figma files**: Check the `.fig` files in project root for exact measurements
5. **For interactive features**: Use jQuery patterns from `bwlanding/js/main.js` as template
6. **Font loading**: Always declare `@font-face` at top of CSS before using custom fonts
