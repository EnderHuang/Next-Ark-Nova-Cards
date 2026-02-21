import { useContext } from 'react';

import { getProjectsData, ProjectDataContext } from './ProjectDataContext';

export function useProjectData(includeFanMade = false) {
  const contextData = useContext(ProjectDataContext);
  if (includeFanMade) {
    return getProjectsData(true);
  }
  return contextData;
}
