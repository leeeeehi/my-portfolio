import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import leetudyDesktop from '../../assets/projects/leetudy-desktop.png';
import ourggMobile from '../../assets/projects/ourgg-mobile.png';

const LEETUDY_URL = 'https://leeeeehi.github.io/Leetudy/';
const OURGG_URL = 'https://leeeeehi.github.io/OUR-GG/';

const float = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
`;

/** 프레임이 천천히 떠 있는 움직임. 두 프레임의 박자를 다르게 줘서 따로 움직이게 합니다. */
const floatSx = (duration) => ({
  animation: `${float} ${duration}s ease-in-out infinite alternate`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
});

const frameLinkSx = {
  display: 'block',
  textDecoration: 'none',
  transition: 'transform 0.3s ease',
  '&:focus-visible': { outline: '3px solid var(--color-accent)', outlineOffset: 4 },
};

/**
 * HeroProjectMockup 컴포넌트
 * Hero 섹션의 시각 요소. 실제로 배포한 프로젝트 화면(Leetudy 데스크톱, our.gg 모바일)을
 * 브라우저 창과 휴대폰 프레임에 담아 겹쳐 보여줍니다. 각 프레임을 누르면 해당 사이트가 열립니다.
 * (화면 이미지는 배포된 사이트를 직접 캡처한 것으로, 프레임 색은 모드와 무관하게 고정입니다.)
 */
function HeroProjectMockup() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 320, sm: 460, md: 420, lg: 520 },
        mx: 'auto',
        pr: { xs: 3, md: 5 },
        pb: { xs: 5, md: 7 },
      }}
    >
      {/* 브라우저 창: Leetudy */}
      <Box
        component="a"
        href={LEETUDY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Leetudy 사이트 열기"
        sx={{
          ...frameLinkSx,
          transform: 'rotate(-2deg)',
          '&:hover': { transform: 'rotate(-2deg) translateY(-6px)' },
        }}
      >
        <Box
          sx={{
            ...floatSx(4.5),
            overflow: 'hidden',
            backgroundColor: '#F5F2E8',
            border: '2px solid #6B8F60',
            borderRadius: 3,
            boxShadow: '0 18px 40px rgba(46, 58, 42, 0.28)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 1,
              backgroundColor: '#A8C4A2',
              borderBottom: '2px solid #6B8F60',
            }}
          >
            {['#E8967A', '#F3D08A', '#F5F2E8'].map((color) => (
              <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
            ))}
            <Box
              sx={{
                flexGrow: 1,
                ml: 1,
                px: 1.5,
                py: 0.25,
                fontSize: '0.7rem',
                lineHeight: 1.6,
                color: '#4A6142',
                backgroundColor: '#F5F2E8',
                borderRadius: 5,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              leeeeehi.github.io/Leetudy
            </Box>
          </Box>
          <Box
            component="img"
            src={leetudyDesktop}
            alt="Leetudy 스터디 커뮤니티의 게시물 목록 화면"
            sx={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }}
          />
        </Box>
      </Box>

      {/* 휴대폰: our.gg */}
      <Box
        component="a"
        href={OURGG_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="our.gg 사이트 열기"
        sx={{
          ...frameLinkSx,
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '30%',
          transform: 'rotate(5deg)',
          '&:hover': { transform: 'rotate(5deg) translateY(-6px)' },
        }}
      >
        <Box
          sx={{
            ...floatSx(3.6),
            overflow: 'hidden',
            p: '5px',
            backgroundColor: '#2E3A2A',
            borderRadius: { xs: 3, md: 4 },
            boxShadow: '0 18px 40px rgba(46, 58, 42, 0.38)',
          }}
        >
          <Box
            component="img"
            src={ourggMobile}
            alt="our.gg 모바일 로그인 화면"
            sx={{ display: 'block', width: '100%', aspectRatio: '5 / 9', objectFit: 'cover', borderRadius: { xs: 2, md: 3 } }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroProjectMockup;
