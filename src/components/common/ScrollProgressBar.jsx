import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { rafThrottle } from '../../utils/raf-throttle.js';

/**
 * ScrollProgressBar 컴포넌트
 * 화면 맨 위에 고정된 읽기 진행률 바. 페이지를 얼마나 내려 봤는지 보여줍니다.
 * (스크롤할 때마다 리렌더링하지 않도록 ref 로 transform 만 바꿉니다.)
 */
function ScrollProgressBar() {
  const barRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const update = rafThrottle(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    });

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      update.cancel();
    };
  }, [pathname]);

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        width: '100%',
        height: 3,
        pointerEvents: 'none',
      }}
    >
      <Box
        ref={barRef}
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(90deg, var(--color-button-primary), var(--color-accent))',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          willChange: 'transform',
        }}
      />
    </Box>
  );
}

export default ScrollProgressBar;
