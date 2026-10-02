import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper.jsx';
import SkillCard from './SkillCard.jsx';
import Reveal from '../ui/Reveal.jsx';
import usePortfolio from '../../hooks/usePortfolio.js';
import { filledButtonSx } from '../../utils/interaction-styles.js';

const STAGGER_MS = 110;

/**
 * SkillTreeSection 컴포넌트
 * Home 페이지의 Skill Tree 섹션. PortfolioContext 의 homeData 로부터 숙련도 상위 스킬을
 * 아이콘 + 이름 카드로 보여주고, '전체 스킬 보기' 버튼으로 About Me 탭으로 이동합니다.
 * 카드는 스크롤해서 화면에 들어올 때 차례로 나타납니다.
 */
function SkillTreeSection() {
  const { homeData } = usePortfolio();

  return (
    <SectionWrapper id="skills" bgColor="var(--color-bg-primary)">
      <Box sx={{ textAlign: 'center' }}>
        <Reveal>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              color: 'var(--color-text-primary)',
              mb: 2,
            }}
          >
            Skill Tree
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6,
              color: 'var(--color-text-primary)',
              mb: 4,
            }}
          >
            기본기부터 차근차근, 지금까지 쌓아 온 기술들입니다.
          </Typography>
        </Reveal>
        <Grid container spacing={2} sx={{ justifyContent: 'center', mb: 4 }}>
          {homeData.skills.map((skill, index) => (
            <Grid key={skill.id} size={{ xs: 6, md: 3 }}>
              <Reveal delay={index * STAGGER_MS} sx={{ height: '100%' }}>
                <SkillCard name={skill.name} value={skill.level} icon={skill.icon} description={skill.description} />
              </Reveal>
            </Grid>
          ))}
        </Grid>
        <Button
          component={RouterLink}
          to="/about"
          variant="contained"
          sx={filledButtonSx}
        >
          전체 스킬 보기
        </Button>
      </Box>
    </SectionWrapper>
  );
}

export default SkillTreeSection;
