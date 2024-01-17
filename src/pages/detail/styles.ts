import styled from 'styled-components';

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-direction: column; */
  width: 1440px;
  margin: 50px auto;
`;

const StInfoBox = styled.div`
  width: 1440px;
  height: fit-content;
  padding: 50px 40px;
  border-radius: 20px;
  margin-top: 30px;
  background: ${(props) => props.theme.color.postback};
  display: flex;
  flex-direction: column;
  & h2 {
    color: ${(props) => props.theme.color.white};
    font-size: 20px;
    font-weight: 700;
  }
  & p {
    color: #ccc;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-top: 20px;
  }
  & h4 {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  & section {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    gap: 12px;
  }
  & label {
    color: #ccc;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  & div {
    display: flex;
    gap: 50px;
  }
`;

export { StContainer, StInfoBox };
