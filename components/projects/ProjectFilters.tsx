import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dropdown, { DropdownHeader, DropdownSection, DropdownItem } from '../ui/Dropdown';

interface ProjectFiltersProps {
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
  projectCount: number;
  onReset: () => void;
  onQuickFilter: (term: string) => void;
}

interface FilterCount {
  [key: string]: number;
}

const defaultFilterCounts: FilterCount = {
  'ทั้งหมด': 5,
  'โครงการล่าสุด': 3,
  'กำลังดำเนินการ': 2,
  'เสร็จสิ้น': 2,
  'เก็บถาวร': 1
};

export default function ProjectFilters({
  currentFilter,
  setCurrentFilter,
  projectCount,
  onReset,
  onQuickFilter
}: ProjectFiltersProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filterCounts = defaultFilterCounts;

  const handleFilterSelect = (filter: string) => {
    setCurrentFilter(filter);
    setShowFilterDropdown(false);
  };

  return (
    <div className="flex items-center space-x-4 w-full md:w-auto">
      <span className="text-sm text-slate-500">{projectCount} โครงการ</span>
      
      <div className="flex items-center space-x-2">
        {/* Filter Dropdown */}
        <Dropdown
          isOpen={showFilterDropdown}
          onClose={() => setShowFilterDropdown(false)}
          align="right"
          width="w-72"
          trigger={
            <motion.button 
              className="flex items-center space-x-2 px-4 py-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors min-w-[140px]"
              onClick={(e) => {
                e.stopPropagation();
                setShowFilterDropdown(!showFilterDropdown);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium text-slate-700">{currentFilter}</span>
              <motion.svg 
                className="w-4 h-4 text-slate-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ rotate: showFilterDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </motion.svg>
            </motion.button>
          }
        >
          <DropdownHeader 
            title="กรองโครงการ" 
            subtitle="เลือกประเภทโครงการที่ต้องการดู" 
          />
          
          <DropdownSection title="ประเภทโครงการ">
            {Object.entries(filterCounts).slice(0, 2).map(([filter, count]) => (
              <DropdownItem
                key={filter}
                icon={
                  <div className={`w-2 h-2 rounded-full ${
                    filter === 'ทั้งหมด' ? 'bg-slate-400' : 'bg-blue-400'
                  }`} />
                }
                label={filter}
                badge={`${count} โครงการ`}
                onClick={() => handleFilterSelect(filter)}
              />
            ))}
          </DropdownSection>
          
          <DropdownSection title="สถานะ">
            {Object.entries(filterCounts).slice(2).map(([filter, count]) => (
              <DropdownItem
                key={filter}
                icon={
                  <div className={`w-2 h-2 rounded-full ${
                    filter === 'กำลังดำเนินการ' ? 'bg-green-400' : 
                    filter === 'เสร็จสิ้น' ? 'bg-blue-400' : 'bg-slate-400'
                  }`} />
                }
                label={filter}
                badge={
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    filter === 'กำลังดำเนินการ' ? 'bg-green-100 text-green-700' :
                    filter === 'เสร็จสิ้น' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {count} โครงการ
                  </span>
                }
                onClick={() => handleFilterSelect(filter)}
              />
            ))}
          </DropdownSection>
          
          {/* Quick Actions */}
          <div className="border-t border-slate-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {['ภาคปกติ', 'ภาคฤดูร้อน', '2567'].map((term) => (
                  <motion.button 
                    key={term}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded transition-colors"
                    onClick={() => {
                      onQuickFilter(term);
                      setShowFilterDropdown(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
              <motion.button 
                className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                onClick={() => {
                  onReset();
                  setShowFilterDropdown(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                รีเซ็ต
              </motion.button>
            </div>
          </div>
        </Dropdown>
        
        {/* Quick Reset Button */}
        <motion.button 
          className="p-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
          title="รีเซ็ตตัวกรอง"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}