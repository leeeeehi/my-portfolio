import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { keyframes } from '@mui/material/styles';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useTypingText from '../../hooks/useTypingText.js';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

/**
 * HeroTypingLine 컴포넌트
 * Hero 헤드라인 아래의 포지셔닝 문구를 타이핑 효과로 차례로 보여주고,
 * 옆의 버튼으로 움직이는 글자를 멈추거나 다시 재생할 수 있습니다.
 * (글자가 바뀔 때 아래 내용이 밀리지 않도록 줄 높이만큼 자리를 미리 잡아 둡니다.
 * 스크린리더에는 움직이는 글자 대신 첫 문구를 그대로 읽어 줍니다.)
 *
 * Props:
 * @param {Array} phrases - 차례로 보여줄 문구 배열 (상수 배열) [Required]
 * @param {boolean} isPaused - 일시정지 여부 [Optional, 기본값: false]
 * @param {function} onTogglePause - 일시정지/재생 버튼 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <HeroTypingLine phrases={PHRASES} isPaused={isPaused} onTogglePause={handleToggle} />
 */
function HeroTypingLine({ phrases, isPaused = false, onTogglePause }) {
  const typedText = useTypingText(phrases, isPaused);
  const pauseLabel = isPaused ? '글자 애니메이션 재생' : '글자 애니메이션 일시정지';

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 0.5 }}>
      <Box
        component="p"
        aria-label={phrases[0]}
        sx={{
          m: 0,
          minHeight: { xs: '2.8em', sm: '1.4em' },
          fontSize: { xs: '1.15rem', sm: '1.35rem', md: '1.4rem', lg: '1.75rem' },
          fontWeight: 700,
          lineHeight: 1.4,
          color: 'var(--color-text-primary)',
          wordBreak: 'keep-all',
        }}
      >
        <Box component="span" aria-hidden>
          {typedText}
        </Box>
        <Box
          component="span"
          aria-hidden
          sx={{
            display: 'inline-block',
            width: '3px',
            height: '1.05em',
            ml: 0.5,
            verticalAlign: 'text-bottom',
            backgroundColor: 'var(--color-accent)',
            animation: isPaused ? 'none' : `${blink} 1s step-end infinite`,
          }}
        />
      </Box>
      {onTogglePause ? (
        <Tooltip title={pauseLabel} arrow>
          <IconButton
            onClick={onTogglePause}
            aria-label={pauseLabel}
            aria-pressed={isPaused}
            size="small"
            sx={{
              flexShrink: 0,
              mt: { xs: -0.25, lg: 0.25 },
              color: 'var(--color-text-secondary)',
              '&:hover': { color: 'var(--color-accent)', backgroundColor: 'transparent' },
            }}
          >
            {isPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
}

export default HeroTypingLine;
