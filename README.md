# Animated Portfolio

Black-and-white, editorial-style portfolio of **Akanksha Dubey**, an AI-assisted full-stack developer. Built with plain HTML, CSS and JavaScript. No frameworks, no build step.

**Live demo:** https://mee-akankshaa.github.io/portfolio/

## Objective

- Present my skills, projects and contact details in one place.
- Practise building smooth animations without relying on heavy libraries.
- Keep the site fast, responsive and accessible, and deployable for free.

## Features

- Scroll-driven intro: a huge "Software Engineer" title that shrinks into the hero
- Black-and-white editorial design
- Animated footer: sketch-style people walking across the scene, with a girl (red top, black jeans, laptop, headphones, backpack) animated in place
- Projects shown as a stack of wallet-style cards, one pulled out at a time (list lives in projects.js)
- Scroll-reveal animations, animated counters and scroll progress bar
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
script.js     animations and interactions
projects.js   project list (add a new project here)
photo.jpg     optional portrait (shown in the hero if present)
```

## Run Locally

```bash
git clone <your-repo-url>
cd <repo-folder>
# open index.html in a browser, or serve it:
python3 -m http.server 8000
```

## Challenges

- Building the scroll-driven intro without a library, solved by mapping scroll progress to opacity and scale of the title and hero.
- Making animations run only when elements enter the viewport, solved with `IntersectionObserver` instead of scroll listeners.
- Keeping animations accessible by switching them off for users with reduced-motion settings.

## What I Learned

- Linking animation to scroll position using a sticky section.
- Generating SVG illustrations with JavaScript for the footer crowd.
- Using `IntersectionObserver` for scroll-triggered effects.
- Building a responsive design with CSS variables, grid and flexbox.
- Deploying a static site for free with GitHub Pages.

## Call To Action

If you like this work or have an opportunity, I would love to connect.
Open an issue, send a message through the contact section on the site, or star the repo if it helped you.

## Summary

A lightweight, animated, responsive portfolio built from scratch with HTML, CSS and JavaScript. It shows how much can be done without frameworks, and it is easy to customise: edit the text in `index.html` and the colours in `style.css`.
