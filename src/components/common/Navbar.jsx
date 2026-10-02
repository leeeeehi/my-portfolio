import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import HamburgerButton from '../ui/HamburgerButton.jsx';
import useHideOnScroll from '../../hooks/useHideOnScroll.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import { scrollToSection } from '../../utils/scroll-to-section.js';

/** to: 이동할 탭 경로, sectionId: Home 안에서 스크롤할 섹션 id */
const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', sectionId: 'contact' },
];

/**
 * Navbar 컴포넌트
 * 사이트 상단 네비게이션 바.
 * - 아래로 스크롤하면 숨고, 위로 스크롤하면 다시 나타납니다.
 * - Contact 는 Home 의 Contact 섹션으로 부드럽게 스크롤합니다. (다른 탭에서는 Home 으로 이동 후 스크롤)
 * - 좁은 화면에서는 햄버거 버튼으로 여는 사이드 메뉴로 바뀝니다.
 * - 왼쪽의 로고를 누르면 Home 화면 맨 위로 이동합니다.
 */
function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHiddenByScroll = useHideOnScroll();
  const isHome = pathname === '/';
  const isContactInView = useActiveSection('contact', isHome);

  const isItemActive = (item) => {
    if (item.sectionId) {
      return isContactInView;
    }
    return pathname === item.to && !(item.to === '/' && isContactInView);
  };

  const handleItemClick = (item) => {
    setIsDrawerOpen(false);
    if (item.sectionId) {
      if (isHome) {
        scrollToSection(item.sectionId);
      } else {
        navigate('/', { state: { scrollTo: item.sectionId } });
      }
      return;
    }
    if (item.to === pathname) {
      scrollToSection('root');
    } else {
      navigate(item.to);
    }
  };

  const renderItem = (item, isInDrawer) => {
    const isActive = isItemActive(item);

    return (
      <Box
        key={item.label}
        component="button"
        type="button"
        onClick={() => handleItemClick(item)}
        aria-current={isActive ? 'page' : undefined}
        sx={{
          position: 'relative',
          minHeight: 44,
          px: isInDrawer ? 3 : 0.5,
          border: 'none',
          background: 'none',
          font: 'inherit',
          fontSize: isInDrawer ? '1.1rem' : '1rem',
          fontWeight: isActive ? 700 : 500,
          textAlign: 'left',
          color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: isInDrawer ? 24 : 4,
            right: isInDrawer ? 'auto' : 4,
            bottom: 8,
            width: isInDrawer ? 28 : 'auto',
            height: '2px',
            backgroundColor: 'var(--color-accent)',
            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          },
          '&:hover, &:focus-visible': { color: 'var(--color-link-hover)' },
          '&:hover::after, &:focus-visible::after': { transform: 'scaleX(1)' },
          '&:focus-visible': { outline: '2px solid var(--color-accent)', outlineOffset: 2, borderRadius: 1 },
        }}
      >
        {item.label}
      </Box>
    );
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-light)',
        // 사이드 메뉴가 열려 있을 때도 닫기(X) 버튼이 보이도록 메뉴보다 위에 둔다.
        zIndex: (theme) => (isDrawerOpen ? theme.zIndex.drawer + 1 : theme.zIndex.appBar),
        transform: isHiddenByScroll && !isDrawerOpen ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s ease',
        willChange: 'transform',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
          <Box
            component={RouterLink}
            to="/"
            onClick={() => scrollToSection('root')}
            aria-label="My Portfolio 홈으로 이동"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'var(--color-link-hover)' },
            }}
          >
            My Portfolio
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 2 } }}>
            <Box component="nav" aria-label="주 메뉴" sx={{ display: { xs: 'none', md: 'flex' }, gap: 2.5 }}>
              {NAV_ITEMS.map((item) => renderItem(item, false))}
            </Box>
            <ThemeToggle />
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <HamburgerButton isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen((prev) => !prev)} />
            </Box>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
        slotProps={{
          paper: {
            sx: {
              width: 'min(78vw, 300px)',
              pt: { xs: '56px', sm: '64px' },
              backgroundColor: 'var(--color-bg-secondary)',
              backgroundImage: 'none',
              borderLeft: '1px solid var(--color-border-light)',
            },
          },
        }}
      >
        <Box component="nav" aria-label="모바일 메뉴" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pt: 2 }}>
          {NAV_ITEMS.map((item) => renderItem(item, true))}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
