import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const MARQUEE_DURATION = '45s';
/** 움직임 줄이기 설정을 켠 사용자에게는 멈추지 않고 더 느리게 흐릅니다. */
const REDUCED_MOTION_DURATION = '120s';
/** 넓은 화면에서도 띠가 비지 않도록 한 벌 안에서 문구를 반복하는 횟수 */
const REPEAT_COUNT = 4;

/** 같은 내용을 두 벌 이어 붙인 트랙을 절반만큼 왼쪽으로 밀어 끊김 없이 반복합니다. */
const slideLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

/**
 * HeroMarquee 컴포넌트
 * 오른쪽에서 왼쪽으로 멈추지 않고 계속 흐르는 텍스트 띠입니다.
 * (본문 글자색을 배경으로, 배경색을 글자로 뒤집어 써서 라이트·다크 모두 대비가 높습니다.)
 *
 * Props:
 * @param {Array} items - 흘려보낼 문구 배열 [Required]
 *
 * Example usage:
 * <HeroMarquee items={['CLEAN CODE', 'USER-CENTERED']} />
 */
function HeroMarquee({ items }) {
  const repeatedItems = Array.from({ length: REPEAT_COUNT }, () => items).flat();

  return (
    <Box
      role="group"
      aria-label={items.join(', ')}
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--color-text-primary)',
        py: { xs: 1.25, md: 1.75 },
      }}
    >
      <Box
        className="hero-marquee__track"
        aria-hidden
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `${slideLeft} ${MARQUEE_DURATION} linear infinite`,
          '@media (prefers-reduced-motion: reduce)': { animationDuration: REDUCED_MOTION_DURATION },
        }}
      >
        {[0, 1].map((copy) => (
          <Box
            key={copy}
            component="ul"
            sx={{ display: 'flex', flexShrink: 0, m: 0, p: 0, listStyle: 'none' }}
          >
            {repeatedItems.map((item, index) => (
              <Box
                key={`${item}-${index}`}
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--color-bg-secondary)',
                  '&::after': {
                    content: '"·"',
                    mx: { xs: 2, md: 3 },
                    color: 'var(--color-accent)',
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default HeroMarquee;
