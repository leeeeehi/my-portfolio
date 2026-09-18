import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { formatDate } from '../../utils/format-date.js';

/**
 * GuestbookList 컴포넌트
 * 등록된 방명록 목록을 카드 그리드로 최신순 표시합니다.
 *
 * Props:
 * @param {Array} entries - 방명록 항목 배열 { id, name, message, rating, created_at } [Required]
 * @param {boolean} isLoading - 로딩 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookList entries={entries} isLoading={isLoading} />
 */
function GuestbookList({ entries, isLoading = false }) {
  if (isLoading) {
    return (
      <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-secondary)', opacity: 0.8 }}>
        방명록을 불러오는 중...
      </Typography>
    );
  }

  if (entries.length === 0) {
    return (
      <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-secondary)', opacity: 0.8 }}>
        아직 방명록이 없어요. 첫 방문 기록을 남겨주세요!
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {entries.map((entry) => (
        <Grid key={entry.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              backgroundColor: 'var(--color-secondary)',
              border: '1px solid var(--color-border-light)',
              borderRadius: 2,
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {entry.name}
              </Typography>
              {entry.rating ? (
                <Rating value={entry.rating} size="small" readOnly sx={{ color: 'var(--color-accent)' }} />
              ) : null}
            </Box>
            <Typography
              sx={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                flexGrow: 1,
              }}
            >
              {entry.message}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              {formatDate(entry.created_at)}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default GuestbookList;
