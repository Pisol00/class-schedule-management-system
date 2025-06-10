import { motion } from 'framer-motion';

interface ProjectSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function ProjectSearch({ searchTerm, setSearchTerm }: ProjectSearchProps) {
  return (
    <motion.div 
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <input 
            id="search-input"
            type="text" 
            placeholder="ค้นหาตามภาคการศึกษา ปีการศึกษา หรือชื่อโครงการ..." 
            className="w-full pl-12 pr-16 py-3.5 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 bg-white text-base shadow-sm focus:shadow-md focus:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1 text-xs text-slate-400">
            <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs border">⌘K</kbd>
          </div>
        </div>
        
        {/* Quick Search Suggestions */}
        {searchTerm === '' && (
          <motion.div 
            className="mt-3 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-xs text-slate-500">ค้นหาด่วน:</span>
            {['2567', 'ภาคปกติ', 'ภาคฤดูร้อน'].map((term, index) => (
              <motion.button
                key={term}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded transition-colors"
                onClick={() => setSearchTerm(term)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {term}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}