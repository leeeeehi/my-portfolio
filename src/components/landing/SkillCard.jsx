import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SkillIcon from '../ui/SkillIcon.jsx';

const GAUGE_SIZE = 88;
const GAUGE_THICKNESS = 5;

/**
 * SkillCard 컴포넌트
 * 기술 하나를 아이콘 + 이름으로 표시하고, 아이콘을 감싼 원형 게이지로 숙련도를 보여줍니다.
 * (카드 표면색은 다크모드에서도 크림색으로 유지되므로, 카드 안의 글자색은
 * 모드에 따라 반전되는 CSS 변수 대신 theme 팔레트의 고정 색상을 사용합니다.)
 *
 * Props:
 * @param {string} name - 기술 이름 [Required]
 * @param {number} value - 숙련도(0~100) [Required]
 * @param {string} icon - 스킬 아이콘 키 [Required]
 *
 * Example usage:
 * <SkillCard name="JavaScript" value={80} icon="zap" />
 */
function SkillCard({ name, value, icon }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'var(--color-secondary)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 2,
        px: 1.5,
        py: { xs: 2.5, md: 3 },
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 10px 22px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ position: 'relative', width: GAUGE_SIZE, height: GAUGE_SIZE, mb: 0.5 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={GAUGE_SIZE}
          thickness={GAUGE_THICKNESS}
          aria-hidden
          sx={{ position: 'absolute', inset: 0, color: 'divider' }}
        />
        <CircularProgress
          variant="determinate"
          value={value}
          size={GAUGE_SIZE}
          thickness={GAUGE_THICKNESS}
          aria-label={`${name} 숙련도 ${value}%`}
          sx={{
            position: 'absolute',
            inset: 0,
            color: 'primary.dark',
            '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
          }}
        />
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SkillIcon icon={icon} sx={{ fontSize: '2.2rem', color: 'primary.dark' }} />
        </Box>
      </Box>
      <Typography sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, fontWeight: 700, color: 'text.primary' }}>
        {name}
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary' }}>
        {value}%
      </Typography>
    </Box>
  );
}

export default memo(SkillCard);
