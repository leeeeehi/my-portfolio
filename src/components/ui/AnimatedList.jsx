import { Children, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { AnimatePresence, useInView } from 'motion/react';
import AnimatedListItem from './AnimatedListItem.jsx';

/** key 목록을 하나의 문자열로 이어 붙일 때 쓰는 구분자 (key 에 나올 수 없는 문자) */
const KEY_SEPARATOR = '\u0000';

/**
 * AnimatedList 컴포넌트
 * 항목이 일정 간격으로 하나씩 튀어나오며 쌓이는 목록입니다. (Magic UI 의 Animated List 를 MUI 로 옮긴 것)
 *
 * - 처음에는 맨 아래 항목부터 나타나고, 다음 항목이 그 앞에 끼어들며 기존 항목을 밀어냅니다.
 *   그래서 다 쌓이면 children 에 넘긴 순서 그대로 보입니다.
 * - 나중에 추가된 항목은 넘긴 순서대로 하나씩 나타납니다.
 * - 화면에 보이기 시작할 때 애니메이션을 시작합니다.
 *
 * Props:
 * @param {node} children - key 가 있는 항목들 (화면에 보일 순서대로) [Required]
 * @param {number} delay - 항목이 나타나는 간격(ms) [Optional, 기본값: 400]
 * @param {object} itemSize - 항목 하나의 MUI Grid size [Optional, 기본값: { xs: 12 }]
 * @param {number} spacing - 항목 사이 간격(MUI spacing) [Optional, 기본값: 2]
 *
 * Example usage:
 * <AnimatedList itemSize={{ xs: 12, md: 4 }}>
 *   {items.map((item) => <Card key={item.id} item={item} />)}
 * </AnimatedList>
 */
function AnimatedList({ children, delay = 400, itemSize = { xs: 12 }, spacing = 2 }) {
  const containerRef = useRef(null);
  const initialKeysRef = useRef(null);
  const isRevealingRef = useRef(false);
  const isInView = useInView(containerRef, { once: true });
  const [revealedKeys, setRevealedKeys] = useState(() => new Set());

  const items = Children.toArray(children);
  // items 배열은 렌더링마다 새로 만들어지므로, 내용이 바뀌었는지는 key 를 이어 붙인 문자열로 비교한다.
  const keysSignature = items.map((item) => item.key).join(KEY_SEPARATOR);

  useEffect(() => {
    if (!isInView || keysSignature === '') {
      return undefined;
    }
    const keys = keysSignature.split(KEY_SEPARATOR);
    if (!initialKeysRef.current) {
      initialKeysRef.current = new Set(keys);
    }

    const hiddenKeys = keys.filter((key) => !revealedKeys.has(key));
    if (hiddenKeys.length === 0) {
      isRevealingRef.current = false;
      return undefined;
    }

    // 처음 있던 항목은 아래에서 위로 쌓고, 나중에 추가된 항목은 넘긴 순서대로 보여준다.
    const hiddenInitialKeys = hiddenKeys.filter((key) => initialKeysRef.current.has(key));
    const nextKey = hiddenInitialKeys.length > 0 ? hiddenInitialKeys[hiddenInitialKeys.length - 1] : hiddenKeys[0];

    // 연달아 나타나는 중에만 delay 를 두고, 새로 시작하는 첫 항목은 바로 보여준다.
    const timer = setTimeout(() => {
      isRevealingRef.current = true;
      setRevealedKeys((prev) => new Set(prev).add(nextKey));
    }, isRevealingRef.current ? delay : 0);

    return () => clearTimeout(timer);
  }, [isInView, keysSignature, revealedKeys, delay]);

  return (
    <Grid ref={containerRef} container spacing={spacing} sx={{ minHeight: 48 }}>
      <AnimatePresence>
        {items
          .filter((item) => revealedKeys.has(item.key))
          .map((item) => (
            <AnimatedListItem key={item.key} size={itemSize}>
              {item}
            </AnimatedListItem>
          ))}
      </AnimatePresence>
    </Grid>
  );
}

export default AnimatedList;
