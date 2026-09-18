import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SectionWrapper from '../ui/SectionWrapper.jsx';
import GuestbookForm from './GuestbookForm.jsx';
import GuestbookList from './GuestbookList.jsx';
import ContactInfo from './ContactInfo.jsx';
import useGuestbook from '../../hooks/useGuestbook.js';

/**
 * ContactSection 컴포넌트
 * Home 페이지 최하단 Contact 섹션. 좌측 방명록 작성/목록, 우측 연락처·SNS 정보로 구성됩니다.
 */
function ContactSection() {
  const { entries, isLoading, isSubmitting, addEntry } = useGuestbook();

  return (
    <SectionWrapper id="contact" bgColor="var(--color-primary-dark)" maxWidth="lg">
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.6rem', md: '2.2rem' },
          color: 'var(--color-secondary)',
          textAlign: 'center',
          mb: { xs: 3, md: 5 },
        }}
      >
        Contact
      </Typography>
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 5, md: 7 } }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <GuestbookForm onSubmit={addEntry} isSubmitting={isSubmitting} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ContactInfo />
        </Grid>
      </Grid>

      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            color: 'var(--color-secondary)',
            fontWeight: 700,
            mb: 2,
          }}
        >
          방명록
        </Typography>
        <GuestbookList entries={entries} isLoading={isLoading} />
      </Box>
    </SectionWrapper>
  );
}

export default ContactSection;
