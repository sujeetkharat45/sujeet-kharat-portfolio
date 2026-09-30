# Sujeet Kharat - Portfolio

A single-page portfolio built with React, HTML, CSS and JavaScript. No build step needed.

## Run it
Double-click `index.html`. It needs an internet connection the first time,
because React, htm and the fonts load from a CDN.

For a local server (optional): `npx serve .` or `python -m http.server`.

## Project structure

```
sujeet-kharat-portfolio/
├── index.html                  # Page shell: <head>, #root, CSS + script tags
├── README.md
├── assets/
│   └── images/                 # profile.jpg, profile-sm.jpg
├── css/
│   ├── base/                   # variables (theme tokens), base, effects, responsive
│   ├── layout/                 # header
│   ├── sections/               # hero, about, projects, journey, contact
│   └── components/             # overlays (CLI, status bar, command palette)
└── js/
    ├── config.js               # EMAIL, GITHUB, LINKEDIN, image paths  <- edit contact info here
    ├── core.js                 # shared helpers (html template tag, reduced-motion flag)
    ├── data/                   # content: skills, journey, stats, nav, CLI commands...
    ├── hooks/                  # useInView, useTyper
    ├── components/
    │   ├── ui/                 # small reusable pieces (avatar, portrait, count, scramble...)
    │   ├── effects/            # canvas point field
    │   ├── hero/               # hero, terminal, letters
    │   ├── sections/           # about, stats, projects, skills, journey, contact
    │   ├── projects/           # role-demo, emi-demo
    │   ├── skills/             # skill-graph
    │   ├── overlays/           # boot, cli, palette, status
    │   └── app.js              # root component
    └── main.js                 # entry point: mounts <App/>
```

### How the JS is organised
Each file is a small IIFE that reads what it needs from the shared
`window.Portfolio` namespace and registers what it defines on it. Files are
loaded with plain `<script>` tags in dependency order (see the bottom of
`index.html`), so the site still works by double-click. Browsers block ES
modules on `file://`.

If you add a new file, add its `<script>` tag before the files that use it.

## Edit it
- Contact details and photo paths: `js/config.js`
- Colours, fonts, light/dark theme: `css/base/variables.css`
- Projects: `js/components/sections/projects.js`
- Experience: `js/data/journey.js` (education is in `js/components/sections/journey.js`)
- Skills: `js/data/skills.js`
- Replace the photo: overwrite `assets/images/profile.jpg` and `profile-sm.jpg`

## Put it online (free)
- **GitHub Pages:** create a repo, upload the whole folder, then Settings > Pages > deploy from the main branch.
- **Netlify or Vercel:** drag the `sujeet-kharat-portfolio` folder onto their dashboard.

## Shortcuts
- `Ctrl + K` (or `/`): command palette
- `` ` `` (backtick): CLI shell
