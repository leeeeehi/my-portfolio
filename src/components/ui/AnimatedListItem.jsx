import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

const MotionGrid = motion.create(Grid);

const SPRING = { type: 'spring', stiffness: 350, damping: 40 };

/**
 * AnimatedListItem 컴포넌트
 * AnimatedList 의 항목 하나. 작게 시작해 스프링으로 튀어나오며 나타나고,
 * 다른 항목이 끼어들면 자리를 부드럽게 옮깁니다. (Magic UI 의 AnimatedListItem 을 MUI Grid 로 옮긴 것)
 *
 * Props:
 * @param {object} size - MUI Grid size (예: { xs: 12, md: 4 }) [Required]
 * @param {node} children - 항목 내용 [Required]
 *
 * Example usage:
 * <AnimatedListItem size={{ xs: 12 }}>...</AnimatedListItem>
 */
function AnimatedListItem({ size, children }) {
  return (
    <MotionGrid
      size={size}
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={SPRING}
      style={{ transformOrigin: 'top center' }}
    >
      {children}
    </MotionGrid>
  );
}

export default AnimatedListItem;
