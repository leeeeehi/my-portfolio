import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper.jsx';

/**
 * AboutSection 컴포넌트
 * Home 페이지의 About Me 소개 섹션. 자기소개와 '더 알아보기' 버튼 자리를 안내합니다.
 */
function AboutSection() {
  return (
    <SectionWrapper id="about" bgColor="var(--color-bg-secondary)">
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-text-primary)',
            mb: 2,
          }}
        >
          About Me
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            mb: 3,
          }}
        >
          여기는 About Me 섹션입니다. 간단한 자기소개와 &apos;더 알아보기&apos; 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
          component={RouterLink}
          to="/about"
          variant="contained"
          sx={{
            backgroundColor: 'var(--color-button-primary)',
            color: 'var(--color-secondary)',
            '&:hover': {
              backgroundColor: 'var(--color-button-hover)',
            },
          }}
        >
          더 알아보기
        </Button>
      </Box>
    </SectionWrapper>
  );
}

export default AboutSection;
