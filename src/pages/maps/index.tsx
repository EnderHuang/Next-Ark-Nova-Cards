import { HelpCircle, Sparkles } from 'lucide-react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import TextButton from '@/components/buttons/TextButton';
import { Comments } from '@/components/comments/Comments';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { AlternativeMapBoards } from '@/data/AlternativeMapBoards';
import { MapBoards } from '@/data/MapBoards';

import { MapBoard } from '@/types/MapBoard';

type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [alternativeMaps, setAlternativeMaps] = useState(false);
  const maps = alternativeMaps ? AlternativeMapBoards : MapBoards;
  const queryMapBoard = getMapFromQuery();
  const [selectedMap, setSelectedMap] = useState<MapBoard>(queryMapBoard);
  function handleSelectMap(map: MapBoard) {
    setSelectedMap(map);
    router.push('/maps/?map=' + map.id, undefined, { shallow: true });
  }

  const handlePeopleSponsorLink = () => {
    router.push('/people-sponsors', undefined, { shallow: true });
  };

  useEffect(() => {
    const map = getMapFromQuery();
    setSelectedMap(map || maps[0]);
  }, [router?.query?.map, alternativeMaps]);

  function getMapFromQuery(): MapBoard {
    const id = router.query.map ? router.query.map : maps[0].id;
    const map = maps.find((map) => map.id === id);
    return map || maps[0];
  }

  function handleMapChange() {
    setAlternativeMaps(!alternativeMaps);
  }
  return (
    <Layout>
      <Seo templateTitle='Ark Nova Maps & Alternatives' />

      <div className='flex flex-col gap-5 px-3 py-3 md:px-5'>
        <Alert className='bg-lime-500/40'>
          <Sparkles className='h-4 w-4' />
          <AlertTitle>{t('maps.alternative_title')}</AlertTitle>
          <AlertDescription>
            <div className='flex items-start justify-between gap-4'>
              <div className='max-w-2xl'>
                <Trans i18nKey='maps.alternative_desc'>
                  Check the
                  <Link
                    className='font-medium text-primary underline underline-offset-4'
                    href='https://github.com/Ender-Wiggin2019/Next-Ark-Nova-Cards/tree/main#help-to-translate'
                  >
                    post
                  </Link>
                  for more information. You can now switch between the original
                  and alternative maps.
                </Trans>
              </div>
              <Switch
                checked={alternativeMaps}
                onCheckedChange={handleMapChange}
              />
            </div>
          </AlertDescription>
        </Alert>

        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4'>
          {maps.map((mapBoard) => (
            <TextButton
              key={mapBoard.name}
              selected={selectedMap === mapBoard}
              className='h-12 w-full text-xs hover:text-primary-600 sm:text-sm'
              selectClassName='text-primary-600 ring-primary/70 ring-2'
              onClick={() => handleSelectMap(mapBoard)}
            >
              {t(mapBoard.name)}
            </TextButton>
          ))}
        </div>
        <div className='flex w-full flex-col gap-3 rounded-lg bg-card/80 p-4 shadow-lg backdrop-blur-sm lg:p-5'>
          <Image
            alt={selectedMap.name}
            priority={true}
            src={`/img/maps/${selectedMap.image}.jpg`}
            className='w-full rounded-md object-contain shadow-md'
            quality={85}
            width={1000}
            height={1000}
          />
          <h1 className='text-2xl font-extrabold tracking-tight text-primary-700 dark:text-primary-400 lg:text-3xl'>
            {t(selectedMap.name)}
          </h1>
          {selectedMap.description.length > 0 && (
            <p className='leading-7 text-foreground/80'>
              {t(selectedMap.description[0])}
            </p>
          )}
          {selectedMap.description.length > 1 && (
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>{t('maps.tips')}</AccordionTrigger>
                <AccordionContent>
                  <ul className='my-4 ml-6 list-disc space-y-1'>
                    {selectedMap.description
                      .slice(1)
                      .map((description, index) => (
                        <li key={index}>{t(description)}</li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {selectedMap.id === 'm14' && (
            <button
              className='flex items-center gap-1.5 text-sm text-primary-700 transition-colors hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300'
              onClick={handlePeopleSponsorLink}
            >
              <HelpCircle className='h-5 w-5' />
              <span>{t('which-people-sponsors')}</span>
            </button>
          )}
        </div>
        <Comments cardId={selectedMap.id} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
