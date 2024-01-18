import styled from 'styled-components';

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 792px;
  gap: 60px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  height: 100%;
`;

const StFigure = styled.figure<{ $imageUrl: string }>`
  width: 100%;
  height: 600px;
  border-radius: 20px;
  margin-top: 50px;
  background: url(${(props) => props.$imageUrl}), gray 0px -37.581px / 100% 125.333% no-repeat;
`;

const StInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 50px;
`;

const StGameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 34px;
  font-weight: 700;
`;

const StTagWrapper = styled.div`
  display: flex;
  gap: 7px;
`;

export { StContainer, StHeader, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper };
