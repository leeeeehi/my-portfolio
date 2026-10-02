import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop 컴포넌트
 * 다른 탭으로 이동하면 화면을 맨 위로 올립니다. (이전 탭의 스크롤 위치가 남지 않도록)
 * 이동과 함께 특정 섹션으로 스크롤하라는 요청(state.scrollTo)이 있으면 그쪽에 맡깁니다.
 */
function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;
