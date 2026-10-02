import Box from '@mui/material/Box';
import useInView from '../../hooks/useInView.js';
import useCountUp from '../../hooks/useCountUp.js';

/**
 * CountUp 컴포넌트
 * 화면에 보이기 시작하면 0 에서 목표 값까지 숫자가 올라갑니다.
 * (스크린리더에는 움직이는 숫자 대신 최종 값을 읽어 줍니다.)
 *
 * Props:
 * @param {number} value - 목표 값 [Required]
 * @param {number} duration - 걸리는 시간(ms) [Optional, 기본값: 1200]
 * @param {object} sx - 숫자에 적용할 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <CountUp value={3} sx={{ fontWeight: 700 }} />
 */
function CountUp({ value, duration = 1200, sx }) {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const count = useCountUp(value, isInView, duration);

  return (
    <Box component="span" ref={ref} aria-label={String(value)} sx={{ fontVariantNumeric: 'tabular-nums', ...sx }}>
      <Box component="span" aria-hidden>
        {count}
      </Box>
    </Box>
  );
}

export default CountUp;
