import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionWrapper from '../ui/SectionWrapper.jsx';

/**
 * HeroSection 컴포넌트
 * Home 페이지 최상단 Hero 섹션. 메인 비주얼/이름/소개가 들어갈 자리를 안내합니다.
 */
function HeroSection() {
  return (
    <SectionWrapper id="hero" bgColor="var(--color-bg-primary)">
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            lineHeight: 1.3,
            color: 'var(--color-text-primary)',
            mb: 2,
          }}
        >
          Hero
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
          }}
        >
          여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Box>
    </SectionWrapper>
  );
}

export default HeroSection;
