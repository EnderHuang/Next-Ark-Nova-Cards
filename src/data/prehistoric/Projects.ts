import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { ProjectCard, ProjectCategory } from '@/types/ProjectCard';
import { OtherTag } from '@/types/Tags';
import { addPrehistoricPrefix } from './utils';

const originalIds = [29, 30, 31];

const baseProjects: Omit<ProjectCard, 'id' | 'image' | 'directUseImage'>[] = [
  {
    name: '史前保护',
    type: ProjectCategory.FAN_MADE,
    tag: OtherTag.ALL_ANIMALS,
    slots: [],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'prehistoric.project.desc_29',
    },
    source: CardSource.FAN_MADE,
  },
  {
    name: '史前成双',
    type: ProjectCategory.FAN_MADE,
    tag: OtherTag.ALL_ANIMALS,
    slots: [],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'prehistoric.project.desc_30',
    },
    source: CardSource.FAN_MADE,
  },
  {
    name: '史前合作',
    type: ProjectCategory.FAN_MADE,
    tag: OtherTag.ALL_ANIMALS,
    slots: [],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'prehistoric.project.desc_31',
    },
    source: CardSource.FAN_MADE,
  },
];

export const PrehistoricProjectsData: ProjectCard[] = baseProjects.map(
  (project, index) => {
    const originalId = String(originalIds[index]);
    return {
      ...project,
      id: addPrehistoricPrefix(originalId),
      image: `/img/prehistoric/${originalId}${project.name}.jpg`,
      directUseImage: true,
    };
  },
);
