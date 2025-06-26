import { motion } from 'framer-motion';

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-20 left-20 w-60 h-60 rounded-full opacity-40 blur-2xl"
        style={{
          background: 'radial-gradient(circle at center, #60a5fa, transparent 70%)'
        }}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-40 right-32 w-44 h-44 rounded-full opacity-40 blur-2xl"
        style={{
          background: 'radial-gradient(circle at center, #1e40af, transparent 70%)'
        }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-32 left-40 w-32 h-32 rounded-full opacity-40 blur-2xl"
        style={{
          background: 'radial-gradient(circle at center, #93c5fd, transparent 70%)'
        }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-40 blur-2xl"
        style={{
          background: 'radial-gradient(circle at center, #2563eb, transparent 70%)'
        }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 3 }}
      />

      {/* Geometric Shapes (optional) */}
      {/* สามารถลบทิ้งหรือเปลี่ยนให้เป็น gradients ได้ด้วยเช่นกัน */}
    </div>
  );
}
