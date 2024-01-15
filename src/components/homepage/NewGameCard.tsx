import styled from 'styled-components';

interface NewGameCardProps {
  $imageUrl: string;
}

function NewGameCard({ $imageUrl }: NewGameCardProps) {
  return (
    <StCardWrapper>
      <StImageWrapper>
        <StImage $imageUrl={$imageUrl} />
      </StImageWrapper>
    </StCardWrapper>
  );
}

export default NewGameCard;

const StCardWrapper = styled.div`
  width: 710px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 20px;
  overflow: hidden;
`;

const StImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.$imageUrl}) center/cover no-repeat;
  background-position: top;
  transition: transform 0.3s ease;
  ${StCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;
