import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

const buttonPressSx = {
  flex: 1,
  transition: 'transform 0.15s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  '&:active': { transform: 'scale(0.96)' },
};

/**
 * ProjectCard 컴포넌트
 * 프로젝트 한 건을 썸네일(위) + 정보(아래) 형태의 카드로 표시합니다.
 * (카드 표면색은 다크모드에서도 크림색으로 유지되므로, 카드 안의 글자색은
 * 모드에 따라 반전되는 CSS 변수 대신 theme 팔레트의 고정 색상을 사용합니다.)
 *
 * Props:
 * @param {object} project - 프로젝트 정보 { title, description, tech_stack, detail_url, thumbnail_url, github_url, is_personal } [Required]
 *
 * Example usage:
 * <ProjectCard project={project} />
 */
function ProjectCard({ project }) {
  const {
    title,
    description,
    tech_stack: techStack,
    detail_url: detailUrl,
    thumbnail_url: thumbnailUrl,
    github_url: githubUrl,
    is_personal: isPersonal,
  } = project;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textAlign: 'left',
        backgroundColor: 'var(--color-secondary)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 2,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: '4 / 3',
          backgroundColor: 'var(--color-border-light)',
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <Box
          component="img"
          src={thumbnailUrl}
          alt={`${title} 스크린샷`}
          loading="lazy"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 700, color: 'text.primary' }}
          >
            {title}
          </Typography>
          <Chip
            label={isPersonal ? '개인' : '팀'}
            size="small"
            sx={{
              flexShrink: 0,
              fontWeight: 700,
              color: 'secondary.main',
              backgroundColor: 'var(--color-accent)',
            }}
          />
        </Box>

        <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'text.secondary', flexGrow: 1 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{ color: 'text.secondary', borderColor: 'primary.dark', fontSize: '0.75rem' }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
          <Button
            href={detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="small"
            startIcon={<LaunchIcon />}
            sx={{
              ...buttonPressSx,
              color: 'secondary.main',
              backgroundColor: 'primary.dark',
              boxShadow: 'none',
              '&:hover': { backgroundColor: 'text.secondary', boxShadow: 'none' },
            }}
          >
            Live Demo
          </Button>
          {githubUrl ? (
            <Button
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon />}
              sx={{
                ...buttonPressSx,
                color: 'text.secondary',
                borderColor: 'primary.dark',
                '&:hover': { borderColor: 'text.secondary', backgroundColor: 'transparent' },
              }}
            >
              GitHub
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectCard;
