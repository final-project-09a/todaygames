import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const HeaderTitleSkeleton = () => {
  return (
    <StWrapper>
      <ContentLoader
        speed={1} // 속도
        width={1440}
        height={792}
        viewBox="0 0 1440 792"
        backgroundColor="#363636"
        foregroundColor="#232323"
      >
        <rect x="0" y="0" rx="10" ry="10" width="1440" height="600" />
        <rect x="0" y="640" rx="10" ry="10" width="250" height="41" />
        <rect x="0" y="695" rx="10" ry="10" width="90" height="41" />
        <rect x="96" y="695" rx="10" ry="10" width="130" height="41" />
        <rect x="232" y="695" rx="10" ry="10" width="85" height="41" />
        <rect x="1216" y="663" rx="10" ry="10" width="224" height="50" />
      </ContentLoader>
    </StWrapper>
  );
};

export default HeaderTitleSkeleton;

const StWrapper = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
