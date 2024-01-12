import styled from 'styled-components';

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StHeaderWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const StImage = styled.div`
  width: 1440px;
  height: 600px;
  border-radius: 20px;
  background: url(<path-to-image>), lightgray 0px -37.581px / 100% 125.333% no-repeat;
`;

const StInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0;
`;

const StGameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StTitle = styled.h1`
  color: #fff;
  font-family: Pretendard;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  gap: 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.color.primary};
  & p {
    color: #fff;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const StButton = styled.button`
  width: 224px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #2d4fa6;
  backdrop-filter: blur(7.5px);
`;

export {
  StContainer,
  StHeaderWrapper,
  StHeader,
  StImage,
  StTitle,
  StTagWrapper,
  StTag,
  StGameInfo,
  StButton,
  StInfoWrapper
};
