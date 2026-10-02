import { useCallback, useEffect, useMemo, useState } from 'react';
import ThemeModeContext from './theme-mode-context.js';

/** index.html 의 초기화 스크립트와 같은 키를 써야 합니다. */
const STORAGE_KEY = 'portfolio-theme';
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_MS = 500;

/** 저장된 사용자 선택을 읽습니다. (저장소를 쓸 수 없는 환경에서는 null) */
function readStoredMode() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

/**
 * <html data-theme> 를 바꿔 CSS 변수를 전환합니다.
 * isInstant 가 아니면 색이 부드럽게 바뀌도록 잠시 전환용 클래스를 붙입니다.
 * (원형으로 퍼지는 화면 전환을 쓸 때는 색 페이드가 겹치지 않도록 isInstant 로 즉시 바꿉니다.)
 */
function applyMode(mode, isInstant = false) {
  const root = document.documentElement;
  if (!isInstant) {
    root.classList.add(TRANSITION_CLASS);
    window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);
  }
  root.setAttribute('data-theme', mode);
}

/**
 * ThemeModeProvider 컴포넌트
 * 라이트/다크 모드를 관리합니다.
 * - 처음 값은 index.html 의 초기화 스크립트가 정해 둔 <html data-theme> 를 그대로 따릅니다. (깜빡임 방지)
 * - 토글하면 선택을 localStorage 에 저장합니다. toggleMode({ isInstant: true }) 는 색 페이드 없이 바로 바꿉니다.
 * - 저장된 선택이 없으면 시스템 설정(prefers-color-scheme)이 바뀔 때 따라갑니다.
 *
 * Props:
 * @param {node} children - Context 를 사용할 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <ThemeModeProvider><App /></ThemeModeProvider>
 */
function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => (
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  ));

  const toggleMode = useCallback(({ isInstant = false } = {}) => {
    const next = mode === 'dark' ? 'light' : 'dark';
    applyMode(next, isInstant);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 저장소를 쓸 수 없으면 이번 방문 동안만 유지한다.
    }
    setMode(next);
  }, [mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event) => {
      if (readStoredMode()) {
        return;
      }
      const next = event.matches ? 'dark' : 'light';
      applyMode(next);
      setMode(next);
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const value = useMemo(() => ({ mode, isDark: mode === 'dark', toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export default ThemeModeProvider;
