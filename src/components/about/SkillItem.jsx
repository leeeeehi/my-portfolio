import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { keyframes } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import SkillIcon from '../ui/SkillIcon.jsx';
import { SKILL_CATEGORIES } from '../../utils/skill-utils.js';

/** 프로그레스 바가 0 에서 실제 숙련도까지 차오르는 애니메이션 */
const fillBar = keyframes`
  from { transform: translateX(-100%); }
`;

/**
 * SkillItem 컴포넌트
 * 스킬 하나를 아이콘 + 기술명 + 숙련도 퍼센트 바 카드로 표시하고, 호버 시 설명 툴팁을 보여줍니다.
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
  const categoryColor = SKILL_CATEGORIES[category]?.color ?? 'primary.dark';
  const shownLevel = isEditing ? draftLevel : level;

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
        sx={{
          height: '100%',
          backgroundColor: 'var(--color-secondary)',
          border: '1px solid var(--color-border-light)',
          borderLeft: '4px solid',
          borderLeftColor: categoryColor,
          borderRadius: 2,
          p: 2,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.14)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SkillIcon icon={icon} sx={{ color: categoryColor }} />
          <Typography sx={{ flexGrow: 1, fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.secondary' }}>
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
              value={level}
              aria-label={`${name} 숙련도`}
              sx={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                backgroundColor: 'divider',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: categoryColor,
                  animation: `${fillBar} 1.1s ease-out`,
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
