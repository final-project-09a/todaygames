import ContentLoader from 'react-content-loader';

const RecommendCardSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={275}
      height={200}
      viewBox="0 0 275 200"
      backgroundColor="#363636"
      foregroundColor="#232323"
    >
      <rect x="0" y="0" rx="10" ry="10" width="275" height="200" />
    </ContentLoader>
  );
};

export default RecommendCardSkeleton;
