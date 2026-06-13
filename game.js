/* ================= GLOBAL STATE ================= */
const CONFIG = {
  width: 480,
  height: 800,
  roadWidth: 320,
  roadCenterX: 240,
  laneCenters: [140, 240, 340],
  maxUpgradeLvl: 50,
  upgradeCostBase: { speed: 80, handling: 80, armor: 120, nos: 100, magnet: 160, shield: 200 }
};

let state = {
  // Assets
  images: {},

  // Game running state
  gameRunning: false,
  paused: false,

  // Scoring & Stats
  score: 0,
  coinsCollected: 0,
  highscore: parseInt(localStorage.getItem('ormula_highscore')) || 0,
  totalCoins: parseInt(localStorage.getItem('ormula_coins')) || 0,

  // Upgrade levels per car (1 to 50)
  carUpgrades: JSON.parse(localStorage.getItem('ormula_car_upgrades')) || {
    player: { speed: 1, handling: 1, armor: 1, nos: 1, magnet: 1, shield: 1 }
  },
  carPaintHue: parseInt(localStorage.getItem('ormula_car_paint')) || 0,

  // Custom Themes State
  currentTheme: localStorage.getItem('ormula_theme') || 'default',
  unlockedThemes: JSON.parse(localStorage.getItem('ormula_unlocked_themes')) || ['default', 'easter', 'new_years', 'christmas', 'winter', 'autumn', 'summer', 'fall'],

  // Car Shop State
  selectedCar: localStorage.getItem('ormula_selected_car') || 'player',
  ownedCars: JSON.parse(localStorage.getItem('ormula_owned_cars')) || ['player'],

  // Admin / Edition State
  currentEdition: localStorage.getItem('ormula_edition') || 'standard',
  purchasedEditions: JSON.parse(localStorage.getItem('ormula_purchased_editions')) || ['standard'],
  gems: parseInt(localStorage.getItem('ormula_gems')) || 0,
  godMode: false,
  infNos: false,
  gameSpeedMultiplier: 1.0,
  adminEverAccessed: localStorage.getItem('ormula_admin_accessed') === 'true', // becomes true the moment admin panel is first opened

  // Audio state
  audioMuted: localStorage.getItem('ormula_audio_muted') === 'true',
  sfxMuted: localStorage.getItem('ormula_sfx_muted') === 'true',

  // Current session parameters
  speed: 0,
  targetSpeed: 0,
  maxSpeed: 8,
  acceleration: 0.15,
  friction: 0.94,

  // Player 1 state
  player: {
    x: CONFIG.roadCenterX, y: 650, vx: 0, angle: 0, hp: 3, maxHp: 3,
    shieldActive: false, shieldTime: 0, nosActive: false, nosEnergy: 100, nosCapacity: 100,
    steerPower: 6, width: 55, height: 100, speed: 0, targetSpeed: 0, maxSpeed: 8,
    acceleration: 0.15, friction: 0.94, offRoadTime: 0, distance: 0
  },
  
  // Multiplayer state
  isMultiplayer: false,
  
  // Player 2 state
  player2: {
    x: CONFIG.roadCenterX, y: 650, vx: 0, angle: 0, hp: 3, maxHp: 3,
    shieldActive: false, shieldTime: 0, nosActive: false, nosEnergy: 100, nosCapacity: 100,
    steerPower: 6, width: 55, height: 100, speed: 0, targetSpeed: 0, maxSpeed: 8,
    acceleration: 0.15, friction: 0.94, offRoadTime: 0, distance: 0
  },

  // Track parameters
  roadY: 0,
  screenShake: 0,
  offRoadTime: 0,

  // Entities arrays
  enemies: [],
  powerups: [],
  particles: [],

  // Safety Car / Flags
  yellowFlag: false,
  safetyCarActive: false,
  safetyCar: null,
  yellowFlagTimer: 0,

  // Weather & Environment
  weather: 'sunny', // 'sunny', 'rain'
  weatherTimer: 2000,
  timeOfDay: 'day', // 'day', 'sunset', 'night', 'dawn'
  timeOfDayTimer: 0,
  rainParticles: []
};

// Image asset paths
const IMAGE_PATHS = {
  betaEdition: 'src/logos/beta_edition_logo.png',
  editorEdition: 'src/logos/editor_edition_logo.png',
  standardEdition: 'src/logos/standard_edition_logo.png',
  ultimateEdition: 'src/logos/ultimate_edition_logo.png',
  vipEdition: 'src/logos/vip_edition_logo.png',
  track: 'src/Track_1.png',
  player: 'src/racer_car.png',
  playerCar1: 'src/racer_car_1.png',
  playerCar2: 'src/racer_car_2.png',
  playerCar3: 'src/racer_car_3.png',
  playerCar4: 'src/racer_car_4.png',
  playerCar5: 'src/racer_car_5.png',
  playerCar6: 'src/racer_car_6.png',
  playerCar7: 'src/racer_car_7.png',
  playerCar8: 'src/racer_car_8.png',
  playerCar9: 'src/racer_car_9.png',
  playerCar10: 'src/racer_car_10.png',
  racerVIP: 'src/racer_VIP.png',
  racerVIP1: 'src/racer_VIP_1.png',
  racerVIP2: 'src/racer_VIP_2.png',
  racerVIP3: 'src/racer_VIP_3.png',
  racerVIP4: 'src/racer_VIP_4.png',
  racerVIP5: 'src/racer_VIP_5.png',
  racerVIP6: 'src/racer_VIP_6.png',
  racerVIP7: 'src/racer_VIP_7.png',
  racerUltimate1: 'src/racer_Ultimate_1.png',
  racerUltimate2: 'src/racer_Ultimate_2.png',
  racerUltimate3: 'src/racer_Ultimate_3.png',
  racerUltimate4: 'src/racer_Ultimate_4.png',
  racerUltimate5: 'src/racer_Ultimate_5.png',
  racerUltimate6: 'src/racer_Ultimate_6.png',
  racerUltimate7: 'src/racer_Ultimate_7.png',
  enemy1: 'src/racer_enemy1.png',
  enemy2: 'src/racer_enemy2.png',
  enemy3: 'src/racer_enemy3.png',
  safetyCar: 'src/safety_car.png'
};

/* ================= CANVAS SETUP ================= */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false });

// Optimize Canvas drawing scaling
function resizeCanvas() {
  canvas.width = CONFIG.width;
  canvas.height = CONFIG.height;
}
resizeCanvas();

/* ================= PROCEDURAL AUDIO ENGINE ================= */
// Lazy init AudioContext on interaction
let audioCtx = null;
let masterGain = null;
let musicSequencer = null;
let engineSound = null;

function initAudio() {
  if (audioCtx) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(state.audioMuted ? 0 : 0.6, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  // Start engine & sequence synthesizer
  engineSound = new EngineSound(audioCtx, masterGain);
  musicSequencer = new MusicSequencer(audioCtx, masterGain);

  musicSequencer.start();
}

// Procedural Engine Synthesizer
class EngineSound {
  constructor(ctx, dest) {
    this.ctx = ctx;
    this.dest = dest;
    this.osc = ctx.createOscillator();
    this.filter = ctx.createBiquadFilter();
    this.gain = ctx.createGain();

    this.osc.type = 'sawtooth';
    this.osc.frequency.setValueAtTime(45, ctx.currentTime);

    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(250, ctx.currentTime);

    this.gain.gain.setValueAtTime(0.04, ctx.currentTime); // Low engine volume

    this.osc.connect(this.filter);
    this.filter.connect(this.gain);
    this.gain.connect(dest);

    this.osc.start();
    this.playing = true;
  }

  update(speedRatio, isAccelerating) {
    if (!this.playing || state.audioMuted) {
      this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      return;
    }

    // Engine pitch goes up with speed and throttle
    const baseFreq = 40;
    const speedFreq = speedRatio * 85;
    const accelFreq = isAccelerating ? 25 : 0;
    const targetFreq = baseFreq + speedFreq + accelFreq;

    this.osc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);

    // Modulate low-pass filter frequency to simulate turbo or engine throatiness
    const filterFreq = 180 + (speedRatio * 500) + (isAccelerating ? 150 : 0);
    this.filter.frequency.setTargetAtTime(filterFreq, this.ctx.currentTime, 0.15);

    // Set appropriate volume
    const targetGain = 0.035 + (speedRatio * 0.02) + (isAccelerating ? 0.015 : 0);
    this.gain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
  }

  stop() {
    this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
  }
}

// Synthesizer Drum and Retro Synthwave Sequencer
class MusicSequencer {
  constructor(ctx, dest) {
    this.ctx = ctx;
    this.dest = dest;
    this.isPlaying = false;
    this.bpm = 122;
    this.stepTime = 60 / this.bpm / 4; // 16th note step
    this.currentStep = 0;
    this.schedulerId = null;
    this.nextNoteTime = 0.0;

    // Bass notes frequency mapping
    this.bassNotes = {
      'A1': 55.00, 'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'G2': 98.00, 'F1': 43.65
    };

    // Melody notes frequency mapping
    this.leadNotes = {
      'A3': 220.00, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'G4': 392.00,
      'A4': 440.00, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99
    };

    // 16-step patterns
    this.bassPattern = [
      'A1', 'A1', 'A1', 'A1', 'C2', 'C2', 'D2', 'D2',
      'A1', 'A1', 'A1', 'A1', 'F1', 'F1', 'G2', 'G2'
    ];

    this.leadPattern = [
      'E4', null, 'G4', null, 'A4', null, 'G4', null,
      'E4', null, 'D4', null, 'C4', null, 'D4', null
    ];

    this.leadPattern2 = [
      'A4', null, 'C5', null, 'D5', 'E5', null, 'D5',
      'C5', null, 'A4', null, 'G4', null, 'A4', null
    ];
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime;
    this.scheduler();
  }

  scheduler() {
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      this.scheduleStep(this.currentStep, this.nextNoteTime);
      this.advanceStep();
    }
    this.schedulerId = setTimeout(() => this.scheduler(), 25);
  }

  advanceStep() {
    this.currentStep = (this.currentStep + 1) % 16;
    this.nextNoteTime += this.stepTime;
  }

  scheduleStep(step, time) {
    if (state.audioMuted || !state.gameRunning || state.paused) return;

    // KICK DRUM on steps 0, 4, 8, 12
    if (step % 4 === 0) {
      this.playKick(time);
    }

    // SNARE DRUM on steps 4, 12
    if (step === 4 || step === 12) {
      this.playSnare(time);
    }

    // CLOSED HI-HAT on steps 2, 6, 10, 14
    if (step % 4 === 2) {
      this.playHiHat(time);
    }

    // RETRO BASSLINE
    const bassNote = this.bassPattern[step];
    if (bassNote) {
      this.playBass(this.bassNotes[bassNote], time, this.stepTime * 0.9);
    }

    // MELODIC LEAD SYNTH
    const cycle = Math.floor(state.score / 20) % 2;
    const melody = cycle === 0 ? this.leadPattern[step] : this.leadPattern2[step];
    if (melody && state.score > 5) {
      this.playLead(this.leadNotes[melody], time, this.stepTime * 1.5);
    }
  }

  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.dest);

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.18);

    gain.gain.setValueAtTime(0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  playSnare(time) {
    // Synth snare (noise + snap osc)
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.dest);

    // Snap tone
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.frequency.setValueAtTime(180, time);
    snapGain.gain.setValueAtTime(0.25, time);
    snapGain.gain.exponentialRampToValueAtTime(0.01, time + 0.06);

    snap.connect(snapGain);
    snapGain.connect(this.dest);

    noise.start(time);
    snap.start(time);
    noise.stop(time + 0.15);
    snap.stop(time + 0.06);
  }

  playHiHat(time) {
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(8000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.dest);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  playBass(freq, time, duration) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, time);
    filter.frequency.exponentialRampToValueAtTime(240, time + duration);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.dest);

    osc.start(time);
    osc.stop(time + duration);
  }

  playLead(freq, time, duration) {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    const delay = this.ctx.createDelay();
    const delayGain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc2.detune.setValueAtTime(12, time); // detune

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    // Echo Delay
    delay.delayTime.setValueAtTime(this.stepTime * 2, time); // 8th note delay
    delayGain.gain.setValueAtTime(0.25, time); // delay volume

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.dest);

    // Send to delay loop
    gain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(this.dest);
    delayGain.connect(delay); // feedback loop

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  stop() {
    this.isPlaying = false;
    if (this.schedulerId) clearTimeout(this.schedulerId);
  }
}

// SFX Generator (Zero asset dependency)
function playSFX(type) {
  if (state.sfxMuted || !audioCtx) return;

  const time = audioCtx.currentTime;

  switch (type) {
    case 'coin':
      // Blip-Up chime
      let osc1 = audioCtx.createOscillator();
      let gain1 = audioCtx.createGain();
      osc1.connect(gain1);
      gain1.connect(masterGain);

      osc1.frequency.setValueAtTime(523.25, time); // C5
      osc1.frequency.setValueAtTime(987.77, time + 0.07); // B5

      gain1.gain.setValueAtTime(0.15, time);
      gain1.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

      osc1.start(time);
      osc1.stop(time + 0.25);
      break;

    case 'nos':
      // Rising sweep
      let osc2 = audioCtx.createOscillator();
      let gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.connect(gain2);
      gain2.connect(masterGain);

      osc2.frequency.setValueAtTime(200, time);
      osc2.frequency.exponentialRampToValueAtTime(1600, time + 0.6);

      gain2.gain.setValueAtTime(0.2, time);
      gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc2.start(time);
      osc2.stop(time + 0.6);
      break;

    case 'crash':
      // Noise explosion + low rumbles
      let osc3 = audioCtx.createOscillator();
      let gain3 = audioCtx.createGain();
      osc3.type = 'sawtooth';
      osc3.connect(gain3);
      gain3.connect(masterGain);

      osc3.frequency.setValueAtTime(100, time);
      osc3.frequency.linearRampToValueAtTime(20, time + 0.6);

      gain3.gain.setValueAtTime(0.4, time);
      gain3.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc3.start(time);
      osc3.stop(time + 0.6);

      // Add white noise puff
      const bufferSize = audioCtx.sampleRate * 0.5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, time);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.35, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);

      noise.start(time);
      noise.stop(time + 0.5);
      break;

    case 'click':
      let osc4 = audioCtx.createOscillator();
      let gain4 = audioCtx.createGain();
      osc4.connect(gain4);
      gain4.connect(masterGain);
      osc4.frequency.setValueAtTime(600, time);
      gain4.gain.setValueAtTime(0.1, time);
      gain4.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
      osc4.start(time);
      osc4.stop(time + 0.05);
      break;

    case 'repair':
      // Sparkly rising dual chord
      let oscA = audioCtx.createOscillator();
      let oscB = audioCtx.createOscillator();
      let gainR = audioCtx.createGain();
      oscA.frequency.setValueAtTime(440, time); // A4
      oscB.frequency.setValueAtTime(554.37, time); // C#5
      oscA.frequency.exponentialRampToValueAtTime(880, time + 0.4);
      oscB.frequency.exponentialRampToValueAtTime(1108.73, time + 0.4);

      gainR.gain.setValueAtTime(0.15, time);
      gainR.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

      oscA.connect(gainR);
      oscB.connect(gainR);
      gainR.connect(masterGain);

      oscA.start(time);
      oscB.start(time);
      oscA.stop(time + 0.4);
      oscB.stop(time + 0.4);
      break;
  }
}

/* ================= UTILS & LOADERS ================= */
// Real Image loader with error fallback protection
function preloadAssets(callback) {
  let loadedCount = 0;
  const keys = Object.keys(IMAGE_PATHS);
  const total = keys.length;

  if (total === 0) return callback();

  keys.forEach(key => {
    const img = new Image();
    img.src = IMAGE_PATHS[key];

    img.onload = () => {
      state.images[key] = img;
      loadedCount++;
      const pct = Math.floor((loadedCount / total) * 100);
      const loadBar = document.getElementById('loadBar');
      const loadText = document.getElementById('loadText');
      if (loadBar) loadBar.style.width = pct + '%';
      if (loadText) loadText.innerText = pct + '%';

      if (loadedCount === total) {
        setTimeout(callback, 500); // smooth transition
      }
    };

    img.onerror = () => {
      console.warn(`Asset failed to load: ${IMAGE_PATHS[key]}. Procedural fallback created.`);
      // Dummy visual block
      const fallback = document.createElement('canvas');
      fallback.width = 60;
      fallback.height = 100;
      const fctx = fallback.getContext('2d');
      fctx.fillStyle = '#ff0055';
      fctx.fillRect(0, 0, 60, 100);
      state.images[key] = fallback;

      loadedCount++;
      const pct = Math.floor((loadedCount / total) * 100);
      const loadBar = document.getElementById('loadBar');
      const loadText = document.getElementById('loadText');
      if (loadBar) loadBar.style.width = pct + '%';
      if (loadText) loadText.innerText = pct + '%';

      if (loadedCount === total) {
        setTimeout(callback, 500);
      }
    };
  });
}

// Display/Hide Overlays
function showOverlay(id) {
  const screens = [
    'loadingScreen', 'mainMenu', 'garageMenu', 'helpMenu',
    'pauseMenu', 'gameOverScreen', 'themesMenu', 'carShopMenu',
    'editionMenu', 'adminPanel'
  ];
  screens.forEach(s => {
    const el = document.getElementById(s);
    if (!el) return;
    if (s === id) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });

  const hud = document.getElementById('hudPanel');
  if (!hud) return;
  if (id === 'mainMenu') {
    hud.classList.add('hidden');
  } else if (id === '') {
    hud.classList.remove('hidden');
  }
}

/* ================= INPUT HANDLING ================= */
const keysHeld = {};

window.addEventListener('keydown', (e) => {
  keysHeld[e.key.toLowerCase()] = true;
  keysHeld[e.key] = true;

  // Admin Panel Toggle: Ctrl + Shift + A
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    toggleAdminPanel();
    return;
  }

  // Pause trigger
  if (e.key.toLowerCase() === 'p') {
    if (state.gameRunning) {
      if (state.paused) resumeGame();
      else pauseGame();
    }
  }
});

window.addEventListener('keyup', (e) => {
  keysHeld[e.key.toLowerCase()] = false;
  keysHeld[e.key] = false;
});

// Mobile Controls detection & hooks
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
if (isTouchDevice) {
  const controls = document.getElementById('mobileControls');
  if (controls) controls.style.display = 'flex';

  const setupMobileBtn = (id, keyName) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keysHeld[keyName] = true;
      initAudio();
    });
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      keysHeld[keyName] = false;
    });
  };

  setupMobileBtn('btnLeft', 'ArrowLeft');
  setupMobileBtn('btnRight', 'ArrowRight');
  setupMobileBtn('btnBoost', ' '); // Space bar
}

/* ================= STATS & UPGRADES PERSISTENCE ================= */
function getUpgradeCost(type, currentLvl) {
  const base = CONFIG.upgradeCostBase || { speed: 80, handling: 80, armor: 120, nos: 100, magnet: 160, shield: 200 };
  return Math.floor((base[type] || 100) * Math.pow(1.14, currentLvl));
}

function getStatValue(type, level) {
  const ranges = {
    speed: { min: 7, max: 20 },
    handling: { min: 4, max: 13 },
    armor: { min: 2, max: 9 },
    nos: { min: 80, max: 380 },
    magnet: { min: 1, max: 5 },
    shield: { min: 1, max: 5 }
  };
  const r = ranges[type];
  if (!r) return 1;
  const t = Math.max(0, Math.min(49, level - 1)) / 49;
  return r.min + (r.max - r.min) * t;
}

function getCarStatValue(carId, type, level) {
  const car = CAR_DATA?.[carId] || CAR_DATA?.player || {};
  const baseStat = car.baseStats?.[type];
  if (typeof baseStat === 'number') {
    const gains = {
      speed: 0.22,
      handling: 0.18,
      armor: 0.10,
      nos: 4,
      magnet: 0.05,
      shield: 0.06
    };
    return baseStat + Math.max(0, level - 1) * (gains[type] || 0.1);
  }
  return getStatValue(type, level);
}

function applyUpgrades() {
  const selectedCar = state.selectedCar || 'player';
  state.maxSpeed = getCarStatValue(selectedCar, 'speed', state.carUpgrades[selectedCar].speed);
  state.player.steerPower = getCarStatValue(selectedCar, 'handling', state.carUpgrades[selectedCar].handling);
  state.player.maxHp = getCarStatValue(selectedCar, 'armor', state.carUpgrades[selectedCar].armor);
  state.player.nosCapacity = getCarStatValue(selectedCar, 'nos', state.carUpgrades[selectedCar].nos);

  // Shield duration (in frames)
  state.shieldDuration = Math.round(300 + (state.carUpgrades[state.selectedCar].shield - 1) * 12); // 300 to 888 frames (5s to 14.8s at 60fps)
}

function renderUpgradeBars() {
  const stats = ['speed', 'handling', 'armor', 'nos', 'magnet', 'shield'];
  stats.forEach(s => {
    const camel = s.charAt(0).toUpperCase() + s.slice(1);
    const container = document.getElementById('bar' + s.toUpperCase()) || document.getElementById('bar' + camel);
    if (!container) return;
    container.innerHTML = '';
    const lvl = state.carUpgrades[state.selectedCar][s];

    const fill = document.createElement('div');
    fill.className = `upgrade-fill ${s}`;
    fill.style.width = (lvl / CONFIG.maxUpgradeLvl * 100) + '%';
    container.appendChild(fill);

    const lvlLabel = document.getElementById('lvl' + s.toUpperCase()) || document.getElementById('lvl' + camel);
    if (lvlLabel) {
      if (lvl >= CONFIG.maxUpgradeLvl) {
        lvlLabel.innerText = 'MAX';
        lvlLabel.style.color = '#ffd700';
      } else {
        lvlLabel.innerText = `LVL ${lvl}`;
        lvlLabel.style.color = '';
      }
    }

    const btn = document.getElementById('btnUpgrade' + s.toUpperCase()) || document.getElementById('btnUpgrade' + camel);
    if (!btn) return;
    if (lvl >= CONFIG.maxUpgradeLvl) {
      btn.innerText = 'MAXED';
      btn.disabled = true;
    } else {
      const cost = getUpgradeCost(s, lvl);
      btn.innerText = `🪙 ${cost}`;
      btn.disabled = false;
    }
  });

  const wallet = document.getElementById('garageWallet');
  if (wallet) wallet.innerText = `🪙 ${state.totalCoins}`;

  const paintHue = document.getElementById('paintHueVal');
  if (paintHue) paintHue.innerText = `${state.carPaintHue}°`;

  const paintSlider = document.getElementById('paintSlider');
  if (paintSlider) paintSlider.value = state.carPaintHue;
}

function buyUpgrade(type) {
  const currentLvl = state.carUpgrades[state.selectedCar][type];
  if (currentLvl >= CONFIG.maxUpgradeLvl) return;

  const cost = getUpgradeCost(type, currentLvl);
  if (state.totalCoins >= cost) {
    state.totalCoins -= cost;
    state.carUpgrades[state.selectedCar][type]++;

    localStorage.setItem('ormula_coins', state.totalCoins);
    localStorage.setItem('ormula_car_upgrades', JSON.stringify(state.carUpgrades));

    playSFX('repair');
    applyUpgrades();
    renderUpgradeBars();
  } else {
    showFrownyDialog("INSUFFICIENT CREDITS", `This upgrade costs 🪙 ${cost}. You only have 🪙 ${state.totalCoins}!`);
  }
}

function updateCarPaint(hue) {
  state.carPaintHue = parseInt(hue);
  localStorage.setItem('ormula_car_paint', state.carPaintHue);
  const hueVal = document.getElementById('paintHueVal');
  if (hueVal) hueVal.innerText = `${hue}°`;
}

/* ================= AUDIO TOGGLES ================= */
function toggleMusic() {
  state.audioMuted = !state.audioMuted;
  localStorage.setItem('ormula_audio_muted', state.audioMuted);

  const btn = document.getElementById('btnToggleMusic');
  if (!btn) return;
  if (state.audioMuted) {
    btn.classList.remove('active');
    if (masterGain) masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.05);
  } else {
    btn.classList.add('active');
    initAudio();
    if (masterGain) masterGain.gain.setTargetAtTime(0.6, audioCtx.currentTime, 0.05);
  }
  playSFX('click');
}

function toggleSFX() {
  state.sfxMuted = !state.sfxMuted;
  localStorage.setItem('ormula_sfx_muted', state.sfxMuted);

  const btn = document.getElementById('btnToggleSFX');
  if (!btn) return;
  if (state.sfxMuted) btn.classList.remove('active');
  else btn.classList.add('active');
  playSFX('click');
}

/* ================= MENUS TRANSITIONS ================= */
function openGarage() {
  playSFX('click');
  renderUpgradeBars();
  showOverlay('garageMenu');
}

function openHelp() {
  playSFX('click');
  showOverlay('helpMenu');
}

function toggleAdminPanel() {
  state.adminEverAccessed = true;
  localStorage.setItem('ormula_admin_accessed', 'true');
  setEdition('editor');
  renderAdminUpgradeControls();
  showOverlay('adminPanel');
}

function closeAdminPanel() {
  playSFX('click');
  showOverlay('mainMenu');
}

function backToMenu() {
  playSFX('click');
  showOverlay('mainMenu');
}

function quitToMenu() {
  playSFX('click');
  state.gameRunning = false;
  if (engineSound) engineSound.stop();
  showOverlay('mainMenu');
}

/* ================= SAFETY CAR & TRAFFIC AI ================= */
function deploySafetyCar() {
  if (state.safetyCarActive) return;

  state.safetyCarActive = true;
  state.yellowFlag = true;
  state.yellowFlagTimer = 480; // ~8 seconds at 60 FPS

  state.safetyCar = {
    x: CONFIG.roadCenterX,
    y: -150,
    targetY: 200,
    speed: 3,
    width: 60,
    height: 110,
    sirenTimer: 0
  };

  // Wipe powerups & shift existing cars out
  state.powerups = [];

  const banner = document.getElementById('warningBanner');
  if (banner) {
    banner.innerText = '⚠️ YELLOW FLAG - SAFETY CAR DEPLOYED!';
    banner.className = 'warning-flash yellow-flag';
    banner.style.display = 'block';
  }

  playSFX('nos');
}

function checkSafetyCarRules() {
  if (!state.safetyCarActive) return;

  const p = state.player;
  const sc = state.safetyCar;

  // Siren flashing
  sc.sirenTimer++;

  // Bring safety car down to its running position
  if (sc.y < sc.targetY) {
    sc.y += 2;
  }

  // Enforce speed cap under yellow flag
  state.targetSpeed = Math.min(state.targetSpeed, 4);

  // Overtaking check (player is in front of safety car)
  const banner = document.getElementById('warningBanner');
  if (sc.y > 0 && p.y < sc.y + sc.height) {
    // Punish player
    state.screenShake = 5;
    state.score = Math.max(0, state.score - 1);
    if (banner) {
      banner.innerText = '⚠️ NO OVERTAKING UNDER YELLOW FLAG!';
      banner.className = 'warning-flash';
      banner.style.display = 'block';
    }
  } else {
    if (banner && banner.innerText !== '⚠️ OFF ROAD! SLOW DOWN!') {
      banner.innerText = '⚠️ YELLOW FLAG - SAFETY CAR DEPLOYED!';
      banner.className = 'warning-flash yellow-flag';
    }
  }

  // Countdown to green flag
  state.yellowFlagTimer--;
  if (state.yellowFlagTimer <= 0) {
    // Release
    state.yellowFlag = false;

    // Safety car zooms off
    sc.targetY = -300;

    if (banner) {
      banner.innerText = '🟢 GREEN FLAG! GO GO GO!';
      banner.className = 'warning-flash yellow-flag';
    }

    setTimeout(() => {
      if (!state.yellowFlag) {
        state.safetyCarActive = false;
        state.safetyCar = null;
        if (banner) banner.style.display = 'none';
      }
    }, 2000);
  }
}

// Lane-shifting / Braking traffic cars
function spawnTrafficCar() {
  const lanesFree = [0, 1, 2];

  // Filter lanes occupied near the top
  state.enemies.forEach(e => {
    if (e.y < 200) {
      const laneIdx = lanesFree.indexOf(e.lane);
      if (laneIdx > -1) lanesFree.splice(laneIdx, 1);
    }
  });

  if (lanesFree.length === 0) return;

  const lane = lanesFree[Math.floor(Math.random() * lanesFree.length)];
  const imgOptions = ['enemy1', 'enemy2', 'enemy3'];
  const imgKey = imgOptions[Math.floor(Math.random() * imgOptions.length)];

  // Behaviors: 0 = Standard, 1 = Lane-Changer, 2 = Brake-Check
  const behavior = Math.random() < 0.25 ? 1 : (Math.random() < 0.15 ? 2 : 0);

  const traffic = {
    x: CONFIG.laneCenters[lane],
    y: -150,
    lane: lane,
    targetX: CONFIG.laneCenters[lane],
    speed: 2 + Math.random() * 2, // base speed
    behavior: behavior,
    imageKey: imgKey,
    width: 55,
    height: 100,
    colorHue: Math.floor(Math.random() * 360),
    laneChangeTimer: Math.random() * 200 + 100,
    active: true
  };

  state.enemies.push(traffic);
}

function updateTraffic() {
  state.enemies.forEach(e => {
    // Traffic moves relative to player's scroll speed
    if (state.yellowFlag) {
      // Under yellow flag, traffic follows safety car
      e.speed = 3;
      // Keep cars lined up neatly behind safety car
      if (state.safetyCar && e.y < state.safetyCar.y + 120 && e.y > state.safetyCar.y - 120) {
        e.y = state.safetyCar.y - 150;
      }
    }

    e.y += (state.speed - e.speed);

    // Lane shifting logic
    if (e.behavior === 1 && !state.yellowFlag) {
      e.laneChangeTimer--;
      if (e.laneChangeTimer <= 0) {
        e.laneChangeTimer = Math.random() * 300 + 150;
        // Shift left or right
        const dir = Math.random() < 0.5 ? -1 : 1;
        const newLane = Math.max(0, Math.min(2, e.lane + dir));
        e.lane = newLane;
        e.targetX = CONFIG.laneCenters[newLane];
      }
    }

    // Smooth lane shift slide
    e.x += (e.targetX - e.x) * 0.05;

    // Recycle off-screen traffic
    if (e.y > CONFIG.height + 150) {
      e.active = false;
      state.score += 5; // score gained by passing
    }
    if (e.y < -300) {
      // If player speeds far ahead, recycle trailing traffic
      e.active = false;
    }
  });

  // Clean up inactive traffic
  state.enemies = state.enemies.filter(e => e.active);

  // Keep traffic count around 3-4
  if (state.enemies.length < 3 && !state.yellowFlag && Math.random() < 0.02) {
    spawnTrafficCar();
  }
}

/* ================= SPAWNING ITEMS ================= */
function spawnItem() {
  // Avoid item spawn under safety car
  if (state.yellowFlag) return;

  const lanes = [0, 1, 2];
  const lane = lanes[Math.floor(Math.random() * lanes.length)];

  // Choose type: 55% coin, 10% gem, 15% NOS, 10% shield, 10% repair
  const rng = Math.random();
  let type = 'coin';
  if (rng > 0.95) type = 'repair';
  else if (rng > 0.85) type = 'shield';
  else if (rng > 0.70) type = 'nos';
  else if (rng > 0.55) type = 'gem';

  state.powerups.push({
    x: CONFIG.laneCenters[lane],
    y: -100,
    type: type,
    radius: 18,
    active: true
  });
}

function updateItems() {
  state.powerups.forEach(item => {
    item.y += state.speed;

    // Recycle off-screen
    if (item.y > CONFIG.height + 100) {
      item.active = false;
    }
  });

  state.powerups = state.powerups.filter(i => i.active);

  if (state.powerups.length < 2 && Math.random() < 0.015) {
    spawnItem();
  }
}

/* ================= PARTICLE SYSTEMS ================= */
function spawnParticle(x, y, vx, vy, color, size, maxLife, type = 'spark') {
  state.particles.push({
    x, y, vx, vy, color, size, life: maxLife, maxLife, type
  });
}

function updateParticles() {
  // Rain particles update
  if (state.weather === 'rain') {
    state.rainParticles.forEach(p => {
      p.y += p.speed;
      p.x -= 1.5; // slight wind slant
      if (p.y > CONFIG.height) {
        p.y = -p.len;
        p.x = Math.random() * CONFIG.width;
      }
    });
  }

  // Normal game sparks/smoke
  state.particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    if (p.type === 'smoke') {
      p.size += 0.2; // puff out
    }
  });

  state.particles = state.particles.filter(p => p.life > 0);
}

/* ================= GAME LOOP MECHANICS ================= */
function startNewRace() {
  initAudio();
  playSFX('click');
  state.isMultiplayer = false;
  showOverlay('');

  // Reset session params
  state.gameRunning = true;
  state.paused = false;
  state.score = 0;
  state.coinsCollected = 0;
  state.speed = 0;
  state.targetSpeed = 4;
  state.offRoadTime = 0;

  state.player.hp = state.player.maxHp;
  state.player.nosEnergy = state.player.nosCapacity;
  state.player.x = CONFIG.roadCenterX;
  state.player.vx = 0;
  state.player.angle = 0;
  state.player.nosActive = false;

  // Starting Shield generator logic
  const shieldLvl = state.carUpgrades[state.selectedCar].shield || 1;
  if (shieldLvl >= 15) {
    state.player.shieldActive = true;
    state.player.shieldTime = Math.round(180 + (shieldLvl - 15) * 14); // grows with level
  } else {
    state.player.shieldActive = false;
    state.player.shieldTime = 0;
  }

  // VIP Starting Shield Bonus (minimum 300 frames / 5s)
  if ((state.currentEdition || 'standard') === 'vip') {
    state.player.shieldActive = true;
    state.player.shieldTime = Math.max(state.player.shieldTime, 300);
  }

  // Clear arrays
  state.enemies = [];
  state.powerups = [];
  state.particles = [];
  state.rainParticles = [];

  state.yellowFlag = false;
  state.safetyCarActive = false;
  state.safetyCar = null;

  // Setup rain
  state.weather = Math.random() < 0.35 ? 'rain' : 'sunny';
  if (state.weather === 'rain') {
    for (let i = 0; i < 40; i++) {
      state.rainParticles.push({
        x: Math.random() * CONFIG.width,
        y: Math.random() * CONFIG.height,
        speed: 12 + Math.random() * 6,
        len: 15 + Math.random() * 10
      });
    }
  }

  // Day / Night state reset
  state.timeOfDay = ['day', 'sunset', 'night', 'dawn'][Math.floor(Math.random() * 4)];
  state.timeOfDayTimer = 1000 + Math.random() * 1000;

  applyUpgrades();

  // Spawn initial cars
  spawnTrafficCar();
  spawnTrafficCar();

  gameLoop();
}

function pauseGame() {
  state.paused = true;
  showOverlay('pauseMenu');
}

function resumeGame() {
  playSFX('click');
  state.paused = false;
  showOverlay('');
  gameLoop();
}

function restartGame() {
  playSFX('click');
  startNewRace();
}

function triggerGameOver() {
  state.gameRunning = false;
  playSFX('crash');

  state.totalCoins += state.coinsCollected;
  localStorage.setItem('ormula_coins', state.totalCoins);

  if (state.score > state.highscore) {
    state.highscore = state.score;
    localStorage.setItem('ormula_highscore', state.highscore);
  }

  const finalScoreEl = document.getElementById('finalScore');
  const finalCoinsEl = document.getElementById('finalCoins');
  const finalGemsEl = document.getElementById('finalGems');
  const finalHighEl = document.getElementById('finalHigh');

  if (finalScoreEl) finalScoreEl.innerText = String(state.score).padStart(5, '0');
  if (finalCoinsEl) finalCoinsEl.innerText = '🪙 ' + state.coinsCollected;
  if (finalGemsEl) finalGemsEl.innerText = '💎 ' + state.gems;
  if (finalHighEl) finalHighEl.innerText = String(state.highscore).padStart(5, '0');

  showOverlay('gameOverScreen');
}

/* ================= UPDATE PHYSICS ================= */
function updatePhysics() {
  if (state.screenShake > 0) state.screenShake *= 0.9;

  updatePlayerPhysics(state.player, false);
  if (state.isMultiplayer) {
    updatePlayerPhysics(state.player2, true);
    state.speed = (state.player.speed + state.player2.speed) / 2;
  } else {
    state.speed = state.player.speed;
  }

  // Steer engine pitch
  if (engineSound) {
    engineSound.update(state.speed / state.maxSpeed, keysHeld['arrowup'] || keysHeld['w'] || state.player.nosActive);
  }

  state.roadY = (state.roadY + state.speed) % CONFIG.height;

  // Increment dynamic score by driving distance
  if (state.speed > 2) {
    state.score += Math.floor((state.speed / 4) * state.gameSpeedMultiplier);
  }

  // --- SYSTEM ENVIRONMENT CYCLES & THEME SPAWNERS ---
  // Spawn Theme Specific Particles
  if (state.currentTheme === 'new_years' && Math.random() < 0.03 * state.gameSpeedMultiplier) {
    // Fireworks
    const fx = Math.random() * CONFIG.width;
    const fy = 50 + Math.random() * 200;
    const colors = ['#ffd700', '#ff0055', '#00ffaa', '#00c8ff', '#ff00ff'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      spawnParticle(fx, fy, Math.cos(angle) * speed, Math.sin(angle) * speed, col, 2 + Math.random() * 2, 30 + Math.random() * 20, 'firework');
    }
  }
  if ((state.currentTheme === 'christmas' || state.currentTheme === 'winter') && Math.random() < 0.3 * state.gameSpeedMultiplier) {
    // Snow
    spawnParticle(Math.random() * CONFIG.width, -10, (Math.random() - 0.5) * 0.5, 1.5 + Math.random() * 1.5, '#ffffff', 2 + Math.random() * 2, 400, 'snow');
  }
  if ((state.currentTheme === 'autumn' || state.currentTheme === 'fall') && Math.random() < 0.25 * state.gameSpeedMultiplier) {
    // Leaves
    const colors = ['#e67e22', '#d35400', '#f39c12', '#c0392b'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    spawnParticle(Math.random() * CONFIG.width, -10, -0.5 - Math.random() * 1.0, 1.0 + Math.random() * 1.5, col, 3 + Math.random() * 3, 400, 'leaf');
  }
  if (state.currentTheme === 'easter' && Math.random() < 0.15 * state.gameSpeedMultiplier) {
    // Flowers
    const colors = ['#ffb8b8', '#ffda79', '#81ecec', '#fab1a0'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    spawnParticle(Math.random() * CONFIG.width, -10, (Math.random() - 0.5) * 0.5, 1.0 + Math.random() * 1.0, col, 3 + Math.random() * 2, 400, 'flower');
  }
  if (state.currentTheme === 'neon_city' && Math.random() < 0.15 * state.gameSpeedMultiplier) {
    // Neon City cyber sparks
    const colors = ['#ff00ff', '#00ffff', '#00ffaa', '#ffff00'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    spawnParticle(Math.random() * CONFIG.width, -10, (Math.random() - 0.5) * 1.0, 1.5 + Math.random() * 2.0, col, 2 + Math.random() * 2, 200, 'neon');
  }
  if (state.currentTheme === 'sunset_drive' && Math.random() < 0.1 * state.gameSpeedMultiplier) {
    // Golden hour warm particles
    spawnParticle(Math.random() * CONFIG.width, -10, -0.2 + Math.random() * 0.4, 0.8 + Math.random() * 1.2, '#ff6b35', 1.5 + Math.random() * 2, 300, 'sunset');
  }
  if (state.currentTheme === 'ocean_blue' && Math.random() < 0.2 * state.gameSpeedMultiplier) {
    // Ocean highway spray/mist
    spawnParticle(Math.random() * CONFIG.width, -10, (Math.random() - 0.5) * 0.5, 2.0 + Math.random() * 1.5, '#00d4ff', 1 + Math.random() * 2, 250, 'bubble');
  }
  if (state.currentTheme === 'forest_green' && Math.random() < 0.12 * state.gameSpeedMultiplier) {
    // Green leaves
    const colors = ['#2e8b57', '#90ee90', '#3cb371'];
    const col = colors[Math.floor(Math.random() * colors.length)];
    spawnParticle(Math.random() * CONFIG.width, -10, -0.5 - Math.random() * 0.5, 1.0 + Math.random() * 1.5, col, 2.5 + Math.random() * 2.5, 350, 'leaf');
  }
  if (state.currentTheme === 'mars_red' && Math.random() < 0.25 * state.gameSpeedMultiplier) {
    // Martian dust storms
    spawnParticle(Math.random() * CONFIG.width, -10, -1.0 + Math.random() * 0.5, 1.2 + Math.random() * 1.8, '#ff4500', 2 + Math.random() * 2, 250, 'dust');
  }
  if ((state.currentTheme === 'vip' || (state.currentEdition || 'standard') === 'vip') && state.speed > 1 && Math.random() < 0.4 * state.gameSpeedMultiplier) {
    // Golden trail
    spawnParticle(state.player.x + (Math.random() * 20 - 10), state.player.y + state.player.height / 2, (Math.random() - 0.5) * 2, 2 + Math.random() * 2, '#ffd700', 2 + Math.random() * 2, 15, 'gold');
  }

  // Weather cycling
  state.weatherTimer -= state.gameSpeedMultiplier;
  if (state.weatherTimer <= 0) {
    state.weatherTimer = 1500 + Math.random() * 2000;
    state.weather = state.weather === 'sunny' ? 'rain' : 'sunny';
    state.rainParticles = [];
    if (state.weather === 'rain') {
      for (let i = 0; i < 40; i++) {
        state.rainParticles.push({
          x: Math.random() * CONFIG.width,
          y: Math.random() * CONFIG.height,
          speed: 12 + Math.random() * 6,
          len: 15 + Math.random() * 10
        });
      }
    }
  }

  // Day Night cycle
  state.timeOfDayTimer--;
  if (state.timeOfDayTimer <= 0) {
    state.timeOfDayTimer = 1200;
    const cycle = ['day', 'sunset', 'night', 'dawn'];
    const idx = (cycle.indexOf(state.timeOfDay) + 1) % cycle.length;
    state.timeOfDay = cycle[idx];
  }
}

function updatePlayerPhysics(p, isP2) {
  let targetVx = 0;
  let left, right, up, down, nos;
  if (state.isMultiplayer) {
    if (isP2) {
      left = keysHeld['arrowleft']; right = keysHeld['arrowright'];
      up = keysHeld['arrowup']; down = keysHeld['arrowdown']; nos = keysHeld[' '];
    } else {
      left = keysHeld['a']; right = keysHeld['d'];
      up = keysHeld['w']; down = keysHeld['s']; nos = keysHeld['shift'];
    }
  } else {
    left = keysHeld['arrowleft'] || keysHeld['a']; right = keysHeld['arrowright'] || keysHeld['d'];
    up = keysHeld['arrowup'] || keysHeld['w']; down = keysHeld['arrowdown'] || keysHeld['s']; nos = keysHeld[' '];
  }

  if (left) targetVx = -p.steerPower;
  if (right) targetVx = p.steerPower;

  const isWinter = state.currentTheme === 'winter';
  const weatherSlippiness = state.weather === 'rain' ? 0.7 : (isWinter ? 0.4 : 1.0);
  p.vx += (targetVx - p.vx) * 0.15 * weatherSlippiness * state.gameSpeedMultiplier;
  p.x += p.vx;
  p.angle = p.vx * 0.035;

  const minX = 85 + p.width / 2;
  const maxX = 395 - p.width / 2;

  if (p.x < minX) {
    p.x = minX;
    p.vx = 0.5;
    state.screenShake = 3;
    spawnParticle(p.x - p.width / 2, p.y + p.height / 4, -3, -1, 'var(--neon-pink)', 3, 10);
    p.offRoadTime++;
  } else if (p.x > maxX) {
    p.x = maxX;
    p.vx = -0.5;
    state.screenShake = 3;
    spawnParticle(p.x + p.width / 2, p.y + p.height / 4, 3, -1, 'var(--neon-pink)', 3, 10);
    p.offRoadTime++;
  } else {
    p.offRoadTime = 0;
  }

  if (p.offRoadTime > 30) {
    if (!isP2) {
      const warningBanner = document.getElementById('warningBanner');
      if (warningBanner) {
        warningBanner.innerText = '?? OFF ROAD! SLOW DOWN!';
        warningBanner.className = 'warning-flash';
        warningBanner.style.display = 'block';
      }
    }
    p.targetSpeed = Math.min(p.targetSpeed, 3);
    if (p.offRoadTime > 120 && !state.yellowFlag) {
      deploySafetyCar();
    }
  } else if (!isP2 && !state.safetyCarActive) {
    const warningBanner = document.getElementById('warningBanner');
    if (warningBanner) warningBanner.style.display = 'none';
  }

  let isAccelerating = false;
  if (up) {
    p.targetSpeed = p.maxSpeed || state.maxSpeed;
    isAccelerating = true;
  } else if (down) {
    p.targetSpeed = 1.5;
  } else if (!state.yellowFlag) {
    p.targetSpeed = (p.maxSpeed || state.maxSpeed) * 0.6;
  }

  if (nos && (p.nosEnergy > 0 || state.infNos) && !state.yellowFlag) {
    p.nosActive = true;
    p.targetSpeed = (p.maxSpeed || state.maxSpeed) * 1.5;
    if (!state.infNos) {
      p.nosEnergy -= 0.8 * state.gameSpeedMultiplier;
    }
    state.screenShake = Math.max(state.screenShake, 1.5);
    spawnParticle(p.x - 12, p.y + p.height / 2, Math.random() * 2 - 1, 4 + Math.random() * 2, 'var(--neon-blue)', 4, 15, 'smoke');
    spawnParticle(p.x + 12, p.y + p.height / 2, Math.random() * 2 - 1, 4 + Math.random() * 2, 'var(--neon-blue)', 4, 15, 'smoke');
    if (Math.random() < 0.05 && !isP2) playSFX('nos');
  } else {
    p.nosActive = false;
    const rechargeAmt = ((state.currentEdition || 'standard') === 'vip') ? 0.16 : 0.08;
    if (p.nosEnergy < p.nosCapacity) p.nosEnergy += rechargeAmt * state.gameSpeedMultiplier;
  }

  p.speed += (p.targetSpeed - p.speed) * (p.acceleration || state.acceleration) * state.gameSpeedMultiplier;
  p.distance += p.speed * state.gameSpeedMultiplier;
  
  if (!state.averageDistance) state.averageDistance = 0;
  if (!isP2 && !state.isMultiplayer) state.averageDistance = p.distance;
  else if (state.isMultiplayer && !isP2) state.averageDistance = (state.player.distance + state.player2.distance) / 2;
  
  p.y = 650 - (p.distance - state.averageDistance);

  if (p.speed > 1 && Math.random() < 0.3 * state.gameSpeedMultiplier) {
    spawnParticle(p.x, p.y + p.height / 2, Math.random() * 2 - 1, 2, 'var(--neon-yellow)', 2, 8);
  }

  if (p.shieldActive) {
    p.shieldTime -= state.gameSpeedMultiplier;
    if (p.shieldTime <= 0) p.shieldActive = false;
  }
}


/* ================= COLLISION & INTERACTION ================= */
function checkCollisions() {
  // Collision detection for Player 1
  const p = state.player;
  const pRect = {
    left: p.x - p.width / 2 + 6,
    right: p.x + p.width / 2 - 6,
    top: p.y - p.height / 2 + 8,
    bottom: p.y + p.height / 2 - 8
  };

  // Power-up intersections for Player 1
  state.powerups.forEach(item => {
    // Magnet pull
    const magnetLvl = state.carUpgrades[state.selectedCar].magnet || 1;
    if (magnetLvl > 1 && item.type === 'coin') {
      const pullDist = (magnetLvl - 1) * 35 + 40;
      const dist = Math.hypot(p.x - item.x, p.y - item.y);
      if (dist < pullDist) {
        const dx = p.x - item.x;
        const dy = p.y - item.y;
        item.x += (dx / dist) * 8 * state.gameSpeedMultiplier;
        item.y += (dy / dist) * 8 * state.gameSpeedMultiplier;
      }
    }
    // Collision with car
    const dist = Math.hypot(p.x - item.x, p.y - item.y);
    if (dist < item.radius + p.width / 2) {
      item.active = false;
      if (item.type === 'coin') {
        const amt = state.currentTheme === 'vip' ? 2 : 1;
        state.coinsCollected += amt;
        playSFX('coin');
        const sparkCol = state.currentTheme === 'vip' ? '#ffd700' : 'var(--neon-yellow)';
        for (let i = 0; i < 8; i++) {
          spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, sparkCol, 3, 20);
        }
      } else if (item.type === 'gem') {
        state.gems += 1;
        localStorage.setItem('ormula_gems', state.gems);
        playSFX('coin');
        for (let i = 0; i < 8; i++) {
          spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, '#ff6bff', 3, 20);
        }
      } else if (item.type === 'nos') {
        p.nosEnergy = p.nosCapacity;
        playSFX('nos');
        for (let i = 0; i < 8; i++) {
          spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, 'var(--neon-blue)', 3, 20);
        }
      } else if (item.type === 'shield') {
        p.shieldActive = true;
        p.shieldTime = state.shieldDuration || 300;
        playSFX('repair');
        for (let i = 0; i < 8; i++) {
          spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, 'var(--neon-pink)', 3, 20);
        }
      } else if (item.type === 'repair') {
        p.hp = Math.min(p.maxHp, p.hp + 1);
        playSFX('repair');
        for (let i = 0; i < 8; i++) {
          spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, 'var(--neon-green)', 3, 20);
        }
      }
    }
  });

  // Traffic collisions for Player 1
  state.enemies.forEach(e => {
    const eRect = {
      left: e.x - e.width / 2 + 5,
      right: e.x + e.width / 2 - 5,
      top: e.y - e.height / 2 + 8,
      bottom: e.y + e.height / 2 - 8
    };
    if (pRect.left < eRect.right && pRect.right > eRect.left && pRect.top < eRect.bottom && pRect.bottom > eRect.top) {
      e.active = false;
      if (state.godMode) {
        for (let i = 0; i < 15; i++) {
          spawnParticle(e.x, e.y, Math.random() * 12 - 6, Math.random() * 12 - 6, 'var(--neon-green)', 3, 15);
        }
        return;
      }
      if (p.shieldActive) {
        p.shieldActive = false;
        p.shieldTime = 0;
        state.screenShake = 15;
        playSFX('crash');
        for (let i = 0; i < 25; i++) {
          spawnParticle(e.x, e.y, Math.random() * 12 - 6, Math.random() * 12 - 6, 'var(--neon-blue)', 4, 30);
        }
      } else {
        p.hp--;
        state.screenShake = 25;
        playSFX('crash');
        for (let i = 0; i < 30; i++) {
          spawnParticle(e.x, e.y, Math.random() * 14 - 7, Math.random() * 14 - 7, 'var(--neon-pink)', 5, 45, 'spark');
        }
        if (p.hp <= 0) {
          triggerGameOver();
        } else {
          deploySafetyCar();
        }
      }
    }
    // Near miss reward
    if (e.y < p.y + 50 && e.y > p.y - 50) {
      const distance = Math.abs(p.x - e.x);
      if (distance > p.width && distance < p.width + 25) {
        state.score += 2;
        p.nosEnergy = Math.min(p.nosCapacity, p.nosEnergy + 0.5);
        if (Math.random() < 0.15) {
          spawnParticle(p.x, p.y, 0, 0, 'var(--neon-blue)', 8, 12, 'smoke');
        }
      }
    }
  });

  // Multiplayer: duplicate logic for Player 2 if active
  if (state.isMultiplayer && state.player2) {
    const p2 = state.player2;
    const p2Rect = {
      left: p2.x - p2.width / 2 + 6,
      right: p2.x + p2.width / 2 - 6,
      top: p2.y - p2.height / 2 + 8,
      bottom: p2.y + p2.height / 2 - 8
    };
    // Power‑up intersections for Player 2 (same as Player 1)
    state.powerups.forEach(item => {
      const magnetLvl = state.carUpgrades[state.selectedCar].magnet || 1;
      if (magnetLvl > 1 && item.type === 'coin') {
        const pullDist = (magnetLvl - 1) * 35 + 40;
        const dist = Math.hypot(p2.x - item.x, p2.y - item.y);
        if (dist < pullDist) {
          const dx = p2.x - item.x;
          const dy = p2.y - item.y;
          item.x += (dx / dist) * 8 * state.gameSpeedMultiplier;
          item.y += (dy / dist) * 8 * state.gameSpeedMultiplier;
        }
      }
      const dist = Math.hypot(p2.x - item.x, p2.y - item.y);
      if (dist < item.radius + p2.width / 2) {
        item.active = false;
        if (item.type === 'coin') {
          const amt = state.currentTheme === 'vip' ? 2 : 1;
          state.coinsCollected += amt;
          playSFX('coin');
          const sparkCol = state.currentTheme === 'vip' ? '#ffd700' : 'var(--neon-yellow)';
          for (let i = 0; i < 8; i++) {
            spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, sparkCol, 3, 20);
          }
        } else if (item.type === 'gem') {
          state.gems += 1;
          localStorage.setItem('ormula_gems', state.gems);
          playSFX('coin');
          for (let i = 0; i < 8; i++) {
            spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, '#ff6bff', 3, 20);
          }
        } else if (item.type === 'nos') {
          p2.nosEnergy = p2.nosCapacity;
          playSFX('nos');
          for (let i = 0; i < 8; i++) {
            spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, 'var(--neon-blue)', 3, 20);
          }
        } else if (item.type === 'shield') {
          p2.shieldActive = true;
          p2.shieldTime = state.shieldDuration || 300;
          playSFX('repair');
          for (let i = 0; i < 8; i++) {
            spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, 'var(--neon-pink)', 3, 20);
          }
        } else if (item.type === 'repair') {
          p2.hp = Math.min(p2.maxHp, p2.hp + 1);
          playSFX('repair');
          for (let i = 0; i < 8; i++) {
            spawnParticle(item.x, item.y, Math.random() * 6 - 3, Math.random() * 6 - 3, 'var(--neon-green)', 3, 20);
          }
        }
      }
    });
    // Traffic collisions for Player 2
    state.enemies.forEach(e => {
      const eRect = {
        left: e.x - e.width / 2 + 5,
        right: e.x + e.width / 2 - 5,
        top: e.y - e.height / 2 + 8,
        bottom: e.y + e.height / 2 - 8
      };
      if (p2Rect.left < eRect.right && p2Rect.right > eRect.left && p2Rect.top < eRect.bottom && p2Rect.bottom > eRect.top) {
        e.active = false;
        if (state.godMode) {
          for (let i = 0; i < 15; i++) {
            spawnParticle(e.x, e.y, Math.random() * 12 - 6, Math.random() * 12 - 6, 'var(--neon-green)', 3, 15);
          }
          return;
        }
        if (p2.shieldActive) {
          p2.shieldActive = false;
          p2.shieldTime = 0;
          state.screenShake = 15;
          playSFX('crash');
          for (let i = 0; i < 25; i++) {
            spawnParticle(e.x, e.y, Math.random() * 12 - 6, Math.random() * 12 - 6, 'var(--neon-blue)', 4, 30);
          }
        } else {
          p2.hp--;
          state.screenShake = 25;
          playSFX('crash');
          for (let i = 0; i < 30; i++) {
            spawnParticle(e.x, e.y, Math.random() * 14 - 7, Math.random() * 14 - 7, 'var(--neon-pink)', 5, 45, 'spark');
          }
          if (p2.hp <= 0) {
            // For simplicity, treat player2 loss as game over
            triggerGameOver();
          } else {
            deploySafetyCar();
          }
        }
      }
      // Near miss for Player 2
      if (e.y < p2.y + 50 && e.y > p2.y - 50) {
        const distance = Math.abs(p2.x - e.x);
        if (distance > p2.width && distance < p2.width + 25) {
          state.score += 2;
          p2.nosEnergy = Math.min(p2.nosCapacity, p2.nosEnergy + 0.5);
          if (Math.random() < 0.15) {
            spawnParticle(p2.x, p2.y, 0, 0, 'var(--neon-blue)', 8, 12, 'smoke');
          }
        }
      }
    });
  }
}

/* ================= CANVAS DRAW ENGINE ================= */
function drawVIPGoldOverlay(ctx) {
  if (state.currentTheme !== 'vip' && (state.currentEdition || 'standard') !== 'vip') return;

  const gradient = ctx.createLinearGradient(0, 0, 0, CONFIG.height);
  gradient.addColorStop(0, 'rgba(255, 215, 0, 0.08)');
  gradient.addColorStop(0.5, 'rgba(255, 170, 0, 0.04)');
  gradient.addColorStop(1, 'rgba(184, 134, 11, 0.08)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);

  ctx.strokeStyle = 'rgba(255, 215, 0, 0.18)';
  ctx.lineWidth = 1;
  for (let y = 0; y < CONFIG.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(CONFIG.width, y + 8);
    ctx.stroke();
  }
}

function drawHUD() {
  const scoreEl = document.getElementById('hudScore');
  const highEl = document.getElementById('hudHighscore');
  const speedEl = document.getElementById('hudSpeed');
  const coinsEl = document.getElementById('hudCoins');
  const gemsEl = document.getElementById('hudGems');

  if (scoreEl) scoreEl.innerText = String(state.score).padStart(5, '0');
  if (highEl) highEl.innerText = String(state.highscore).padStart(5, '0');
  if (coinsEl) coinsEl.innerText = '🪙 ' + state.coinsCollected;
  if (gemsEl) gemsEl.innerText = '💎 ' + state.gems;

  const kmh = Math.floor(state.speed * 22);
  if (speedEl) speedEl.innerText = `${kmh} KM/H`;
}

function drawScene(vpY, vpHeight, focusPlayer, isP2) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, vpY, CONFIG.width, vpHeight);
  ctx.clip();
  ctx.translate(0, vpY);

  // Translate vertical view so focusPlayer is always at y=650
  const yShift = 650 - focusPlayer.y;
  ctx.translate(0, yShift);

  // Screen Shake
  if (state.screenShake > 0) {
    ctx.translate((Math.random() - 0.5) * state.screenShake, (Math.random() - 0.5) * state.screenShake);
  }

  // --- 1. RENDER BACKGROUND TRACK (THEME STYLED) ---
  let grassColor = '#06070d';
  let roadColor = '#181920';
  let linesColor = 'rgba(0, 255, 170, 0.85)';
  let curbBright = 'var(--neon-green)';
  let curbDark = '#06070d';

  const theme = (typeof THEME_DATA !== 'undefined' && THEME_DATA[state.currentTheme]);
  if (theme) {
    grassColor = theme.colors.grass;
    roadColor = theme.colors.road;
    curbBright = theme.colors.curb;

    // Theme specific fine-tuning
    if (state.currentTheme === 'easter') {
      curbDark = '#fd79a8'; linesColor = '#fff';
    } else if (state.currentTheme === 'new_years') {
      curbDark = '#e67e22'; linesColor = '#f39c12';
    } else if (state.currentTheme === 'christmas') {
      curbDark = '#2ecc71'; linesColor = '#fff';
    } else if (state.currentTheme === 'winter') {
      curbDark = '#0984e3'; linesColor = '#fff';
    } else if (state.currentTheme === 'autumn' || state.currentTheme === 'fall') {
      curbDark = '#e67e22'; linesColor = '#e74c3c';
    } else if (state.currentTheme === 'summer') {
      curbDark = '#fab1a0'; linesColor = '#fdcb6e';
    } else if (state.currentTheme === 'vip') {
      curbDark = '#b8860b'; linesColor = '#ffd700';
    } else if (state.currentTheme === 'neon_city') {
      curbDark = '#050510'; linesColor = 'rgba(0, 255, 255, 0.85)';
    } else if (state.currentTheme === 'sunset_drive') {
      curbDark = '#1a0d2e'; linesColor = '#ffb56b';
    } else if (state.currentTheme === 'ocean_blue') {
      curbDark = '#001a33'; linesColor = '#00ffaa';
    } else if (state.currentTheme === 'forest_green') {
      curbDark = '#142514'; linesColor = '#ffffff';
    } else if (state.currentTheme === 'mars_red') {
      curbDark = '#3d1000'; linesColor = '#ffcc00';
    }
  } else if (state.currentTheme === 'fall') {
    // Legacy fall theme fallback if not in THEME_DATA
    grassColor = '#d35400'; roadColor = '#2c3e50'; curbBright = '#f39c12'; curbDark = '#e67e22'; linesColor = '#e74c3c';
  }

  ctx.fillStyle = grassColor;
  ctx.fillRect(0, -yShift, CONFIG.width, vpHeight + Math.abs(yShift));

  ctx.fillStyle = roadColor;
  ctx.fillRect(80, -yShift, CONFIG.roadWidth, vpHeight + Math.abs(yShift));

  // The road pattern repeats
  const yOffset = state.roadY % 40;
  for (let i = -yShift; i < vpHeight + Math.abs(yShift); i += 40) {
    ctx.fillStyle = ((i + Math.floor(state.roadY)) % 80 < 40) ? curbBright : curbDark;
    ctx.fillRect(75, i + yOffset, 10, 40);
    ctx.fillRect(395, i + yOffset, 10, 40);

    ctx.fillStyle = linesColor;
    if (((i + Math.floor(state.roadY)) % 80 < 40)) {
      ctx.fillRect(CONFIG.laneCenters[0] + 50, i + yOffset, 4, 30);
      ctx.fillRect(CONFIG.laneCenters[1] + 50, i + yOffset, 4, 30);
    }
  }

  drawVIPGoldOverlay(ctx);

  if (state.images.track) {
    const trackImgY = (focusPlayer.distance % CONFIG.height);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(state.images.track, 0, trackImgY - CONFIG.height, CONFIG.width, CONFIG.height);
    ctx.drawImage(state.images.track, 0, trackImgY, CONFIG.width, CONFIG.height);
    ctx.globalCompositeOperation = 'source-over';
  }

  // Draw Safety Car
  if (state.safetyCarActive && state.safetyCar) {
    const sc = state.safetyCar;
    ctx.save();
    ctx.translate(sc.x, sc.y);
    ctx.shadowBlur = 30;
    ctx.shadowColor = Math.floor(Date.now() / 200) % 2 === 0 ? '#ff0000' : '#0000ff';
    if (state.images.safetyCar) ctx.drawImage(state.images.safetyCar, -sc.width / 2, -sc.height / 2, sc.width, sc.height);
    ctx.restore();
  }

  // Enemies
  state.enemies.forEach(e => {
    ctx.save();
    ctx.translate(e.x, e.y);
    const imgObj = state.images[e.imageKey] || state.images.enemy1;
    if (imgObj) {
      if (e.colorHue > 0) ctx.filter = `hue-rotate(${e.colorHue}deg)`;
      ctx.drawImage(imgObj, -e.width / 2, -e.height / 2, e.width, e.height);
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(-e.width / 2, -e.height / 2, e.width, e.height);
    }
    ctx.restore();
  });

  // Powerups
  state.powerups.forEach(item => {
    if(!item.active) return;
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'var(--neon-yellow)';

    const spin = Math.sin(Date.now() * 0.008 + item.y) * 0.18;
    if (item.type === 'coin') {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(spin);
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.fillText('🪙', 0, 0);
      ctx.restore();
    } else if (item.type === 'gem') {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(spin);
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ff6bff';
      ctx.shadowColor = '#ff6bff';
      ctx.fillText('💎', 0, 0);
      ctx.restore();
    } else if (item.type === 'nos') {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(spin);
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#00c8ff';
      ctx.shadowColor = '#00c8ff';
      ctx.fillText('🚀', 0, 0);
      ctx.restore();
    } else if (item.type === 'shield') {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(spin);
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ff4fd8';
      ctx.shadowColor = '#ff4fd8';
      ctx.fillText('🛡️', 0, 0);
      ctx.restore();
    } else if (item.type === 'repair') {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(spin);
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#00ffaa';
      ctx.shadowColor = '#00ffaa';
      ctx.fillText('🔧', 0, 0);
      ctx.restore();
    }
    ctx.restore();
  });

  // Particles
  state.particles.forEach(p => {
    ctx.save();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life / p.maxLife;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Draw Player
  drawPlayerObj(state.player, false);
  if(state.isMultiplayer) drawPlayerObj(state.player2, true);

  // Overlay Masks (Night/Rain)
  if (state.timeOfDay === 'night' || state.timeOfDay === 'sunset') {
    const opacity = state.timeOfDay === 'night' ? 0.85 : 0.45;
    const overlay = document.createElement('canvas');
    overlay.width = CONFIG.width;
    overlay.height = CONFIG.height;
    const octx = overlay.getContext('2d');
    octx.fillStyle = `rgba(5, 6, 12, ${opacity})`;
    octx.fillRect(0, 0, CONFIG.width, CONFIG.height);
    octx.globalCompositeOperation = 'destination-out';

    // Player 1 lights
    let p = state.player;
    let grad = octx.createRadialGradient(p.x, p.y - p.height / 2, 20, p.x, p.y - 300, 200);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    octx.fillStyle = grad;
    octx.beginPath();
    octx.moveTo(p.x - 12, p.y - p.height / 2); octx.lineTo(p.x - 120, p.y - 300);
    octx.lineTo(p.x + 120, p.y - 300); octx.lineTo(p.x + 12, p.y - p.height / 2); octx.fill();

    // Player 2 lights
    if(state.isMultiplayer) {
      p = state.player2;
      grad = octx.createRadialGradient(p.x, p.y - p.height / 2, 20, p.x, p.y - 300, 200);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      octx.fillStyle = grad;
      octx.beginPath();
      octx.moveTo(p.x - 12, p.y - p.height / 2); octx.lineTo(p.x - 120, p.y - 300);
      octx.lineTo(p.x + 120, p.y - 300); octx.lineTo(p.x + 12, p.y - p.height / 2); octx.fill();
    }

    // Enemy lights (carved out pointing down)
    state.enemies.forEach(e => {
      let gradE = octx.createRadialGradient(e.x, e.y + e.height / 2, 20, e.x, e.y + 300, 200);
      gradE.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradE.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradE.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      octx.fillStyle = gradE;
      octx.beginPath();
      octx.moveTo(e.x - 12, e.y + e.height / 2); octx.lineTo(e.x - 120, e.y + 300);
      octx.lineTo(e.x + 120, e.y + 300); octx.lineTo(e.x + 12, e.y + e.height / 2); octx.fill();
    });

    // Safety car lights (carved out pointing down)
    if (state.safetyCarActive && state.safetyCar) {
      let sc = state.safetyCar;
      let gradSC = octx.createRadialGradient(sc.x, sc.y + sc.height / 2, 20, sc.x, sc.y + 300, 200);
      gradSC.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradSC.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradSC.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      octx.fillStyle = gradSC;
      octx.beginPath();
      octx.moveTo(sc.x - 12, sc.y + sc.height / 2); octx.lineTo(sc.x - 120, sc.y + 300);
      octx.lineTo(sc.x + 120, sc.y + 300); octx.lineTo(sc.x + 12, sc.y + sc.height / 2); octx.fill();
    }

    ctx.drawImage(overlay, 0, -yShift);
  }

  // Draw local HUD inside the viewport
  const hudY = 70;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(20, hudY, 120, 8);
  ctx.fillStyle = 'var(--neon-pink)';
  ctx.fillRect(20, hudY, 120 * (focusPlayer.hp / focusPlayer.maxHp), 8);
  ctx.font = 'bold 9px Orbitron'; ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
  ctx.fillText(isP2 ? 'P2 INTEGRITY' : 'P1 INTEGRITY', 20, hudY - 5);

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(CONFIG.width - 140, hudY, 120, 8);
  ctx.fillStyle = 'var(--neon-blue)';
  ctx.fillRect(CONFIG.width - 140, hudY, 120 * (focusPlayer.nosEnergy / (focusPlayer.nosCapacity||100)), 8);
  ctx.textAlign = 'right';
  ctx.fillText(isP2 ? 'P2 NITROUS' : 'P1 NITROUS', CONFIG.width - 20, hudY - 5);

  if (state.isMultiplayer) {
     ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = 'bold 16px Orbitron';
     ctx.fillText((isP2 ? 'P2 SPEED: ' : 'P1 SPEED: ') + Math.floor(focusPlayer.speed*22) + ' KM/H', CONFIG.width/2, 30);
  }

  ctx.restore();
}

function drawPlayerObj(p, isP2) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);

  if (p.shieldActive) {
    ctx.strokeStyle = 'var(--neon-pink)';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'var(--neon-pink)';
    ctx.beginPath();
    ctx.arc(0, 0, p.height * 0.65, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  if (!isP2 && state.carPaintHue > 0) ctx.filter = `hue-rotate(${state.carPaintHue}deg)`;
  if (isP2) ctx.filter = 'hue-rotate(140deg)';

  const selectedImgKey = isP2 ? 'player' : getPlayerImageKey();
  const carImg = state.images[selectedImgKey] || state.images.player;
  if (carImg) {
    ctx.drawImage(carImg, -p.width / 2, -p.height / 2, p.width, p.height);
  } else {
    ctx.fillStyle = 'var(--neon-green)';
    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
  }
  ctx.restore();
}

function drawGame() {
  if (state.isMultiplayer) {
    drawScene(0, 398, state.player, false);
    ctx.fillStyle = 'var(--neon-pink)';
    ctx.fillRect(0, 398, CONFIG.width, 4);
    drawScene(402, 398, state.player2, true);
  } else {
    drawScene(0, 800, state.player, false);
  }
}


/* ================= MAIN GAME LOOP ================= */
function gameLoop() {
  if (!state.gameRunning || state.paused) return;

  updatePhysics();
  updateTraffic();
  updateItems();
  checkCollisions();
  checkSafetyCarRules();
  updateParticles();

  drawHUD();
  drawGame();

  requestAnimationFrame(gameLoop);
}

/* ================= INITIALIZATION ================= */
preloadAssets(() => {
  const loader = document.getElementById('loadingScreen');
  const menu = document.getElementById('mainMenu');
  if (loader) loader.classList.add('hidden');
  if (menu) menu.classList.remove('hidden');

  setEdition(state.currentEdition || 'standard');
  renderAdminUpgradeControls();
  applyThemeStyles();
});

function adminAddCoins(amount) {
  state.totalCoins += amount;
  localStorage.setItem('ormula_coins', state.totalCoins);
  renderUpgradeBars();
  playSFX('repair');
}

function adminAddCustomCoins() {
  const input = document.getElementById('adminCoinInput');
  const amount = parseInt(input?.value || '0', 10);
  if (!isNaN(amount) && amount > 0) adminAddCoins(amount);
  if (input) input.value = '';
}

function adminAddGems(amount) {
  state.gems += amount;
  localStorage.setItem('ormula_gems', state.gems);
  playSFX('repair');
}

function adminAddCustomGems() {
  const input = document.getElementById('adminGemInput');
  const amount = parseInt(input?.value || '0', 10);
  if (!isNaN(amount) && amount > 0) adminAddGems(amount);
  if (input) input.value = '';
}

function adminAddScore(amount) {
  state.score += amount;
  state.highscore = Math.max(state.highscore, state.score);
  localStorage.setItem('ormula_highscore', state.highscore);
  playSFX('click');
}

function adminAddCustomScore() {
  const input = document.getElementById('adminScoreInput');
  const amount = parseInt(input?.value || '0', 10);
  if (!isNaN(amount) && amount > 0) adminAddScore(amount);
  if (input) input.value = '';
}

function toggleGodMode(enabled) {
  state.godMode = !!enabled;
  playSFX('click');
}

function toggleInfNos(enabled) {
  state.infNos = !!enabled;
  playSFX('click');
}

function adminSpawn(type) {
  if (!state.gameRunning) return;
  const lane = Math.floor(Math.random() * CONFIG.laneCenters.length);
  const x = CONFIG.laneCenters[lane];
  if (type === 'coin') state.powerups.push({ x, y: -80, type: 'coin', radius: 18, active: true });
  if (type === 'gem') state.powerups.push({ x, y: -80, type: 'gem', radius: 18, active: true });
  if (type === 'nos') state.powerups.push({ x, y: -80, type: 'nos', radius: 18, active: true });
  if (type === 'shield') state.powerups.push({ x, y: -80, type: 'shield', radius: 18, active: true });
  if (type === 'repair') state.powerups.push({ x, y: -80, type: 'repair', radius: 18, active: true });
  playSFX('repair');
}

function adminSetSpeed(mult) {
  state.gameSpeedMultiplier = mult;
  playSFX('click');
}

function adminUnlockAll() {
  state.unlockedThemes = Object.keys(THEME_DATA);
  localStorage.setItem('ormula_unlocked_themes', JSON.stringify(state.unlockedThemes));
  renderThemes();
  playSFX('repair');
}

function adminResetAll() {
  localStorage.clear();
  location.reload();
}

function renderAdminUpgradeControls() {
  const container = document.getElementById('adminUpgradeControls');
  if (!container) return;
  container.innerHTML = '';

  const stats = ['speed', 'handling', 'armor', 'nos', 'magnet', 'shield'];
  const labels = { speed: 'Engine', handling: 'Handling', armor: 'Armor', nos: 'NOS', magnet: 'Magnet', shield: 'Shield' };

  stats.forEach(s => {
    const lvl = state.carUpgrades[state.selectedCar][s] || 1;
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:6px;margin:5px 0;';

    const label = document.createElement('span');
    label.style.cssText = 'font-family:Orbitron,sans-serif;font-size:0.65rem;width:72px;color:#aaa;';
    label.innerText = labels[s].toUpperCase();
    row.appendChild(label);

    const btnDec = document.createElement('button');
    btnDec.className = 'admin-btn sm';
    btnDec.style.cssText = 'min-width:28px;padding:4px;';
    btnDec.innerText = '-';
    btnDec.onclick = () => adminSetUpgradeLevel(s, Math.max(1, lvl - 1));
    row.appendChild(btnDec);

    const lvlBadge = document.createElement('span');
    lvlBadge.id = 'adminLvl_' + s;
    lvlBadge.style.cssText = 'font-family:Orbitron,sans-serif;font-size:0.7rem;min-width:48px;text-align:center;color:#ffd700;';
    lvlBadge.innerText = 'LVL ' + lvl;
    row.appendChild(lvlBadge);

    const btnInc = document.createElement('button');
    btnInc.className = 'admin-btn sm';
    btnInc.style.cssText = 'min-width:28px;padding:4px;';
    btnInc.innerText = '+';
    btnInc.onclick = () => adminSetUpgradeLevel(s, Math.min(CONFIG.maxUpgradeLvl, lvl + 1));
    row.appendChild(btnInc);

    const btnMax = document.createElement('button');
    btnMax.className = 'admin-btn sm';
    btnMax.style.cssText = 'min-width:36px;padding:4px;font-size:0.6rem;';
    btnMax.innerText = 'MAX';
    btnMax.onclick = () => adminSetUpgradeLevel(s, CONFIG.maxUpgradeLvl);
    row.appendChild(btnMax);

    container.appendChild(row);
  });
}

function adminSetUpgradeLevel(stat, level) {
  level = Math.max(1, Math.min(CONFIG.maxUpgradeLvl, level));
  state.carUpgrades[state.selectedCar][stat] = level;
  localStorage.setItem('ormula_car_upgrades', JSON.stringify(state.carUpgrades));
  applyUpgrades();
  renderUpgradeBars();
  renderAdminUpgradeControls(); // refresh controls
  playSFX('repair');
}

