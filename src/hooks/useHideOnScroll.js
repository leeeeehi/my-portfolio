import { useEffect, useRef, useState } from 'react';
import { rafThrottle } from '../utils/raf-throttle.js';

const DIRECTION_THRESHOLD = 8;
const TOP_OFFSET = 80;

/**
 * useHideOnScroll 훅
 * 아래로 스크롤하면 true(숨김), 위로 스크롤하거나 페이지 맨 위 근처면 false(표시)를 돌려줍니다.
 * @returns {boolean} 헤더를 숨겨야 하는지 여부
 */
function useHideOnScroll() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = rafThrottle(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      if (Math.abs(delta) < DIRECTION_THRESHOLD) {
        return;
      }
      setIsHidden(delta > 0 && currentY > TOP_OFFSET);
      lastScrollYRef.current = currentY;
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return isHidden;
}

export default useHideOnScroll;
