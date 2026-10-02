import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CircularGauge from '../ui/CircularGauge.jsx';
import SkillIcon from '../ui/SkillIcon.jsx';
import useInView from '../../hooks/useInView.js';
import useCountUp from '../../hooks/useCountUp.js';
import { cardLiftSx, iconSpinGlowSx } from '../../utils/interaction-styles.js';

const COUNT_DURATION_MS = 1400;

/**
 * SkillCard 컴포넌트
 * 기술 하나를 아이콘 + 이름으로 표시하고, 아이콘을 감싼 원형 게이지로 숙련도를 보여줍니다.
 * 화면에 들어오면 게이지와 퍼센트 숫자가 함께 차오르고, 호버·포커스 시 아이콘이 돌며 빛나고
 * 설명 툴팁이 나타납니다.
 * (카드 표면색은 다크모드에서도 크림색으로 유지되므로, 카드 안의 글자색은
 * 모드에 따라 반전되는 CSS 변수 대신 theme 팔레트의 고정 색상을 사용합니다.)
 *
 * Props:
 * @param {string} name - 기술 이름 [Required]
 * @param {number} value - 숙련도(0~100) [Required]
 * @param {string} icon - 스킬 아이콘 키 [Required]
 * @param {string} description - 호버 시 툴팁으로 보여줄 설명 [Optional, 기본값: '']
 *
 * Example usage:
 * <SkillCard name="JavaScript" value={80} icon="zap" description="ES6+ 문법과 비동기 처리" />
 */
function SkillCard({ name, value, icon, description = '' }) {
  const [ref, isInView] = useInView({ threshold: 0.4 });
  const count = useCountUp(value, isInView, COUNT_DURATION_MS);

  return (
    <Tooltip title={description} placement="top" arrow>
      <Box
        ref={ref}
        tabIndex={0}
        className="skill-hover-parent"
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
          outline: 'none',
          ...cardLiftSx,
        }}
      >
        <Box sx={{ mb: 0.5 }}>
          <CircularGauge value={count} label={`${name} 숙련도 ${value}%`}>
            <Box sx={iconSpinGlowSx}>
              <SkillIcon icon={icon} sx={{ fontSize: '2.2rem', color: 'primary.dark' }} />
            </Box>
          </CircularGauge>
        </Box>
        <Typography sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, fontWeight: 700, color: 'text.primary' }}>
          {name}
        </Typography>
        <Typography
          aria-hidden
          sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
        >
          {count}%
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default memo(SkillCard);
