import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className='gutter-row'
    speed={2}
    width={240}
    height={547}
    viewBox='0 0 240 547'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='0' y='0' rx='8' ry='8' width='220' height='360' />
    <rect x='2' y='383' rx='0' ry='0' width='190' height='25' />
    <rect x='3' y='418' rx='0' ry='0' width='190' height='94' />
  </ContentLoader>
);

export default Skeleton;
