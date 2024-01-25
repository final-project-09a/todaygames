import ContentLoader from 'react-content-loader';

const NewGameCardSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={710}
      height={300}
      viewBox="0 0 710 300"
      backgroundColor="#363636"
      foregroundColor="#232323"
    >
      <rect x="0" y="0" rx="10" ry="10" width="250" height="300" />
      <rect x="280" y="30" rx="10" ry="10" width="100" height="32" />
      <rect x="280" y="78" rx="10" ry="10" width="280" height="24" />
      <rect x="280" y="115" rx="8" ry="8" width="400" height="17" />
      <rect x="280" y="140" rx="8" ry="8" width="400" height="17" />
      <rect x="280" y="165" rx="8" ry="8" width="400" height="17" />
      <rect x="280" y="190" rx="8" ry="8" width="400" height="17" />
    </ContentLoader>
  );
};

export default NewGameCardSkeleton;
