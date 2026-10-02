import Box from '@mui/material/Box';
import useInView from '../../hooks/useInView.js';

/** 나타나기 전에 요소가 놓이는 위치 (transform3d 로 GPU 가속) */
const OFFSETS = {
  up: 'translate3d(0, 32px, 0)',
  left: 'translate3d(-40px, 0, 0)',
  right: 'translate3d(40px, 0, 0)',
};

/**
 * Reveal 컴포넌트
 * 스크롤해서 화면에 들어오면(Intersection Observer) 서서히 나타나며 제자리로 미끄러져 들어옵니다.
 * delay 를 다르게 주면 여러 요소가 차례로 등장합니다. (delay 는 CSS 변수로 전달)
 *
 * Props:
 * @param {node} children - 감쌀 내용 [Required]
 * @param {string} direction - 들어오는 방향 'up' | 'left' | 'right' [Optional, 기본값: 'up']
 * @param {number} delay - 등장 지연(ms) [Optional, 기본값: 0]
 * @param {object} sx - 감싸는 요소에 적용할 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <Reveal direction="left" delay={120}><Card /></Reveal>
 */
function Reveal({ children, direction = 'up', delay = 0, sx }) {
  const [ref, isInView] = useInView({ threshold: 0.12 });

  return (
    <Box
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      sx={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : OFFSETS[direction],
        transition: 'opacity 0.7s ease var(--reveal-delay), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay)',
        willChange: isInView ? 'auto' : 'opacity, transform',
        '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default Reveal;
