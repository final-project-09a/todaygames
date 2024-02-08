import {
  StFooterContainer,
  StTeamMembers,
  StTeamMember,
  StMemberName,
  StMemberNames,
  StReserved,
  StGitHubIcon,
  StWrapMainIcon,
  StMainIcon,
  StWrappingAll
} from './styles';
import githubIcon from '../../assets/img/githubIcon.png';
import logo3 from 'assets/logo/logo3.png';

const members = ['안준표', '권보라', '이재환', '윤성현'];

const Footer = () => {
  const jpLink = 'https://github.com/dkswn';
  const brLink = 'https://github.com/surely07';
  const jwLink = 'https://github.com/pompomko';
  const shLink = 'https://github.com/Dello96';
  return (
    <StWrappingAll>
      <StWrapMainIcon>
        <StMainIcon src={logo3} />
        <StFooterContainer>
          <StTeamMembers>
            <StTeamMember href={jpLink}>
              <StGitHubIcon src={githubIcon} />
            </StTeamMember>
            <StTeamMember href={brLink}>
              <StGitHubIcon src={githubIcon} />
            </StTeamMember>
            <StTeamMember href={jwLink}>
              <StGitHubIcon src={githubIcon} />
            </StTeamMember>
            <StTeamMember href={shLink}>
              <StGitHubIcon src={githubIcon} />
            </StTeamMember>
          </StTeamMembers>
          <StMemberNames>
            {members.map((member) => (
              <>
                <StMemberName>{member}</StMemberName>
              </>
            ))}
          </StMemberNames>
          <StReserved>© TEAM 구사일생 Corp. All rights reserved.</StReserved>
        </StFooterContainer>
      </StWrapMainIcon>
    </StWrappingAll>
  );
};

export default Footer;
