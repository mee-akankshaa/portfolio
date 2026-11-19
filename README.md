# Animated Portfolio

Black-and-white, editorial-style portfolio of **Akanksha Dubey**, an AI-assisted full-stack developer from Delhi, India. Built with plain HTML, CSS and JavaScript. No frameworks, no build step.

**Live demo:** https://mee-akankshaa.github.io/portfolio/

## Objective

- Present my skills, projects, education and certificates in one place.
- Practise building smooth, hand-made animations without relying on heavy libraries.
- Keep the site fast, responsive and accessible, and host it for free.

## Sections

1. **Intro** - a huge "Software Engineer" title that shrinks into the hero as you scroll. A sketched girl waves hello (laptop in hand, headphones on), then sits cross-legged and starts working.
2. **About** - short introduction with animated counters.
3. **Skills** - grouped into Frontend, Backend, AI & Automation, Data and Soft skills.
4. **Projects** - a grid of "pockets" with cards fanned out of each one. Hover to spread the cards. Each project has its description, tech tags and links.
5. **Experience** - 1 year as an AI-assisted full-stack developer.
6. **Education** - a timeline on the left (Class 10, Class 12, Diploma, BCA) and a sketch on the right that changes with the stage you are on.
7. **Certificates** - PHP-based Full-Stack Developer Diploma, Agentic AI (Cursora) and SEO (Tutedude).
8. **Footer** - sketched people walking across the scene, a girl with a laptop in the middle, and a large "AKANKSHA." whose letters react to the cursor.

## Features

- All illustrations are drawn in code as inline SVG (black-pen sketch style) and animated with CSS
- Scroll-linked intro, timeline sketch that changes per stage, and a scroll progress bar
- Scroll-reveal animations and animated counters
- Interactive footer text (letters lift and darken near the cursor, click to pop)
- "Let's talk" circle (bottom right) opens a contact form; a girl peeks over the form and her eyes follow the cursor. Submissions are emailed via Web3Forms
- Fully responsive layout
- Respects `prefers-reduced-motion` for users who want less animation

## Tech Stack

| Area | Tools |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, keyframes) |
| Behaviour | Vanilla JavaScript (scroll-linked animation, IntersectionObserver, generated SVG) |
| Hosting | GitHub Pages (free) |

## Project Structure

```
index.html    page content
style.css     styles and animations
script.js     animations, timeline and sketches
projects.js   project list (add a new project here)
photo.jpg     optional portrait (not included; add it to show a photo)
```

## Add or Edit Projects

Open `projects.js` and add an object to the `PROJECTS` list:

```js
{ title: "My Project", desc: "What it does.", tags: ["React", "Node.js"], code: "https://github.com/...", live: "https://..." }
```

Leave `live` empty if the project has no live demo, and the Live button is hidden.

## Run Locally

```bash
git clone https://github.com/mee-akankshaa/portfolio.git
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Challenges

- Building the scroll-driven intro without a library, solved by mapping scroll progress to the opacity and scale of the title and hero.
- Keeping the timeline readable while the sketch changes, solved by picking the stage closest to the middle of the screen and swapping the SVG with a short transition.
- Making black-pen sketches visible on a dark page, solved with a thin light edge around the drawing.
- Running animations only when needed, solved with `IntersectionObserver` instead of scroll listeners.
- Keeping animations accessible by switching them off for reduced-motion settings.

## What I Learned

- Linking animation to scroll position with sticky sections.
- Drawing and animating SVG illustrations with JavaScript and CSS.
- Using `IntersectionObserver` for scroll-triggered effects.
- Building a responsive design with CSS variables, grid and flexbox.
- Deploying a static site for free with GitHub Pages.

## Call To Action

If you like this work or have an opportunity, I would love to connect. Find me on GitHub at https://github.com/mee-akankshaa, and feel free to star the repo or open an issue.

## Summary

A lightweight, animated, responsive portfolio built from scratch with HTML, CSS and JavaScript. It shows how much can be done without frameworks, and it is easy to customise: edit the content in `index.html` and `projects.js`, and the colours in `style.css`.
