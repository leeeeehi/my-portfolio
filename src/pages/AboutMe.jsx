import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProfileCard from '../components/about/ProfileCard.jsx';
import AboutTabs from '../components/about/AboutTabs.jsx';
import SkillsSection from '../components/about/SkillsSection.jsx';
import usePortfolio from '../hooks/usePortfolio.js';

/**
 * AboutMe 페이지
 * 상단 기본 정보 카드, 탭 형태의 콘텐츠 섹션, 스킬 섹션으로 구성된 자기소개 페이지입니다.
 * 여기서 수정한 내용은 PortfolioContext 를 통해 Home 탭에 바로 반영됩니다.
 * (수정 UI 는 isEditable 일 때, 즉 개발 서버에서만 보입니다.)
 */
function AboutMe() {
  const { aboutMeData, isEditable, updateSectionContent } = usePortfolio();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            mb: { xs: 3, md: 5 },
          }}
        >
          About Me
        </Typography>
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <ProfileCard basicInfo={aboutMeData.basicInfo} />
        </Box>
        <AboutTabs sections={aboutMeData.sections} onContentChange={isEditable ? updateSectionContent : undefined} />
        <Box
          sx={{
            borderTop: '2px solid var(--color-border)',
            mt: { xs: 4, md: 7 },
            pt: { xs: 4, md: 7 },
          }}
        >
          <SkillsSection />
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMe;
