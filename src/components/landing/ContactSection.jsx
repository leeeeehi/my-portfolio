import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionWrapper from '../ui/SectionWrapper.jsx';

const PLACEHOLDER_SNS = ['Email', 'GitHub', 'LinkedIn', 'Instagram'];

/**
 * ContactSection 컴포넌트
 * Home 페이지 최하단 Contact 섹션. 연락처/SNS/메시지 폼이 들어갈 자리를 안내합니다.
 */
function ContactSection() {
  return (
    <SectionWrapper id="contact" bgColor="var(--color-primary-dark)">
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: 'var(--color-secondary)',
            mb: 2,
          }}
        >
          Contact
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            color: 'var(--color-secondary)',
            mb: 3,
          }}
        >
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
          {PLACEHOLDER_SNS.map((sns) => (
            <Typography
              key={sns}
              sx={{
                fontSize: '0.9rem',
                color: 'var(--color-secondary)',
                border: '1px solid var(--color-secondary)',
                borderRadius: 4,
                px: 2,
                py: 0.5,
                opacity: 0.85,
              }}
            >
              {sns}
            </Typography>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
}

export default ContactSection;
