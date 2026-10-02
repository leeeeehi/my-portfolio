import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkIcon from '@mui/icons-material/Work';

/**
 * ProfileCard 컴포넌트
 * 기본 정보(프로필 사진, 이름, 학력, 전공, 경력) 카드입니다.
 * About Me 페이지 상단에서는 가로형, Home 탭 사이드에서는 세로형(isCompact)으로 사용합니다.
 * (카드 표면색은 다크모드에서도 크림색으로 유지되므로, 카드 안의 글자색은
 * 모드에 따라 반전되는 CSS 변수 대신 theme 팔레트의 고정 색상을 사용합니다.)
 *
 * Props:
 * @param {object} basicInfo - 기본 정보 { name, education, major, experience, photo } [Required]
 * @param {boolean} isCompact - 좁은 영역용 세로형 레이아웃 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <ProfileCard basicInfo={aboutMeData.basicInfo} />
 */
function ProfileCard({ basicInfo, isCompact = false }) {
  const { name, education, major, experience, photo } = basicInfo;

  const infoItems = [
    { label: '학력', value: education, Icon: SchoolIcon },
    { label: '전공', value: major, Icon: AutoStoriesIcon },
    { label: '경력', value: experience, Icon: WorkIcon },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: isCompact ? 'column' : { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: isCompact ? 2.5 : { xs: 3, md: 5 },
        backgroundColor: 'var(--color-secondary)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 3,
        p: isCompact ? 3 : { xs: 3, md: 5 },
      }}
    >
      <Avatar
        src={photo || undefined}
        alt={`${name} 프로필 사진`}
        sx={{
          flexShrink: 0,
          width: isCompact ? 104 : { xs: 120, md: 160 },
          height: isCompact ? 104 : { xs: 120, md: 160 },
          color: 'secondary.main',
          backgroundColor: 'primary.main',
          border: '4px solid',
          borderColor: 'primary.dark',
        }}
      >
        <PersonIcon sx={{ fontSize: isCompact ? '3.5rem' : { xs: '4rem', md: '5.5rem' } }} />
      </Avatar>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          textAlign: isCompact ? 'center' : { xs: 'center', sm: 'left' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: isCompact ? '1.5rem' : { xs: '1.8rem', md: '2.4rem' },
            lineHeight: 1.3,
            color: 'text.primary',
            mb: isCompact ? 2 : 0,
          }}
        >
          {name}
        </Typography>
        {isCompact ? null : (
          <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'primary.dark', fontWeight: 700, mb: 3 }}>
            만드는 것에서 멈추지 않고, 쓰이게 만드는 개발자
          </Typography>
        )}

        <Grid container spacing={isCompact ? 1.5 : 2}>
          {infoItems.map(({ label, value, Icon }) => (
            <Grid key={label} size={isCompact ? { xs: 12 } : { xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'left' }}>
                <Icon sx={{ color: 'primary.dark' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.disabled', fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.4, color: 'text.primary' }}>
                    {value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(ProfileCard);
