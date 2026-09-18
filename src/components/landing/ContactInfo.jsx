import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const CONTACT_EMAIL = 'hello@example.com'; // TODO: 실제 이메일로 교체

const SNS_LINKS = [
  { label: 'GitHub', href: 'https://github.com/leeeeehi', Icon: GitHubIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedInIcon }, // TODO: 실제 링크로 교체
  { label: 'Instagram', href: '#', Icon: InstagramIcon }, // TODO: 실제 링크로 교체
];

/**
 * ContactInfo 컴포넌트
 * 이메일 연락처와 SNS 아이콘 버튼을 아이콘+텍스트 형태로 보여줍니다.
 */
function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignSelf: 'flex-start' }}>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            color: 'var(--color-secondary)',
            fontWeight: 700,
            mb: 1,
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            color: 'var(--color-secondary)',
            mb: 2,
          }}
        >
          궁금한 점이나 함께 이야기하고 싶은 것이 있다면 언제든 편하게 연락해주세요.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ color: 'var(--color-secondary)', fontSize: '1.2rem' }} />
          <Tooltip title={copied ? '복사됨!' : '클릭해서 이메일 복사'} placement="top" arrow>
            <Box
              component="button"
              type="button"
              onClick={handleCopyEmail}
              sx={{
                fontSize: { xs: '0.95rem', md: '1rem' },
                color: 'var(--color-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0,
                fontFamily: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {CONTACT_EMAIL}
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {SNS_LINKS.map(({ label, href, Icon }) => (
          <IconButton
            key={label}
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            sx={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-primary-dark)',
              width: 44,
              height: 44,
              '&:hover': {
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-secondary)',
              },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default ContactInfo;
