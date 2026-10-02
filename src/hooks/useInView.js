import { useEffect, useRef, useState } from 'react';

/**
 * useInView 훅
 * Intersection Observer 로 요소가 화면에 들어왔는지 알려줍니다.
 * @param {object} options - 옵션
 * @param {number} options.threshold - 요소가 이만큼(0~1) 보이면 들어온 것으로 판단 [기본값: 0.15]
 * @param {string} options.rootMargin - 판단 영역 여백 [기본값: '0px']
 * @param {boolean} options.isOnce - 한 번 들어오면 계속 true 로 유지할지 여부 [기본값: true]
 * @returns {Array} [ref, isInView] - 관찰할 요소에 달 ref 와 화면 진입 여부
 */
function useInView({ threshold = 0.15, rootMargin = '0px', isOnce = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (isOnce) {
          observer.disconnect();
        }
      } else if (!isOnce) {
        setIsInView(false);
      }
    }, { threshold, rootMargin });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, isOnce]);

  return [ref, isInView];
}

export default useInView;
