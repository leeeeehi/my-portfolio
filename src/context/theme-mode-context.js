import { createContext } from 'react';

/**
 * 라이트/다크 모드 상태를 공유하는 Context 입니다.
 * 값은 ThemeModeProvider 가 제공하고, useThemeMode 훅으로 읽습니다.
 */
const ThemeModeContext = createContext(null);

export default ThemeModeContext;
