import { useEffect, useRef } from 'react';
import { rafThrottle } from '../utils/raf-throttle.js';

/**
 * useScrollProgressVar 훅
 * 요소가 화면 위로 얼마나 스크롤되어 나갔는지(0~1)를 CSS 변수로 그 요소에 기록합니다.
 * 리렌더링 없이 CSS 의 calc(var(--이름)) 만으로 패럴랙스 같은 스크롤 연동 변형을 만들 수 있습니다.
 * @param {string} variableName - 기록할 CSS 변수 이름 (예: '--hero-scroll')
 * @returns {object} 대상 요소에 달 ref
 */
function useScrollProgressVar(variableName) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const update = rafThrottle(() => {
      const { top, height } = element.getBoundingClientRect();
      const progress = Math.min(Math.max(-top / height, 0), 1);
      element.style.setProperty(variableName, progress.toFixed(3));
    });

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      update.cancel();
    };
  }, [variableName]);

  return ref;
}

export default useScrollProgressVar;
