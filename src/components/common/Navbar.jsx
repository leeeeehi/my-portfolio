import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

/**
 * Navbar 컴포넌트
 * 사이트 상단 네비게이션 바. Home / About Me / Projects 탭을 제공합니다.
 */
function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-light)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'var(--color-text-primary)',
            }}
          >
            My Portfolio
          </Box>
          <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 3 } }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                sx={{
                  textDecoration: 'none',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  borderBottom: '2px solid transparent',
                  pb: 0.5,
                  '&:hover': {
                    color: 'var(--color-link-hover)',
                  },
                  '&.active': {
                    color: 'var(--color-button-primary)',
                    borderBottom: '2px solid var(--color-button-primary)',
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
