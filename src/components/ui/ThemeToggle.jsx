import { useId } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useThemeMode from '../../hooks/useThemeMode.js';

/** 해의 광선 8개가 놓이는 각도 */
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * ThemeToggle 컴포넌트
 * 라이트/다크 모드 전환 버튼. 누르면 전환 효과 없이 바로 바뀝니다.
 * 라이트 모드에서는 해, 다크 모드에서는 달 아이콘을 보여줍니다.
 * (달은 원의 한쪽을 마스크로 가려서 그립니다.)
 */
function ThemeToggle() {
  const { isDark, toggleMode } = useThemeMode();
  const maskId = useId();
  const label = isDark ? '라이트 모드로 전환' : '다크 모드로 전환';

  return (
    <Tooltip title={label} arrow>
      <IconButton
        onClick={toggleMode}
        aria-label={label}
        aria-pressed={isDark}
        sx={{
          width: 44,
          height: 44,
          color: 'var(--color-text-primary)',
          '&:hover': { color: 'var(--color-accent)', backgroundColor: 'transparent' },
        }}
      >
        <Box component="svg" viewBox="0 0 24 24" aria-hidden sx={{ width: 24, height: 24, overflow: 'visible' }}>
          <mask id={maskId}>
            <rect x="0" y="0" width="24" height="24" fill="white" />
            {isDark ? <circle cx="17" cy="7" r="8" fill="black" /> : null}
          </mask>
          <circle cx="12" cy="12" r={isDark ? 8 : 5} fill="currentColor" mask={`url(#${maskId})`} />
          {isDark ? null : (
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {RAY_ANGLES.map((angle) => (
                <line key={angle} x1="12" y1="1.5" x2="12" y2="4" transform={`rotate(${angle} 12 12)`} />
              ))}
            </g>
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
