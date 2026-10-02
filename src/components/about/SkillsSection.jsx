import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SkillItem from './SkillItem.jsx';
import SkillAddDialog from './SkillAddDialog.jsx';
import usePortfolio from '../../hooks/usePortfolio.js';
import { SKILL_CATEGORIES, groupSkillsByCategory } from '../../utils/skill-utils.js';

/**
 * SkillsSection 컴포넌트
 * About Me 페이지의 스킬 섹션. 스킬을 카테고리별로 묶어 보여주고, 숙련도 수정과
 * '스킬 추가' 버튼을 제공합니다. (변경 사항은 Context 를 통해 Home 탭에 바로 반영됩니다.)
 * 수정·추가 UI 는 isEditable 일 때, 즉 개발 서버에서만 보입니다.
 */
function SkillsSection() {
  const { aboutMeData, isEditable, addSkill, updateSkillLevel } = usePortfolio();
  const { skills } = aboutMeData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const skillGroups = groupSkillsByCategory(skills);

  return (
    <Box component="section">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: { xs: 2, md: 3 } }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, color: 'var(--color-text-primary)' }}
        >
          Skills
        </Typography>
        {isEditable ? (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
            sx={{
              flexShrink: 0,
              borderColor: 'var(--color-button-primary)',
              color: 'var(--color-button-primary)',
              '&:hover': {
                borderColor: 'var(--color-button-hover)',
                color: 'var(--color-button-hover)',
                backgroundColor: 'transparent',
              },
            }}
          >
            스킬 추가
          </Button>
        ) : null}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
        {skillGroups.map((group) => (
          <Box key={group.category}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: SKILL_CATEGORIES[group.category].color,
                }}
              />
              <Typography
                variant="h3"
                sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, fontWeight: 700, color: 'var(--color-text-secondary)' }}
              >
                {group.category}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {group.skills.map((skill) => (
                <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <SkillItem skill={skill} onLevelChange={isEditable ? updateSkillLevel : undefined} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      {isEditable ? (
        <SkillAddDialog
          isOpen={isDialogOpen}
          existingNames={skills.map((skill) => skill.name)}
          onClose={() => setIsDialogOpen(false)}
          onAdd={addSkill}
        />
      ) : null}
    </Box>
  );
}

export default SkillsSection;
