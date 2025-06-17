// Types และ Interfaces สำหรับระบบหลักสูตร

export interface Subject {
  id: string;
  code: string;
  nameEn: string;
  nameTh: string;
  credits: number;
  type: 'core' | 'major' | 'elective' | 'general';
  semester: number;
  year: number;
  prerequisites?: string[];
  description: string;
  status: 'active' | 'inactive';
  practicalHours: number;
  theoryHours: number;
}

export interface Curriculum {
  id: string;
  title: string;
  year: string;
  description: string;
  englishTitle: string;
  totalCredits: number;
  practicalHours: number;
  theoryHours: number;
  status: 'active' | 'inactive' | 'pending' | 'draft';
  department: string;
  degree: string;
  lastUpdated: string;
  createdAt: string;
  updatedBy: string;
  subjects: Subject[];
  version: string;
  approvalDate?: string;
  effectiveDate: string;
  statistics: {
    coreSubjects: number;
    majorSubjects: number;
    electiveSubjects: number;
    generalSubjects: number;
    totalSubjects: number;
  };
}

export interface CurriculumFormData {
  title: string;
  year: string;
  description: string;
  englishTitle: string;
  department: string;
  degree: string;
  effectiveDate: string;
  version: string;
  status: 'active' | 'inactive' | 'pending' | 'draft';
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export interface CurriculumStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
  draft: number;
}

export interface FilterOptions {
  searchTerm: string;
  currentFilter: string;
  sortBy: 'name' | 'date' | 'status' | 'credits';
  sortOrder: 'asc' | 'desc';
  itemsPerPage: number;
  currentPage: number;
}