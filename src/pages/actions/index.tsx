import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ActionCardList } from '@/components/cards/action_cards/ActionCardList';

type Props = {};

export default function ActionsPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return <ActionCardList />;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
