import React from 'react';
import ContentLoader from 'react-content-loader';

const GenreListSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={220}
      height={300}
      viewBox="0 0 220 300"
      backgroundColor="#363636"
      foregroundColor="#232323"
    >
      <rect x="0" y="0" rx="10" ry="10" width="220" height="200" />
      <rect x="20" y="220" rx="10" ry="10" width="100" height="21" />
      <rect x="20" y="280" rx="10" ry="10" width="340" height="17" />
    </ContentLoader>
  );
};

export default GenreListSkeleton;
