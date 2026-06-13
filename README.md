# Ormula-Ten 🏎️🔥

Welcome to **Ormula-Ten**, a deep retro-inspired 2D browser racing project built with pure web technologies. This game is designed to run instantly in a modern browser, with a lightweight engine, persistent progression, theme customization, and a shop-style unlock system.

---

## 🚀 Project Summary

Ormula-Ten is a browser-native racing demo with the following high-level goals:

- Provide a **retro arcade racing feel** with smooth, responsive controls.
- Keep the experience **lightweight** and dependency-free.
- Make the game **easy to extend** by separating core logic and enhancements.
- Use **persistent storage** so progress survives page reloads.
- Support a **theme economy** and edition-choice system for layered progression.

---

## 🎮 Detailed Gameplay

The game mixes track racing, avoidance, and item pickups. The main gameplay systems include:

- **Player car control**: accelerate, brake/reverse, and steer left/right.
- **Dynamic road rendering**: road segments are simulated with canvas drawing and perspective scaling.
- **Enemy traffic**: other vehicles or obstacles appear on the road and must be avoided.
- **Repair pickups**: restore health or survive longer races.
- **Currency & shop**: earn coins during races, then spend them on themes and editions.
- **Theme selection**: choose a theme to change the visual style of the game and UI.
- **Editions**: unlock editions like Standard, Beta, Ultimate, VIP, and Editor, each with different bonuses and aesthetics.

---

## 📂 Project Structure

| File / Folder           | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `index.html`            | Main entry point that loads the canvas, UI, buttons, and assets.        |
| `game.js`               | Core game loop, rendering, update logic, input handling, and physics.   |
| `game_additions.js`     | Theme/shop system, edition logic, persistent storage, and UI hooks.     |
| `style.css`             | Full styling for the game page, theme support, and responsive layout.   |
| `src/`                  | Asset folder containing logos, icons, and image files.                  |
| `scratch_drawGame.txt`  | Development notes and experiments for drawing the game UI.              |
| `scratch_physics.txt`   | Development notes and experiments for physics and motion logic.         |

---

## 🧠 Architecture and Code Details

### `index.html`

This file contains:

- A `<canvas>` element for the 2D racing display.
- UI panels for score, shop, theme selection, and edition menus.
- Links to `style.css`, `game.js`, and `game_additions.js`.
- A small markup structure to host the entire game experience on one page.

### `game.js`

The engine in `game.js` handles:

- The **main animation loop** via `requestAnimationFrame`.
- **Player input** using keyboard event listeners for `W/A/S/D`, arrow keys, and Space.
- **Physics updates** for speed, position, acceleration, and turning.
- **Collision detection** between the player and obstacles or enemies.
- **Road drawing** with perspective scaling so the road appears to extend into the distance.
- **HUD rendering** for speed, score, health, and active items.

### `game_additions.js`

This module expands the game with:

- **Theme data** and unlockable theme logic.
- **Theme purchase flow** to require coins for non-default themes.
- **Edition selection and unlocking**, including hidden or premium editions.
- **Persistent state** with `localStorage` keys such as:
  - `ormula_theme`
  - `ormula_coins`
  - `ormula_unlocked_themes`
  - `ormula_edition`
  - `ormula_purchased_editions`
- **Page-wide theme application** by toggling body classes so the entire UI matches the chosen theme.
- **Save/load functions** so progress continues between sessions.

### `style.css`

The stylesheet includes:

- A **dark neon-inspired base theme** for the game page.
- **Responsive layout** for mobile and desktop.
- Styling for game UI panels, buttons, and menu components.
- Theme-specific rules via `body.<theme-name>` classes.
- Visual polish such as gradients, glow effects, and border styling.

---

## 🏁 Getting Started

### Option 1: Open directly
1. Open `index.html` in your browser.
2. Play immediately.

### Option 2: Run a local server (recommended)
A local server avoids file-loading restrictions and is best for development.

#### Using Python 3
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

#### Using Node.js and `http-server`
```bash
npm install -g http-server
http-server
```
Then open the address shown in the terminal.

---

## 🎮 Controls

| Action          | Key(s)              | Description |
|-----------------|---------------------|-------------|
| Accelerate      | Up Arrow / W        | Increase speed forward. |
| Brake / Reverse | Down Arrow / S      | Slow down or move backward. |
| Steer Left      | Left Arrow / A      | Move your car left. |
| Steer Right     | Right Arrow / D     | Move your car right. |
| Special Action  | Spacebar (if active)| Use available item or activate special feature. |

---

## 💡 Gameplay Systems

### Progress and currency

- Coins are awarded based on race performance.
- The shop uses coins to unlock premium themes and editions.
- Purchases are stored locally so they persist on reload.

### Theme economy

- The default theme is free.
- All other themes require coins to unlock.
- Themes change both the game visuals and the surrounding page styling.

### Editions and progression

- Editions represent different game modes or performance tiers.
- Available editions include `Standard`, `Beta`, `Ultimate`, `VIP`, and a hidden `Editor` mode.
- Each edition can alter handling, gameplay feel, or unlock additional features.

### Game feel

- The racing loop is designed to be accessible and arcade-friendly.
- Visual feedback is provided through simple HUD indicators, color changes, and item pickups.
- The game aims for a mix of short-term action and long-term unlock progression.

---

## 🔧 How to Extend This Game

### Add a new theme

1. Add a new theme object to the theme data in `game_additions.js`.
2. Define its unlock cost and style class.
3. Add corresponding CSS rules in `style.css`.
4. Ensure the theme name appears in the purchase UI if applicable.

### Add a new edition

1. Update edition metadata in `game_additions.js`.
2. Add unlock logic and any edition-specific bonuses.
3. Add UI elements to let players select the new edition.
4. Test persistence so selected edition saves correctly.

### Improve physics or handling

1. Tweak variables in `game.js` for acceleration, top speed, and steering.
2. Adjust collision size, road friction, or enemy behavior.
3. Use `scratch_physics.txt` to log experiments and formulas.

### Add audio

- Add sound files to `src/`.
- Load audio assets in `index.html` or `game.js`.
- Trigger sound effects on collisions, purchases, and race events.

---

## 📌 Development Notes

- `scratch_drawGame.txt` is useful for documenting how the road, player sprite, and HUD are drawn.
- `scratch_physics.txt` contains rough ideas and adjustments for movement and collision calculations.
- The project is intentionally kept modular so new mechanics can be added without rewriting the entire game.

---

## 🧪 Known Limitations

- This is a browser demo, not a full commercial racing engine.
- The current asset set is minimal and abstract.
- Physics and collision detection are intentionally simplified.
- Sound and particle richness can be improved in future iterations.

---

## 🤝 Contributing

Want to help build Ormula-Ten? Here’s how:

1. Fork the repository.
2. Create a branch: `git checkout -b feature-name`.
3. Make your changes.
4. Commit with clear messages.
5. Push to your fork: `git push origin feature-name`.
6. Open a Pull Request with a description of your improvement.

Suggested improvements:
- Add more race tracks and environments.
- Improve UI polish and page responsiveness.
- Add sound effects and music.
- Expand the theme shop with more unlockable visuals.
- Create a settings menu for audio and controls.

---

## 📦 Where to Start Editing

- `game.js` for core gameplay, rendering, and controls.
- `game_additions.js` for the shop, theme system, and persistence.
- `style.css` for UI styling, theme visuals, and layout.
- `index.html` for the page structure and element placement.

---

## 📜 License

This project is released under the **MIT License**.

Feel free to use, modify, and share the code.

---

## 🎉 Enjoy the race!

Thanks for exploring **Ormula-Ten**. Race, customize, and build on this browser game as much as you like.

Made with ❤️ by j-41
