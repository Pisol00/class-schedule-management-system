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
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-20 w-60 h-60 bg-blue-600 rounded-full opacity-[0.06] blur-sm"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-40 right-32 w-44 h-44 bg-blue-800 rounded-full opacity-[0.06] blur-sm"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-32 left-40 w-32 h-32 bg-blue-400 rounded-full opacity-[0.06] blur-sm"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-24 h-24 bg-blue-700 rounded-full opacity-[0.06] blur-sm"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 3 }}
      />
      
      {/* Geometric Shapes */}
      <motion.div 
        className="absolute top-16 right-16 w-12 h-12 bg-blue-600 opacity-[0.03] transform rotate-45"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-16 left-16 w-10 h-10 bg-blue-800 opacity-[0.03]"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/2 left-8 w-12 h-12 bg-blue-600 opacity-[0.03] transform rotate-45"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/3 right-8 w-10 h-10 bg-blue-800 opacity-[0.03]"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}