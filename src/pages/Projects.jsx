import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProjectGrid from '../components/landing/ProjectGrid.jsx';
import useProjects from '../hooks/useProjects.js';

/**
 * Projects 페이지
 * Supabase projects 테이블에 게시된 포트폴리오 작품 전체를 카드 그리드로 보여줍니다.
 */
function Projects() {
  const { projects, isLoading, error } = useProjects();

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
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
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
            }}
          >
            직접 기획하고 개발해 배포한 프로젝트들입니다.
          </Typography>
        </Box>
        <ProjectGrid projects={projects} isLoading={isLoading} error={error} />
      </Container>
    </Box>
  );
}

export default Projects;
