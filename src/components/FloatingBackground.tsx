import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  color: string;
  symbol?: string;
}

interface FloatingBackgroundProps {
  grade?: string | null;
}

const GRADE_PALETTES: Record<string, { glows: string[]; particles: string[] }> = {
  "6": {
    glows: ["from-indigo-300/20 to-purple-300/20", "from-cyan-200/20 to-indigo-200/20"],
    particles: ["bg-indigo-300", "bg-purple-300", "bg-violet-300"]
  },
  "7": {
    glows: ["from-emerald-300/15 to-teal-300/15", "from-cyan-200/15 to-emerald-200/15"],
    particles: ["bg-emerald-300", "bg-teal-300", "bg-cyan-300"]
  },
  "8": {
    glows: ["from-cyan-300/20 to-blue-300/20", "from-indigo-200/20 to-cyan-200/20"],
    particles: ["bg-cyan-300", "bg-blue-300", "bg-indigo-300"]
  },
  "9": {
    glows: ["from-amber-200/15 to-orange-200/15", "from-pink-200/15 to-rose-200/15"],
    particles: ["bg-amber-300", "bg-orange-300", "bg-rose-300"]
  },
  "10": {
    glows: ["from-purple-300/20 to-pink-300/20", "from-fuchsia-200/20 to-violet-300/20"],
    particles: ["bg-purple-300", "bg-pink-300", "bg-fuchsia-300"]
  },
  "11": {
    glows: ["from-rose-300/20 to-pink-300/20", "from-indigo-200/20 to-rose-200/20"],
    particles: ["bg-rose-300", "bg-pink-300", "bg-indigo-300"]
  },
  default: {
    glows: ["from-indigo-300/20 to-purple-300/20", "from-cyan-200/20 to-indigo-200/20"],
    particles: ["bg-indigo-400", "bg-violet-400", "bg-purple-400", "bg-cyan-400"]
  }
};

const TECH_SYMBOLS = ["📡", "💻", "✨", "💡", "⚡", "🔬", "🤖", "0", "1", "<>", "{}"];

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ grade }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate a fixed suite of particles on mount to avoid hydration mismatch
    const palette = GRADE_PALETTES[grade || ""] || GRADE_PALETTES.default;
    const items: Particle[] = Array.from({ length: 15 }).map((_, i) => {
      const isSymbol = i % 3 === 0;
      const sizeNum = Math.floor(Math.random() * 24) + 8; // 8px to 32px
      return {
        id: i,
        left: `${(i * 7) % 100}%`, // spread evenly across width
        size: isSymbol ? "text-lg" : `${sizeNum}px`,
        delay: `${(i * 1.8) % 15}s`,
        duration: `${20 + ((i * 4) % 18)}s`,
        opacity: Number((0.08 + (i % 4) * 0.05).toFixed(2)),
        color: palette.particles[i % palette.particles.length],
        symbol: isSymbol ? TECH_SYMBOLS[i % TECH_SYMBOLS.length] : undefined
      };
    });
    setParticles(items);
  }, [grade]);

  const palette = GRADE_PALETTES[grade || ""] || GRADE_PALETTES.default;

  return (
    <div className="absolute inset-0 -z-25 overflow-hidden pointer-events-none select-none">
      {/* 1. Animated Tech Dot Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.035)_1px,transparent_1px)] [background-size:2rem_2rem] animate-drift-grid pointer-events-none"
        style={{ opacity: 0.85 }}
      ></div>

      {/* 2. Primary Rotating / Shifting Ambient Glow Spot A */}
      <div 
        className={`pointer-events-none fixed -top-40 -left-40 w-[650px] h-[650px] bg-gradient-to-br from-blue-300/25 via-sky-300/20 to-indigo-300/15 rounded-full blur-[130px] animate-glow-shift-1`}
      ></div>

      {/* 3. Secondary Dynamic Radial Ambient Glow Spot B */}
      <div 
        className={`pointer-events-none fixed -bottom-40 -right-40 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-300/20 via-blue-200/25 to-sky-200/20 rounded-full blur-[130px] animate-glow-shift-2`}
      ></div>

      {/* 4. Elegant Soft Blue Floating Shapes with Delicate Shadows and Soft Outlines */}
      <div 
        className="pointer-events-none fixed top-[12%] left-[8%] w-[180px] h-[180px] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-gradient-to-tr from-blue-100/15 to-sky-100/10 border border-blue-200/30 shadow-[0_20px_50px_rgba(59,130,246,0.06)] backdrop-blur-[2px] animate-float-slow -z-10"
      ></div>
      <div 
        className="pointer-events-none fixed bottom-[15%] right-[10%] w-[240px] h-[240px] rounded-[60%_40%_30%_70%_/_50%_60%_40%_60%] bg-gradient-to-br from-sky-100/20 to-indigo-100/15 border border-indigo-250/25 shadow-[0_25px_60px_rgba(79,70,229,0.07)] backdrop-blur-[3px] animate-float-reverse -z-10"
      ></div>
      <div 
        className="pointer-events-none fixed top-[60%] left-[15%] w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-cyan-100/10 to-blue-50/15 border border-sky-200/20 shadow-[0_15px_35px_rgba(6,182,212,0.04)] animate-float-slow -z-10"
        style={{ animationDelay: "-4s" }}
      ></div>

      {/* 5. Subtle center/helper soft warm radial wash */}
      <div 
        className="pointer-events-none fixed top-[25%] left-[20%] w-[500px] h-[500px] bg-sky-50/15 rounded-full blur-[110px] animate-float-slow"
      ></div>
      <div 
        className="pointer-events-none fixed bottom-[25%] right-[20%] w-[500px] h-[500px] bg-blue-50/10 rounded-full blur-[110px] animate-float-reverse"
      ></div>

      {/* 5. Custom Floating Particles and Code Accents */}
      {particles.map((p) => {
        if (p.symbol) {
          return (
            <span
              key={p.id}
              className="particle flex items-center justify-center font-mono font-black"
              style={{
                left: p.left,
                fontSize: p.size === "text-lg" ? "14px" : p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
                opacity: p.opacity,
              }}
            >
              {p.symbol}
            </span>
          );
        }

        return (
          <div
            key={p.id}
            className={`particle ${p.color} blur-[1.5px]`}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
};
