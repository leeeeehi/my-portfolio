import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

const outlinedButtonSx = {
  borderColor: 'var(--color-button-primary)',
  color: 'var(--color-button-primary)',
  '&:hover': {
    borderColor: 'var(--color-button-hover)',
    color: 'var(--color-button-hover)',
    backgroundColor: 'transparent',
  },
};

/**
 * AboutTabs 컴포넌트
 * About Me 콘텐츠 섹션들을 탭으로 전환하며 보여주고, 선택한 섹션의 내용을 수정할 수 있습니다.
 *
 * Props:
 * @param {Array} sections - 콘텐츠 섹션 배열 { id, title, content, showInHome } [Required]
 * @param {function} onContentChange - 내용 저장 시 실행할 함수 (sectionId, content) [Optional]
 *
 * Example usage:
 * <AboutTabs sections={aboutMeData.sections} onContentChange={updateSectionContent} />
 */
function AboutTabs({ sections, onContentChange }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const activeSection = sections.find((section) => section.id === activeId);

  const handleTabChange = (event, newId) => {
    setActiveId(newId);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setDraft(activeSection.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    onContentChange(activeSection.id, draft.trim());
    setIsEditing(false);
  };

  return (
    <Box>
      <Tabs
        value={activeId}
        onChange={handleTabChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="About Me 콘텐츠 섹션"
        sx={{
          borderBottom: '1px solid var(--color-border-light)',
          '& .MuiTabs-indicator': { backgroundColor: 'var(--color-accent)', height: 3 },
          '& .MuiTabs-scrollButtons': { color: 'var(--color-text-secondary)' },
        }}
      >
        {sections.map((section) => (
          <Tab
            key={section.id}
            value={section.id}
            label={section.title}
            id={`about-tab-${section.id}`}
            aria-controls={`about-tabpanel-${section.id}`}
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: 'var(--color-text-secondary)',
              '&.Mui-selected': { color: 'var(--color-text-primary)', fontWeight: 700 },
            }}
          />
        ))}
      </Tabs>

      {activeSection ? (
        <Box
          role="tabpanel"
          id={`about-tabpanel-${activeSection.id}`}
          aria-labelledby={`about-tab-${activeSection.id}`}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: { xs: 3, md: 4 }, px: { xs: 0.5, md: 2 } }}
        >
          {isEditing ? (
            <>
              <TextField
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                multiline
                minRows={8}
                fullWidth
                autoFocus
                helperText="빈 줄로 문단을 나눕니다."
                slotProps={{ htmlInput: { 'aria-label': `${activeSection.title} 내용` } }}
                sx={{
                  '& .MuiInputBase-root': { backgroundColor: 'var(--color-secondary)', lineHeight: 1.6 },
                  '& .MuiFormHelperText-root': { color: 'var(--color-text-muted)' },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={() => setIsEditing(false)} sx={outlinedButtonSx}>
                  취소
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: 'var(--color-button-primary)',
                    color: 'var(--color-secondary)',
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: 'var(--color-button-hover)', boxShadow: 'none' },
                  }}
                >
                  저장
                </Button>
              </Box>
            </>
          ) : (
            <>
              {activeSection.content.split('\n\n').map((paragraph, index) => (
                <Typography
                  key={`${activeSection.id}-${index}`}
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    wordBreak: 'keep-all',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
              {onContentChange ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={handleStartEdit}
                    sx={outlinedButtonSx}
                  >
                    내용 수정
                  </Button>
                </Box>
              ) : null}
            </>
          )}
        </Box>
      ) : null}
    </Box>
  );
}

export default AboutTabs;
