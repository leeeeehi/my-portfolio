import Box from '@mui/material/Box';
import HeroSection from '../components/landing/HeroSection.jsx';
import AboutSection from '../components/landing/AboutSection.jsx';
import SkillTreeSection from '../components/landing/SkillTreeSection.jsx';
import ProjectsSection from '../components/landing/ProjectsSection.jsx';
import ContactSection from '../components/landing/ContactSection.jsx';

/**
 * Home 페이지
 * Hero / About Me / Skill Tree / Projects / Contact 5개 섹션으로 구성된 랜딩 페이지입니다.
 */
function Home() {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <AboutSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default Home;
