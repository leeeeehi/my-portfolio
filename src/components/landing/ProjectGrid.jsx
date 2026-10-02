import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProjectCard from './ProjectCard.jsx';

const statusTextSx = {
  fontSize: { xs: '1rem', md: '1.1rem' },
  lineHeight: 1.6,
  color: 'var(--color-text-secondary)',
  textAlign: 'center',
};

/**
 * ProjectGrid 컴포넌트
 * 프로젝트 목록을 카드 그리드(데스크톱 3열 / 태블릿 2열 / 모바일 1열)로 표시합니다.
 *
 * Props:
 * @param {Array} projects - 프로젝트 배열 [Required]
 * @param {boolean} isLoading - 로딩 여부 [Optional, 기본값: false]
 * @param {string} error - 조회 실패 시 에러 메시지 [Optional, 기본값: null]
 *
 * Example usage:
 * <ProjectGrid projects={projects} isLoading={isLoading} error={error} />
 */
function ProjectGrid({ projects, isLoading = false, error = null }) {
  if (isLoading) {
    return <Typography sx={statusTextSx}>프로젝트를 불러오는 중...</Typography>;
  }

  if (error) {
    return <Typography sx={statusTextSx}>프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</Typography>;
  }

  if (projects.length === 0) {
    return <Typography sx={statusTextSx}>아직 등록된 프로젝트가 없어요.</Typography>;
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: 'center' }}>
      {projects.map((project) => (
        <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectGrid;
