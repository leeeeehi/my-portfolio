import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/**
 * SectionWrapper 컴포넌트
 * Home 페이지의 각 섹션(Hero, About Me, Skill Tree, Projects, Contact)에서
 * 공통으로 사용하는 전체 너비 배경 + 중앙 정렬 컨테이너 레이아웃입니다.
 *
 * Props:
 * @param {string} id - 섹션 식별용 HTML id [Optional]
 * @param {string} bgColor - 섹션 배경색(CSS 변수) [Optional, 기본값: 'var(--color-bg-secondary)']
 * @param {string} maxWidth - MUI Container maxWidth [Optional, 기본값: 'md']
 * @param {node} children - 섹션 내부 콘텐츠 [Required]
 *
 * Example usage:
 * <SectionWrapper id="hero" bgColor="var(--color-bg-primary)">...</SectionWrapper>
 */
function SectionWrapper({ id, bgColor = 'var(--color-bg-secondary)', maxWidth = 'md', children }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: bgColor,
        borderBottom: '1px solid var(--color-border-light)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth={maxWidth} sx={{ px: { xs: 2, md: 3 } }}>
        {children}
      </Container>
    </Box>
  );
}

export default SectionWrapper;
