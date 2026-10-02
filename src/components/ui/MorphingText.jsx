import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const morphIn = keyframes`
  from { opacity: 0; filter: blur(8px); transform: translate3d(0, 0.5em, 0); }
  to { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
`;

const morphOut = keyframes`
  from { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
  to { opacity: 0; filter: blur(8px); transform: translate3d(0, -0.5em, 0); }
`;

const MORPH_MS = 600;
const cellSx = { gridArea: '1 / 1', whiteSpace: 'nowrap' };

/**
 * MorphingText 컴포넌트
 * 여러 단어가 흐려지며 다음 단어로 바뀌는 텍스트 모핑 효과입니다.
 * (가장 긴 단어만큼 자리를 미리 잡아 두어 단어가 바뀌어도 주변 글자가 밀리지 않습니다.
 * 스크린리더에는 모든 단어를 한 번에 읽어 줍니다.)
 *
 * Props:
 * @param {Array} words - 차례로 보여줄 단어 배열 (상수 배열) [Required]
 * @param {number} interval - 단어가 바뀌는 간격(ms) [Optional, 기본값: 2600]
 * @param {boolean} isPaused - 일시정지 여부 [Optional, 기본값: false]
 * @param {object} sx - 감싸는 요소에 적용할 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <MorphingText words={['개발합니다', '기획합니다']} />
 */
function MorphingText({ words, interval = 2600, isPaused = false, sx }) {
  const [tick, setTick] = useState(0);
  const currentWord = words[tick % words.length];
  const previousWord = tick > 0 ? words[(tick - 1) % words.length] : null;

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }
    const timer = setInterval(() => setTick((prev) => prev + 1), interval);
    return () => clearInterval(timer);
  }, [interval, isPaused]);

  return (
    <Box component="span" aria-label={words.join(', ')} sx={{ display: 'inline-grid', ...sx }}>
      {words.map((word) => (
        <Box key={word} component="span" aria-hidden sx={{ ...cellSx, visibility: 'hidden' }}>
          {word}
        </Box>
      ))}
      {previousWord ? (
        <Box
          key={`out-${tick}`}
          component="span"
          aria-hidden
          sx={{ ...cellSx, animation: `${morphOut} ${MORPH_MS}ms ease both` }}
        >
          {previousWord}
        </Box>
      ) : null}
      <Box
        key={`in-${tick}`}
        component="span"
        aria-hidden
        sx={{ ...cellSx, animation: tick > 0 ? `${morphIn} ${MORPH_MS}ms ease both` : 'none' }}
      >
        {currentWord}
      </Box>
    </Box>
  );
}

export default MorphingText;
