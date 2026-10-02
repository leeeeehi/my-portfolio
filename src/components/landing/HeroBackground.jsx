import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const drift = keyframes`
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(40px, -30px) scale(1.12); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const blobSx = {
  borderRadius: '50%',
  filter: 'blur(60px)',
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
};

/**
 * 패럴랙스 층 스타일. Hero 가 스크롤되어 나간 정도(--hero-scroll, 0~1)에 distance 를 곱한 만큼
 * 세로로 움직입니다. 층마다 distance 를 다르게 줘서 깊이감을 만듭니다. (양수: 느리게 따라옴, 음수: 빨리 올라감)
 */
const parallaxSx = (distance) => ({
  position: 'absolute',
  transform: `translate3d(0, calc(var(--hero-scroll, 0) * ${distance}px), 0)`,
  willChange: 'transform',
  '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
});

/**
 * HeroBackground 컴포넌트
 * Hero 섹션의 배경. 디자인 툴의 캔버스를 떠올리게 하는 도트 그리드 위에
 * 세이지 그린·피치 그라데이션과 천천히 움직이는 블롭, 점선 원을 겹칩니다.
 * 스크롤하면 층마다 다른 속도로 움직여 깊이감을 줍니다. (부모가 --hero-scroll 변수를 제공)
 * (색은 모두 CSS 변수라 다크모드에서도 팔레트를 따라갑니다. 장식용이라 스크린리더에서는 숨깁니다.)
 */
function HeroBackground() {
  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* 그라데이션 메시 */}
      <Box
        sx={{
          ...parallaxSx(90),
          inset: 0,
          background: [
            'radial-gradient(55% 60% at 8% 12%, color-mix(in srgb, var(--color-primary) 55%, transparent), transparent 70%)',
            'radial-gradient(45% 55% at 92% 82%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 70%)',
            'radial-gradient(40% 45% at 72% 6%, color-mix(in srgb, var(--color-primary-light) 60%, transparent), transparent 70%)',
          ].join(', '),
        }}
      />

      {/* 천천히 움직이는 블롭 */}
      <Box sx={{ ...parallaxSx(180), top: { xs: '8%', md: '14%' }, left: { xs: '-18%', md: '4%' } }}>
        <Box
          sx={{
            ...blobSx,
            width: { xs: 220, md: 340 },
            height: { xs: 220, md: 340 },
            backgroundColor: 'color-mix(in srgb, var(--color-primary-dark) 38%, transparent)',
            animation: `${drift} 16s ease-in-out infinite alternate`,
          }}
        />
      </Box>
      <Box sx={{ ...parallaxSx(240), right: { xs: '-20%', md: '6%' }, bottom: { xs: '10%', md: '12%' } }}>
        <Box
          sx={{
            ...blobSx,
            width: { xs: 240, md: 380 },
            height: { xs: 240, md: 380 },
            backgroundColor: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
            animation: `${drift} 20s ease-in-out infinite alternate-reverse`,
          }}
        />
      </Box>

      {/* 도트 그리드 (가장자리로 갈수록 사라짐) */}
      <Box
        sx={{
          ...parallaxSx(40),
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, color-mix(in srgb, var(--color-border) 55%, transparent) 1.2px, transparent 1.7px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 80% 75% at 50% 45%, #000 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 45%, #000 25%, transparent 80%)',
        }}
      />

      {/* 점선 원 */}
      <Box sx={{ ...parallaxSx(-140), top: { xs: '52%', md: '10%' }, right: { xs: '-30%', md: '-6%' } }}>
        <Box
          sx={{
            width: { xs: 320, md: 520 },
            height: { xs: 320, md: 520 },
            border: '1.5px dashed color-mix(in srgb, var(--color-border) 45%, transparent)',
            borderRadius: '50%',
            animation: `${spin} 90s linear infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
      </Box>
    </Box>
  );
}

export default HeroBackground;
