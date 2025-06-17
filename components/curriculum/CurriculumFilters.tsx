import { motion } from 'framer-motion';
import { FilterOptions } from '@/types/curriculum';

interface CurriculumFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: 'name' | 'date' | 'status' | 'credits') => void;
  sortOrder: string;
  setSortOrder: (order: 'asc' | 'desc') => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  selectedCount: number;
  totalCount: number;
  onExport: () => void;
  onBulkDelete: () => void;
}

export default function CurriculumFilters({
  searchTerm,
  setSearchTerm,
  currentFilter,
  setCurrentFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  itemsPerPage,
  setItemsPerPage,
  selectedCount,
  totalCount,
  onExport,
  onBulkDelete
}: CurriculumFiltersProps) {
  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-');
    setSortBy(field as any);
    setSortOrder(order as any);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="ค้นหาหลักสูตร... (Ctrl+F)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <select
          value={currentFilter}
          onChange={(e) => setCurrentFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ทุกสถานะ">ทุกสถานะ</option>
          <option value="ใช้งาน">ใช้งาน</option>
          <option value="รออนุมัติ">รออนุมัติ</option>
          <option value="ไม่ใช้งาน">ไม่ใช้งาน</option>
          <option value="แบบร่าง">แบบร่าง</option>
        </select>

        {/* Sort */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="date-desc">วันที่ล่าสุด</option>
          <option value="date-asc">วันที่เก่าสุด</option>
          <option value="name-asc">ชื่อ A-Z</option>
          <option value="name-desc">ชื่อ Z-A</option>
          <option value="status-asc">สถานะ</option>
          <option value="credits-desc">หน่วยกิต (มาก-น้อย)</option>
        </select>

        {/* Items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={6}>6 ต่อหน้า</option>
          <option value={12}>12 ต่อหน้า</option>
          <option value={24}>24 ต่อหน้า</option>
          <option value={50}>50 ต่อหน้า</option>
        </select>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <>
            <motion.button
              onClick={onExport}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>ส่งออก ({selectedCount})</span>
            </motion.button>

            <motion.button
              onClick={onBulkDelete}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>ลบ ({selectedCount})</span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}