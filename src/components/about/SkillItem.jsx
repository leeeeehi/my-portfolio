import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import SkillIcon from '../ui/SkillIcon.jsx';
import useInView from '../../hooks/useInView.js';
import useCountUp from '../../hooks/useCountUp.js';
import { SKILL_CATEGORIES } from '../../utils/skill-utils.js';
import { cardLiftSx, iconSpinGlowSx } from '../../utils/interaction-styles.js';

const COUNT_DURATION_MS = 1300;

/**
 * SkillItem 컴포넌트
 * 스킬 하나를 아이콘 + 기술명 + 숙련도 퍼센트 바 카드로 표시하고, 호버 시 설명 툴팁을 보여줍니다.
 * 화면에 들어오면 퍼센트 바와 숫자가 0 부터 함께 차오르고, 호버 시 아이콘이 돌며 빛납니다.
 * 그 기술을 사용한 프로젝트가 있으면 카드 아래에 함께 보여줍니다.
 * onLevelChange 가 주어지면 연필 버튼으로 숙련도를 바꿀 수 있습니다.
 * (카드 표면색은 다크모드에서도 크림색으로 유지되므로, 카드 안의 글자색은
 * 모드에 따라 반전되는 CSS 변수 대신 theme 팔레트의 고정 색상을 사용합니다.)
 *
 * Props:
 * @param {object} skill - 스킬 정보 { id, icon, name, level, category, description, projects } [Required]
 * @param {function} onLevelChange - 숙련도 변경 시 실행할 함수 (id, level) [Optional]
 *
 * Example usage:
 * <SkillItem skill={skill} onLevelChange={updateSkillLevel} />
 */
function SkillItem({ skill, onLevelChange }) {
  const { id, icon, name, level, category, description, projects = [] } = skill;
  const [isEditing, setIsEditing] = useState(false);
  const [draftLevel, setDraftLevel] = useState(level);
  const [ref, isInView] = useInView({ threshold: 0.4 });
  const countedLevel = useCountUp(level, isInView, COUNT_DURATION_MS);
  const categoryColor = SKILL_CATEGORIES[category]?.color ?? 'primary.dark';
  const shownLevel = isEditing ? draftLevel : countedLevel;

  const handleToggleEdit = () => {
    if (isEditing) {
      onLevelChange(id, draftLevel);
    } else {
      setDraftLevel(level);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <Tooltip title={isEditing ? '' : description} placement="top" arrow>
      <Box
        ref={ref}
        className="skill-hover-parent"
        sx={{
          height: '100%',
          backgroundColor: 'var(--color-secondary)',
          border: '1px solid var(--color-border-light)',
          borderLeft: '4px solid',
          borderLeftColor: categoryColor,
          borderRadius: 2,
          p: 2,
          ...cardLiftSx,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={iconSpinGlowSx}>
            <SkillIcon icon={icon} sx={{ color: categoryColor }} />
          </Box>
          <Typography sx={{ flexGrow: 1, fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
          >
            {shownLevel}%
          </Typography>
          {onLevelChange ? (
            <IconButton
              size="small"
              onClick={handleToggleEdit}
              aria-label={isEditing ? `${name} 숙련도 저장` : `${name} 숙련도 수정`}
              sx={{ color: 'text.disabled', '&:hover': { color: 'text.secondary' } }}
            >
              {isEditing ? <CheckIcon fontSize="small" /> : <EditIcon fontSize="small" />}
            </IconButton>
          ) : null}
        </Box>
        <Box sx={{ height: 28, display: 'flex', alignItems: 'center' }}>
          {isEditing ? (
            <Slider
              value={draftLevel}
              onChange={(event, newLevel) => setDraftLevel(newLevel)}
              min={0}
              max={100}
              step={5}
              size="small"
              aria-label={`${name} 숙련도`}
              sx={{ color: categoryColor }}
            />
          ) : (
            <LinearProgress
              variant="determinate"
              value={countedLevel}
              aria-label={`${name} 숙련도 ${level}%`}
              sx={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                backgroundColor: 'divider',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: categoryColor,
                  // 숫자 카운팅과 정확히 같이 움직이도록 MUI 기본 전환을 끈다.
                  transition: 'none',
                },
              }}
            />
          )}
        </Box>
        {projects.length > 0 ? (
          <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.4, color: 'text.secondary', mt: 1 }}>
            프로젝트 {projects.length}개 · {projects.join(', ')}
          </Typography>
        ) : null}
      </Box>
    </Tooltip>
  );
}

export default memo(SkillItem);
