import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { keyframes } from '@mui/material/styles';

const wheel = keyframes`
  0% { opacity: 0; transform: translateY(0); }
  25% { opacity: 1; }
  70% { opacity: 1; transform: translateY(12px); }
  100% { opacity: 0; transform: translateY(12px); }
`;

/**
 * HeroScrollCue 컴포넌트
 * Hero 하단의 스크롤 유도 버튼. 마우스 모양 안에서 휠 점이 아래로 흐르는 애니메이션으로
 * 아래에 내용이 더 있음을 알려주고, 누르면 다음 섹션으로 이동합니다.
 *
 * Props:
 * @param {function} onClick - 클릭 시 실행할 함수 [Required]
 *
 * Example usage:
 * <HeroScrollCue onClick={() => scrollToSection('about')} />
 */
function HeroScrollCue({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      disableRipple
      aria-label="아래로 스크롤"
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        minWidth: 48,
        minHeight: 48,
        p: 0.5,
        fontFamily: 'inherit',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.24em',
        color: 'var(--color-text-primary)',
        transition: 'color 0.3s ease, transform 0.3s ease',
        '@media (hover: hover)': {
          '&:hover': { color: 'var(--color-accent)', transform: 'translateY(3px)' },
          '&:hover .hero-scroll__mouse': { borderColor: 'var(--color-accent)' },
        },
        '&:focus-visible': { outline: '2px solid var(--color-accent)', outlineOffset: 4, borderRadius: 1 },
      }}
    >
      <Box
        className="hero-scroll__mouse"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: 22,
          height: 36,
          pt: '6px',
          border: '2px solid var(--color-text-primary)',
          borderRadius: '12px',
          transition: 'border-color 0.3s ease',
        }}
      >
        <Box
          sx={{
            width: 4,
            height: 7,
            borderRadius: 2,
            backgroundColor: 'var(--color-accent)',
            animation: `${wheel} 1.8s ease-in-out infinite`,
          }}
        />
      </Box>
      SCROLL
    </ButtonBase>
  );
}

export default HeroScrollCue;
