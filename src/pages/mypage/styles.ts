import styled from 'styled-components';

const StUserinfoBOx = styled.button`
  border: '1px solid black';
  border-radius: '10px';
  padding: '10px';
  margin: '10px';
  background-color: ${(props) => props.theme.color.primary};
  color: 'black';
`;

export { StUserinfoBOx };
