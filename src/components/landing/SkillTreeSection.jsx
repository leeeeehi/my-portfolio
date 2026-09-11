import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import SectionWrapper from '../ui/SectionWrapper.jsx';

const PLACEHOLDER_SKILLS = [
  { name: 'Skill A', value: 70 },
  { name: 'Skill B', value: 55 },
  { name: 'Skill C', value: 40 },
];

/**
 * SkillTreeSection 컴포넌트
 * Home 페이지의 Skill Tree 섹션. 기술 스택 시각화(트리/프로그레스바)가 들어갈 자리를 안내합니다.
 */
function SkillTreeSection() {
  return (
    <SectionWrapper id="skills" bgColor="var(--color-primary-light)">
      <Box sx={{ textAlign: 'center' }}>
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
            color: 'var(--color-text-secondary)',
            mb: 4,
          }}
        >
          여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
          {PLACEHOLDER_SKILLS.map((skill) => (
            <Box key={skill.name} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', mb: 0.5 }}>
                {skill.name}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={skill.value}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'var(--color-border-light)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--color-button-primary)',
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
}

export default SkillTreeSection;
