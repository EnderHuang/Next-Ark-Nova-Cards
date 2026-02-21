import { createContext } from 'react';

import { ProjectsData } from '@/data/Projects';
import { PrehistoricProjectsData } from '@/data/prehistoric/Projects';
import { ProjectCard } from '@/types/ProjectCard';

export const getProjectsData = (includeFanMade: boolean): ProjectCard[] => {
  if (includeFanMade) {
    return [...ProjectsData, ...PrehistoricProjectsData];
  }
  return ProjectsData;
};

export const ProjectDataContext = createContext(ProjectsData);
