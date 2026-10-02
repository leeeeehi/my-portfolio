/**
 * 여러 컴포넌트가 함께 쓰는 호버/포커스 인터랙션 스타일(MUI sx 조각) 모음입니다.
 * - 마우스 호버 효과는 호버가 가능한 기기에서만 적용합니다.
 * - 키보드 포커스(:focus-visible)에도 같은 효과를 줍니다.
 * - 터치 기기에서는 누르는 동안(:active) 살짝 눌리는 효과로 대신합니다.
 */

const HOVER_DEVICE = '@media (hover: hover)';
const TOUCH_DEVICE = '@media (hover: none)';

const BUTTON_TRANSITION = 'transform 0.25s ease, box-shadow 0.25s ease, background-position 0.5s ease, border-color 0.25s ease, color 0.25s ease';
const BUTTON_TILT = 'perspective(500px) rotateX(10deg) translateY(-3px)';

/** 채워진 버튼: 3D 로 기울며 떠오르고, 그라데이션이 흘러갑니다. (물결 효과는 MUI Button 기본 제공) */
export const filledButtonSx = {
  fontWeight: 700,
  color: 'var(--color-bg-secondary)',
  backgroundColor: 'var(--color-text-primary)',
  backgroundImage: 'linear-gradient(110deg, var(--color-text-primary) 0%, var(--color-text-primary) 45%, var(--color-button-hover) 100%)',
  backgroundSize: '220% 100%',
  backgroundPosition: '0% 0%',
  boxShadow: 'none',
  transition: BUTTON_TRANSITION,
  willChange: 'transform',
  '&:hover': { backgroundColor: 'var(--color-text-primary)', boxShadow: 'none' },
  [HOVER_DEVICE]: {
    '&:hover': {
      backgroundPosition: '100% 0%',
      boxShadow: '0 12px 24px rgba(46, 58, 42, 0.28)',
      transform: BUTTON_TILT,
    },
  },
  '&:focus-visible': {
    backgroundPosition: '100% 0%',
    transform: BUTTON_TILT,
    outline: '2px solid var(--color-accent)',
    outlineOffset: 3,
  },
  [TOUCH_DEVICE]: { '&:active': { transform: 'scale(0.96)' } },
};

/** 테두리 버튼: 3D 로 기울며 떠오르고, 테두리와 글자가 포인트 색으로 바뀝니다. */
export const outlinedButtonSx = {
  fontWeight: 700,
  borderWidth: 1.5,
  borderStyle: 'solid',
  borderColor: 'var(--color-text-primary)',
  color: 'var(--color-text-primary)',
  transition: BUTTON_TRANSITION,
  willChange: 'transform',
  '&:hover': { borderColor: 'var(--color-text-primary)', backgroundColor: 'transparent' },
  [HOVER_DEVICE]: {
    '&:hover': {
      borderColor: 'var(--color-accent)',
      color: 'var(--color-accent)',
      backgroundColor: 'transparent',
      transform: BUTTON_TILT,
    },
  },
  '&:focus-visible': {
    borderColor: 'var(--color-accent)',
    color: 'var(--color-accent)',
    transform: BUTTON_TILT,
    outline: '2px solid var(--color-accent)',
    outlineOffset: 3,
  },
  [TOUCH_DEVICE]: { '&:active': { transform: 'scale(0.96)' } },
};

/** 카드: 떠오르며 그림자가 넓어집니다. 카드 안의 요소가 포커스를 받아도 같은 효과를 줍니다. */
export const cardLiftSx = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  willChange: 'transform',
  [HOVER_DEVICE]: {
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(46, 58, 42, 0.22)',
    },
  },
  '&:focus-within, &:focus-visible': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(46, 58, 42, 0.22)',
  },
  [TOUCH_DEVICE]: { '&:active': { transform: 'scale(0.98)' } },
};

/**
 * 기술 아이콘: 부모 카드에 마우스를 올리거나 포커스하면 한 바퀴 돌며 빛납니다.
 * 부모에는 className 'skill-hover-parent' 를, 아이콘을 감싼 요소에는 이 스타일을 줍니다.
 */
export const iconSpinGlowSx = {
  display: 'inline-flex',
  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease',
  [HOVER_DEVICE]: {
    '.skill-hover-parent:hover &': {
      transform: 'rotate(360deg) scale(1.15)',
      filter: 'drop-shadow(0 0 8px var(--color-accent))',
    },
  },
  '.skill-hover-parent:focus-visible &, .skill-hover-parent:focus-within &': {
    transform: 'rotate(360deg) scale(1.15)',
    filter: 'drop-shadow(0 0 8px var(--color-accent))',
  },
  [TOUCH_DEVICE]: {
    '.skill-hover-parent:active &': {
      transform: 'rotate(360deg) scale(1.15)',
      filter: 'drop-shadow(0 0 8px var(--color-accent))',
    },
  },
};
