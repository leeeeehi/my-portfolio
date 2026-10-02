import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp 훅
 * 숫자가 현재 값에서 목표 값까지 부드럽게 올라가도록(또는 내려가도록) 합니다.
 * requestAnimationFrame 으로 매 프레임 값을 계산하고, 끝으로 갈수록 느려집니다.
 * @param {number} target - 목표 값
 * @param {boolean} isActive - 카운팅 시작 여부 (화면에 들어왔을 때 true 로) [기본값: true]
 * @param {number} duration - 걸리는 시간(ms) [기본값: 1200]
 * @returns {number} 지금 보여줄 정수 값
 */
function useCountUp(target, isActive = true, duration = 1200) {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const from = valueRef.current;
    let startTime = null;
    let frame = requestAnimationFrame(function step(now) {
      if (startTime === null) {
        startTime = now;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + (target - from) * eased);
      valueRef.current = next;
      setValue(next);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [target, isActive, duration]);

  return value;
}

export default useCountUp;
