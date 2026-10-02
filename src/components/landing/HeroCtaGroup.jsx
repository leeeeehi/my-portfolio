import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { keyframes, useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';

/** TODO: 이력서 PDF 를 public 폴더에 넣고 파일명을 입력하면 '이력서 다운로드' 버튼이 나타납니다. (예: 'resume.pdf') */
const RESUME_FILE = '';

/**
 * 소셜 링크 목록. 아이콘 버튼으로 표시되며 새 탭에서 열립니다.
 * TODO: LinkedIn 등 다른 계정이 생기면 { label, href, Icon } 을 한 줄 추가합니다.
 */
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/leeeeehi', Icon: GitHubIcon },
];

/** 주요 버튼 둘레로 퍼져 나가는 링. 시선을 한 번씩 끌어 줍니다. */
const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent) 55%, transparent); }
  70%, 100% { box-shadow: 0 0 0 14px transparent; }
`;

const ctaTransition = 'transform 0.25s ease, box-shadow 0.25s ease, background-position 0.5s ease, border-color 0.25s ease, color 0.25s ease';
const CTA_TILT = 'perspective(500px) rotateX(10deg) translateY(-3px)';

/** 터치하기 쉬운 최소 크기 (권장 44px 이상) */
const TOUCH_TARGET = 48;

/**
 * 주요·보조 버튼이 같은 크기가 되도록 함께 쓰는 치수 (테두리 두께까지 동일하게 맞춤).
 * 모바일(xs)에서는 전체 너비, 그 이상에서는 고정 너비입니다.
 */
const ctaSizeSx = {
  width: { xs: '100%', sm: 184, md: 192 },
  minHeight: TOUCH_TARGET,
  px: 3,
  py: 1.25,
  fontSize: { xs: '1rem', md: '1.05rem' },
  fontWeight: 700,
  lineHeight: 1.5,
  border: '1.5px solid',
};

const primaryCtaSx = {
  ...ctaSizeSx,
  borderColor: 'transparent',
  color: 'var(--color-bg-secondary)',
  backgroundColor: 'var(--color-text-primary)',
  backgroundImage: 'linear-gradient(110deg, var(--color-text-primary) 0%, var(--color-text-primary) 45%, var(--color-button-hover) 100%)',
  backgroundSize: '220% 100%',
  backgroundPosition: '0% 0%',
  boxShadow: 'none',
  transition: ctaTransition,
  willChange: 'transform',
  animation: `${pulseRing} 2.6s ease-out infinite`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  '& .MuiButton-endIcon': { transition: 'transform 0.25s ease' },
  '&:hover': { backgroundColor: 'var(--color-text-primary)' },
  '@media (hover: hover)': {
    '&:hover': {
      backgroundPosition: '100% 0%',
      boxShadow: '0 12px 24px rgba(46, 58, 42, 0.28)',
      transform: CTA_TILT,
      animation: 'none',
    },
    '&:hover .MuiButton-endIcon': { transform: 'translateY(3px)' },
  },
};

const secondaryCtaSx = {
  ...ctaSizeSx,
  borderColor: 'var(--color-text-primary)',
  color: 'var(--color-text-primary)',
  transition: ctaTransition,
  '&:hover': { borderColor: 'var(--color-text-primary)', backgroundColor: 'transparent' },
  '@media (hover: hover)': {
    '&:hover': {
      borderColor: 'var(--color-accent)',
      color: 'var(--color-accent)',
      backgroundColor: 'transparent',
      transform: CTA_TILT,
    },
  },
};

const socialButtonSx = {
  width: TOUCH_TARGET,
  height: TOUCH_TARGET,
  color: 'var(--color-text-primary)',
  border: '1.5px solid var(--color-text-primary)',
  transition: ctaTransition,
  '@media (hover: hover)': {
    '&:hover': {
      color: 'var(--color-accent)',
      borderColor: 'var(--color-accent)',
      backgroundColor: 'transparent',
      transform: 'translateY(-3px) rotate(-8deg)',
    },
  },
};

/**
 * HeroCtaGroup 컴포넌트
 * Hero 섹션의 행동 유도 버튼 묶음입니다.
 * 주요 버튼(프로젝트 보기), 보조 버튼(연락하기, 이력서 다운로드), 소셜 아이콘 링크로 구성됩니다.
 * 데스크톱·태블릿에서는 가로로, 모바일(600px 미만)에서는 전체 너비로 세로로 쌓입니다.
 *
 * Props:
 * @param {function} onProjectsClick - '프로젝트 보기' 클릭 시 실행할 함수 [Required]
 * @param {function} onContactClick - '연락하기' 클릭 시 실행할 함수 [Required]
 *
 * Example usage:
 * <HeroCtaGroup onProjectsClick={() => scrollToSection('projects')} onContactClick={() => scrollToSection('contact')} />
 */
function HeroCtaGroup({ onProjectsClick, onContactClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        alignItems: 'center',
        gap: 1.5,
        justifyContent: { xs: 'center', md: 'flex-start' },
        width: '100%',
        maxWidth: isMobile ? 360 : 'none',
        mx: isMobile ? 'auto' : 0,
      }}
    >
      <Button
        onClick={onProjectsClick}
        variant="contained"
        size="large"
        fullWidth={isMobile}
        endIcon={<ArrowDownwardIcon />}
        sx={primaryCtaSx}
      >
        프로젝트 보기
      </Button>

      <Button onClick={onContactClick} variant="outlined" size="large" fullWidth={isMobile} sx={secondaryCtaSx}>
        연락하기
      </Button>

      {RESUME_FILE ? (
        <Button
          href={`${import.meta.env.BASE_URL}${RESUME_FILE}`}
          download
          variant="outlined"
          size="large"
          fullWidth={isMobile}
          startIcon={<DownloadIcon />}
          sx={secondaryCtaSx}
        >
          이력서 다운로드
        </Button>
      ) : null}

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <Tooltip key={label} title={label} placement="top" arrow>
            <IconButton
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} 새 탭에서 열기`}
              sx={socialButtonSx}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

export default HeroCtaGroup;
