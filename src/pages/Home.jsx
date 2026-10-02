import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import HeroSection from '../components/landing/HeroSection.jsx';
import AboutSection from '../components/landing/AboutSection.jsx';
import SkillTreeSection from '../components/landing/SkillTreeSection.jsx';
import ProjectsSection from '../components/landing/ProjectsSection.jsx';
import ContactSection from '../components/landing/ContactSection.jsx';
import { scrollToSection } from '../utils/scroll-to-section.js';

/**
 * Home 페이지
 * Hero / About Me / Skill Tree / Projects / Contact 5개 섹션으로 구성된 랜딩 페이지입니다.
 * 다른 탭에서 특정 섹션을 지정해 넘어오면(state.scrollTo) 그 섹션으로 스크롤합니다.
 */
function Home() {
  const { state } = useLocation();
  const targetSectionId = state?.scrollTo;

  useEffect(() => {
    if (targetSectionId) {
      scrollToSection(targetSectionId);
    }
  }, [targetSectionId, state]);

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
