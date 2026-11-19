# Animated Portfolio

A fast, animated personal portfolio website built with plain HTML, CSS and JavaScript. No frameworks, no build step.

**Live demo:** _add your deployed link here_

## Objective

- Present my skills, projects and contact details in one place.
- Practise building smooth animations without relying on heavy libraries.
- Keep the site fast, responsive and accessible, and deployable for free.

## Features

- Animated particle network background that reacts to the mouse
- Typing effect in the hero section
- Scroll-reveal animations and animated counters
- 3D tilt effect on project cards
- Cursor glow and scroll progress bar
- Fully responsive layout
- Respects `prefers-reduced-motion` for users who want less animation

## Tech Stack

| Area | Tools |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, keyframes) |
| Behaviour | Vanilla JavaScript (IntersectionObserver, Canvas API) |
| Hosting | GitHub Pages (free) |

## Project Structure

```
index.html   page content
style.css    styles and animations
script.js    animations and interactions
```

## Run Locally

```bash
git clone <your-repo-url>
cd <repo-folder>
# open index.html in a browser, or serve it:
python3 -m http.server 8000
```

## Challenges

- Keeping the canvas background smooth without hurting performance, solved by limiting the particle count based on screen width.
- Making animations run only when elements enter the viewport, solved with `IntersectionObserver` instead of scroll listeners.
- Keeping animations accessible by switching them off for users with reduced-motion settings.

## What I Learned

- How the Canvas API and `requestAnimationFrame` work together for continuous animation.
- Using `IntersectionObserver` for scroll-triggered effects.
- Building a responsive design with CSS variables, grid and flexbox.
- Deploying a static site for free with GitHub Pages.

## Call To Action

If you like this work or have an opportunity, I would love to connect.
Open an issue, send a message through the contact section on the site, or star the repo if it helped you.

## Summary

A lightweight, animated, responsive portfolio built from scratch with HTML, CSS and JavaScript. It shows how much can be done without frameworks, and it is easy to customise: edit the text in `index.html` and the colours in `style.css`.
