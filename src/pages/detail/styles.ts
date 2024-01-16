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
  padding: 40px 30px;
  border-radius: 20px;
  margin-top: 30px;
  background: ${(props) => props.theme.color.postback};
  & h2 {
    color: ${(props) => props.theme.color.white};
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  & p {
    color: #ccc;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  & section {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  & label {
    color: #ccc;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  & div {
    display: flex;
    margin-top: 50px;
    gap: 50px;
  }
`;

export { StContainer, StInfoBox };
