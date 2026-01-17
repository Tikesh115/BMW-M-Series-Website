/**
 * GAME ENGINE & LOGIC
 */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on bg

// Game State
let animationId;
let isPlaying = false;
let score = 0;
let bestScore = localStorage.getItem('m5_best_score') || 0;
let speed = 5;
let traffic = [];
let roadMarkers = [];
let lastTime = 0;
let spawnTimer = 0;

// Config
const LANE_COUNT = 4; // 4 Lane Highway
let LANE_WIDTH = 100;
let ROAD_WIDTH = 400; // Calculated on resize

// Player Car (The M5)
const player = {
    x: 0,
    y: 0,
    width: 50,
    height: 90,
    lane: 1, // 0 to 3
    targetX: 0,
    color: '#1b458f', // Marina Bay Blue
    speedX: 0
};

// Input Handling
let leftPressed = false;
let rightPressed = false;

// --- Audio Context (Simple Synth) ---
// We use a simple oscillator to avoid loading external audio files
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'engine_start') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    } else if (type === 'crash') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(10, now + 0.3);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    }
}

// --- Initialization & Resizing ---
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate road dimensions based on screen width
    // Max road width is 600px, otherwise 90% of screen
    ROAD_WIDTH = Math.min(600, canvas.width * 0.95);
    LANE_WIDTH = ROAD_WIDTH / LANE_COUNT;

    // Scale car relative to lane
    player.width = LANE_WIDTH * 0.5;
    player.height = player.width * 1.9; // Aspect ratio

    // Update player position to center of current lane
    updatePlayerTarget();
    player.x = player.targetX;
    player.y = canvas.height - player.height - 50;

    // Show touch hint on mobile
    if(window.matchMedia("(pointer: coarse)").matches) {
        document.getElementById('touch-hint').style.display = 'flex';
    }
}

window.addEventListener('resize', resize);

// Initial Setup
document.getElementById('bestScoreDisplay').innerText = bestScore;
resize();

// --- Input Listeners ---
document.addEventListener('keydown', (e) => {
    if (!isPlaying) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLane(-1);
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveLane(1);
});

// Touch Controls
canvas.addEventListener('touchstart', (e) => {
    if (!isPlaying) return;
    const touchX = e.touches[0].clientX;
    const halfWidth = window.innerWidth / 2;
    if (touchX < halfWidth) moveLane(-1);
    else moveLane(1);
}, {passive: false});

function moveLane(dir) {
    player.lane += dir;
    // Clamp lane
    if (player.lane < 0) player.lane = 0;
    if (player.lane >= LANE_COUNT) player.lane = LANE_COUNT - 1;
    updatePlayerTarget();
}

function updatePlayerTarget() {
    const roadStartX = (canvas.width - ROAD_WIDTH) / 2;
    player.targetX = roadStartX + (player.lane * LANE_WIDTH) + (LANE_WIDTH / 2) - (player.width / 2);
}

// --- Graphics: Drawing the M5 ---
function drawM5(x, y, w, h, isPlayer = true) {
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x + 5, y + 5, w, h);

    const color = isPlayer ? player.color : '#aaaaaa'; // Player is Blue, Traffic is Grey

    // Body (Main Chassis)
    ctx.fillStyle = color;
    // Draw a rounded rectangle manually for compatibility
    roundRect(ctx, x, y, w, h, 8);
    ctx.fill();

    // Roof (Carbon fiber look)
    const roofMargin = w * 0.15;
    const roofY = y + h * 0.25;
    const roofH = h * 0.35;
    ctx.fillStyle = '#111'; // Carbon black
    roundRect(ctx, x + roofMargin, roofY, w - (roofMargin*2), roofH, 5);
    ctx.fill();

    // Windshield (Front)
    ctx.fillStyle = '#223';
    ctx.beginPath();
    ctx.moveTo(x + roofMargin + 2, roofY);
    ctx.lineTo(x + w - roofMargin - 2, roofY);
    ctx.lineTo(x + w - 5, roofY - (h*0.1));
    ctx.lineTo(x + 5, roofY - (h*0.1));
    ctx.fill();

    // Rear Window
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(x + roofMargin + 2, roofY + roofH);
    ctx.lineTo(x + w - roofMargin - 2, roofY + roofH);
    ctx.lineTo(x + w - 8, roofY + roofH + (h*0.08));
    ctx.lineTo(x + 8, roofY + roofH + (h*0.08));
    ctx.fill();

    // Hood Lines (Aggressive M styling)
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.3, y + h * 0.25); // Windshield bottom
    ctx.lineTo(x + w * 0.3, y + 5); // Front
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + w * 0.7, y + h * 0.25);
    ctx.lineTo(x + w * 0.7, y + 5);
    ctx.stroke();

    // Kidney Grille (The most important BMW feature)
    ctx.fillStyle = '#000';
    const grilleW = w * 0.35;
    const grilleH = h * 0.05;
    const grilleX = x + (w - grilleW) / 2;
    const grilleY = y + 2;

    // Left Kidney
    roundRect(ctx, grilleX, grilleY, grilleW/2 - 1, grilleH, 2);
    ctx.fill();
    // Right Kidney
    roundRect(ctx, grilleX + grilleW/2 + 1, grilleY, grilleW/2 - 1, grilleH, 2);
    ctx.fill();

    // Chrome surround (silver stroke)
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Headlights (Angel Eyes)
    // Stylized yellow/white DRLs
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#fff';

    // Left Light
    ctx.beginPath();
    ctx.arc(x + 8, y + 8, 3, 0, Math.PI * 2);
    ctx.fill();
    // Right Light
    ctx.beginPath();
    ctx.arc(x + w - 8, y + 8, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0; // Reset shadow

    // Taillights (if viewing traffic from behind, but we view all top-down. 
    // Let's add slight red hint at back for realism)
    ctx.fillStyle = '#800';
    ctx.fillRect(x + 5, y + h - 5, 10, 3);
    ctx.fillRect(x + w - 15, y + h - 5, 10, 3);

    // M Logo on trunk (Tiny detail)
    if (isPlayer) {
        ctx.fillStyle = '#6baef7'; // Light Blue
        ctx.fillRect(x + w - 15, y + h - 15, 2, 3);
        ctx.fillStyle = '#1b458f'; // Dark Blue
        ctx.fillRect(x + w - 13, y + h - 15, 2, 3);
        ctx.fillStyle = '#c91823'; // Red
        ctx.fillRect(x + w - 11, y + h - 15, 2, 3);
    }

    ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function drawTrafficCar(car) {
    // Generic car shape, maybe different colors
    ctx.save();

    // Color randomization based on lane or ID
    const colors = ['#a83232', '#32a852', '#a8a832', '#555555', '#ffffff'];
    const carColor = colors[Math.floor(car.x) % colors.length];

    // Draw simplified car
    ctx.fillStyle = carColor;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 5;
    roundRect(ctx, car.x, car.y, car.width, car.height, 5);
    ctx.fill();

    // Windshield
    ctx.fillStyle = '#333';
    ctx.fillRect(car.x + 5, car.y + car.height*0.2, car.width - 10, car.height*0.2);

    // Rear window
    ctx.fillRect(car.x + 5, car.y + car.height*0.7, car.width - 10, car.height*0.15);

    ctx.restore();
}

// --- Main Game Loop ---
function update(timestamp) {
    if (!isPlaying) return;

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Clear Canvas
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grass/Environment sides
    const roadStartX = (canvas.width - ROAD_WIDTH) / 2;
    ctx.fillStyle = '#1a472a'; // Grass
    ctx.fillRect(0, 0, roadStartX, canvas.height);
    ctx.fillRect(roadStartX + ROAD_WIDTH, 0, roadStartX, canvas.height);

    // Draw Road Markings
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;

    // Solid outer lines
    ctx.beginPath();
    ctx.moveTo(roadStartX, 0);
    ctx.lineTo(roadStartX, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(roadStartX + ROAD_WIDTH, 0);
    ctx.lineTo(roadStartX + ROAD_WIDTH, canvas.height);
    ctx.stroke();

    // Dashed Lane Lines
    ctx.setLineDash([30, 40]);
    // Animate Dash Offset
    const dashOffset = -score * 20 % 70; // Speed visual effect
    ctx.lineDashOffset = dashOffset;

    for (let i = 1; i < LANE_COUNT; i++) {
        const laneX = roadStartX + (i * LANE_WIDTH);
        ctx.beginPath();
        ctx.moveTo(laneX, 0);
        ctx.lineTo(laneX, canvas.height);
        ctx.stroke();
    }
    ctx.setLineDash([]); // Reset

    // --- Logic Updates ---

    // Lerp Player Position (Smooth movement)
    player.x += (player.targetX - player.x) * 0.2;

    // Increase Score & Speed
    score += 0.05;
    speed = 5 + (score / 100); // Speed scales with score

    document.getElementById('scoreDisplay').innerText = Math.floor(score);

    // Spawn Traffic
    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnTraffic();
        // Randomize next spawn time based on speed (faster speed = faster spawns)
        spawnTimer = Math.max(30, 100 - (speed * 2));
    }

    // Update & Draw Traffic
    for (let i = 0; i < traffic.length; i++) {
        let car = traffic[i];
        car.y += speed * 0.8; // Traffic moves slower than player (simulating overtaking)

        drawTrafficCar(car);

        // Collision Detection (AABB)
        if (
            player.x < car.x + car.width &&
            player.x + player.width > car.x &&
            player.y < car.y + car.height &&
            player.y + player.height > car.y
        ) {
            gameOver();
            return; // Stop frame
        }

        // Remove cars off screen
        if (car.y > canvas.height) {
            traffic.splice(i, 1);
            i--;
        }
    }

    // Draw Player M5
    drawM5(player.x, player.y, player.width, player.height, true);

    animationId = requestAnimationFrame(update);
}

function spawnTraffic() {
    // Pick a random lane
    const lane = Math.floor(Math.random() * LANE_COUNT);
    const roadStartX = (canvas.width - ROAD_WIDTH) / 2;

    // Ensure we don't spawn on top of another car immediately (basic check)
    const laneX = roadStartX + (lane * LANE_WIDTH) + (LANE_WIDTH / 2) - (player.width / 2);

    // Check if lane is free at top
    const isLaneBlocked = traffic.some(car => Math.abs(car.x - laneX) < 10 && car.y < 150);

    if (!isLaneBlocked) {
        traffic.push({
            x: laneX,
            y: -150,
            width: player.width,
            height: player.height,
            lane: lane
        });
    }
}

// --- Game States ---
function startGame() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');

    playSound('engine_start');

    resetVars();
    isPlaying = true;
    lastTime = performance.now();
    resize(); // Ensure alignment
    animationId = requestAnimationFrame(update);
}

function resetVars() {
    score = 0;
    speed = 5;
    traffic = [];
    player.lane = 1;
    spawnTimer = 0;
    updatePlayerTarget();
    player.x = player.targetX;
}

function gameOver() {
    isPlaying = false;
    cancelAnimationFrame(animationId);
    playSound('crash');

    // Update High Score
    if (score > bestScore) {
        bestScore = Math.floor(score);
        localStorage.setItem('m5_best_score', bestScore);
        document.getElementById('bestScoreDisplay').innerText = bestScore;
    }

    document.getElementById('finalScore').innerText = Math.floor(score);
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

function resetGame() {
    startGame();
}