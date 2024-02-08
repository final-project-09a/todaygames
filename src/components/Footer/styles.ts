import styled from 'styled-components';

const StWrappingAll = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: center;
justify-content: center;
`

const StWrapMainIcon = styled.div`
align-items: center;
display: flex;
flex-direction: row;
`

const StMainIcon = styled.img`
margin-bottom: 10px;
display: flex;
width: fit-content;
height: fit-content;
`

const StFooterContainer = styled.div`
width: 100%;
height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const StTeamMembers = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
width: 500px;
height: 300px;
`

const StTeamMember = styled.a`
align-items: center;
width: 60px;
height: 60px;
background-color: transparent;
border: 0px;
cursor: pointer;
`

const StGitHubIcon = styled.img`
align-items: center;
width: 60px;
height: 60px;
background-color: transparent;

`

const StMemberName = styled.div`
width: 60px;
height: fit-content;
display: flex;
flex-direction: row;
font-size: 15px;
text-align: center;
align-items: center;
color: white;
text-align: center;
justify-content: center;
`

const StMemberNames = styled.div`
align-items: center;

justify-content: space-evenly;
width: 500px;
height: fit-content;
display: flex;
flex-direction: row;
`

const StReserved = styled.div`
display: flex;
width: fit-content;
height: fit-content;
margin: 30px 0px 20px 0px;
`

export { StFooterContainer, StTeamMembers,StTeamMember, StMemberName, StMemberNames, StReserved, StGitHubIcon, StWrapMainIcon, StMainIcon, StWrappingAll };
