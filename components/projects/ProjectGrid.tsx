import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import ProjectCard, { Project } from './ProjectCard';
import AddProjectCard from './AddProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onAddProject: () => void;
  showAddCard?: boolean;
}

export default function ProjectGrid({ 
  projects, 
  onProjectClick, 
  onAddProject,
  showAddCard = true 
}: ProjectGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {/* Add New Project Card */}
      {showAddCard && (
        <AddProjectCard onClick={onAddProject} />
      )}
      
      {/* Project Cards */}
      <AnimatePresence>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onProjectClick}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}