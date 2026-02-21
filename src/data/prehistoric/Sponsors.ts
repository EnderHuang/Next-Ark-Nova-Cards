import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { SponsorCard } from '@/types/SponsorCard';
import { addPrehistoricPrefix } from './utils';

const originalIds = [32, 33, 34, 35, 36, 37];

const baseSponsors: Omit<SponsorCard, 'id' | 'image' | 'directUseImage'>[] = [
  {
    name: '史前动物学家',
    strength: 5,
    rock: 0,
    water: 0,
    requirements: [],
    tags: [],
    effects: [
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.32_desc1',
      },
    ],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    source: CardSource.FAN_MADE,
  },
  {
    name: '怪兽电力公司',
    strength: 5,
    rock: 0,
    water: 0,
    requirements: [],
    tags: [],
    effects: [
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.33_desc1',
      },
    ],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    source: CardSource.FAN_MADE,
  },
  {
    name: '慈母龙特区',
    strength: 5,
    rock: 0,
    water: 0,
    requirements: [],
    tags: [],
    effects: [
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.34_desc1',
      },
    ],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    source: CardSource.FAN_MADE,
  },
  {
    name: '迅猛龙培训室',
    strength: 5,
    rock: 0,
    water: 0,
    requirements: [],
    tags: [],
    effects: [
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.35_desc1',
      },
    ],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    source: CardSource.FAN_MADE,
  },
  {
    name: '环球古生物博物馆',
    strength: 5,
    rock: 0,
    water: 0,
    requirements: [],
    tags: [],
    effects: [
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.36_desc1',
      },
    ],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    source: CardSource.FAN_MADE,
  },
  {
    name: '侏罗纪公园',
    strength: 5,
    rock: 0,
    water: 0,
    requirements: [],
    tags: [],
    effects: [
      {
        effectType: EffectType.INCOME,
        effectDesc: 'prehistoric.sponsors.37_desc1',
      },
    ],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    source: CardSource.FAN_MADE,
  },
];

export const PrehistoricSponsorsData: SponsorCard[] = baseSponsors.map(
  (sponsor, index) => {
    const originalId = String(originalIds[index]);
    return {
      ...sponsor,
      id: addPrehistoricPrefix(originalId),
      image: `/img/prehistoric/${originalId}${sponsor.name}.jpg`,
      directUseImage: true,
    };
  },
);
