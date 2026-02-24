import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { SponsorCard } from '@/types/SponsorCard';
import { AnimalTag, OtherTag } from '@/types/Tags';

const baseSponsors: Omit<SponsorCard, 'id' | 'image' | 'directUseImage'>[] = [
  {
    name: 'Prehistoric Zoologist',
    strength: 4,
    requirements: [],
    tags: [AnimalTag.Prehistoric],
    effects: [
      {
        effectType: EffectType.PASSIVE,
        effectDesc: 'prehistoric.sponsors.31_desc1',
      },
      {
        effectType: EffectType.IMMEDIATE,
        effectDesc: 'prehistoric.sponsors.31_desc2',
      },
    ],
    source: CardSource.FAN_MADE,
  },
  {
    name: 'Monsters Inc',
    strength: 4,
    requirements: [],
    tags: [OtherTag.Science],
    effects: [
      {
        effectType: EffectType.PASSIVE,
        effectDesc: 'prehistoric.sponsors.32_desc1',
      },
      {
        effectType: EffectType.IMMEDIATE,
        effectDesc: 'prehistoric.sponsors.32_desc2',
      },
    ],
    source: CardSource.FAN_MADE,
  },
  {
    name: 'Maiasaura Sanctuary',
    strength: 3,
    requirements: [OtherTag.Reputation_3],
    tags: [AnimalTag.Prehistoric],
    effects: [
      {
        effectType: EffectType.PASSIVE,
        effectDesc: 'prehistoric.sponsors.33_desc1',
      },
      {
        effectType: EffectType.IMMEDIATE,
        effectDesc: 'prehistoric.sponsors.33_desc2',
      },
    ],
    source: CardSource.FAN_MADE,
  },
  {
    name: 'Velociraptor Training Room',
    strength: 5,
    requirements: [OtherTag.Appeal],
    tags: [AnimalTag.Prehistoric],
    effects: [
      {
        effectType: EffectType.IMMEDIATE,
        effectDesc: 'prehistoric.sponsors.34_desc1',
      },
      {
        effectType: EffectType.ENDGAME,
        effectDesc: 'prehistoric.sponsors.34_desc2',
      },
    ],
    source: CardSource.FAN_MADE,
  },
  {
    name: 'Global Paleontology Museum',
    strength: 3,
    requirements: [OtherTag.Science],
    tags: [OtherTag.Science],
    effects: [
      {
        effectType: EffectType.IMMEDIATE,
        effectDesc: 'prehistoric.sponsors.35_desc1',
      },
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.35_desc2',
      },
    ],
    source: CardSource.FAN_MADE,
  },
  {
    name: 'Jurassic Park',
    strength: 6,
    requirements: [OtherTag.SponsorsII, OtherTag.Reputation_3],
    tags: [AnimalTag.Prehistoric, AnimalTag.Prehistoric],
    effects: [
      {
        effectType: EffectType.PASSIVE,
        effectDesc: 'prehistoric.sponsors.36_desc1',
        fontSize: 'sm',
      },
      {
        effectType: EffectType.IMMEDIATE,
        effectDesc: 'prehistoric.sponsors.36_desc2',
        fontSize: 'sm',
      },
      {
        effectType: EffectType.ENDGAME,
        effectDesc: 'prehistoric.sponsors.36_desc3',
        fontSize: 'sm',
      },
    ],
    source: CardSource.FAN_MADE,
  },
];

export const PrehistoricSponsorsData: SponsorCard[] = baseSponsors.map(
  (sponsor, index) => {
    const originalId = String(831 + index);
    return {
      ...sponsor,
      id: originalId,
      image: `/img/prehistoric/${32 + index}.webp`,
      directUseImage: false,
    };
  },
);
