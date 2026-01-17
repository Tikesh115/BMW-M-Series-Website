import React, { useEffect, useRef, useState } from 'react';

/**
 * M5 Highway Run - Professional Performance Edition
 * * Layout Updates:
 * - Reserved 6.5rem top spacer for transparent navbar (Bg: #0f0f17).
 * - All game elements (Canvas, HUD, Dialogs) start below this spacer.
 * - Entire container background set to #0f0f17.
 * - Maintains safe lane-switch gaps and dynamic speed scaling.
 * - Strictly non-italic typography.
 */

const Game = () => {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  
  // UI State
  const [gameState, setGameState] = useState('START');
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(Number(localStorage.getItem('m5_best_score')) || 0);
  const [finalScore, setFinalScore] = useState(0);

  // High-Contrast "Poppy" Traffic Colors
  const TRAFFIC_COLORS = [
    '#E11D48', // Bright Rose
    '#D97706', // Amber/Orange
    '#059669', // Emerald Green
    '#2563EB', // Blue
    '#7C3AED', // Violet
    '#DB2777', // Pink
  ];

  // Game Engine State
  const game = useRef({
    animationId: null,
    isPlaying: false,
    score: 0,
    speed: 5,
    baseSpeed: 5,
    maxSpeed: 25, 
    traffic: [],
    spawnTimer: 0,
    laneCount: 4,
    laneWidth: 100,
    roadWidth: 400,
    player: {
      x: 0, y: 0, width: 50, height: 95, lane: 1, targetX: 0, color: '#1e40af' 
    }
  });

  // --- Audio ---
  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'start') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.5);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now); osc.stop(now + 0.5);
      } else if (type === 'crash') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(20, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
      }
    } catch (e) {}
  };

  // --- Rendering Helpers ---
  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
    ctx.closePath();
  };

  const drawM5 = (ctx, x, y, w, h) => {
    ctx.save();
    ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.fillStyle = game.current.player.color;
    roundRect(ctx, x, y, w, h, 12);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Roof & Glass (Facing UP)
    ctx.fillStyle = '#0f172a';
    roundRect(ctx, x + w * 0.18, y + h * 0.28, w * 0.64, h * 0.35, 4);
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(x + w * 0.2, y + h * 0.28);
    ctx.lineTo(x + w * 0.8, y + h * 0.28);
    ctx.lineTo(x + w * 0.9, y + h * 0.15);
    ctx.lineTo(x + w * 0.1, y + h * 0.15);
    ctx.fill();

    // Kidney Grille
    ctx.fillStyle = '#000';
    const gW = w * 0.4;
    const gH = h * 0.06;
    const gX = x + (w - gW) / 2;
    roundRect(ctx, gX, y + 2, gW * 0.45, gH, 3); ctx.fill();
    roundRect(ctx, gX + gW * 0.55, y + 2, gW * 0.45, gH, 3); ctx.fill();

    // Headlights (Top)
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 10; ctx.shadowColor = '#fff';
    ctx.beginPath(); ctx.arc(x + w * 0.15, y + 8, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w * 0.85, y + 8, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };

  const drawTrafficCar = (ctx, car) => {
    ctx.save();
    ctx.fillStyle = car.color;
    roundRect(ctx, car.x, car.y, car.width, car.height, 6);
    ctx.fill();

    // Windows (Facing DOWN - Oncoming)
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(car.x + 6, car.y + car.height * 0.6, car.width - 12, car.height * 0.15); 
    ctx.fillRect(car.x + 6, car.y + car.height * 0.15, car.width - 12, car.height * 0.1); 

    // Headlights (Bottom)
    ctx.fillStyle = '#fef3c7';
    ctx.shadowBlur = 5; ctx.shadowColor = '#fff';
    ctx.fillRect(car.x + 5, car.y + car.height - 5, 8, 3);
    ctx.fillRect(car.x + car.width - 13, car.y + car.height - 5, 8, 3);
    ctx.restore();
  };

  // --- Core Engine ---
  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Header space height (6.5rem)
    const headerHeight = 6.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - headerHeight;

    const g = game.current;
    g.roadWidth = Math.min(600, canvas.width * 0.95);
    g.laneWidth = g.roadWidth / g.laneCount;
    g.player.width = g.laneWidth * 0.48;
    g.player.height = g.player.width * 2;
    const roadStartX = (canvas.width - g.roadWidth) / 2;
    g.player.targetX = roadStartX + (g.player.lane * g.laneWidth) + (g.laneWidth / 2) - (g.player.width / 2);
    g.player.x = g.player.targetX;
    g.player.y = canvas.height - g.player.height - 70;
  };

  const spawnTraffic = () => {
    const g = game.current;
    const canvas = canvasRef.current;
    const lane = Math.floor(Math.random() * g.laneCount);
    const roadStartX = (canvas.width - g.roadWidth) / 2;
    const laneX = roadStartX + (lane * g.laneWidth) + (g.laneWidth / 2) - (g.player.width / 2);

    // Large Vertical Safety Buffer
    const isLaneBlocked = g.traffic.some(c => c.lane === lane && (c.y < 450));
    const carsInSpawnZone = g.traffic.filter(c => c.y < 250).length;
    const isRoadBlocked = carsInSpawnZone >= g.laneCount - 1;

    if (!isLaneBlocked && !isRoadBlocked) {
      g.traffic.push({
        x: laneX, y: -200, lane: lane,
        width: g.player.width * 0.9, height: g.player.height * 0.85,
        color: TRAFFIC_COLORS[Math.floor(Math.random() * TRAFFIC_COLORS.length)]
      });
    }
  };

  const update = (ts) => {
    const g = game.current;
    if (!g.isPlaying) return;

    const ctx = canvasRef.current.getContext('2d', { alpha: false });
    
    // Tarmac
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const roadStartX = (canvasRef.current.width - g.roadWidth) / 2;
    // Green Fields
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(0, 0, roadStartX, canvasRef.current.height);
    ctx.fillRect(roadStartX + g.roadWidth, 0, roadStartX, canvasRef.current.height);

    // Lane Markers
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.setLineDash([40, 60]);
    ctx.lineDashOffset = -g.score * 55 % 100;
    for (let i = 1; i < g.laneCount; i++) {
      const x = roadStartX + (i * g.laneWidth);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvasRef.current.height); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Logic
    g.player.x += (g.player.targetX - g.player.x) * 0.22;
    g.score += 0.05;
    g.speed = Math.min(g.maxSpeed, g.baseSpeed + (g.score / 60)); 
    
    if (Math.floor(g.score) % 5 === 0) setCurrentScore(Math.floor(g.score));

    g.spawnTimer--;
    if (g.spawnTimer <= 0) {
      spawnTraffic();
      g.spawnTimer = Math.max(15, 65 - (g.speed * 1.5));
    }

    for (let i = 0; i < g.traffic.length; i++) {
      const car = g.traffic[i];
      car.y += g.speed * 0.68;
      drawTrafficCar(ctx, car);

      if (g.player.x < car.x + car.width && g.player.x + g.player.width > car.x &&
          g.player.y < car.y + car.height && g.player.y + g.player.height > car.y) {
        g.isPlaying = false;
        cancelAnimationFrame(g.animationId);
        playSound('crash');
        setFinalScore(Math.floor(g.score));
        if (Math.floor(g.score) > g.bestScore) {
          localStorage.setItem('m5_best_score', Math.floor(g.score));
          setBestScore(Math.floor(g.score));
        }
        setGameState('GAMEOVER');
        return;
      }
      if (car.y > canvasRef.current.height) { g.traffic.splice(i, 1); i--; }
    }

    drawM5(ctx, g.player.x, g.player.y, g.player.width, g.player.height);
    g.animationId = requestAnimationFrame(update);
  };

  const move = (dir) => {
    const g = game.current;
    if (!g.isPlaying) return;
    g.player.lane = Math.max(0, Math.min(g.laneCount - 1, g.player.lane + dir));
    const roadStartX = (canvasRef.current.width - g.roadWidth) / 2;
    g.player.targetX = roadStartX + (g.player.lane * g.laneWidth) + (g.laneWidth / 2) - (g.player.width / 2);
  };

  const handleStart = () => {
    Object.assign(game.current, { score: 0, speed: 5, traffic: [], spawnTimer: 0, isPlaying: true });
    setGameState('PLAYING');
    setCurrentScore(0);
    playSound('start');
    resize();
    game.current.animationId = requestAnimationFrame(update);
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') move(-1);
      if (e.key === 'ArrowRight' || e.key === 'd') move(1);
    };
    window.addEventListener('keydown', handleKey);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKey);
      cancelAnimationFrame(game.current.animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0f0f17] overflow-hidden font-sans select-none touch-none text-slate-900 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;500;700&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        * { font-style: normal !important; }
      `}</style>

      {/* 6.5rem Transparent Navbar Placeholder */}
      <div ref={headerRef} className="h-[6.5rem] w-full shrink-0" aria-hidden="true" />

      {/* Game Area Container */}
      <div className="relative flex-grow w-full overflow-hidden">
        
        {/* The Canvas (starts below the navbar space) */}
        <canvas 
          ref={canvasRef} 
          className="block"
          onTouchStart={(e) => move(e.touches[0].clientX < window.innerWidth / 2 ? -1 : 1)}
        />

        {/* HUD Overlay - Relative to the game area below the navbar */}
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start animate-in fade-in duration-700">
            <div className="bg-white/70 backdrop-blur-md border border-black/5 p-4 rounded-xl shadow-lg min-w-[120px]">
              <p className="text-[9px] text-blue-600 font-bold uppercase tracking-[0.2em] mb-1 font-inter leading-none">Score</p>
              <p className="font-orbitron text-3xl font-bold tabular-nums text-slate-900 leading-none mt-1">{currentScore}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-black/5 p-4 rounded-xl shadow-lg text-right min-w-[120px]">
              <p className="text-[9px] text-red-600 font-bold uppercase tracking-[0.2em] mb-1 font-inter leading-none">Best</p>
              <p className="font-orbitron text-3xl font-bold tabular-nums text-slate-900 leading-none mt-1">{bestScore}</p>
            </div>
          </div>
          
          <div className="text-center opacity-40 text-[8px] uppercase tracking-[0.4em] font-bold sm:hidden pb-4 font-inter leading-none text-slate-900">
            Tap Sides to Switch Lanes
          </div>
        </div>

        {/* Dialog Boxes - Centered within the game area */}
        {gameState !== 'PLAYING' && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0f0f17]/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-[90%] max-w-[400px] bg-white border border-slate-200 p-10 rounded-2xl shadow-2xl text-center transform transition-all">
              
              <div className="flex h-1.5 w-24 mx-auto mb-8 rounded-full overflow-hidden shadow-sm">
                <div className="flex-1 bg-[#6baef7]"></div>
                <div className="flex-1 bg-[#1b458f]"></div>
                <div className="flex-1 bg-[#c91823]"></div>
              </div>

              <h1 className="font-orbitron text-3xl font-bold tracking-tight mb-3 text-slate-900 uppercase leading-none">
                {gameState === 'GAMEOVER' ? 'Session Lost' : 'M5 Highway'}
              </h1>

              <p className="text-slate-500 font-inter text-sm leading-relaxed mb-10 px-2 font-normal">
                {gameState === 'GAMEOVER' 
                  ? <>Vehicle integrity compromised.<br/>Velocity Score: <span className="text-slate-900 font-bold">{finalScore}</span></>
                  : <>Engage the twin-turbo V8 powertrain.<br/>Precision maneuvering is mandatory.</>}
              </p>

              <button 
                onClick={handleStart}
                className={`w-full py-4 rounded-xl font-orbitron text-sm font-bold uppercase tracking-[0.2em] transition-all hover:brightness-105 active:scale-95 shadow-xl text-white ${gameState === 'GAMEOVER' ? 'bg-red-600' : 'bg-blue-700'}`}
              >
                {gameState === 'GAMEOVER' ? 'Restart Mission' : 'Start Ignition'}
              </button>

              <div className="mt-8 flex justify-center gap-8 opacity-40">
                <div className="flex flex-col items-center text-slate-900">
                  <span className="text-[8px] uppercase font-bold tracking-widest mb-2 font-inter leading-none">Move Left</span>
                  <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded text-[10px] font-bold font-orbitron">A</span>
                </div>
                <div className="flex flex-col items-center text-slate-900">
                  <span className="text-[8px] uppercase font-bold tracking-widest mb-2 font-inter leading-none">Move Right</span>
                  <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded text-[10px] font-bold font-orbitron">D</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;