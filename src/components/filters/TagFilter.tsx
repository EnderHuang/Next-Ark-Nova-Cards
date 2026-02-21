// TagFilter.tsx
import React, { useState } from 'react';

import TagButton from '@/components/buttons/TagButton';

import { AnimalTag, ContinentTag, otherCardTags, Tag } from '@/types/Tags';

type TagFilterProps = {
  onFilterChange: (tags: Tag[]) => void;
  reset: boolean;
  includeFanMade?: boolean;
};

const FAN_MADE_TAGS = [AnimalTag.Prehistoric];

export const TagFilter: React.FC<TagFilterProps> = ({
  onFilterChange,
  reset,
  includeFanMade = false,
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  React.useEffect(() => {
    if (reset) {
      setSelectedTags([]);
    }
  }, [reset]);

  React.useEffect(() => {
    onFilterChange(selectedTags);
  }, [selectedTags]);

  const animalTags = Object.values(AnimalTag).filter(
    (tag) => includeFanMade || !FAN_MADE_TAGS.includes(tag),
  );

  return (
    <>
      <div className='xl:grid-cols-auto grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8'>
        {animalTags.map((tag, index) => (
          <TagButton
            key={index}
            tag={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          />
        ))}
        {/*</div>*/}
        {/*  <div>*/}
        {/*<LogicButton logic={} selected={} />*/}
        {Object.values(ContinentTag).map((tag, index) => (
          <TagButton
            key={index}
            tag={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          />
        ))}

        {otherCardTags.map((tag, index) => (
          <TagButton
            key={index}
            tag={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          />
        ))}
      </div>
    </>
  );
};
