import { motion } from 'framer-motion';

interface GoogleLoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

// Loading Spinner Component (Simplified)
function LoadingSpinner() {
  return (
    <div className="flex space-x-1">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full"
          animate={{ 
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export default function GoogleLoginButton({ 
  onClick, 
  isLoading = false, 
  className = '' 
}: GoogleLoginButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className={`
        w-full flex items-center justify-center space-x-4 
        bg-white/80 backdrop-blur-sm 
        border border-white/60 hover:border-blue-400/60
        rounded-xl px-6 py-4 min-h-[56px] 
        text-base font-medium text-gray-700
        shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-blue-500/10
        transition-all duration-200 ease-out
        disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer
        ${className}
      `}
    >
      {/* Content */}
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="text-gray-700 font-medium">กำลังเข้าสู่ระบบ...</span>
          </>
        ) : (
          <>
            {/* Google Logo (Static) */}
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path 
                  fill="#4285F4" 
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path 
                  fill="#34A853" 
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path 
                  fill="#FBBC05" 
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path 
                  fill="#EA4335" 
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            
            {/* Text (Static) */}
            <span className="text-gray-700 font-medium text-lg select-none">
              เข้าสู่ระบบด้วย Google
            </span>
          </>
        )}
      </div>
    </button>
  );
}