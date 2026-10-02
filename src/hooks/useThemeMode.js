import { useContext } from 'react';
import ThemeModeContext from '../context/theme-mode-context.js';

/**
 * useThemeMode 훅
 * 현재 테마 모드('light' | 'dark')와 전환 함수에 접근합니다.
 */
function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode 는 ThemeModeProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
}

export default useThemeMode;
