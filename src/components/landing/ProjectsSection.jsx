import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper.jsx';
import ProjectGrid from './ProjectGrid.jsx';
import useProjects from '../../hooks/useProjects.js';

const FEATURED_COUNT = 3;

/**
 * ProjectsSection 컴포넌트
 * Home 페이지의 Projects 섹션. 대표작 카드와 '더 보기' 버튼을 보여줍니다.
 */
function ProjectsSection() {
  const { projects, isLoading, error } = useProjects();

  return (
    <SectionWrapper id="projects" bgColor="var(--color-bg-secondary)" maxWidth="lg">
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-text-primary)',
            mb: { xs: 3, md: 5 },
          }}
        >
          Projects
        </Typography>
        <Box sx={{ mb: 4 }}>
          <ProjectGrid projects={projects.slice(0, FEATURED_COUNT)} isLoading={isLoading} error={error} />
        </Box>
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
