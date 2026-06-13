/* ================= CAR SHOP ================= */
const CAR_DATA = {
  player: { name: 'Standard Racer', price: 0, imageKey: 'player', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 7, handling: 4, armor: 2, nos: 80, magnet: 1, shield: 1 } },
  racer_car_1: { name: 'Speed Demon', price: 500, imageKey: 'playerCar1', shopImageKey: 'enemy1', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 9, handling: 5, armor: 2, nos: 100, magnet: 1, shield: 1 } },
  racer_car_2: { name: 'Drift King', price: 600, imageKey: 'playerCar2', shopImageKey: 'enemy2', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 7, handling: 7, armor: 2, nos: 90, magnet: 1, shield: 1 } },
  racer_car_3: { name: 'Tank', price: 800, imageKey: 'playerCar3', shopImageKey: 'enemy3', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 6, handling: 4, armor: 5, nos: 80, magnet: 1, shield: 2 } },
  racer_car_4: { name: 'Nitro Fiend', price: 700, imageKey: 'playerCar4', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 8, handling: 5, armor: 2, nos: 120, magnet: 1, shield: 1 } },
  racer_car_5: { name: 'Magnet Master', price: 750, imageKey: 'playerCar5', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 7, handling: 5, armor: 2, nos: 80, magnet: 3, shield: 1 } },
  racer_car_6: { name: 'Shield Bearer', price: 850, imageKey: 'playerCar6', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 7, handling: 4, armor: 3, nos: 80, magnet: 1, shield: 3 } },
  racer_car_7: { name: 'Balanced Pro', price: 650, imageKey: 'playerCar7', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 8, handling: 6, armor: 3, nos: 90, magnet: 2, shield: 2 } },
  racer_car_8: { name: 'Thunder Bolt', price: 900, imageKey: 'playerCar8', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 10, handling: 4, armor: 2, nos: 110, magnet: 1, shield: 1 } },
  racer_car_9: { name: 'Ironclad', price: 950, imageKey: 'playerCar9', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 6, handling: 5, armor: 6, nos: 80, magnet: 1, shield: 2 } },
  racer_car_10: { name: 'Ultimate All-Rounder', price: 1000, imageKey: 'playerCar10', allowedEditions: ['standard', 'beta', 'editor', 'ultimate', 'vip'], baseStats: { speed: 9, handling: 7, armor: 4, nos: 100, magnet: 2, shield: 2 } },
  racer_VIP: { name: 'VIP Elite', price: 2000, imageKey: 'racerVIP', allowedEditions: ['vip', 'editor'], baseStats: { speed: 12, handling: 8, armor: 5, nos: 150, magnet: 3, shield: 3 } },
  racer_VIP_1: { name: 'VIP Phantom', price: 2200, imageKey: 'racerVIP1', allowedEditions: ['vip', 'editor'], baseStats: { speed: 11, handling: 9, armor: 4, nos: 140, magnet: 3, shield: 3 } },
  racer_VIP_2: { name: 'VIP Thunder', price: 2300, imageKey: 'racerVIP2', allowedEditions: ['vip', 'editor'], baseStats: { speed: 13, handling: 7, armor: 4, nos: 160, magnet: 2, shield: 3 } },
  racer_VIP_3: { name: 'VIP Titan', price: 2400, imageKey: 'racerVIP3', allowedEditions: ['vip', 'editor'], baseStats: { speed: 10, handling: 8, armor: 7, nos: 130, magnet: 3, shield: 4 } },
  racer_VIP_4: { name: 'VIP Blaze', price: 2600, imageKey: 'racerVIP4', allowedEditions: ['vip', 'editor'], baseStats: { speed: 14, handling: 8, armor: 5, nos: 175, magnet: 3, shield: 3 } },
  racer_VIP_5: { name: 'VIP Specter', price: 2700, imageKey: 'racerVIP5', allowedEditions: ['vip', 'editor'], baseStats: { speed: 13, handling: 10, armor: 4, nos: 160, magnet: 4, shield: 3 } },
  racer_VIP_6: { name: 'VIP Sovereign', price: 2800, imageKey: 'racerVIP6', allowedEditions: ['vip', 'editor'], baseStats: { speed: 12, handling: 9, armor: 6, nos: 155, magnet: 4, shield: 5 } },
  racer_VIP_7: { name: 'VIP Supreme', price: 3500, imageKey: 'racerVIP7', allowedEditions: ['vip', 'editor'], baseStats: { speed: 15, handling: 11, armor: 7, nos: 200, magnet: 5, shield: 5 } },
  racer_Ultimate_1: { name: 'Ultimate Speed', price: 2500, imageKey: 'racerUltimate1', shopImageKey: 'racerUltimate1', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 15, handling: 6, armor: 3, nos: 180, magnet: 2, shield: 2 } },
  racer_Ultimate_2: { name: 'Ultimate Drift', price: 2500, imageKey: 'racerUltimate2', shopImageKey: 'racerUltimate2', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 12, handling: 12, armor: 3, nos: 150, magnet: 2, shield: 2 } },
  racer_Ultimate_3: { name: 'Ultimate Tank', price: 2500, imageKey: 'racerUltimate3', shopImageKey: 'racerUltimate3', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 10, handling: 6, armor: 9, nos: 120, magnet: 1, shield: 3 } },
  racer_Ultimate_4: { name: 'Ultimate Nitro', price: 2500, imageKey: 'racerUltimate4', shopImageKey: 'racerUltimate4', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 14, handling: 7, armor: 3, nos: 200, magnet: 2, shield: 2 } },
  racer_Ultimate_5: { name: 'Ultimate Magnet', price: 2500, imageKey: 'racerUltimate5', shopImageKey: 'racerUltimate5', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 12, handling: 7, armor: 3, nos: 140, magnet: 5, shield: 2 } },
  racer_Ultimate_6: { name: 'Ultimate Shield', price: 2500, imageKey: 'racerUltimate6', shopImageKey: 'racerUltimate6', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 12, handling: 6, armor: 5, nos: 130, magnet: 2, shield: 5 } },
  racer_Ultimate_7: { name: 'Ultimate Perfect', price: 3000, imageKey: 'racerUltimate7', shopImageKey: 'racerUltimate7', allowedEditions: ['ultimate', 'editor'], baseStats: { speed: 14, handling: 10, armor: 6, nos: 180, magnet: 4, shield: 4 } }
};

function openCarShop() {
  playSFX('click');
  renderCarShop();
  showOverlay('carShopMenu');
}

function isCarAllowedForEdition(carId) {
  const car = CAR_DATA[carId];
  const edition = state.currentEdition || 'standard';
  if (edition === 'editor') return true; // Editor edition allows all cars in sandbox mode
  return car && (!car.allowedEditions || car.allowedEditions.includes(edition));
}

function renderCarShop() {
  const grid = document.getElementById('carShopGrid');
  const wallet = document.getElementById('carShopWallet');
  if (!grid) return;
  grid.innerHTML = '';
  if (wallet) wallet.innerText = '🪙 ' + state.totalCoins;

  Object.keys(CAR_DATA)
    .filter(isCarAllowedForEdition)
    .forEach(carId => {
      const car = CAR_DATA[carId];
    const isOwned = state.ownedCars.includes(carId);
    const isSelected = state.selectedCar === carId;

    const card = document.createElement('div');
    card.className = 'theme-card ' + (isSelected ? 'active ' : '') + (carId.includes('VIP') ? 'vip-card' : '');
    card.style.cursor = 'pointer';

    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = 'width:80px;height:50px;margin:0 auto 8px;background:rgba(0,0,0,0.3);border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;';
    const carImg = document.createElement('img');
    const useRealRacerArt = (state.currentEdition || 'standard') === 'editor';
    const shopImageKey = useRealRacerArt ? (car.imageKey || 'player') : (car.shopImageKey || car.imageKey || 'player');
    carImg.src = IMAGE_PATHS[shopImageKey] || IMAGE_PATHS[car.imageKey] || '';
    carImg.style.cssText = 'width:100%;height:100%;object-fit:contain;';
    carImg.onerror = () => { carImg.style.display = 'none'; };
    imgContainer.appendChild(carImg);
    card.appendChild(imgContainer);

    const name = document.createElement('div');
    name.className = 'theme-name';
    name.innerText = car.name;
    card.appendChild(name);

    const editionLabel = document.createElement('div');
    editionLabel.className = 'theme-desc';
    editionLabel.innerText = car.allowedEditions && car.allowedEditions.length === 1
      ? car.allowedEditions[0].toUpperCase() + ' ONLY'
      : 'ALL EDITIONS';
    card.appendChild(editionLabel);

    const status = document.createElement('div');
    status.className = 'theme-status';
    
    if (isSelected) {
      status.className += ' active-text';
      status.innerText = 'SELECTED';
    } else if (isOwned) {
      status.className += ' buy-btn';
      status.innerText = 'SELECT';
      status.onclick = (e) => {
        e.stopPropagation();
        selectCar(carId);
      };
    } else {
      status.className += ' buy-btn';
      status.innerText = '🪙 ' + car.price;
      status.onclick = (e) => {
        e.stopPropagation();
        buyCar(carId, car.price);
      };
    }
    card.appendChild(status);

    card.onmouseleave = () => hideCarStatsTooltip();
    card.onclick = () => {
      if (isOwned) selectCar(carId);
    };

    imgContainer.style.cursor = 'pointer';
    imgContainer.onclick = (e) => {
      e.stopPropagation();
      const existing = document.getElementById('carStatsTooltip');
      if (existing) {
        hideCarStatsTooltip();
      } else {
        showCarStatsTooltip(carId, card);
      }
    };

      grid.appendChild(card);
    });
}

function showCarStatsTooltip(carId, element) {
  const car = CAR_DATA[carId];
  const upgrades = state.carUpgrades[carId] || { speed: 1, handling: 1, armor: 1, nos: 1, magnet: 1, shield: 1 };
  
  const tooltip = document.createElement('div');
  tooltip.id = 'carStatsTooltip';
  tooltip.style.cssText = 'position:fixed;background:rgba(13,20,35,0.95);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:15px;z-index:1000;min-width:200px;box-shadow:0 8px 32px rgba(0,0,0,0.8);backdrop-filter:blur(10px);font-family:Orbitron,sans-serif;';

  const stats = ['speed', 'handling', 'armor', 'nos', 'magnet', 'shield'];
  const labels = { speed: 'SPEED', handling: 'HANDLING', armor: 'ARMOR', nos: 'NOS', magnet: 'MAGNET', shield: 'SHIELD' };
  
  tooltip.innerHTML = '<div style="font-size:0.9rem;font-weight:700;color:#00ffaa;margin-bottom:10px;">' + car.name + '</div>';
  
  stats.forEach(stat => {
    const lvl = upgrades[stat] || 1;
    const currentVal = getCarStatValue(carId, stat, lvl);
    const maxVal = getCarStatValue(carId, stat, 50);
    const percentage = Math.round((currentVal / maxVal) * 100);
    
    tooltip.innerHTML += '<div style="display:flex;justify-content:space-between;align-items:center;margin:6px 0;font-size:0.7rem;"><span style="color:#aaa;">' + labels[stat] + '</span><span style="color:#fff;">' + currentVal.toFixed(1) + ' <span style="color:#666;">(LVL ' + lvl + ')</span></span></div><div style="width:100%;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin:2px 0 8px;"><div style="width:' + percentage + '%;height:100%;background:#00c8ff;border-radius:2px;"></div></div>';
  });

  document.body.appendChild(tooltip);
  const rect = element.getBoundingClientRect();
  tooltip.style.left = (rect.right + 10) + 'px';
  tooltip.style.top = rect.top + 'px';
}

function hideCarStatsTooltip() {
  const tooltip = document.getElementById('carStatsTooltip');
  if (tooltip) tooltip.remove();
}

function buyCar(carId, price) {
  if (state.totalCoins >= price) {
    state.totalCoins -= price;
    state.ownedCars.push(carId);
    if (!state.carUpgrades[carId]) {
      state.carUpgrades[carId] = { speed: 1, handling: 1, armor: 1, nos: 1, magnet: 1, shield: 1 };
    }
    localStorage.setItem('ormula_coins', state.totalCoins);
    localStorage.setItem('ormula_owned_cars', JSON.stringify(state.ownedCars));
    localStorage.setItem('ormula_car_upgrades', JSON.stringify(state.carUpgrades));
    playSFX('repair');
    renderCarShop();
  } else {
    showFrownyDialog('NOT ENOUGH COINS', `This car costs \ud83e\ude99 ${price}. You only have \ud83e\ude99 ${state.totalCoins}!`);
  }
}

function selectCar(carId) {
  state.selectedCar = carId;
  localStorage.setItem('ormula_selected_car', carId);
  playSFX('click');
  renderCarShop();
  applyUpgrades();
}

function getPlayerImageKey() {
  const car = state.selectedCar || 'player';
  return CAR_DATA[car]?.imageKey || 'player';
}

/* ================= THEMES ================= */
const THEME_DATA = {
  default: { name: 'Default', description: 'Classic neon cyberpunk', colors: { grass: '#06070d', road: '#181920', curb: '#00ffaa' }, price: 0 },
  easter: { name: 'Easter', description: 'Pastel spring vibes', colors: { grass: '#55efc4', road: '#ffb8b8', curb: '#ffeaa7' }, price: 0 },
  new_years: { name: 'New Years', description: 'Fireworks celebration', colors: { grass: '#000000', road: '#111111', curb: '#f1c40f' }, price: 0 },
  christmas: { name: 'Christmas', description: 'Holiday spirit', colors: { grass: '#ecf0f1', road: '#bdc3c7', curb: '#e74c3c' }, price: 0 },
  winter: { name: 'Winter', description: 'Snowy landscape', colors: { grass: '#dfe6e9', road: '#b2bec3', curb: '#74b9ff' }, price: 0 },
  autumn: { name: 'Autumn', description: 'Fall foliage', colors: { grass: '#d35400', road: '#2c3e50', curb: '#f39c12' }, price: 0 },
  summer: { name: 'Summer', description: 'Bright sunny days', colors: { grass: '#ffeaa7', road: '#81ecec', curb: '#ff7675' }, price: 0 },
  neon_city: { name: 'Neon City', description: 'Urban night lights', colors: { grass: '#0a0a1a', road: '#1a1a2e', curb: '#ff00ff' }, price: 500 },
  sunset_drive: { name: 'Sunset Drive', description: 'Golden hour racing', colors: { grass: '#2d1b4e', road: '#4a2c6a', curb: '#ff6b35' }, price: 600 },
  ocean_blue: { name: 'Ocean Blue', description: 'Coastal highway', colors: { grass: '#0077be', road: '#003366', curb: '#00d4ff' }, price: 700 },
  forest_green: { name: 'Forest Green', description: 'Nature track', colors: { grass: '#228b22', road: '#2f4f4f', curb: '#90ee90' }, price: 650 },
  mars_red: { name: 'Mars Red', description: 'Martian surface', colors: { grass: '#8b4513', road: '#a52a2a', curb: '#ff4500' }, price: 800 }
};

function openThemes() {
  playSFX('click');
  renderThemes();
  showOverlay('themesMenu');
}

function openEditions() {
  playSFX('click');
  renderEditions();
  showOverlay('editionMenu');
}

function renderThemes() {
  const grid = document.getElementById('themesGridContainer');
  const wallet = document.getElementById('themesWallet');
  if (!grid) return;
  grid.innerHTML = '';
  if (wallet) wallet.innerText = '🪙 ' + state.totalCoins;

  Object.keys(THEME_DATA).forEach(themeId => {
    const theme = THEME_DATA[themeId];
    const isUnlocked = state.unlockedThemes.includes(themeId);
    const isSelected = state.currentTheme === themeId;

    const card = document.createElement('div');
    card.className = 'theme-card ' + (isSelected ? 'active' : '');
    card.style.cursor = 'pointer';

    const preview = document.createElement('div');
    preview.style.cssText = 'width:100%;height:40px;margin-bottom:8px;border-radius:8px;background:linear-gradient(135deg,' + theme.colors.grass + ' 0%,' + theme.colors.road + ' 100%);border:2px solid ' + theme.colors.curb + ';';
    card.appendChild(preview);

    const name = document.createElement('div');
    name.className = 'theme-name';
    name.innerText = theme.name;
    card.appendChild(name);

    const desc = document.createElement('div');
    desc.className = 'theme-desc';
    desc.innerText = theme.description;
    card.appendChild(desc);

    const status = document.createElement('div');
    status.className = 'theme-status';
    
    if (isSelected) {
      status.className += ' active-text';
      status.innerText = 'ACTIVE';
    } else if (isUnlocked) {
      status.className += ' buy-btn';
      status.innerText = 'SELECT';
      status.onclick = (e) => {
        e.stopPropagation();
        selectTheme(themeId);
      };
    } else {
      status.className += ' buy-btn';
      status.innerText = '🪙 ' + theme.price;
      status.onclick = (e) => {
        e.stopPropagation();
        buyTheme(themeId, theme.price);
      };
    }
    card.appendChild(status);

    card.onmouseenter = () => {
      preview.style.transform = 'scale(1.05)';
      preview.style.transition = 'transform 0.2s';
    };
    card.onmouseleave = () => {
      hideThemeStatsTooltip();
      preview.style.transform = 'scale(1)';
    };
    card.onclick = () => {
      if (isUnlocked) selectTheme(themeId);
    };

    preview.style.cursor = 'pointer';
    preview.onclick = (e) => {
      e.stopPropagation();
      const existing = document.getElementById('themeStatsTooltip');
      if (existing) {
        hideThemeStatsTooltip();
      } else {
        showThemeStatsTooltip(themeId, card);
      }
    };

    grid.appendChild(card);
  });
}

function showThemeStatsTooltip(themeId, element) {
  const theme = THEME_DATA[themeId] || THEME_DATA.default;
  const tooltip = document.createElement('div');
  tooltip.id = 'themeStatsTooltip';
  tooltip.style.cssText = 'position:fixed;background:rgba(8,12,20,0.96);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px;z-index:1100;min-width:180px;box-shadow:0 10px 28px rgba(0,0,0,0.65);backdrop-filter:blur(10px);font-family:Orbitron,sans-serif;';
  tooltip.innerHTML = '<div style="font-size:0.82rem;font-weight:700;color:#00ffaa;margin-bottom:6px;">' + theme.name + '</div>' +
    '<div style="font-size:0.68rem;color:#ccc;line-height:1.4;margin-bottom:6px;">' + theme.description + '</div>' +
    '<div style="display:flex;justify-content:space-between;font-size:0.68rem;color:#aaa;"><span>Grass</span><span style="color:' + theme.colors.grass + ';">■</span></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:0.68rem;color:#aaa;"><span>Road</span><span style="color:' + theme.colors.road + ';">■</span></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:0.68rem;color:#aaa;"><span>Curb</span><span style="color:' + theme.colors.curb + ';">■</span></div>';
  document.body.appendChild(tooltip);
  const rect = element.getBoundingClientRect();
  tooltip.style.left = (rect.right + 8) + 'px';
  tooltip.style.top = Math.max(8, rect.top) + 'px';
}

function hideThemeStatsTooltip() {
  const tooltip = document.getElementById('themeStatsTooltip');
  if (tooltip) tooltip.remove();
}

function buyTheme(themeId, price) {
  if (state.totalCoins >= price) {
    state.totalCoins -= price;
    state.unlockedThemes.push(themeId);
    localStorage.setItem('ormula_coins', state.totalCoins);
    localStorage.setItem('ormula_unlocked_themes', JSON.stringify(state.unlockedThemes));
    playSFX('repair');
    renderThemes();
  } else {
    showFrownyDialog('NOT ENOUGH COINS', `This theme costs \ud83e\ude99 ${price}. You only have \ud83e\ude99 ${state.totalCoins}!`);
  }
}

function selectTheme(themeId) {
  state.currentTheme = themeId;
  localStorage.setItem('ormula_theme', themeId);
  playSFX('click');
  renderThemes();
  applyThemeStyles();
}

function hexToRGBA(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyThemeStyles() {
  const theme = THEME_DATA[state.currentTheme] || THEME_DATA.default;
  const gridColor = hexToRGBA(theme.colors.curb, 0.08);
  document.body.style.setProperty('--grid-color', gridColor);
  document.body.className = '';
  if (state.currentTheme !== 'default') {
    document.body.classList.add('theme-' + state.currentTheme);
  }
}

/* ================= EDITIONS ================= */
const EDITION_DATA = {
  standard: { name: 'Standard Edition', description: 'Classic package with balanced tuning.', themeColor: '#ff4444', logo: 'standardEdition', badgeClass: 'standard', price: 0 },
  beta: { name: 'Beta Edition', description: 'Early access boosts and sharper handling.', themeColor: '#4488ff', logo: 'betaEdition', badgeClass: 'beta', price: 30000 },
  ultimate: { name: 'Ultimate Edition', description: 'Premium speed, NOS, and elite upgrades.', themeColor: '#8844ff', logo: 'ultimateEdition', badgeClass: 'ultimate', price: 750000 },
  vip: { name: 'VIP Edition', description: 'Luxury package with top-tier performance.', themeColor: '#ffd700', logo: 'vipEdition', badgeClass: 'vip', price: 500000 },
  editor: { name: 'Editor Edition', description: 'Admin tools and sandbox tuning controls.', themeColor: '#888888', logo: 'editorEdition', badgeClass: 'editor', price: 0, hidden: true }
};

function renderEditions() {
  const grid = document.getElementById('editionGrid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.keys(EDITION_DATA)
    .filter(editionId => !EDITION_DATA[editionId].hidden || localStorage.getItem('ormula_admin_accessed') === 'true')
    .forEach(editionId => {
    const edition = EDITION_DATA[editionId];
    const isActive = (state.currentEdition || 'standard') === editionId;
    const isOwned = state.purchasedEditions.includes(editionId) || edition.price === 0;
    const affordable = edition.price === 0 || state.gems >= edition.price;

    const card = document.createElement('div');
    card.className = 'theme-card ' + (isActive ? 'active' : '');
    card.style.cursor = 'pointer';

    const badge = document.createElement('div');
    badge.className = 'edition-badge ' + edition.badgeClass;
    badge.innerText = edition.name.toUpperCase();
    card.appendChild(badge);

    const desc = document.createElement('div');
    desc.className = 'theme-desc';
    desc.innerText = edition.description;
    card.appendChild(desc);

    if (edition.price > 0) {
      const price = document.createElement('div');
      price.className = 'theme-status';
      price.innerText = '💎 ' + edition.price.toLocaleString();
      card.appendChild(price);
    }

    const action = document.createElement('div');
    action.className = 'theme-status ' + (isActive ? 'active-text' : (isOwned ? 'buy-btn' : 'buy-btn'));
    if (isActive) {
      action.innerText = 'ACTIVE';
    } else if (!isOwned) {
      action.innerText = affordable ? 'BUY FOR 💎 ' + edition.price.toLocaleString() : 'NEED 💎 ' + edition.price.toLocaleString();
      action.style.opacity = affordable ? '1' : '0.55';
      action.style.cursor = affordable ? 'pointer' : 'not-allowed';
      action.style.pointerEvents = affordable ? 'auto' : 'none';
      action.onclick = (e) => {
        e.stopPropagation();
        if (affordable) buyEdition(editionId);
      };
    } else {
      action.innerText = 'SELECT';
      action.onclick = (e) => {
        e.stopPropagation();
        setEdition(editionId);
      };
    }
    card.appendChild(action);

    card.onclick = () => {
      if (isOwned || edition.price === 0) setEdition(editionId);
    };
    grid.appendChild(card);
  });
}

function buyEdition(editionId) {
  const edition = EDITION_DATA[editionId];
  if (!edition || edition.price <= 0) return;
  if (state.gems < edition.price) {
    showFrownyDialog('NOT ENOUGH GEMS', `This edition costs \ud83d\udc8e ${edition.price.toLocaleString()}. You only have \ud83d\udc8e ${state.gems.toLocaleString()}!`);
    return;
  }
  state.gems -= edition.price;
  if (!state.purchasedEditions.includes(editionId)) state.purchasedEditions.push(editionId);
  localStorage.setItem('ormula_gems', state.gems);
  localStorage.setItem('ormula_purchased_editions', JSON.stringify(state.purchasedEditions));
  setEdition(editionId);
}

function setEdition(editionId) {
  const edition = EDITION_DATA[editionId];
  if (!edition) return;
  if (edition.price > 0 && !state.purchasedEditions.includes(editionId) && editionId !== 'standard') return;
  state.currentEdition = editionId;
  localStorage.setItem('ormula_edition', editionId);
  document.documentElement.style.setProperty('--neon-green', edition.themeColor);
  
  // Revert selected car if not allowed in the new edition
  if (!isCarAllowedForEdition(state.selectedCar)) {
    selectCar('player');
  }

  renderEditions();
  updateEditionDisplay();
  applyEditionBonuses(editionId);
}

function updateEditionDisplay() {
  const wallet = document.getElementById('editionWallet');
  if (wallet) wallet.innerText = '💎 ' + (state.gems || 0);
  const edition = EDITION_DATA[state.currentEdition || 'standard'];
  const loadLogo = document.getElementById('loadingEditionLogo');
  const loadBadge = document.getElementById('loadingEditionBadge');
  if (loadLogo) loadLogo.src = IMAGE_PATHS[edition.logo];
  if (loadBadge) {
    loadBadge.innerText = edition.name.toUpperCase();
    loadBadge.className = 'edition-badge ' + edition.badgeClass;
  }
  const menuLogo = document.getElementById('editionLogoImg');
  const menuBadge = document.getElementById('editionBadge');
  if (menuLogo) menuLogo.src = IMAGE_PATHS[edition.logo];
  if (menuBadge) {
    menuBadge.innerText = edition.name.toUpperCase();
    menuBadge.className = 'edition-badge ' + edition.badgeClass;
  }
}

function applyEditionBonuses(editionId) {
  switch(editionId) {
    case 'beta':
      CONFIG.upgradeCostBase = { speed: 60, handling: 70, armor: 110, nos: 90, magnet: 140, shield: 180 };
      break;
    case 'editor':
      CONFIG.upgradeCostBase = { speed: 50, handling: 50, armor: 80, nos: 70, magnet: 120, shield: 150 };
      state.adminEverAccessed = true;
      localStorage.setItem('ormula_admin_accessed', 'true');
      break;
    case 'standard':
      CONFIG.upgradeCostBase = { speed: 80, handling: 80, armor: 120, nos: 100, magnet: 160, shield: 200 };
      break;
    case 'ultimate':
      CONFIG.upgradeCostBase = { speed: 70, handling: 70, armor: 100, nos: 90, magnet: 140, shield: 180 };
      break;
    case 'vip':
      CONFIG.upgradeCostBase = { speed: 60, handling: 60, armor: 90, nos: 80, magnet: 120, shield: 150 };
      break;
  }
}

/* ================= INSUFFICIENT FUNDS DIALOG ================= */
function showFrownyDialog(title, message) {
  playSFX('click');
  let overlay = document.getElementById('frownyDialogOverlay');
  if (overlay) overlay.remove();

  overlay = document.createElement('div');
  overlay.id = 'frownyDialogOverlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
    animation: frownyFadeIn 0.25s ease;
  `;

  overlay.innerHTML = `
    <div id="frownyDialog" style="
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 2px solid rgba(255,80,80,0.6);
      border-radius: 20px;
      padding: 40px 50px;
      text-align: center;
      max-width: 380px;
      width: 90%;
      box-shadow: 0 0 40px rgba(255,60,60,0.4), 0 20px 60px rgba(0,0,0,0.5);
      animation: frownyPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
      position: relative;
    ">
      <div style="font-size: 72px; line-height: 1; margin-bottom: 12px; filter: drop-shadow(0 0 16px rgba(255,80,80,0.6));">☹️</div>
      <div style="font-family: 'Orbitron', 'Rajdhani', monospace; font-size: 18px; font-weight: 800; color: #ff5555; letter-spacing: 3px; margin-bottom: 10px; text-transform: uppercase;">${title}</div>
      <div style="font-family: 'Rajdhani', sans-serif; font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.5;">${message}</div>
      <button onclick="document.getElementById('frownyDialogOverlay').remove()" style="
        margin-top: 24px; padding: 10px 30px;
        background: linear-gradient(135deg, #ff4444, #c0392b);
        border: none; border-radius: 50px; cursor: pointer;
        color: white; font-family: 'Orbitron', monospace; font-size: 12px;
        font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
        transition: transform 0.15s, box-shadow 0.15s;
        box-shadow: 0 4px 15px rgba(255,68,68,0.4);
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">OK</button>
    </div>
  `;

  // Inject keyframes once
  if (!document.getElementById('frownyKeyframes')) {
    const style = document.createElement('style');
    style.id = 'frownyKeyframes';
    style.textContent = `
      @keyframes frownyFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes frownyPop { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  // Dismiss on backdrop click
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);

  // Auto-dismiss after 4 seconds
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 4000);
}


