import { useEffect, useState } from 'react';

/**
 * useActiveSection 훅
 * Intersection Observer 로 지정한 섹션이 화면 가운데 영역에 들어와 있는지 알려줍니다.
 * (메뉴에서 지금 보고 있는 섹션을 강조할 때 사용)
 * @param {string} sectionId - 관찰할 섹션의 HTML id
 * @param {boolean} isEnabled - 관찰 여부 (섹션이 있는 페이지에서만 true)
 * @returns {boolean} 섹션이 화면 가운데 영역에 있는지 여부
 */
function useActiveSection(sectionId, isEnabled) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }
    const section = document.getElementById(sectionId);
    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setActiveId(entry.isIntersecting ? sectionId : null);
    }, { rootMargin: '-45% 0px -45% 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId, isEnabled]);

  return isEnabled && activeId === sectionId;
}

export default useActiveSection;
