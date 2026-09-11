import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper.jsx';

const PLACEHOLDER_PROJECTS = ['Project 1', 'Project 2', 'Project 3', 'Project 4'];

/**
 * ProjectsSection 컴포넌트
 * Home 페이지의 Projects 섹션. 대표작 썸네일과 '더 보기' 버튼 자리를 안내합니다.
 */
function ProjectsSection() {
  return (
    <SectionWrapper id="projects" bgColor="var(--color-bg-secondary)">
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-text-primary)',
            mb: 2,
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            mb: 4,
          }}
        >
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 &apos;더 보기&apos; 버튼이 들어갈 예정입니다.
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {PLACEHOLDER_PROJECTS.map((project) => (
            <Grid key={project} size={{ xs: 6, md: 3 }}>
              <Box
                sx={{
                  aspectRatio: '4 / 3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 2,
                  color: 'var(--color-text-muted)',
                  fontSize: '0.9rem',
                }}
              >
                {project}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button
          component={RouterLink}
          to="/projects"
          variant="outlined"
          sx={{
            borderColor: 'var(--color-button-primary)',
            color: 'var(--color-button-primary)',
            '&:hover': {
              borderColor: 'var(--color-button-hover)',
              color: 'var(--color-button-hover)',
              backgroundColor: 'transparent',
            },
          }}
        >
          더 보기
        </Button>
      </Box>
    </SectionWrapper>
  );
}

export default ProjectsSection;
