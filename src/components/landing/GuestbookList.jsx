import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import AnimatedList from '../ui/AnimatedList.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import { formatDate } from '../../utils/format-date.js';

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_STEP = 4;

/**
 * GuestbookList 컴포넌트
 * 등록된 방명록 목록을 카드 그리드로 최신순 표시합니다. 처음에는 6개만 보여주고,
 * 더보기 버튼을 누를 때마다 4개씩 추가로 보여줍니다.
 * 카드는 AnimatedList 로 하나씩 튀어나오며 쌓이고, 새 글이 등록되면 맨 앞에 끼어듭니다.
 * (카드 표면색은 다크모드에서도 크림색이므로 카드 안 글자색은 theme 팔레트의 고정 색상을 씁니다.)
 *
 * Props:
 * @param {Array} entries - 방명록 항목 배열 { id, name, message, rating, created_at } [Required]
 * @param {boolean} isLoading - 로딩 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookList entries={entries} isLoading={isLoading} />
 */
function GuestbookList({ entries, isLoading = false }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  if (isLoading) {
    return <LoadingSpinner label="방명록을 불러오는 중..." color="var(--color-secondary)" />;
  }

  if (entries.length === 0) {
    return (
      <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-secondary)', opacity: 0.8 }}>
        아직 방명록이 없어요. 첫 방문 기록을 남겨주세요!
      </Typography>
    );
  }

  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  return (
    <Box>
      <AnimatedList itemSize={{ xs: 12, sm: 6, md: 4 }}>
        {visibleEntries.map((entry) => (
          <Box
            key={entry.id}
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
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'text.primary' }}>
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
                color: 'text.secondary',
                flexGrow: 1,
              }}
            >
              {entry.message}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: 'text.disabled' }}>
              {formatDate(entry.created_at)}
            </Typography>
          </Box>
        ))}
      </AnimatedList>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
            sx={{
              borderColor: 'var(--color-secondary)',
              color: 'var(--color-secondary)',
              '&:hover': {
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent)',
                backgroundColor: 'transparent',
              },
            }}
          >
            더보기
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default GuestbookList;
