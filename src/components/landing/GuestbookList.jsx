import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

/**
 * GuestbookList 컴포넌트
 * 등록된 방명록 목록을 최신순으로 보여줍니다.
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 280, overflowY: 'auto', pr: 1 }}>
      {entries.map((entry) => (
        <Box
          key={entry.id}
          sx={{
            border: '1px solid var(--color-secondary)',
            borderRadius: 2,
            p: 1.5,
            opacity: 0.92,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
              {entry.name}
            </Typography>
            {entry.rating ? (
              <Rating value={entry.rating} size="small" readOnly sx={{ color: 'var(--color-accent)' }} />
            ) : null}
          </Box>
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-secondary)', lineHeight: 1.5 }}>
            {entry.message}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default GuestbookList;
