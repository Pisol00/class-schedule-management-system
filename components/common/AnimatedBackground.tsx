import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback } from 'react';

// Types
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  type: 'rectangle' | 'circle' | 'hexagon';
}

// Constants
const PARTICLE_COUNT = 4; // Reduced from 6
const FLOATING_ELEMENT_COUNT = 3; // Reduced from 4
const ANIMATION_CONFIG = {
  ease: "easeInOut" as const,
  repeat: Infinity,
};

// Utility functions
const generateParticles = (): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 2,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.3 + 0.2,
  }));

const generateFloatingElements = (): FloatingElement[] =>
  Array.from({ length: FLOATING_ELEMENT_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 70,
    duration: Math.random() * 20 + 25,
    delay: Math.random() * 10,
    rotation: Math.random() * 360,
    type: ['rectangle', 'circle', 'hexagon'][i % 3] as FloatingElement['type'],
  }));

// Particle Component
const AnimatedParticle = ({ particle }: { particle: Particle }) => (
  <motion.div
    className="absolute rounded-full will-change-transform"
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      background: 'var(--particle-gradient)',
      boxShadow: 'var(--particle-shadow)',
    }}
    animate={{
      x: [0, 30, -15, 0],
      y: [0, -25, 35, 0],
      opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
      scale: [0.8, 1.3, 0.8],
    }}
    transition={{
      duration: particle.duration,
      delay: particle.delay,
      ...ANIMATION_CONFIG,
    }}
  />
);

// Glass Element Component
const GlassElement = ({ element }: { element: FloatingElement }) => {
  const elementStyles = useMemo(() => {
    const baseStyle = {
      width: `${element.size}px`,
      height: element.type === 'rectangle' ? `${element.size * 0.7}px` : `${element.size * 0.8}px`,
    };

    switch (element.type) {
      case 'rectangle':
        return {
          ...baseStyle,
          background: 'var(--glass-white-gradient)',
          boxShadow: 'var(--glass-white-shadow)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        };
      case 'circle':
        return {
          ...baseStyle,
          background: 'var(--glass-blue-gradient)',
          boxShadow: 'var(--glass-blue-shadow)',
          borderRadius: '50%',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        };
      case 'hexagon':
        return {
          ...baseStyle,
          background: 'var(--glass-slate-gradient)',
          boxShadow: 'var(--glass-slate-shadow)',
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          border: '1px solid rgba(148, 163, 184, 0.3)',
        };
    }
  }, [element.size, element.type]);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
      }}
      animate={{
        y: [-12, 12, -12],
        x: [-8, 8, -8],
        rotate: [element.rotation, element.rotation + 180, element.rotation + 360],
        opacity: [0.15, 0.4, 0.15],
      }}
      transition={{
        duration: element.duration,
        delay: element.delay,
        ...ANIMATION_CONFIG,
      }}
    >
      <div 
        className="backdrop-blur-md will-change-transform"
        style={elementStyles}
      />
    </motion.div>
  );
};

// Light Beam Component
const LightBeam = ({ 
  direction, 
  position, 
  delay = 0 
}: { 
  direction: 'vertical' | 'horizontal';
  position: string;
  delay?: number;
}) => {
  const isVertical = direction === 'vertical';
  
  return (
    <motion.div
      className={`absolute opacity-15 will-change-transform ${
        isVertical ? 'w-px h-80' : 'h-px w-72'
      }`}
      style={{
        [isVertical ? 'left' : 'top']: position,
        [isVertical ? 'top' : 'right']: 0,
        background: 'var(--light-beam-gradient)',
        boxShadow: 'var(--light-beam-shadow)',
      }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        [isVertical ? 'scaleY' : 'scaleX']: [0.7, 1.3, 0.7],
      }}
      transition={{
        duration: isVertical ? 28 : 35,
        delay,
        ...ANIMATION_CONFIG,
      }}
    />
  );
};

// Premium Orb Component
const PremiumOrb = ({ 
  index, 
  position 
}: { 
  index: number;
  position: { left: string; top: string };
}) => (
  <motion.div
    className="absolute rounded-full backdrop-blur-sm will-change-transform"
    style={{
      width: '240px',
      height: '240px',
      ...position,
      background: index === 0 ? 'var(--orb-primary-gradient)' : 'var(--orb-secondary-gradient)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: index === 0 ? 'var(--orb-primary-shadow)' : 'var(--orb-secondary-shadow)',
    }}
    animate={{
      scale: [0.85, 1.15, 0.85],
      opacity: [0.4, 0.7, 0.4],
      x: [0, 12, 0],
      y: [0, -8, 0],
    }}
    transition={{
      duration: 22 + index * 4,
      delay: index * 6,
      ...ANIMATION_CONFIG,
    }}
  />
);

// Main Component
export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  // Memoized data generation
  const initializeElements = useCallback(() => {
    setParticles(generateParticles());
    setFloatingElements(generateFloatingElements());
  }, []);

  useEffect(() => {
    initializeElements();
  }, [initializeElements]);

  // Memoized orb positions
  const orbPositions = useMemo(() => [
    { left: '8%', top: '15%' },
    { left: '72%', top: '55%' }
  ], []);

  return (
    <>
      {/* CSS Variables for better performance */}
      <style jsx>{`
        :root {
          --particle-gradient: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 197, 253, 0.3) 50%, transparent 100%);
          --particle-shadow: 0 0 25px rgba(59, 130, 246, 0.2);
          
          --glass-white-gradient: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%);
          --glass-white-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 8px 32px rgba(59, 130, 246, 0.1), 0 1px 0 rgba(255, 255, 255, 0.8);
          
          --glass-blue-gradient: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%);
          --glass-blue-shadow: inset 0 1px 0 rgba(147, 197, 253, 0.4), 0 8px 32px rgba(59, 130, 246, 0.08), 0 1px 0 rgba(219, 234, 254, 0.6);
          
          --glass-slate-gradient: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.2) 100%);
          --glass-slate-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 6px 24px rgba(148, 163, 184, 0.1), 0 1px 0 rgba(241, 245, 249, 0.9);
          
          --light-beam-gradient: linear-gradient(to bottom, rgba(59, 130, 246, 0.6) 0%, rgba(147, 197, 253, 0.3) 50%, transparent 100%);
          --light-beam-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
          
          --orb-primary-gradient: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(147, 197, 253, 0.03) 40%, transparent 80%);
          --orb-primary-shadow: inset 0 1px 0 rgba(147, 197, 253, 0.2), 0 16px 64px rgba(59, 130, 246, 0.06);
          
          --orb-secondary-gradient: radial-gradient(circle, rgba(147, 197, 253, 0.05) 0%, rgba(219, 234, 254, 0.02) 40%, transparent 80%);
          --orb-secondary-shadow: inset 0 1px 0 rgba(219, 234, 254, 0.25), 0 16px 64px rgba(147, 197, 253, 0.04);
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Optimized Background Gradient */}
        <motion.div 
          className="absolute inset-0 will-change-auto"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(239, 246, 255, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(219, 234, 254, 0.6) 0%, transparent 50%),
              linear-gradient(135deg, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(248, 250, 252, 0.95) 50%, 
                rgba(255, 255, 255, 1) 100%
              )
            `,
          }}
          animate={{
            opacity: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 30,
            ...ANIMATION_CONFIG,
          }}
        />

        {/* Simplified Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <motion.div
            className="w-full h-full will-change-auto"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '140px 140px',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20,
              ...ANIMATION_CONFIG,
            }}
          />
        </div>

        {/* Optimized Particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <AnimatedParticle key={particle.id} particle={particle} />
          ))}
        </div>

        {/* Optimized Glass Elements */}
        <div className="absolute inset-0">
          {floatingElements.map((element) => (
            <GlassElement key={element.id} element={element} />
          ))}
        </div>

        {/* Simplified Light Beams */}
        <div className="absolute inset-0">
          <LightBeam direction="vertical" position="33.33%" delay={3} />
          <LightBeam direction="horizontal" position="40%" delay={10} />
        </div>

        {/* Optimized Curved Paths */}
        <motion.div
          className="absolute inset-0 opacity-8 will-change-auto"
          animate={{
            opacity: [0.04, 0.12, 0.04],
          }}
          transition={{
            duration: 40,
            ...ANIMATION_CONFIG,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,15 Q50,5 100,15"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="0.4"
              animate={{
                d: ["M0,15 Q50,5 100,15", "M0,20 Q50,8 100,20", "M0,15 Q50,5 100,15"]
              }}
              transition={{
                duration: 45,
                ...ANIMATION_CONFIG,
              }}
            />
          </svg>
        </motion.div>

        {/* Optimized Premium Orbs */}
        <div className="absolute inset-0">
          {orbPositions.map((position, index) => (
            <PremiumOrb 
              key={index} 
              index={index} 
              position={position} 
            />
          ))}
        </div>

        {/* Simplified Final Overlay */}
        <motion.div
          className="absolute inset-0 will-change-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.01) 100%)',
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 25,
            ...ANIMATION_CONFIG,
          }}
        />
      </div>
    </>
  );
}