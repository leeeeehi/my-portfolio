import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

/**
 * ProjectCardSkeleton 컴포넌트
 * 프로젝트를 불러오는 동안 ProjectCard 자리에 보여주는 뼈대(스켈레톤) UI 입니다.
 * 실제 카드와 같은 구조와 크기라서 불러온 뒤에도 화면이 덜컹거리지 않습니다.
 */
function ProjectCardSkeleton() {
  return (
    <Box
      aria-hidden
      sx={{
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--color-secondary)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 2,
      }}
    >
      <Skeleton variant="rectangular" animation="wave" sx={{ width: '100%', height: 'auto', aspectRatio: '4 / 3' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" animation="wave" sx={{ width: '45%', fontSize: '1.2rem' }} />
          <Skeleton variant="rounded" animation="wave" sx={{ width: 44, height: 24, borderRadius: 3 }} />
        </Box>
        <Skeleton variant="text" animation="wave" sx={{ width: '90%', fontSize: '0.9rem' }} />
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {[56, 72, 64].map((width) => (
            <Skeleton key={width} variant="rounded" animation="wave" sx={{ width, height: 24, borderRadius: 3 }} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
          <Skeleton variant="rounded" animation="wave" sx={{ flex: 1, height: 31 }} />
          <Skeleton variant="rounded" animation="wave" sx={{ flex: 1, height: 31 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectCardSkeleton;
