import { useId, useRef } from 'react';
import { flushSync } from 'react-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useThemeMode from '../../hooks/useThemeMode.js';

const MORPH = '0.5s cubic-bezier(0.4, 0, 0.2, 1)';

/** 새 테마가 원형으로 화면 전체에 퍼지는 데 걸리는 시간(ms). Magic UI 기본값 */
const REVEAL_DURATION_MS = 400;

/** 해의 광선 8개가 놓이는 각도 */
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * ThemeToggle 컴포넌트
 * 라이트/다크 모드 전환 버튼. (Magic UI 의 Animated Theme Toggler 를 MUI 로 옮긴 것)
 * - 누르면 새 테마가 버튼 위치에서 원형으로 퍼지며 화면 전체를 덮습니다. (View Transitions API)
 *   지원하지 않는 브라우저나 움직임 줄이기 설정에서는 색만 부드럽게 바뀝니다.
 * - 아이콘은 해의 원이 커지며 한쪽이 가려져 달로 바뀌고, 광선은 돌면서 사라집니다.
 */
function ThemeToggle() {
  const { isDark, toggleMode } = useThemeMode();
  const buttonRef = useRef(null);
  const maskId = useId();
  const label = isDark ? '라이트 모드로 전환' : '다크 모드로 전환';

  const handleToggle = async () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || prefersReducedMotion || !buttonRef.current) {
      toggleMode();
      return;
    }

    // 화면을 찍어 둔 뒤 테마를 즉시 바꾸고, 새 화면을 버튼 중심에서 원형으로 펼친다.
    const transition = document.startViewTransition(() => {
      flushSync(() => toggleMode({ isInstant: true }));
    });
    await transition.ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
      { duration: REVEAL_DURATION_MS, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
    );
  };

  return (
    <Tooltip title={label} arrow>
      <IconButton
        ref={buttonRef}
        onClick={handleToggle}
        aria-label={label}
        aria-pressed={isDark}
        sx={{
          width: 44,
          height: 44,
          color: 'var(--color-text-primary)',
          transition: 'color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
          '&:hover': { color: 'var(--color-accent)', backgroundColor: 'transparent', transform: 'rotate(15deg)' },
        }}
      >
        <Box component="svg" viewBox="0 0 24 24" aria-hidden sx={{ width: 24, height: 24, overflow: 'visible' }}>
          <mask id={maskId}>
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <Box
              component="circle"
              r="8"
              fill="black"
              sx={{ cx: isDark ? '17px' : '30px', cy: isDark ? '7px' : '0px', transition: `cx ${MORPH}, cy ${MORPH}` }}
            />
          </mask>
          <Box
            component="circle"
            cx="12"
            cy="12"
            fill="currentColor"
            mask={`url(#${maskId})`}
            sx={{ r: isDark ? '8px' : '5px', transition: `r ${MORPH}` }}
          />
          <Box
            component="g"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            sx={{
              transformOrigin: '12px 12px',
              transform: isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0deg) scale(1)',
              opacity: isDark ? 0 : 1,
              transition: `transform ${MORPH}, opacity ${MORPH}`,
            }}
          >
            {RAY_ANGLES.map((angle) => (
              <line key={angle} x1="12" y1="1.5" x2="12" y2="4" transform={`rotate(${angle} 12 12)`} />
            ))}
          </Box>
        </Box>
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
