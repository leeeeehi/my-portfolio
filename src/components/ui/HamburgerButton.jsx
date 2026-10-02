import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

const barSx = {
  position: 'absolute',
  left: 0,
  width: '100%',
  height: '2px',
  borderRadius: 1,
  backgroundColor: 'currentColor',
  transition: 'transform 0.3s ease, opacity 0.2s ease',
};

/**
 * HamburgerButton 컴포넌트
 * 모바일 메뉴 여닫기 버튼. 열리면 세 줄이 X 모양으로 바뀝니다.
 *
 * Props:
 * @param {boolean} isOpen - 메뉴가 열려 있는지 여부 [Required]
 * @param {function} onClick - 클릭 시 실행할 함수 [Required]
 *
 * Example usage:
 * <HamburgerButton isOpen={isOpen} onClick={handleToggle} />
 */
function HamburgerButton({ isOpen, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isOpen}
      sx={{ width: 44, height: 44, color: 'var(--color-text-primary)' }}
    >
      <Box sx={{ position: 'relative', width: 22, height: 16 }}>
        <Box sx={{ ...barSx, top: 0, transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
        <Box sx={{ ...barSx, top: 7, opacity: isOpen ? 0 : 1, transform: isOpen ? 'scaleX(0)' : 'none' }} />
        <Box sx={{ ...barSx, top: 14, transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
      </Box>
    </IconButton>
  );
}

export default HamburgerButton;
