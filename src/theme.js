import { createTheme } from '@mui/material/styles';

/**
 * 컬러 팔레트 디자인 시스템.md 의 CSS 변수 값을 그대로 미러링한 테마입니다.
 * (MUI 내부 색상 연산 - darken/lighten/contrastText - 이 var() 문자열을
 * 파싱하지 못하므로 여기서는 실제 hex 값을 사용하고, 컴포넌트 sx 에서는
 * index.css 의 CSS 변수(var(--color-*))를 직접 참조합니다.)
 */
const theme = createTheme({
  palette: {
    primary: {
      light: '#B8CFAE',
      main: '#A8C4A2',
      dark: '#7A9B6E',
      contrastText: '#4A6142',
    },
    secondary: {
      main: '#F5F2E8',
      contrastText: '#4A6142',
    },
    background: {
      default: '#F7F4EA',
      paper: '#F5F2E8',
    },
    text: {
      primary: '#4A6142',
      secondary: '#5C7A54',
      disabled: '#8FAF82',
    },
    divider: '#DCE5D3',
    error: {
      main: '#E8967A',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
