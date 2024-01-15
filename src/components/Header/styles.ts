import styled from 'styled-components';

const StContainer = styled.div`
  display: inline-flex;
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

const StFigure = styled.figure<{ imageUrl: string }>`
  width: 100%;
  height: 600px;
  border-radius: 20px;
  background: url(${(props) => props.imageUrl}), lightgray 0px -37.581px / 100% 125.333% no-repeat;
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
  gap: 6px;
`;

const StTag = styled.div`
  display: flex;
  padding: 11px 29px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => props.theme.color.secondary};
  & p {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 500;
  }
`;

const StButton = styled.button`
  width: 224px;
  height: 50px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.primary};
  backdrop-filter: blur(7.5px);
  color: ${(props) => props.theme.color.white};
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  &:hover {
    background: ${(props) => props.theme.color.white};
    color: ${(props) => props.theme.color.gray};
    transition: background 0.3s ease;
    cursor: pointer;
  }
`;

export { StContainer, StHeader, StFigure, StTitle, StTagWrapper, StTag, StGameInfo, StButton, StInfoWrapper };
