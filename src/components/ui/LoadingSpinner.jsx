import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
`;

const DOT_DELAYS = [0, 0.16, 0.32];

/**
 * LoadingSpinner 컴포넌트
 * 점 세 개가 차례로 커졌다 작아지는 로딩 표시입니다.
 *
 * Props:
 * @param {string} label - 함께 보여줄 안내 문구 [Optional, 기본값: '불러오는 중...']
 * @param {string} color - 점과 글자 색(CSS 색) [Optional, 기본값: 'var(--color-text-secondary)']
 *
 * Example usage:
 * <LoadingSpinner label="방명록을 불러오는 중..." />
 */
function LoadingSpinner({ label = '불러오는 중...', color = 'var(--color-text-secondary)' }) {
  return (
    <Box role="status" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, color }}>
      <Box aria-hidden sx={{ display: 'flex', gap: 0.75 }}>
        {DOT_DELAYS.map((delay) => (
          <Box
            key={delay}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'currentColor',
              animation: `${bounce} 1.2s ease-in-out ${delay}s infinite both`,
            }}
          />
        ))}
      </Box>
      <Box component="span" sx={{ fontSize: '0.9rem' }}>
        {label}
      </Box>
    </Box>
  );
}

export default LoadingSpinner;
