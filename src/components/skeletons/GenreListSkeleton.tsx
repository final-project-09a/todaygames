import { StContainer } from 'components/homepage/SelectedGenreCard';
import ContentLoader from 'react-content-loader';

const GenreListSkeleton = () => {
  return (
    <StContainer>
      <ContentLoader
        speed={2}
        width={300}
        height={340}
        viewBox="0 0 300 340"
        backgroundColor="#363636"
        foregroundColor="#232323"
      >
        <rect x="0" y="0" rx="10" ry="10" width="300" height="200" />
        <rect x="20" y="220" rx="10" ry="10" width="100" height="21" />
        <rect x="20" y="250" rx="10" ry="10" width="340" height="17" />
      </ContentLoader>
    </StContainer>
  );
};

export default GenreListSkeleton;
