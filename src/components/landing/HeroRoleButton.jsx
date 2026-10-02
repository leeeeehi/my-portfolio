import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const letterIn = keyframes`
  from { opacity: 0; transform: translate3d(0, 0.45em, 0) rotate(8deg); }
  to { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg); }
`;

const gradientFlow = keyframes`
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
`;

const LETTER_STAGGER_S = 0.09;

/**
 * HeroRoleButton 컴포넌트
 * Hero 듀얼 헤드라인의 역할 단어 하나(한글 + 영문 라벨)입니다.
 * - 글자가 한 자씩 차례로 올라오며 나타나고, 글자 안에서 그라데이션이 천천히 흐릅니다.
 * - 호버 시 지정한 색으로 바뀌며 영문 라벨이 그 색으로 채워지고, 클릭하면 관련 섹션으로 이동합니다.
 *   (영문 라벨 옆 화살표로 눌러서 이동할 수 있음을 알려줍니다.)
 *
 * Props:
 * @param {string} label - 크게 표시할 역할 이름 (예: '개발자') [Required]
 * @param {string} subLabel - 아래에 표시할 영문 라벨 (예: 'Developer') [Required]
 * @param {string} hoverColor - 호버 시 글자색(CSS 변수) [Required]
 * @param {function} onClick - 클릭 시 실행할 함수 [Required]
 * @param {number} startDelay - 첫 글자가 나타나기까지의 지연(초) [Optional, 기본값: 0]
 *
 * Example usage:
 * <HeroRoleButton label="개발자" subLabel="Developer" hoverColor="var(--color-primary-dark)" onClick={handleClick} />
 */
function HeroRoleButton({ label, subLabel, hoverColor, onClick, startDelay = 0 }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={`${label} (${subLabel})`}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        p: 0,
        border: 'none',
        background: 'none',
        font: 'inherit',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        transition: 'color 0.3s ease, transform 0.3s ease',
        '&:hover, &:focus-visible': {
          color: hoverColor,
          transform: 'translateY(-4px)',
        },
        '&:hover .hero-role__letter, &:focus-visible .hero-role__letter': {
          backgroundImage: 'none',
          color: hoverColor,
          WebkitTextFillColor: hoverColor,
        },
        '&:hover .hero-role__sub, &:focus-visible .hero-role__sub': {
          borderColor: hoverColor,
          backgroundColor: hoverColor,
          color: 'var(--color-bg-secondary)',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: hoverColor,
          outlineOffset: 6,
          borderRadius: 1,
        },
      }}
    >
      <Box component="span" aria-hidden sx={{ display: 'inline-flex' }}>
        {[...label].map((letter, index) => (
          <Box
            // 같은 글자가 두 번 나올 수 있어 위치를 함께 key 로 쓴다. (글자 순서는 바뀌지 않음)
            key={`${letter}-${index}`}
            component="span"
            className="hero-role__letter"
            sx={{
              display: 'inline-block',
              backgroundImage: 'linear-gradient(100deg, var(--color-text-primary) 0%, var(--color-button-hover) 50%, var(--color-text-primary) 100%)',
              backgroundSize: '300% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              animation: [
                `${letterIn} 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${startDelay + index * LETTER_STAGGER_S}s both`,
                `${gradientFlow} 6s ease-in-out ${-index * 0.8}s infinite alternate`,
              ].join(', '),
            }}
          >
            {letter}
          </Box>
        ))}
      </Box>
      <Box
        component="span"
        aria-hidden
        className="hero-role__sub"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          fontFamily: 'fontFamily',
          fontSize: { xs: '0.8rem', md: '1rem' },
          fontWeight: 600,
          letterSpacing: '0.06em',
          lineHeight: 1.4,
          px: 1.5,
          py: 0.25,
          border: '1.5px solid var(--color-text-primary)',
          borderRadius: 5,
          transition: 'border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {subLabel}
        <ArrowDownwardIcon sx={{ fontSize: '1em' }} />
      </Box>
    </Box>
  );
}

export default HeroRoleButton;
