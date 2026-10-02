import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import { cardLiftSx } from '../../utils/interaction-styles.js';

const HOVER_DEVICE = '@media (hover: hover)';
const BUTTON_TILT = 'perspective(500px) rotateX(10deg) translateY(-2px)';

const buttonPressSx = {
  flex: 1,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  [HOVER_DEVICE]: { '&:hover': { transform: BUTTON_TILT } },
  '&:focus-visible': { transform: BUTTON_TILT, outline: '2px solid var(--color-accent)', outlineOffset: 2 },
  '&:active': { transform: 'scale(0.96)' },
};

/** 썸네일 위에 겹쳐지는 안내. 마우스 기기에서는 호버·포커스 때만, 터치 기기에서는 아래쪽에 항상 보입니다. */
const overlaySx = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: 0.5,
  p: 2,
  color: '#F5F2E8',
  backgroundImage: 'linear-gradient(to top, rgba(46, 58, 42, 0.92) 0%, rgba(46, 58, 42, 0.55) 45%, rgba(46, 58, 42, 0) 100%)',
  opacity: 1,
  transition: 'opacity 0.35s ease',
  [HOVER_DEVICE]: { opacity: 0 },
};

/**
 * ProjectCard 컴포넌트
 * 프로젝트 한 건을 썸네일(위) + 정보(아래) 형태의 카드로 표시합니다.
 * 카드는 호버·포커스 시 떠오르며 그림자가 넓어지고, 썸네일은 확대되면서 안내 문구가 겹쳐집니다.
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
        ...cardLiftSx,
      }}
    >
      <Box
        component="a"
        href={detailUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} 사이트 새 탭에서 열기`}
        sx={{
          position: 'relative',
          display: 'block',
          overflow: 'hidden',
          aspectRatio: '4 / 3',
          backgroundColor: 'var(--color-border-light)',
          borderBottom: '1px solid var(--color-border-light)',
          outline: 'none',
          [HOVER_DEVICE]: {
            '&:hover .project-card__image': { transform: 'scale(1.08)', filter: 'brightness(0.85) saturate(1.15)' },
            '&:hover .project-card__overlay': { opacity: 1 },
          },
          '&:focus-visible .project-card__image': { transform: 'scale(1.08)', filter: 'brightness(0.85) saturate(1.15)' },
          '&:focus-visible .project-card__overlay': { opacity: 1 },
        }}
      >
        <Box
          component="img"
          className="project-card__image"
          src={thumbnailUrl}
          alt={`${title} 스크린샷`}
          loading="lazy"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease',
            willChange: 'transform',
          }}
        />
        <Box className="project-card__overlay" sx={overlaySx}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.95rem', fontWeight: 700 }}>
            사이트 방문하기
            <LaunchIcon sx={{ fontSize: '1.1rem' }} />
          </Box>
          <Box sx={{ fontSize: '0.8rem', lineHeight: 1.5, opacity: 0.9, '@media (hover: none)': { display: 'none' } }}>
            {description}
          </Box>
        </Box>
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
              backgroundColor: 'text.primary',
              boxShadow: 'none',
              '&:hover': { backgroundColor: 'text.secondary', boxShadow: '0 8px 16px rgba(46, 58, 42, 0.25)' },
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
                color: 'text.primary',
                borderColor: 'text.primary',
                '&:hover': { borderColor: 'error.main', color: 'error.main', backgroundColor: 'transparent' },
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
