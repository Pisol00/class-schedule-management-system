import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedBackground() {
  const [dots, setDots] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate dots after component mounts to avoid hydration issues
    const generatedDots = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setDots(generatedDots);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0">
        <svg 
          className="w-full h-full opacity-[0.08]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="grid" 
              width="60" 
              height="60" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke="#1e40af" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Enhanced Grid with Animation */}
      <motion.div className="absolute inset-0">
        <svg 
          className="w-full h-full opacity-[0.06]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="animatedGrid" 
              width="120" 
              height="120" 
              patternUnits="userSpaceOnUse"
            >
              <motion.path 
                d="M 120 0 L 0 0 0 120" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="0.8"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  strokeWidth: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#animatedGrid)" />
        </svg>
      </motion.div>

      {/* Floating Minimal Dots */}
      <div className="absolute inset-0">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-blue-400/60"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Geometric Lines */}
      <div className="absolute inset-0">
        {/* Horizontal Line */}
        <motion.div
          className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
          style={{ top: '25%' }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Vertical Line */}
        <motion.div
          className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
          style={{ left: '75%' }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Focus Rings */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-32 h-32 rounded-full border border-blue-300/25"
          style={{
            left: '20%',
            top: '60%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        <motion.div
          className="absolute w-24 h-24 rounded-full border border-blue-400/30"
          style={{
            right: '25%',
            top: '30%',
            transform: 'translate(50%, -50%)',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2,
          }}
        />
      </div>

      {/* Subtle Noise Texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3Ccircle cx='17' cy='37' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Minimal Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-slate-50/25"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}