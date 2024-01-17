import MoreViewButton from 'common/MoreViewButton';
import { DataContext } from 'pages/detail/Detail';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const GameDescription = () => {
  const data = useContext(DataContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <h2>게임설명</h2>
      {data && data.about_the_game !== undefined ? (
        <>
          <StDescriptionWrapper $isExpanded={isExpanded}>
            <p dangerouslySetInnerHTML={{ __html: data.detailed_description }} />
          </StDescriptionWrapper>
          <MoreViewButton onClick={toggleExpansion}>{isExpanded ? '줄이기 ▲' : '더 알아보기 ▼'}</MoreViewButton>
        </>
      ) : null}
    </>
  );
};

export default GameDescription;

const StDescriptionWrapper = styled.div<{ $isExpanded: boolean }>`
  overflow: hidden;
  & p {
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.$isExpanded ? 'unset' : '7')};
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
