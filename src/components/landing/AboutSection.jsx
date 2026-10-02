import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper.jsx';
import Reveal from '../ui/Reveal.jsx';
import SkillIcon from '../ui/SkillIcon.jsx';
import ProfileCard from '../about/ProfileCard.jsx';
import usePortfolio from '../../hooks/usePortfolio.js';
import { filledButtonSx } from '../../utils/interaction-styles.js';

/**
 * AboutSection 컴포넌트
 * Home 페이지의 About Me 소개 섹션. PortfolioContext 의 homeData 로부터
 * showInHome 섹션 요약(메인), 프로필 카드(사이드), 주요 스킬(하단)을 보여줍니다.
 */
function AboutSection() {
  const { homeData } = usePortfolio();
  const { content, skills, basicInfo } = homeData;

  return (
    <SectionWrapper id="about" bgColor="var(--color-bg-secondary)">
      <Reveal>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            mb: { xs: 3, md: 5 },
          }}
        >
          About Me
        </Typography>
      </Reveal>

      <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 0, md: 1 } }}>
          <Reveal direction="right" delay={120} sx={{ height: '100%' }}>
            <ProfileCard basicInfo={basicInfo} isCompact />
          </Reveal>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Reveal direction="left" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {content.map((item) => (
              <Box key={item.id}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.15rem', md: '1.3rem' },
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    wordBreak: 'keep-all',
                  }}
                >
                  {item.summary}
                </Typography>
              </Box>
            ))}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill.id}
                  icon={<SkillIcon icon={skill.icon} />}
                  label={skill.name}
                  variant="outlined"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-border)',
                    fontWeight: 700,
                    '& .MuiChip-icon': { color: 'var(--color-button-primary)' },
                  }}
                />
              ))}
            </Box>
          </Reveal>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          to="/about"
          variant="contained"
          sx={filledButtonSx}
        >
          더 알아보기
        </Button>
      </Box>
    </SectionWrapper>
  );
}

export default AboutSection;
