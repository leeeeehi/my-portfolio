import Box from '@mui/material/Box';

const VIEW_SIZE = 100;

/**
 * CircularGauge 컴포넌트
 * SVG 원 둘레의 선 길이(stroke-dashoffset)로 0~100 값을 표시하는 원형 게이지입니다.
 * 값이 바뀔 때마다 그대로 그리므로, 카운팅되는 숫자를 넘기면 숫자와 게이지가 함께 차오릅니다.
 *
 * Props:
 * @param {number} value - 표시할 값(0~100) [Required]
 * @param {string} label - 스크린리더용 설명 [Required]
 * @param {number} size - 지름(px) [Optional, 기본값: 88]
 * @param {number} thickness - 선 두께(viewBox 100 기준) [Optional, 기본값: 9]
 * @param {string} color - 진행 선 색상(theme 팔레트 키 또는 CSS 색) [Optional, 기본값: 'primary.dark']
 * @param {node} children - 원 가운데에 넣을 내용 [Optional]
 *
 * Example usage:
 * <CircularGauge value={80} label="JavaScript 숙련도 80%"><Icon /></CircularGauge>
 */
function CircularGauge({ value, label, size = 88, thickness = 9, color = 'primary.dark', children }) {
  const radius = (VIEW_SIZE - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <Box
        component="svg"
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        role="img"
        aria-label={label}
        sx={{ display: 'block', width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
      >
        <Box
          component="circle"
          cx={VIEW_SIZE / 2}
          cy={VIEW_SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          sx={{ stroke: (theme) => theme.palette.divider }}
        />
        <Box
          component="circle"
          cx={VIEW_SIZE / 2}
          cy={VIEW_SIZE / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          sx={{ color, stroke: 'currentColor' }}
        />
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Box>
    </Box>
  );
}

export default CircularGauge;
