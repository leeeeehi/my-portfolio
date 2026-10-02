const SCROLL_DURATION_MS = 900;

/** 천천히 출발해서 천천히 멈추는 감속 곡선 (easeInOutCubic) */
function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress ** 3
    : 1 - ((-2 * progress + 2) ** 3) / 2;
}

/**
 * 지정한 id 를 가진 섹션으로 부드럽게 스크롤합니다.
 * 브라우저 기본 스크롤 대신 직접 애니메이션해서, 기기 설정과 관계없이 같은 속도와 감속으로 움직입니다.
 * 이동 중에 사용자가 휠·터치·키보드로 스크롤하면 즉시 멈춥니다.
 * @param {string} sectionId - 이동할 섹션의 HTML id
 */
export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }

  const startY = window.scrollY;
  const scrollMargin = parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const targetY = Math.min(section.getBoundingClientRect().top + startY - scrollMargin, maxY);
  const distance = targetY - startY;
  if (distance === 0) {
    return;
  }

  const cancelEvents = ['wheel', 'touchstart', 'keydown'];
  let isCancelled = false;
  const cancel = () => {
    isCancelled = true;
  };
  const cleanup = () => cancelEvents.forEach((name) => window.removeEventListener(name, cancel));
  cancelEvents.forEach((name) => window.addEventListener(name, cancel, { passive: true }));

  const startTime = performance.now();
  const step = (now) => {
    if (isCancelled) {
      cleanup();
      return;
    }
    const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      cleanup();
    }
  };
  requestAnimationFrame(step);
}
