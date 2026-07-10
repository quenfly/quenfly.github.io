# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **Jekyll 4.x static site** (the "WhatATheme" portfolio + blog theme, customized as "Meng's Space"). Dependencies are managed with **Bundler** (`Gemfile` / `Gemfile.lock`); there is no database or backend service.

### Services
- **Jekyll dev server** — the only service. Run it with `bundle exec jekyll serve --host 0.0.0.0 --port 4000` (README uses the shorthand `bundle exec jekyll s`). Site is served at `http://localhost:4000`.
- **Jekyll Admin (CMS)** runs in-process as a plugin at `http://localhost:4000/admin/` while the dev server is running. There is no separate process/port.

### Common commands
- Build: `bundle exec jekyll build` (output in `_site/`).
- Serve (dev, with live reload): `bundle exec jekyll serve`.
- There is no separate lint step or automated test suite; `bundle exec jekyll build` completing without errors is the effective correctness check.

### Non-obvious notes / gotchas
- **Ruby toolchain uses a user gem dir.** `GEM_HOME=~/.gem` (with `~/.gem/bin` on `PATH`) is set in the base environment, so `gem`/`bundle` install to the user's home without `sudo`. Do not `sudo gem install` — it will write to the wrong (read-only) location.
- **`Gemfile.lock` platform.** The upstream lockfile was pinned to a Windows-only platform (`x64-mingw-ucrt`). The Linux platforms (`x86_64-linux`, `x86_64-linux-gnu`, `ruby`) have been added so `bundle install` works on this VM. If you regenerate the lockfile, keep the Linux platforms (`bundle lock --add-platform x86_64-linux ruby`).
- **Pre-existing build warnings** (`Layout 'home' ... does not exist`, and destination conflicts for `404.html`/`index.html`) come from the repo's content files, not from the environment setup. They are non-fatal; the build still succeeds.
