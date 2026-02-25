import dynamic from 'next/dynamic';

export const ClientRating = dynamic(
  () => import('react-simple-star-rating').then((mod) => mod.Rating),
  { ssr: false },
);
