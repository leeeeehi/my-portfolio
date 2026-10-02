import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import { SKILL_CATEGORIES, SKILL_PRESETS } from '../../utils/skill-utils.js';

const CATEGORY_NAMES = Object.keys(SKILL_CATEGORIES);
const DEFAULT_LEVEL = 50;

/**
 * SkillAddDialog 컴포넌트
 * 새 스킬(기술명, 카테고리, 숙련도, 설명)을 입력받는 다이얼로그입니다.
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {Array} existingNames - 이미 등록된 기술명 배열 (중복 방지용) [Optional, 기본값: []]
 * @param {function} onClose - 닫기 시 실행할 함수 [Required]
 * @param {function} onAdd - 추가 시 실행할 함수 ({ name, level, category, description }) [Required]
 *
 * Example usage:
 * <SkillAddDialog isOpen={isOpen} existingNames={names} onClose={handleClose} onAdd={addSkill} />
 */
function SkillAddDialog({ isOpen, existingNames = [], onClose, onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORY_NAMES[0]);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [description, setDescription] = useState('');

  const trimmedName = name.trim();
  const isDuplicate = existingNames.some((existing) => existing.toLowerCase() === trimmedName.toLowerCase());
  const presetOptions = SKILL_PRESETS
    .map((preset) => preset.name)
    .filter((presetName) => !existingNames.includes(presetName));

  const resetForm = () => {
    setName('');
    setCategory(CATEGORY_NAMES[0]);
    setLevel(DEFAULT_LEVEL);
    setDescription('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNameChange = (event, newName) => {
    setName(newName);
    const preset = SKILL_PRESETS.find((item) => item.name === newName);
    if (preset) {
      setCategory(preset.category);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmedName || isDuplicate) {
      return;
    }
    onAdd({ name: trimmedName, level, category, description: description.trim() || `${trimmedName} 학습 중` });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700 }}>스킬 추가</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '8px !important' }}>
          <Autocomplete
            freeSolo
            options={presetOptions}
            inputValue={name}
            onInputChange={handleNameChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="기술명"
                required
                autoFocus
                error={isDuplicate}
                helperText={isDuplicate ? '이미 등록된 기술입니다.' : '목록에서 고르거나 직접 입력하세요.'}
              />
            )}
          />
          <TextField
            select
            label="카테고리"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORY_NAMES.map((categoryName) => (
              <MenuItem key={categoryName} value={categoryName}>
                {categoryName}
              </MenuItem>
            ))}
          </TextField>
          <Box>
            <Typography id="skill-level-label" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
              숙련도 {level}%
            </Typography>
            <Slider
              value={level}
              onChange={(event, newLevel) => setLevel(newLevel)}
              min={0}
              max={100}
              step={5}
              aria-labelledby="skill-level-label"
              sx={{ color: 'primary.dark' }}
            />
          </Box>
          <TextField
            label="설명 (호버 시 표시)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!trimmedName || isDuplicate}
            sx={{
              color: 'secondary.main',
              backgroundColor: 'primary.dark',
              boxShadow: 'none',
              '&:hover': { backgroundColor: 'text.secondary', boxShadow: 'none' },
            }}
          >
            추가
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default SkillAddDialog;
